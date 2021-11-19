const { UserStore } = require("./store");
const { HTTPError } = require("../errors/http-error")
const { hashSync } = require("bcryptjs")
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
}

module.exports = {
  UserHandlers
}