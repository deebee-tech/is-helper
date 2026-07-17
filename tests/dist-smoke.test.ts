import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * Unit tests import from `src/`. Without a dist smoke import, deleting or sabotaging the published
 * artifacts still leaves `vitest run` green. CI builds before this file runs.
 */
const distMjs = fileURLToPath(new URL('../dist/index.mjs', import.meta.url));
const distCjs = fileURLToPath(new URL('../dist/index.cjs', import.meta.url));

describe('dist artifacts', () => {
  it('should ship built ESM and CJS files', () => {
    expect(existsSync(distMjs)).toBe(true);
    expect(existsSync(distCjs)).toBe(true);
  });

  it('should export a working default from the ESM build', async () => {
    const mod = await import('../dist/index.mjs');

    expect(mod.default.string('hello')).toBe(true);
    expect(mod.is.number(42)).toBe(true);
  });

  it('should export default and named is from the CJS build', () => {
    const require = createRequire(import.meta.url);
    const mod = require('../dist/index.cjs') as {
      default: typeof import('../src').default;
      is: typeof import('../src').default;
    };

    expect(mod.default.string('hello')).toBe(true);
    expect(mod.is.nil(null)).toBe(true);
    expect(mod.default).toBe(mod.is);
  });
});
