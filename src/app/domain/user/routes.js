const { Router } = require("express");
const { validateThrow } = require("../utils/validation");
const { userCreationBodyConstraint } = require("./validation-constraints");
const { UserHandlers } = require("./handlers");
const { asyncwrap } = require("../utils/async-wrap");
const { redactUser } = require("./redactor");

class UserRouter {
  router = undefined

  constructor() {
    this.router = Router()

    this.router.post("/users", asyncwrap(this.createUser))
  }

  get() {
    return this.router;
  }

  async createUser(req, res) {
    validateThrow(req.body, userCreationBodyConstraint)

    const {user, token} = await UserHandlers.createUser(req);

    res.json({user: redactUser(user), token})
  }
}

module.exports = {
  userRouter: new UserRouter().get(),
  UserRouter
}