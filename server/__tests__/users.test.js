const request = require("supertest");
const operations = require("../Sql/dummy_dboperations/userOperation");
const User = require("../../react/src/classes/user");

describe("POST /users", () => {
    test("Check if user can signup", () => {
        const newUser = new User({
            username: "checkUser",
            password: "check123",
            email: "check123@gmail.com"
        });
        const isAdded = operations.signupOperation(newUser);
        expect(isAdded).toBe(true);
    })

    test("Check if user is able to login", () => {
        const loginUser = { username: "liel123", password: "liel123" }
        const check = operations.signinOperation(loginUser);
        expect(check).toBe(true);
    });

    test("Check if user is editable", () => {
        const editedUser = { username: "newUsername", password: "newPasword", email: "newemail@gmail.com" }
        const check = operations.editUserOperation(editedUser);
        expect(check).toBe(true);
    });

    test("Check if user can reset his forgotten password", () => {
        const email = "lielarie123@me.com";
        const check = operations.forgotpasswordOperation(email);
        expect(check).toBe(true);
    });

    test("Check if user can get all personal info", () => {
        const check = operations.getPersonalInfoOperation(1);
        expect(check).toBe(!null);
    });

    test("Check if we can suit the string to sql", () => {
        const newUser = new User({
            firstname: "Liel",
            lastname: "Arie",
            address: "Kadima",
            place_of_work: "Tel-Aviv"
        })
        const check = operations.turnUserStringSuitableForSql(newUser);
        expect(check).toBe(!null);
    });
});