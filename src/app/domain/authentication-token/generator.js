const uuid = require("uuid")
const { AuthenticationTokenStore } = require("./store")

function createAuthenticationToken(userId) {
  const token = uuid.v4();

  return AuthenticationTokenStore.insertToken({userId, token})
}

module.exports = {
  createAuthenticationToken
}