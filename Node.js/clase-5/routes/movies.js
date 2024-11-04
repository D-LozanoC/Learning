/* eslint-disable indent */
/* eslint-disable no-undef */
import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({ movieModel }) => {
    const moviesRouter = Router()

    const moviesController = new MovieController({ movieModel })

    moviesRouter.get('/', moviesController.getAll)
    moviesRouter.post('/', moviesController.create)
    moviesRouter.get('/:id', moviesController.getById)
    moviesRouter.patch('/:id', moviesController.update)
    moviesRouter.delete('/:id', moviesController.delete)

    return moviesRouter
}
