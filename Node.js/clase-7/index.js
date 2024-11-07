import express from 'express'
import { PORT } from './config.js'
import { createUserRouter } from './routes/UserRoutes.js'
import cookieParser from 'cookie-parser'
import { getCookieToken } from './middlewares/cookiesMiddleware.js'

export const createApp = ({ userModel }) => {
  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.use(getCookieToken)
  app.set('view engine', 'ejs')
  app.use('', createUserRouter({ userModel }))

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
  })
}

