import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getUserId } from '../utils'
import config from './../../config'

const me = async (parent, args, context, info) => {
  const userId = getUserId(context)

  return context.prisma.user({ id: userId }, info)
}

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10)

  const user = await context.prisma.createUser({ ...args, password })

  const token = jwt.sign({ userId: user.id }, config.appSecret)

  return {
    token,
    user
  }
}

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, config.appSecret)

  return {
    token,
    user
  }
}

export { me, signup, login }
