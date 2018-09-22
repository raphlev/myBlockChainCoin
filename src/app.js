// Example node.js server app using http js package to create a web server (like apache without apache !)

const { createServer } = require('http');

const server = createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
});

server.listen(3000, () => console.log(`Adresse du serveur : http://localhost:3000`));