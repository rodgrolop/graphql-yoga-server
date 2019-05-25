const user = (parent, args, context) =>
  context.prisma.post({ id: parent.id }).user()

// const votes = (parent, args, context) =>
//   context.prisma.link({ id: parent.id }).votes()

export { user }
