import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));
export const sourceRoot = resolve(projectRoot, 'src');
export const buildRoot = resolve(projectRoot, 'dist');
