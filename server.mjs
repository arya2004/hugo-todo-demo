import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const files = new Map([
  ['/', ['index.html', 'text/html']],
  ['/app.js', ['app.js', 'text/javascript']],
  ['/styles.css', ['styles.css', 'text/css']],
]);
const port = Number(process.env.PORT ?? 3001);

createServer(async (request, response) => {
  const file = files.get(new URL(request.url, 'http://localhost').pathname);
  if (!file) {
    response.writeHead(404).end('Not found');
    return;
  }
  const content = await readFile(new URL(`./public/${file[0]}`, import.meta.url));
  response.writeHead(200, { 'Content-Type': `${file[1]}; charset=utf-8` });
  response.end(content);
}).listen(port, () => console.log(`Todo demo: http://localhost:${port}`));
