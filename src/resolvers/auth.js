import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "./../../config"

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
      throw new Error("User not Found")
    }
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error("Invalid password")
  }

  const token = jwt.sign({ userId: user.id }, config.appSecret)
  return {
    token,
    user
  }
}

export { register, login }
