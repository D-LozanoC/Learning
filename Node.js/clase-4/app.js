/* eslint-disable indent */
import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { moviesRouter } from './routes/movies.js'

// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'))

const app = express()
app.use(json())
app.use(corsMiddleware()) // *
app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.send('<h1>Bienvenid@ al servidor</h1>')
})

app.use('/movies', moviesRouter)

// app.options('/movies/:id', (req, res) => {
//     const origin = req.header('origin')
//     if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//         res.header('Access-Control-Allow-Origin', origin)
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
//     }
//     res.status(200).end()
// })

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
