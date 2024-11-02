const os = require('node:os')

console.log('Plataforma del sistema', os.platform())
console.log('Arquitectura del sistema', os.arch())
console.log('CPUs', os.cpus())
console.log('Memoria libre', os.freemem() / 1024 / 1024)
console.log('Memoria total', os.totalmem() / 1024 / 1024)
console.log('Host name', os.hostname())
