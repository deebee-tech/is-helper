import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  // Named + default value exports: keep CJS as `exports.default` / `exports.is` so it matches the
  // generated `.d.cts` (and so `import { is }` works). With only a default export, cjsDefault would
  // emit `module.exports = is` while the types still declared `is as default`.
  cjsDefault: false,
  outDir: 'dist',
});
