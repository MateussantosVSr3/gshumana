using ClimaCidadao.Api.Data;
using ClimaCidadao.Api.Domain;
using ClimaCidadao.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlite(builder.Configuration.GetConnectionString("ClimaCidadao")));
builder.Services.AddScoped<IRiskService, RiskService>();
builder.Services.AddSingleton<IPiiGuard, PiiGuard>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p.AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed(_ => true)));

var app = builder.Build();
app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/health", () => Results.Ok(new { status = "healthy", utc = DateTimeOffset.UtcNow }))
   .WithTags("Operação");

app.MapPost("/api/v1/readings", async (ReadingRequest input, AppDbContext db, CancellationToken ct) =>
{
    if (input.TemperatureC is < -10 or > 60 || input.HumidityPercent is < 0 or > 100 || string.IsNullOrWhiteSpace(input.Source) || string.IsNullOrWhiteSpace(input.Neighborhood))
        return Results.ValidationProblem(new Dictionary<string, string[]> { ["reading"] = ["Temperatura ou umidade fora do intervalo aceito."] });
    var entity = new SensorReading { TemperatureC = input.TemperatureC, HumidityPercent = input.HumidityPercent, Source = input.Source.Trim(), Neighborhood = input.Neighborhood.Trim(), ObservedAtUtc = (input.ObservedAt ?? DateTimeOffset.UtcNow).UtcDateTime };
    db.Readings.Add(entity);
    await db.SaveChangesAsync(ct);
    return Results.Created($"/api/v1/readings/{entity.Id}", entity);
}).WithTags("Leituras").WithOpenApi();

app.MapGet("/api/v1/readings", async (string? neighborhood, int? limit, AppDbContext db, CancellationToken ct) =>
{
    var query = db.Readings.AsNoTracking();
    if (!string.IsNullOrWhiteSpace(neighborhood)) query = query.Where(x => x.Neighborhood == neighborhood);
    return Results.Ok(await query.OrderByDescending(x => x.ObservedAtUtc).Take(Math.Clamp(limit ?? 20, 1, 100)).ToListAsync(ct));
}).WithTags("Leituras").WithOpenApi();

app.MapGet("/api/v1/risk/latest", async (string? neighborhood, AppDbContext db, IRiskService risk, CancellationToken ct) =>
{
    var query = db.Readings.AsNoTracking();
    if (!string.IsNullOrWhiteSpace(neighborhood)) query = query.Where(x => x.Neighborhood == neighborhood);
    var latest = await query.OrderByDescending(x => x.ObservedAtUtc).FirstOrDefaultAsync(ct);
    return latest is null ? Results.NotFound(new { message = "Nenhuma leitura encontrada." }) : Results.Ok(risk.Assess(latest.TemperatureC, latest.HumidityPercent));
}).WithTags("Risco").WithOpenApi();

app.MapGet("/api/v1/safe-points", async (bool? accessible, AppDbContext db, CancellationToken ct) =>
{
    var query = db.SafePoints.AsNoTracking();
    if (accessible is not null) query = query.Where(x => x.IsAccessible == accessible);
    return Results.Ok(await query.OrderBy(x => x.Name).ToListAsync(ct));
}).WithTags("Pontos seguros").WithOpenApi();

app.MapPost("/api/v1/reports", async (ReportRequest input, AppDbContext db, IPiiGuard pii, CancellationToken ct) =>
{
    var allowed = new[] { "sem-agua", "sem-sombra", "ponto-fechado", "outro" };
    if (!allowed.Contains(input.Category) || string.IsNullOrWhiteSpace(input.Neighborhood) || string.IsNullOrWhiteSpace(input.Description) || input.Description.Length is < 10 or > 280)
        return Results.ValidationProblem(new Dictionary<string, string[]> { ["report"] = ["Categoria ou descrição inválida."] });
    var findings = pii.Find(input.Description);
    if (findings.Count > 0)
        return Results.ValidationProblem(new Dictionary<string, string[]> { ["privacy"] = [$"Remova dados pessoais antes de enviar: {string.Join(", ", findings)}."] });
    var report = new AnonymousReport { Category = input.Category, Neighborhood = input.Neighborhood.Trim(), Description = input.Description.Trim(), CreatedAtUtc = DateTime.UtcNow };
    db.Reports.Add(report);
    await db.SaveChangesAsync(ct);
    return Results.Created($"/api/v1/reports/{report.Id}", new { report.Id, report.Category, report.Neighborhood, report.CreatedAtUtc });
}).WithTags("Relatos anônimos").WithOpenApi();

await using (var scope = app.Services.CreateAsyncScope())
    await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.MigrateAsync();

app.Run();
public partial class Program { }
