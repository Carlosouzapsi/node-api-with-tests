const request = require("supertest");

// definindo que a aplicação pode ser usada pelos testes
const app = require("../src/app.js");

test("Deve responder na raiz", () => {
  return request(app)
    .get("/")
    .then((res) => {
      expect(res.status).toBe(200);
    });
});
