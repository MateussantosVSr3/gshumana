import { inspect, redact, citizenRisk } from './pii-guard.js';
import { taint, sanitize, sink } from './taint-analysis.js';
const malicious = taint('Meu CPF é 123.456.789-00', 'report.description');
const blocked = sink(malicious, 'audit-log');
const clean = sanitize(malicious, 'pii-redaction', redact);
const accepted = sink(clean, 'audit-log');
const scan = inspect(malicious.value);
console.log(JSON.stringify({ blocked, accepted, risk: citizenRisk({ piiFindings: scan.findings.length, publicExposure: true, encrypted: true, accessControlled: false }) }, null, 2));
