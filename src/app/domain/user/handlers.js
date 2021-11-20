const { UserStore } = require("./store");
const { HTTPError } = require("../errors/http-error")
const { hashSync, compareSync } = require("bcryptjs")
const { createAuthenticationToken } = require("../authentication-token/generator")

class UserHandlers {
  static async createUser(req) {
    if (await UserStore.getUserByEmail(req.body.email)) {
      throw new HTTPError(400, "Email address is already in use");
    }

    const { firstName, lastName, email, password } = req.body;
    const userCreationParams = { firstName, lastName, email }

    userCreationParams.password = hashSync(password);

    const user = await UserStore.insertUser(userCreationParams);

    const tokenDbResponse = await createAuthenticationToken(user.id)

    return {user, token: tokenDbResponse.token};
  }

  static async authenticateUser(req) {
    const user = await UserStore.getUserByEmail(req.body.email)

    if (!user) {
      throw new HTTPError(400, "Invalid email address or password")
    }

    if (!compareSync(req.body.password, user.password)) {
      throw new HTTPError(400, "Invalid email address or password")
    }

    const authenticationToken = await createAuthenticationToken(user.id)

    return { token: authenticationToken.token, user }
  }
}

module.exports = {
  UserHandlers
}