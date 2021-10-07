const { postgres } = require("../db");

async function resetDatabase() {
  await postgres.client.query(`ALTER TABLE "authentication-tokens" DROP CONSTRAINT "foreign-key-userid-authentication-token"`)
  await postgres.client.query(`TRUNCATE TABLE "authentication-tokens"`)
  await postgres.client.query("TRUNCATE TABLE users")
  await postgres.client.query(`ALTER TABLE "authentication-tokens" ADD CONSTRAINT "foreign-key-userid-authentication-token" FOREIGN KEY ("userId") REFERENCES users(id)`)
}

module.exports = {
  resetDatabase
}