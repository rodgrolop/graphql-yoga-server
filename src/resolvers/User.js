const posts = (parent, args, context) =>
  context.prisma.user({ id: parent.id }).posts()

export { posts }
