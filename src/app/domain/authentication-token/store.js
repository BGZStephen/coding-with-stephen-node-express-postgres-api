const { postgres } = require("../db")

class AuthenticationTokenStore {
  static async insertToken(authenticationTokenParams) {
    const { userId, token } = authenticationTokenParams;

    const tokenQuery = await postgres.client.query('INSERT INTO "authentication-tokens"("userId", token) VALUES($1, $2) ON CONFLICT ON CONSTRAINT "authentication-tokens_userId_key" DO UPDATE SET token = $2 RETURNING *', [userId, token])

    return tokenQuery.rows[0]
  }

  static async getToken(token) {
    const tokenQuery = await postgres.client.query('SELECT * FROM "authentication-tokens" WHERE token = $1', [token])

    return tokenQuery.rows[0]
  }

  static async deleteTokenForUser(userId) {
    const tokenQuery = await postgres.client.query('DELETE FROM "authentication-tokens" WHERE "userId" = $1', [userId])

    return tokenQuery.rows[0]
  }
}

module.exports = {
  AuthenticationTokenStore
}