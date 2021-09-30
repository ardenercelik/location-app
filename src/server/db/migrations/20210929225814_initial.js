exports.up = async function (knex) {
  await knex.schema.createTable("Location", (table) => {
    table.increments().notNullable();
    table.string("url", 500).notNullable();
    table.string("name", 200).notNullable();
    table.float("latitude", 14, 10).notNullable();
    table.float("longitude", 14, 10).notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("Location");
};
