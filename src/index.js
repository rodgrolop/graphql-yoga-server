import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => context.prisma.links()
  },
  Mutation: {
    post: (root, args, context) =>
      context.prisma.createLink({
        url: args.url,
        description: args.description
      })
  }
}
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({ ...request, prisma })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
