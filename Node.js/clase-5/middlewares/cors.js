/* eslint-disable indent */
import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'https://api.example.com',
    'https://api.another-example.com' // add more origins as needed
]

export const corsMiddleware = () => cors({
    origin: (origin, callbacks) => {
        if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
            callbacks(null, true)
        } else {
            callbacks(new Error('Origen no permitido'))
        }
    }

})
