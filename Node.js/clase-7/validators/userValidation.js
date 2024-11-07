import z from 'zod'

const UserSchema = z.object({
  username: z.string().min(3, {
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string',
    min_error: 'Username must be at least 3 characters long'
  }),
  email: z.string().email(),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  }).min(8, {
    required_error: 'Password must be at least 8 characters long'
  })
})

export const validateUser = (user) => {
  return UserSchema.safeParse(user)
}
