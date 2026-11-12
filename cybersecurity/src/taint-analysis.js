// Análise dinâmica simples: fonte não confiável permanece marcada até sanitização.
export const taint = (value, source = 'user-input') => ({ value, tainted: true, source, sanitizers: [] });
export function sanitize(input, name, transform) { return { value: transform(input.value), tainted: false, source: input.source, sanitizers: [...input.sanitizers, name] }; }
export function sink(input, destination) {
  const event = { destination, blocked: input.tainted, source: input.source, sanitizers: input.sanitizers, at: new Date().toISOString() };
  if (event.blocked) return { ...event, reason: 'Fluxo contaminado bloqueado antes do destino sensível.' };
  return { ...event, delivered: true };
}
