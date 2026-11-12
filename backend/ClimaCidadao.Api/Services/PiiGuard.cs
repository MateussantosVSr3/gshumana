using System.Text.RegularExpressions;

namespace ClimaCidadao.Api.Services;

public interface IPiiGuard { IReadOnlyCollection<string> Find(string text); }

public sealed partial class PiiGuard : IPiiGuard
{
    public IReadOnlyCollection<string> Find(string text)
    {
        var findings = new List<string>();
        if (Cpf().IsMatch(text)) findings.Add("cpf");
        if (Email().IsMatch(text)) findings.Add("email");
        if (Phone().IsMatch(text)) findings.Add("telefone");
        if (PostalCode().IsMatch(text)) findings.Add("cep");
        return findings;
    }

    [GeneratedRegex(@"\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b")]
    private static partial Regex Cpf();
    [GeneratedRegex(@"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", RegexOptions.IgnoreCase)]
    private static partial Regex Email();
    [GeneratedRegex(@"(?:\+?55\s?)?\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}\b")]
    private static partial Regex Phone();
    [GeneratedRegex(@"\b\d{5}-?\d{3}\b")]
    private static partial Regex PostalCode();
}
