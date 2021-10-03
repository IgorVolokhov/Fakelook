const request = require("supertest");
const operations = require("../Sql/dummy_dboperations/userOperation");
const User = require("../../react/src/classes/user");

describe("POST /users", () => {
    test("Check if user can signup", () => {
        const newUser = new User({
            username = "checkUser",
            password = "check123",
            email = "check123@gmail.com"
        });
        const isAdded = operations.signupOperation(newUser);
        expect(isAdded.statusCode).toBe(200);
    })

    test("Check if user is able to login", () => {
        const loginUser = { username: "liel123", password: "liel123" }
        const check = operations.signinOperation(loginUser);
        expect(check).toBe(true);
    });

    
})