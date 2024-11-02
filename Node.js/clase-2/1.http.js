const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    if (req.url === '/') {
        res.statusCode = 200;
        res.end('Bienvenido a mi página de inicio')
    } else if (req.url === '/imagen-super-bonita.jpg') {
        fs.readFile('./ken-kaneki-3.jpg', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error al cargar la imagen, internal server error', err)
            } else {
                res.setHeader('Content-Type', 'image/jpg')
                res.end(data)
            }
        })
    } else if (req.url === '/contactos') {
        res.statusCode = 200;
        res.end('Contactos: 1234567890, 9876543210')
    } else {
        res.statusCode = 404;
        res.end('Página no encontrada')
    }
    // TODO: Implement additional logic for handling the request
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`Server: http://localhost:${desiredPort}`)
})