using ClimaCidadao.Api.Domain;
using ClimaCidadao.Api.Services;
using Xunit;

namespace ClimaCidadao.Tests;

public sealed class RiskServiceTests
{
    private readonly RiskService _service = new();

    [Fact]
    public void MildTemperature_IsLowRisk()
    {
        var result = _service.Assess(22, 50);
        Assert.Equal(RiskLevel.Low, result.Level);
        Assert.Equal(22, result.HeatIndexC);
    }

    [Fact]
    public void HotAndHumid_IsAtLeastModerate()
    {
        var result = _service.Assess(35, 70);
        Assert.True(result.Level is RiskLevel.High or RiskLevel.Extreme);
        Assert.True(result.HeatIndexC > 35);
    }
}
