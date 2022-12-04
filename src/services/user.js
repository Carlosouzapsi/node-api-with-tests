const ValidationError = require("../errors/validationError");
const bcrypt = require("bcrypt-nodejs");
module.exports = (app) => {
  const findAll = () => {
    return app.db("users").select(["id", "name", "mail"]);
  };
  const findOne = (filter = {}) => {
    return app.db("users").where(filter).first();
  };

  const getPasswdHash = (passwd) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(passwd, salt);
  };
  const save = async (user) => {
    if (!user.name) throw new ValidationError("Nome é um atributo obrigatório");
    if (!user.mail)
      throw new ValidationError("Email é um atributo obrigatório");
    if (!user.passwd)
      throw new ValidationError("Senha é um atributo obrigatório");

    const userDb = await findOne({ mail: user.mail });
    if (userDb)
      throw new ValidationError("Já existe um usuário com este email");

    const newUser = { ...user }; // não alterar o usuário diretamente, má pratica!
    user.passwd = getPasswdHash(user.passwd);
    return app.db("users").insert(user, ["id", "name", "mail"]);
  };
  return { findAll, save, findOne };
};
