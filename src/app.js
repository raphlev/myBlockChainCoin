const { createServer } = require('http');

const server = createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
});

server.listen(3000, () => console.log(`Adresse du serveur : http://localhost:3000`));