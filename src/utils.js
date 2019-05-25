import jwt from 'jsonwebtoken'
import config from './../config'

const getUserId = context => {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, config.appSecret)
    return userId
  }
  if (typeof userId === 'undefined') {
    throw new Error('User ID not found')
  }

  throw new Error('Not authenticated')
}

export { getUserId }
