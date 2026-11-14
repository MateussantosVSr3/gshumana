using ClimaCidadao.Api.Services;
using Xunit;

namespace ClimaCidadao.Tests;

public sealed class PiiGuardTests
{
    private readonly PiiGuard _guard = new();

    [Fact]
    public void FindsSensitivePatterns()
    {
        var findings = _guard.Find("CPF 123.456.789-00, contato pessoa@example.com");
        Assert.Contains("cpf", findings);
        Assert.Contains("email", findings);
    }

    [Fact]
    public void AcceptsAnonymousReport()
    {
        Assert.Empty(_guard.Find("O bebedouro do parque está fechado desde cedo."));
    }
}
