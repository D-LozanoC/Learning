# Aprendiendo Node.js

- Diferencias entre ECMAScript y CommonJS
- Importación de modulos nativos
    - OS (Operating System)
    - FS (File System)
        - Read File (Sync & Async)
            - ReadFileSync(...) //Lee el archivo de forma sincrona
            - ReadFile(...) //Lee el archivo con un callback
            - "node:fs/promises" ReadFile(...) //Lee el archivo con promesas .then
            - "node:fs/promises" ;(async ()=>{const varT = await ReadFile(...)})() //Lee el archivo con un IIFE = Inmediatly Invoked Function Expression si esta en cjs
            - "node:fs/promises" const varT = await ReadFile(...) //Lee el archivo si esta en mjs
            - Promises.All([ReadFile(...), ReadFile(...)]).then(...) //Lee los archivos de manera paralela
    - Path
    - Process
- npm (Node Package Manager) ==> Es un registro con muchas dependencias y paquetes descargables & es la linea de comandos usada para instalar o manejar y administrar nuestro proyecto
    - <code>npm init</code> (Crear package.json)
    - <code>npm i "dependency name"</code> (Instalar las dependencias que necesitemos) [NPM JS | Registro de dependencias](https://www.npmjs.com/)
    - ^version (Siempre tendrá actualizadas las versiones)