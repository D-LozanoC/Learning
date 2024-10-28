//Stats de un archivo

const fs = require('node:fs');

const stats = fs.statSync("./archivo.txt")

console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size,
)