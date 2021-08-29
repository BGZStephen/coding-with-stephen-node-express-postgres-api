/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("users", {
    id: "id",
    firstName: { type: "varchar(100)", notNull: true },
    lastName: { type: "varchar(100)" },
    email: { type: "varchar(100)", notNull: true },
    password: { type: "varchar(100)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  })
  pgm.addConstraint("users", "unique-email", {
    unique: ["email"]
  })
};

exports.down = pgm => {
  pgm.dropConstraint("users", "unique-email")
  pgm.dropTable("users")
};
