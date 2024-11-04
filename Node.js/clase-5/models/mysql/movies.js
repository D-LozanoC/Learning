/* eslint-disable indent */

import mysql from 'mysql2/promise'
// import { findNewGenres } from '../../utils/utils.js'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
    static async getAll ({ genre }) {
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()
            const [movies] = await connection.query('SELECT BIN_TO_UUID(m.id) as id, m.title, m.year, m.director, m.duration, m.poster, m.rate, g.`name` as genre FROM movies as m JOIN movie_genres as mg JOIN genre as g WHERE m.id = mg.movie_id AND g.id = mg.genre_id AND LOWER(g.name) = ?;', [lowerCaseGenre])

            return movies
        }
        const [movies] = await connection.query('SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movies;')

        return movies
    }

    static async getById ({ id }) {
        const [movie] = await connection.query('SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movies WHERE BIN_TO_UUID(id) =?;', [id])

        if (movie.length === 0) return null

        return movie
    }

    static async create ({ input }) {
        const {
            title,
            year,
            director,
            duration,
            poster,
            rate,
            genre: movieGenres
        } = input

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const { uuid } = uuidResult[0]

        try {
            const idGenres = []
            await connection.query('INSERT INTO movies (id,title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?),?,?,?,?,?,?);', [uuid, title, year, director, duration, poster, rate])
            for (const movieGenre of movieGenres) {
                await connection.query('INSERT IGNORE INTO genre (name) VALUES (?);', [movieGenre])
                const [genreId] = await connection.query('SELECT id FROM genre WHERE name =?;', [movieGenre])
                idGenres.push(genreId[0].id)
            }
            for (const id of idGenres) {
                await connection.query('INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?),?);', [uuid, id])
            }

            const movie = await connection.query('SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movies WHERE BIN_TO_UUID(id) =?;', [uuid])

            return movie[0]
        } catch (e) {
            throw new Error('Error creating movie')
        }
    }

    static async delete ({ id }) {
        try {
            await connection.query('DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);', [id])
            await connection.query('DELETE FROM movies WHERE id = UUID_TO_BIN(?);', [id])
            return true
        } catch (error) {
            throw new Error('Error deleting the movie')
        }
    }

    static async update ({ id, input }) {
        const {
            title,
            year,
            director,
            duration,
            poster,
            rate
        } = input
        try {
            await connection.query(`UPDATE movies 
                SET 
                title = COALESCE(?, title), 
                year = COALESCE(?, year), 
                director = COALESCE(?, director), 
                duration = COALESCE(?, duration), 
                poster = COALESCE(?, poster), 
                rate = COALESCE(?, rate)
                WHERE id = 
                UUID_TO_BIN(?)
                ;`, [title, year, director, duration, poster, rate, id])
            const updatedMovie = await connection.query('SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movies WHERE BIN_TO_UUID(id) =?;', [id])
            return updatedMovie[0]
        } catch (error) {
            console.log(error)
            throw new Error('Error updating the movie')
        }
    }
}
