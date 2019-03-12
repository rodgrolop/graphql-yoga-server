const postedBy = (parent, args, context) =>
  context.prisma.post({ id: parent.id }).postedBy()

// const votes = (parent, args, context) =>
//   context.prisma.link({ id: parent.id }).votes()

export { postedBy }
