import test from 'node:test'; import assert from 'node:assert/strict';
import { inspect, redact, citizenRisk } from '../src/pii-guard.js';
import { taint, sanitize, sink } from '../src/taint-analysis.js';
test('detecta e remove PII',()=>{const input='Contato ana@example.com CPF 123.456.789-00';assert.equal(inspect(input).safe,false);assert.doesNotMatch(redact(input),/ana@|123\.456/);});
test('bloqueia fluxo contaminado',()=>{assert.equal(sink(taint('entrada'),'log').blocked,true);});
test('libera após sanitização',()=>{const clean=sanitize(taint('texto'),'normalização',x=>x.trim());assert.equal(sink(clean,'log').delivered,true);});
test('risco cresce com exposição',()=>{assert.ok(citizenRisk({piiFindings:2,publicExposure:true,encrypted:false,accessControlled:false}).score>=70);});
