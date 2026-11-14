import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import type { Risk, SafePoint } from './api';

const dbPromise = Platform.OS === 'web' ? null : SQLite.openDatabaseAsync('climacidadao.db');

export async function initializeStorage() {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS cache (
      key TEXT PRIMARY KEY NOT NULL,
      payload TEXT NOT NULL,
      saved_at TEXT NOT NULL
    );
  `);
}

async function save(key: string, value: unknown) {
  if (!dbPromise) {
    globalThis.localStorage?.setItem(key, JSON.stringify(value));
    return;
  }
  const db = await dbPromise;
  await db.runAsync(
    'INSERT OR REPLACE INTO cache (key, payload, saved_at) VALUES (?, ?, ?)',
    key,
    JSON.stringify(value),
    new Date().toISOString(),
  );
}

async function load<T>(key: string): Promise<T | null> {
  if (!dbPromise) {
    const payload = globalThis.localStorage?.getItem(key);
    return payload ? JSON.parse(payload) as T : null;
  }
  const db = await dbPromise;
  const row = await db.getFirstAsync<{ payload: string }>('SELECT payload FROM cache WHERE key = ?', key);
  return row ? JSON.parse(row.payload) as T : null;
}

export const saveRisk = (risk: Risk) => save('last-risk', risk);
export const loadRisk = () => load<Risk>('last-risk');
export const saveSafePoints = (points: SafePoint[]) => save('safe-points', points);
export const loadSafePoints = () => load<SafePoint[]>('safe-points');
