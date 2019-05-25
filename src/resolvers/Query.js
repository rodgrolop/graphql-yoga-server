import { getUserId } from '../utils'

const me = async (parent, args, context, info) => {
  const userId = getUserId(context)

  const user = await context.prisma.user({ id: userId }, info)

  if (!user) {
    throw new Error('User not Found')
  }

  return user
}

const myProfile = async (parent, args, context, info) => {
  const userId = getUserId(context)

  return context.prisma.user({ id: userId }, info).profile
}

const myPosts = async (parent, args, context, info) => {
  const userId = getUserId(context)

  const posts = await context.prisma.user({ id: userId }, info).posts
  return posts
}

const feed = async (parent, args, context, info) => {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    : {}

  const posts = await context.prisma.posts({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  })
  const count = await context.prisma
    .postsConnection({
      where
    })
    .aggregate()
    .count()
  return {
    posts,
    count
  }
}

export { me, myProfile, myPosts, feed }
