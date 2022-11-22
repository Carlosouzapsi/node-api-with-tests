/*
Middlewares - Funções que são executadas ao longo do processamento
das requisições.
- bodyparser é um exemplo de middleware!
*/
const bodyParser = require("body-parser");

module.exports = (app) => {
  // atuação do middleware
  app.use(bodyParser.json());
};
