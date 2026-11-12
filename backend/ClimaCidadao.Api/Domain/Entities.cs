using System.ComponentModel.DataAnnotations;

namespace ClimaCidadao.Api.Domain;

public sealed class SensorReading
{
    public long Id { get; set; }
    [Range(-10, 60)] public double TemperatureC { get; set; }
    [Range(0, 100)] public double HumidityPercent { get; set; }
    [MaxLength(40)] public required string Source { get; set; }
    [MaxLength(80)] public required string Neighborhood { get; set; }
    public DateTime ObservedAtUtc { get; set; }
}

public sealed class SafePoint
{
    public int Id { get; set; }
    [MaxLength(100)] public required string Name { get; set; }
    [MaxLength(200)] public required string Address { get; set; }
    [MaxLength(30)] public required string Kind { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public bool IsAccessible { get; set; }
    public bool IsVerified { get; set; }
}

public sealed class AnonymousReport
{
    public long Id { get; set; }
    [MaxLength(30)] public required string Category { get; set; }
    [MaxLength(80)] public required string Neighborhood { get; set; }
    [MaxLength(280)] public required string Description { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public enum RiskLevel { Low, Moderate, High, Extreme }

public sealed record RiskAssessment(RiskLevel Level, double HeatIndexC, string Guidance, DateTimeOffset CalculatedAt);
public sealed record ReadingRequest(double TemperatureC, double HumidityPercent, string Source, string Neighborhood, DateTimeOffset? ObservedAt);
public sealed record ReportRequest(string Category, string Neighborhood, string Description);
