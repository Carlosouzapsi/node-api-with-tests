// inicio do estado da migration
exports.up = (knex) => {
  return knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.string("name").notNull();
    t.string("mail").notNull().unique();
    t.string("passwd").notNull();
  });
};
// final do estado da migration
exports.down = (knex) => {
  return knex.schema.dropTable("users");
};

// node_modules/.bin/knex migrate:rollback --env test -> cria a tabela de usuários
// node_modules/.bin/knex migrate:rollback --env test -> destroi a tabela de usuários
