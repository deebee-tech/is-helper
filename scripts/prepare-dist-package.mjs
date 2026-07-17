import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Root package.json uses `"files": ["dist"]` so a mistaken `npm publish` from the repo root cannot
 * ship tests/coverage. That field is wrong once the same manifest is copied into `dist/` for
 * semantic-release's `pkgRoot: 'dist'` publish — npm would look for `dist/dist` and omit the
 * built artifacts. Drop it (and scripts/devDependencies) from the publish manifest.
 */
const distPkgPath = join(dirname(fileURLToPath(import.meta.url)), '../dist/package.json');
const pkg = JSON.parse(readFileSync(distPkgPath, 'utf8'));

delete pkg.files;
delete pkg.scripts;
delete pkg.devDependencies;
delete pkg.packageManager;

writeFileSync(distPkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
