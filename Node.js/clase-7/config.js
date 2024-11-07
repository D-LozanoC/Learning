process.loadEnvFile()

export const {
  PORT = 3000,
  SALT_ROUNDS = 10,
  SECRET_JWT_KEY,
  NODE_ENV
} = process.env
