import DBLocal from 'db-local'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../config.js'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserModel {
  static async create({ username, email, password }) {
    const user = User.findOne({ username })

    if (user) return { error: 'Username already exists' };

    const id = crypto.randomUUID()

    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      email,
      password: hashedPass
    }).save()

    return id
  }

  static async login({ username, password }) {
    const user = User.findOne({ username })
    if (!user) return { error: 'User not found' };

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return { error: 'Invalid password' };

    const { password: _, ...publicUser } = user

    return {
      username: publicUser.username,
      email: publicUser.email
    }
  }
}
