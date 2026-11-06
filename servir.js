// Servidor local de demonstração: node servir.js  → http://localhost:5174
const http=require('http'),fs=require('fs'),path=require('path');
const T={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.xml':'application/xml','.svg':'image/svg+xml'};
http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);let f=path.join(__dirname,p);
 if(!f.startsWith(__dirname)){r.writeHead(403);return r.end();}
 if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');
 fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end('Não encontrado');}r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});r.end(d);});
}).listen(5174,()=>console.log('http://localhost:5174'));
