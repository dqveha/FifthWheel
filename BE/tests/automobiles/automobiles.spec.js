const request = require("supertest");
const { app } = require("../../src/index");

let server;

beforeEach(() => {
  server = app.listen(1979);
});

afterEach(() => {
  server.close();
});

describe("Automobiles (Search) - POST /api/automobiles/search", () => {
  it("tests endpoint with no details in the body and should return an array of objects with a length of 2472", async () => {
    const response = await request(app)
      .post("/api/automobiles/search")
      .send({
        username: "sun_tomorrow",
        password: "yummy*&browser)(cookies",
        dealershipId: "78945412",
        data: {
          details: {},
        },
      });
    expect(response.body.length).toBe(2472);
    expect(response.status).toBe(200);
  });

  it("tests endpoint and should return 18 sample objects in an array that has 'green' and 'heavily_used' values", async () => {
    const response = await request(app)
      .post("/api/automobiles/search")
      .send({
        username: "khakis4me",
        password: "i_secretly*like%geico",
        dealershipId: "454875421",
        data: {
          details: {
            condition: "heavily",
            color: "green",
          },
        },
      });
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: "green", condition: "heavily_used" }),
      ])
    );
    expect(response.body.length).toBe(18);
    expect(response.status).toBe(200);
  });

  it("tests endpoint and should return 2 sample objects in an array that has 'green' and 'heavily_used' values after limiting the price point to be 2000", async () => {
    const response = await request(app)
      .post("/api/automobiles/search")
      .send({
        username: "khakis4me",
        password: "i_secretly*like%geico",
        dealershipId: "454875421",
        data: {
          details: {
            condition: "heavily",
            color: "green",
          },
          priceType: "msrp",
          highestPricePoint: 2000,
        },
      });
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: "green", condition: "heavily_used" }),
      ])
    );
    expect(response.body.length).toBe(2);
    expect(response.status).toBe(200);
  });

  it("tests endpoint and should return 17 sample objects in an array that has 'green' and 'heavily_used' values with the lowest price at 1000", async () => {
    const response = await request(app)
      .post("/api/automobiles/search")
      .send({
        username: "khakis4me",
        password: "i_secretly*like%geico",
        dealershipId: "454875421",
        data: {
          details: {
            condition: "heavily",
            color: "green",
          },
          priceType: "msrp",
          lowestPricePoint: 1000,
        },
      });
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: "green", condition: "heavily_used" }),
      ])
    );
    expect(response.body.length).toBe(17);
    expect(response.status).toBe(200);
  });

  it("tests endpoint and should return 1 sample objects in an array that has 'green' and 'heavily_used' values with the lowest price at 1000 and highest price at 2000", async () => {
    const response = await request(app)
      .post("/api/automobiles/search")
      .send({
        username: "khakis4me",
        password: "i_secretly*like%geico",
        dealershipId: "454875421",
        data: {
          details: {
            condition: "heavily",
            color: "green",
          },
          priceType: "msrp",
          lowestPricePoint: 1000,
          highestPricePoint: 2000,
        },
      });
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: "green", condition: "heavily_used" }),
      ])
    );
    expect(response.body.length).toBe(1);
    expect(response.status).toBe(200);
  });
});

describe("Automobiles (Update) - PUT /api/automobiles/automobile", () => {
  it("tests endpoint and should deny ability to update new information because of different dealershipId", async () => {
    const response = await request(app)
      .put("/api/automobiles/automobile")
      .send({
        username: "khakis4me",
        password: "i_secretly*like%geico",
        dealershipId: "454875421",
        data: {
          details: {
            id: "0d7c1919-40ab-47d0-8239-830542519d25",
            dealershipId: "62497531",
            dealershipName: "Hunkajunk Auto Sales",
          },
        },
      });
    expect(response.body).toBe("Access Denied");
    expect(response.status).toBe(401);
  });

  it("tests endpoint and should update specified automobile then return with its new information", async () => {
    const response = await request(app)
      .put("/api/automobiles/automobile")
      .send({
        username: "onedoesnotsimply",
        password: "still*&alive",
        dealershipId: "62497531",
        data: {
          details: {
            id: "afaa46f6-0228-491a-8388-20f58b2be34b",
            color: "bleu",
            type: "Nest",
            condition: "heavily",
            msrp: 111,
          },
        },
      });
    expect(response.body).toEqual({
      id: "afaa46f6-0228-491a-8388-20f58b2be34b",
      manufacturer: "Mini",
      model: "Model 3",
      type: "Nest",
      fuel: "Diesel",
      vin: "1RW2UYY5ETWJ32612",
      color: "bleu",
      purchase_price: 91528,
      sale_price: 94525,
      msrp: 111,
      condition: "heavily",
      dealershipId: "62497531",
      dealershipName: "Hunkajunk Auto Sales",
    });
    expect(response.status).toBe(200);
  });

  it("tests endpoint and should not be able to update automobile's id", async () => {
    const response = await request(app)
      .put("/api/automobiles/automobile")
      .send({
        username: "onedoesnotsimply",
        password: "still*&alive",
        dealershipId: "62497531",
        data: {
          details: {
            id: "afaa46f6",
          },
        },
      });
    expect(response.body).not.toEqual({
      id: "afaa46f6",
      manufacturer: "Mini",
      model: "Model 3",
      type: "Nest",
      fuel: "Diesel",
      vin: "1RW2UYY5ETWJ32612",
      color: "bleu",
      purchase_price: 91528,
      sale_price: 94525,
      msrp: 111,
      condition: "heavily",
      dealershipId: "62497531",
      dealershipName: "Hunkajunk Auto Sales",
    });
    expect(response.body).toEqual("Access Denied");
    expect(response.status).toBe(401);
  });
});
