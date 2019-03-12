import jwt from 'jsonwebtoken'
import config from './../config'

const getUserId = context => {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, config.appSecret)
    return userId
  }

  throw new Error('Not authenticated')
}

export { getUserId }
