/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.integer("user_id").notNullable();

    table.foreign("user_id").references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
