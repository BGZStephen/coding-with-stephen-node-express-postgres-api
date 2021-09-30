const { postgres } = require("../db");

async function resetDatabase() {
  await postgres.client.query("TRUNCATE TABLE users")
}

module.exports = {
  resetDatabase
}