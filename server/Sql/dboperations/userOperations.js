const config = require("../dbconfig");
const sql = require("mssql");
const bcrypt = require("bcrypt");

async function comparePasswords(password, bcryptPassword) {
  return await bcrypt.compare(password, bcryptPassword);
}

async function userLoginDb(user) {
  try {
    let pool = await sql.connect(config);
    let userRes = await pool
      .request()
      .query(`SELECT * from Users where Username = '${user.username}'`);
    if (userRes && userRes.recordset[0]) {
      console.log("in compare");
      let password = userRes.recordset[0].Password;

      // cut long ' ' from password
      while (password[password.length - 1] === " ") {
        password = password.slice(0, password.length - 1);
      }
      console.log(`${password}hehe`);
      console.log(user.password);
      return await comparePasswords(user.password, password);
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

async function addUserDb(user) {
  console.log("user to add: ");
  console.log(user);
  try {
    let pool = await sql.connect(config);

    let passwords = await pool.request().query(`SELECT Password from Users`);

    // check that password is not taken
    if (passwords && passwords.recordset.length > 0) {
      let password = "";
      for (let index = 0; index < passwords.recordset.length; index++) {
        password = passwords.recordset[index].Password;

        // cut long ' ' from password
        while (password[password.length - 1] === " ") {
          password = password.slice(0, password.length - 1);
        }

        if (await comparePasswords(user.password, password)) {
          return false;
        }
      }
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    await pool.request().query(
      `insert into Users (Username, Password, FirstName, Lastname, Age, Address, Place_Of_Work, Email) 
              values ('${
                user.username
              }', '${hashedPassword}', ${null}, ${null}, ${null}, ${null}, ${null}, '${
        user.email
      }')`
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function editUserDb(user) {
  try {
    let pool = await sql.connect(config);

    user = turnUserStringSuitableForSql(user);

    await pool.request().query(
      `update Users set Firstname = ${user.firstname}, Lastname = ${user.lastname}, Age = ${user.age}, 
        Address = ${user.address}, Place_Of_Work = ${user.place_of_work} where User_Id = ${user.user_id}`
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function turnUserStringSuitableForSql(user) {
  if (user.firstname !== null) {
    user.firstname = `'${user.firstname}'`;
  }
  if (user.lastname !== null) {
    user.lastname = `'${user.lastname}'`;
  }
  if (user.address !== null) {
    user.address = `'${user.address}'`;
  }
  if (user.place_of_work !== null) {
    user.place_of_work = `'${user.place_of_work}'`;
  }
  return user;
}

module.exports = {
  userLoginDb,
  addUserDb,
  editUserDb,
};
