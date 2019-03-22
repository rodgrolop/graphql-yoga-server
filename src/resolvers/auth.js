import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getUserId } from '../utils'
import config from './../../config'

// import { WrongLoginError } from '../errors/UserMutationError'

const me = async (parent, args, context, info) => {
  const userId = getUserId(context)

  return context.prisma.user({ id: userId }, info)
}

const register = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10)

  const user = await context.prisma.createUser({ ...args, password })

  const token = jwt.sign({ userId: user.id }, config.appSecret)

  return {
    token,
    user
  }
}

const login = async (parent, args, context, info) => {
  let user = await context.prisma.user({ username: args.login })
  if (!user) {
    let user = await context.prisma.user({ email: args.login })
    if (!user) {
      const error = { userError: 'userError' }
      throw error
    }
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

export { me, register, login }
