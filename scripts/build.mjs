import { cpSync, rmSync, lstatSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { projectRoot, sourceRoot, buildRoot } from './paths.mjs';
import { validateSite } from './check.mjs';

validateSite();
const root = resolve(projectRoot);
if (dirname(buildRoot) !== root || basename(buildRoot) !== 'dist') throw new Error('La salida debe ser dist dentro del proyecto.');
if (lstatSync(buildRoot, { throwIfNoEntry: false })?.isSymbolicLink()) throw new Error('dist no puede ser un enlace simbólico.');
rmSync(buildRoot, { recursive: true, force: true });
cpSync(sourceRoot, buildRoot, { recursive: true });
validateSite(buildRoot);
console.log('Build estático generado y comprobado en dist/.');
