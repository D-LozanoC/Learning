// argumentos de entrada

console.log(process.argv)

//controlar el proceso y su salida
process.on('exit', ()=>{
    //limpiar recursos, etc...
    console.log('Limpiando recursos...')
})

//current working directory

console.log(process.cwd())

console.log(process.cpuUsage())

//controlar proceso
process.exit(1)
