const { UserStore } = require("./store");
const { HTTPError } = require("../errors/http-error")
const { hashSync } = require("bcryptjs")

class UserHandlers {
  static async createUser(req) {
    if (await UserStore.getUserByEmail(req.body.email)) {
      throw new HTTPError(400, "Email address is already in use");
    }

    const { firstName, lastName, email, password } = req.body;
    const userCreationParams = { firstName, lastName, email }

    userCreationParams.password = hashSync(password);

    const user = await UserStore.insertUser(userCreationParams);

    return user;
  }
}

module.exports = {
  UserHandlers
}