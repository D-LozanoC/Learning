import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/local-file-system/movie.js'

export class MovieController {
  static async getAll (req, res) {
    const genre = req.query.genre
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) { // path to regex
    const id = req.params.id
    const movie = await MovieModel.getById({ id })
    if (movie) return res.status(200).json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (result.error) return res.status(422).json({ error: JSON.parse(result.error.message) })

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)
    if (result.error) return res.status(422).json({ error: JSON.parse(result.error.message) })
    const id = req.params.id
    const updatedMovie = await MovieModel.update({ id, input: result.data })
    return res.status(200).json(updatedMovie)
  }

  static async delete (req, res) {
    const id = req.params.id
    const result = await MovieModel.delete({ id })
    if (!result) return res.status(404).json({ message: 'Movie not found' })
    return res.status(204).json({ message: 'Movie deleted' })
  }
}
