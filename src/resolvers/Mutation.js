import { register, login } from './auth'
import { getUserId } from '../utils'

const profile = async (parent, args, context, info) => {
  const userId = getUserId(context)
  return context.prisma.createProfile({
    firstName: args.firstName,
    lastName: args.lastName,
    user: { connect: { id: userId } }
  })
}

const post = (parent, args, context, info) => {
  const userId = getUserId(context)
  return context.prisma.createPost({
    url: args.url,
    description: args.description,
    user: { connect: { id: userId } }
  })
}
// const vote = async (parent, args, context, info) => {
//   const userId = getUserId(context)

//   const linkExists = await context.prisma.$exists.vote({
//     user: { id: userId },
//     link: { id: args.linkId }
//   })

//   if (linkExists) {
//     throw new Error(`Already voted for link: ${args.linkId}`)
//   }

//   return context.prisma.createVote({
//     user: { connect: { id: userId } },
//     link: { connect: { id: args.linkId } }
//   })
// }

export { register, login, profile, post }
