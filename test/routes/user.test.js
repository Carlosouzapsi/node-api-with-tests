const request = require("supertest");
const app = require("../../src/app");
const mail = `${Date.now()}@email.com`;
test("Deve listar todos os usuários", () => {
  return request(app)
    .get("/users")
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test("Deve inserir o usuário com sucesso", () => {
  return request(app)
    .post("/users")
    .send({ name: "Walter Mitty", mail: mail, passwd: "123456" })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Walter Mitty");
    });
});

// tratando requisição assincrona com o retur e o .then()
test("Não deve inserir usuário sem nome", () => {
  return request(app)
    .post("/users")
    .send({ mail: "walter@mail.com", passwd: "123456" })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Nome é um atributo obrigatório");
    });
});

// tratando a requisição para ser assincrona com async e await
test("Não deve inserir usuário sem email", async () => {
  const result = await request(app)
    .post("/users")
    .send({ name: "Walter Mitty", passwd: "123456" });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe("Email é um atributo obrigatório");
});

// tratando a requisição para ser assincrona usando o done teste so finaliza
// quando o metodo /parametro for executado
test("Não deve inserir usuário sem senha", (done) => {
  request(app)
    .post("/users")
    .send({ name: "Walter Mitty", mail: "walter@mail.com" })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Senha é um atributo obrigatório");
      done(); // quando tudo está resolvido o done é chamado
    })
    .catch((err) => done.fail(err)); // caso algo falhe no processo async
});

test("Não deve inserir usuário com email existente", () => {
  return request(app)
    .post("/users")
    .send({ name: "Walter Mitty", mail: mail, passwd: "123456" })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Já existe um usuário com este email");
    });
});
