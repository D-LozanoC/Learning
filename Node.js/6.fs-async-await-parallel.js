const { readFile } = require('node:fs/promises');

Promise.all([
    readFile('./archivo.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')
]).then(([text, text2])=>{
    console.log('Primer texto', text)
    console.log('Segundo texto', text2)
})