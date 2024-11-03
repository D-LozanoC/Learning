/* eslint-disable indent */
const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use(cors({
    origin: (origin, callbacks) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:8080',
            'https://api.example.com',
            'https://api.another-example.com' // add more origins as needed
        ]
        if (ACCEPTED_ORIGINS.includes(origin)) {
            callbacks(null, true)
        } else {
            callbacks(new Error('Not allowed by CORS'))
        }
    }
})) // *

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.get('/movies', (req, res) => {
    const genre = req.query.genre
    if (genre) {
        const filteredMovies = movies.filter(
            m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path to regex
    const id = req.params.id
    const movie = movies.find(m => m.id === id)
    if (movie) return res.status(200).json(movie)
    res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) return res.status(422).json({ error: JSON.parse(result.error.message) })

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

    if (result.error) return res.status(422).json({ error: JSON.parse(result.error.message) })

    const id = req.params.id
    const movieIndex = movies.findIndex(m => m.id === id)

    if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

    const updatedMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updatedMovie

    return res.status(200).json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
    const id = req.params.id
    const movieIndex = movies.findIndex(m => m.id === id)

    if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

    movies.splice(movieIndex, 1)

    return res.status(204).json({ message: 'Movie deleted' })
})

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
