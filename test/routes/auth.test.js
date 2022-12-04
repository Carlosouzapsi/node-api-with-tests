const request = require("supertest");
const app = require("../../src/app");

test("Deve receber token ao logar", () => {
  const mail = `${Date.now()}@mail.com`;
  return app.services.user
    .save({
      name: "Walter",
      mail: mail,
      passwd: "123456",
    })
    .then(() =>
      request(app).post("/auth/signin").send({ mail, passwd: "123456" })
    )
    .then((res) => {
      expect(res.status).toBe(200);
      console.log(res.body);
      expect(res.body).toHaveProperty("token");
    });
});

test("Não deve autenticar usuário com senha errada", () => {
  const mail = `${Date.now()}@mail.com`;
  return app.services.user
    .save({
      name: "Walter",
      mail: mail,
      passwd: "123456",
    })
    .then(() =>
      request(app).post("/auth/signin").send({ mail, passwd: "654321" })
    )
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Usuário ou senha inválido");
    });
});

test("Não deve autenticar usuário com senha errada", () => {
  return request(app)
    .post("/auth/signin")
    .send({ mail: "naoExiste@mail.com", passwd: "654321" })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Usuário ou senha inválido");
    });
});