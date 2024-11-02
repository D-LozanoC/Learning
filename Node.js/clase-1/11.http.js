const http = require('node:http')
const { findAvailablePort } = require('./12.free-port.js')

const desiredPort = process.env.PORT ?? 3000
const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola Mundo')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Server: http://localhost:${port}`)
  })
})
