using ClimaCidadao.Api.Domain;

namespace ClimaCidadao.Api.Services;

public interface IRiskService { RiskAssessment Assess(double temperatureC, double humidityPercent); }

public sealed class RiskService : IRiskService
{
    public RiskAssessment Assess(double temperatureC, double humidityPercent)
    {
        // NOAA Rothfusz regression; prototype only, not medical diagnosis.
        var f = temperatureC * 9 / 5 + 32;
        var r = humidityPercent;
        var hiF = -42.379 + 2.04901523 * f + 10.14333127 * r - .22475541 * f * r
                  - .00683783 * f * f - .05481717 * r * r + .00122874 * f * f * r
                  + .00085282 * f * r * r - .00000199 * f * f * r * r;
        var hiC = Math.Round((hiF - 32) * 5 / 9, 1);
        if (temperatureC < 26.7) hiC = temperatureC;
        var level = hiC switch { >= 54 => RiskLevel.Extreme, >= 41 => RiskLevel.High, >= 32 => RiskLevel.Moderate, _ => RiskLevel.Low };
        var guidance = level switch
        {
            RiskLevel.Extreme => "Evite exposição. Procure local fresco e acompanhe alertas oficiais.",
            RiskLevel.High => "Reduza esforço, hidrate-se e faça pausas frequentes à sombra.",
            RiskLevel.Moderate => "Leve água e programe pausas em locais frescos.",
            _ => "Mantenha hidratação e proteção solar."
        };
        return new(level, hiC, guidance, DateTimeOffset.UtcNow);
    }
}
