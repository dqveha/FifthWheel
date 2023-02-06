const request = require("supertest");
const { app } = require("../../src/index");

let server;

beforeEach(() => {
  server = app.listen(1979);
});

afterEach(() => {
  server.close();
});

const correctUserLogin = {
  userId: "1542ab-784f-ee44-954afc9c",
  name: "Jake From Statefarm",
  username: "khakis4me",
  password: "i_secretly*like%geico",
  dealershipId: "454875421",
};
const incorrectUserLogin = {
  username: "BostonCarkeys",
  password: "i_secretly*like%geico",
};
const incorrectUserPassword = {
  username: "khakis4me",
  password: "i_secretly*like%teflon",
};

describe("Authentication - GET /api/middleware/authentication", () => {
  it("tests endpoint and should return 'Access Denied' if username does not exist", async () => {
    const response = await request(app).get("/api/middleware/authentication");
    expect(response.body.message).toEqual("Access Denied");
  });

  it("tests endpoint and should return 'Access Denied' if the username is mispelled", async () => {
    const response = await request(app)
      .get("/api/middleware/authentication")
      .send(incorrectUserLogin);
    expect(response.body.message).toEqual("Access Denied");
  });

  it("tests endpoint and should return 'Access Denied' if the password is incorrect", async () => {
    const response = await request(app)
      .get("/api/middleware/authentication")
      .send(incorrectUserPassword);
    expect(response.body.message).toEqual("Access Denied");
  });

  it("tests endpoint and should return 'Authenticated' if the username/password is correct", async () => {
    const response = await request(app)
      .get("/api/middleware/authentication")
      .send(correctUserLogin);
    expect(response.body.message).toEqual("Authenticated");
  });
});
