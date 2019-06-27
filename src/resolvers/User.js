const posts = (parent, args, context) =>
  context.prisma.user({ id: parent.id }).posts()

const profile = (parent, args, context) =>
  context.prisma.user({ id: parent.id }).profile()

export { posts, profile }
