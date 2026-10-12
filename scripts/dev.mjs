import { existsSync } from 'node:fs';
import { createStaticServer } from './static-server.mjs';
import { sourceRoot, buildRoot } from './paths.mjs';

const built = process.argv.includes('--built');
const args = process.argv.indexOf('--port');
const port = Number(args === -1 ? 4173 : process.argv[args + 1]);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('El puerto debe estar entre 1 y 65535.');
const root = built ? buildRoot : sourceRoot;
if (!existsSync(`${root}/index.html`)) throw new Error(built ? 'Primero ejecutá npm run build.' : 'Falta src/index.html.');
const server = createStaticServer(root);
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `El puerto ${port} está ocupado. Usá --port con otro valor.` : error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => console.log(`${built ? 'Build' : 'Desarrollo'}: http://127.0.0.1:${port}/\nRecargá el navegador después de editar.`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
