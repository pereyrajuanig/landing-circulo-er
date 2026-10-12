import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};

export function createStaticServer(root) {
  const directory = resolve(root);
  return createServer(async (request, response) => {
    const error = (status, message) => {
      response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(request.method === 'HEAD' ? '' : message);
    };
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.setHeader('Allow', 'GET, HEAD');
      return error(405, 'Método no permitido');
    }
    let pathname;
    try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
    catch { return error(400, 'Ruta inválida'); }
    if (pathname.includes('\0') || pathname.includes('\\')) return error(400, 'Ruta inválida');
    const path = resolve(directory, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!path.startsWith(`${directory}${sep}`)) return error(403, 'Acceso denegado');
    try {
      const content = await readFile(path);
      response.writeHead(200, {
        'Content-Type': types[extname(path).toLowerCase()] ?? 'application/octet-stream',
        'Content-Length': content.length,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(request.method === 'HEAD' ? undefined : content);
    } catch (e) {
      error(['ENOENT', 'ENOTDIR', 'EISDIR'].includes(e.code) ? 404 : 500, 'Archivo no disponible');
    }
  });
}
