const rules = [
  ['cpf', /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g],
  ['email', /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi],
  ['telefone', /(?:\+?55\s?)?\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}\b/g],
  ['cep', /\b\d{5}-?\d{3}\b/g]
];

export function inspect(value) {
  const text = JSON.stringify(value ?? {}); const findings = [];
  for (const [kind, regex] of rules) { const matches = [...text.matchAll(regex)]; if (matches.length) findings.push({ kind, count: matches.length }); }
  return { safe: findings.length === 0, findings };
}
export function redact(value) {
  let text = typeof value === 'string' ? value : JSON.stringify(value);
  for (const [kind, regex] of rules) text = text.replace(regex, `[REMOVIDO:${kind}]`);
  return text;
}
export function citizenRisk({ piiFindings, publicExposure = false, encrypted = true, accessControlled = true }) {
  const score = Math.min(100, piiFindings * 20 + (publicExposure ? 35 : 0) + (!encrypted ? 25 : 0) + (!accessControlled ? 20 : 0));
  return { score, level: score >= 70 ? 'crítico' : score >= 40 ? 'alto' : score >= 20 ? 'moderado' : 'baixo' };
}
