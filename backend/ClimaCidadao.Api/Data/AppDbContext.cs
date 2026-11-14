using ClimaCidadao.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace ClimaCidadao.Api.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<SensorReading> Readings => Set<SensorReading>();
    public DbSet<SafePoint> SafePoints => Set<SafePoint>();
    public DbSet<AnonymousReport> Reports => Set<AnonymousReport>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SensorReading>().HasIndex(x => new { x.Neighborhood, x.ObservedAtUtc });
        modelBuilder.Entity<AnonymousReport>().HasIndex(x => x.CreatedAtUtc);
        modelBuilder.Entity<SafePoint>().HasData(
            new SafePoint { Id = 1, Name = "Ponto de apoio — Rua Candelária", Address = "Rua Candelária, 250 — Jardim Marquesa", Kind = "apoio em validação", Latitude = -23.6655, Longitude = -46.7455, IsAccessible = true, IsVerified = false },
            new SafePoint { Id = 2, Name = "Ponto comunitário — Rua Lagoa Mirim", Address = "Rua Lagoa Mirim, 20 — Jardim Marquesa", Kind = "apoio em validação", Latitude = -23.6665, Longitude = -46.7445, IsAccessible = false, IsVerified = false });
    }
}
