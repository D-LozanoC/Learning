const http = require('node:http')

const dittoJSON = require('./ditto.json')

const processRequest = (req, res) => {

    const { method, url } = req

    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(dittoJSON))
                    break
                default:
                    res.statusCode = 404
                    res.end('<h1>Página no encontrada</h1>')
                    break
            }
        case 'POST':
            switch (url) {
                case '/pokemon': {
                    let body = ''

                    req.on('data', chunk => {
                        body += chunk.toString()
                    })

                    req.on('end', () => {
                        const data = JSON.parse(body)
                        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
                        res.end(JSON.stringify(data))
                    })
                    break
                }
                default:
                    res.statusCode = 404
                    res.end('<h1>Página no encontrada</h1>')
                    break
            }
    }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/')
})
