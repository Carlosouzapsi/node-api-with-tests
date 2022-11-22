module.exports = {
  test: {
    client: "pg",
    version: "8.8",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "123456",
      database: "barriga",
    },
    migrations: {
      directory: "src/migrations", // fazer e desfazer a criação de tabelas do sistema
    },
  },
};
