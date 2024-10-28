const fs = require('node:fs/promises');
const path = require('node:path');

const folder = process.argv[2] ?? '.';

//Async function
async function ls(folder) {
    let files;
    try {
        files = await fs.readdir(folder)
    } catch (error) {
        if (error) {
            console.error(new Error(`Error al leer el directorio ${folder}`, error))
            process.exit(1)
        }
    }
    
    const filePromises = files.map(async file => {
        const filePath = path.join(folder, file)
        let stats;
        try {
            stats = await fs.stat(filePath)
        } catch (error) {
            console.error(new Error(`Error al leer el archivo ${filePath}`, error))
            process.exit(1)
        }
        const isDirectory = stats.isDirectory();
        const fileType = isDirectory ? 'd' : 'f'
        const fileSize = stats.size.toString()
        const fileModified = stats.mtime.toLocaleString()
        
        return `${fileType} ${file.padEnd(30)} ${fileSize .padStart(10)} ${fileModified}`
    })
    
    const filesInfo = await Promise.all(filePromises)
    
    filesInfo.forEach(fileInfo => console.log(fileInfo))
}

//Callback
// fs.readdir(folder, (err, files) => {
//     if (err) throw new Error('Error al leer el directorio', err);
//     files.forEach(file => {
//         console.log(file);
//     });
// })

//Promises

// fs.readdir(folder).then(files => {
//     files.forEach(file => {
//         const filePath = path.join(folder, file)

//         fs.stat(filePath)
//     })
// }).catch(err => {
//     if (err) {
//         console.error('Error al leer el directorio', err)
//         return
//     }
// })
ls(folder)