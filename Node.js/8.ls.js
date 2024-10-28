const fs = require('node:fs');

fs.readdir('.', (err, files) => {
    if (err) throw new Error('Error al leer el directorio', err);
    files.forEach(file => {
        console.log(file);
    });
})