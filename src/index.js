import { GraphQLServer, Options } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import resolvers from './resolvers'

const server = new GraphQLServer({
  typeDefs: './src/schema/combinedSchema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    }
  }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
