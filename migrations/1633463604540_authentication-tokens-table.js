/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("authentication-tokens", {
    id: "id",
    token: { type: "varchar(255)", notNull: true },
    userId: { type: "integer", notNull: true, unique: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  })
  pgm.addConstraint(
    "authentication-tokens", 
    "foreign-key-userid-authentication-token", 
    {
      foreignKeys: {
        columns: "userId",
        references: "users(id)"
      }
    }
  )
};

exports.down = pgm => {
  pgm.dropConstraint("authentication-tokens", "foreign-key-userid-authentication-token")
  pgm.dropTable("authentication-tokens")
};
