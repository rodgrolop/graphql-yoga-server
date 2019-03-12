import { me } from './auth'

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
    .linksConnection({
      where
    })
    .aggregate()
    .count()
  return {
    posts,
    count
  }
}

export { me, feed }
