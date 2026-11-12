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
            new SafePoint { Id = 1, Name = "Parque Trianon", Address = "R. Peixoto Gomide, 949", Kind = "sombra", Latitude = -23.5614, Longitude = -46.6560, IsAccessible = true, IsVerified = true },
            new SafePoint { Id = 2, Name = "Centro Cultural Fiesp", Address = "Av. Paulista, 1313", Kind = "apoio", Latitude = -23.5618, Longitude = -46.6549, IsAccessible = true, IsVerified = false });
    }
}
