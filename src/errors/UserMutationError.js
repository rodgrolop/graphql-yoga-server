import { GraphQLError } from 'graphql'

const WrongLoginError = new GraphQLError('WrongLoginError', {
  message: 'blark'
})
export default WrongLoginError
