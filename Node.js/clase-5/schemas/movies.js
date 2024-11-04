/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import z from 'zod'

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title is not a valid',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().min(1900).max(2025),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).optional().default(5),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime']),
        {
            required_error: 'Movie genre must be a valid',
            invalid_type_error: 'Movie genre must be an array of enum Genre'
        }

    )
})

export function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object)
}

export function validateMovie(object) {
    return movieSchema.safeParse(object)
}
