function generateUser(overrides) {
  return {
    firstName: "john",
    lastName: "doe",
    email: "john.doe@test.com",
    password: "Password123!",
    ...overrides
  }
}

module.exports = {
  generateUser
}