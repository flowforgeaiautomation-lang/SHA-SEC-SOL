import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '..', '..');
function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|css)$/.test(name) && !name.endsWith('.test.ts') && !name.endsWith('.gen.ts')) out.push(p);
  }
  return out;
}
const files = walk(join(root, 'src'));

describe('site pictures work on any host (including Cloudflare)', () => {
  it('no source file uses Lovable-only /__l5e picture addresses or .asset.json pointers', () => {
    const offenders = files.filter((f) => /__l5e|\.asset\.json/.test(readFileSync(f, 'utf8')));
    expect(offenders).toEqual([]);
  });
  it('every imported @/assets file exists in the project', () => {
    const missing: string[] = [];
    for (const f of files) {
      for (const m of readFileSync(f, 'utf8').matchAll(/from ['"]@\/assets\/([^'"]+)['"]/g)) {
        if (!existsSync(join(root, 'src', 'assets', m[1]!))) missing.push(`${f}: ${m[1]}`);
      }
    }
    expect(missing).toEqual([]);
  });
  it('quotation PDF and favicon ship from public/', () => {
    expect(existsSync(join(root, 'public', 'mss-security-quotation.pdf'))).toBe(true);
    expect(existsSync(join(root, 'public', 'favicon.png'))).toBe(true);
  });
});
