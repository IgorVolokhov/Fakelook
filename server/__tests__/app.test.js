const request = require("supertest");
const app = require("../app.js");

describe("POST /users", () => {
  describe("sign up a new user", () => {
    test("should respond with a 200 status code", () => {
      const response =  request(app).post("/users/signup").send({
        username: "user1234",
        password: "pass123",
        email: "emaillll@email.com",
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("user login", () => {
    test("should respond with a 200 status code", () => {
      const response = request(app).post("/users/login").send({
        username: "user1234",
        password: "pass123",
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("user google login", () => {
    test("should respond with a 200 status code", () => {
      const response = request(app).post("/users/googlelogin").send({
        username: "lielarie123@gmail.com",
        password: "pass1234",
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("forgot password", () => {
    test("should respond with a 200 status code", () => {
      const response = request(app).post("/users/forgot").send({
        email: "lielarie123@gmail.com",
      });
      expect(response.statusCode).toBe(200);
    });
  });
});