import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    typecheck: {
      enabled: true,
      include: ['tests/**/*.test-d.ts'],
    },
    coverage: {
      reporter: ['text', 'html', 'json-summary'],
      thresholds: {
        // Pinned to the post-fix baseline. The residual gap is defensive
        // `typeof getter !== 'function'` branches on pristine accessors captured at module load.
        statements: 99.14,
        branches: 98.06,
        functions: 100,
        lines: 100,
      },
      exclude: [
        ...configDefaults.exclude,
        'tests/*',
        'dist/*',
        'coverage/*',
        '.prettierrc.mjs',
        'eslint.config.mjs',
        'release.config.mjs',
        'tsdown.config.ts',
        'vitest.config.mjs',
        'scripts/*',
      ],
    },
  },
});
