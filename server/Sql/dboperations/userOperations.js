const config = require("../dbconfig");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
var randomstring = require("randomstring");
const { OAuth2Client } = require("google-auth-library");
const { turnStringSuitableForSql } = require("../../utils/sqlFormating");
const CLIENT_ID =
  "930253588119-dsir0h8j06nq0t2dc3avmm0i11n0adq6.apps.googleusercontent.com"; // change to .env
const client = new OAuth2Client(CLIENT_ID);

async function comparePasswords(password, bcryptPassword) {
  return await bcrypt.compare(password, bcryptPassword);
}

async function signinOperation(user) {
  try {
    let pool = await sql.connect(config);
    let userRes = await pool
      .request()
      .query(`SELECT * from Users where Username = '${user.username}'`);
    if (userRes && userRes.recordset[0]) {
      let password = userRes.recordset[0].Password;
      const isPasswordMatching = await comparePasswords(
        user.password,
        password
      );
      return {
        isSignedIn: isPasswordMatching,
        user: userRes.recordset[0],
      };
    }
    return false;
  } catch (error) {
    console.log(error);
    return {
      isSignedIn: isPasswordMatching,
      user: null,
    };
  }
}

async function signupOperation(user) {
  try {
    let pool = await sql.connect(config);

    let passwords = await pool.request().query(`SELECT Password from Users`);

    // check that password is not taken
    if (passwords && passwords.recordset.length > 0) {
      let password = "";
      for (let index = 0; index < passwords.recordset.length; index++) {
        password = passwords.recordset[index].Password;

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

async function editUserOperation(user) {
  try {
    let pool = await sql.connect(config);

    user = turnUserStringSuitableForSql(user);

    await pool.request().query(
      `update Users set Firstname = ${user.firstname}, Lastname = ${user.lastname}, Age = ${user.age},
        Address = ${user.address}, Place_Of_Work = ${user.place_of_work} where User_Id = ${user.User_Id}`
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

async function getUserByEmailOperation(email) {
  try {
    let pool = await sql.connect(config);
    let userRes = await pool
      .request()
      .query(`SELECT * from Users where Email = '${email}'`);

    userRes = userRes.recordset[0];
    return {
      isSignedIn: true,
      user: userRes,
    };
  } catch (error) {
    console.log(error);
    return {
      isSignedIn: isPasswordMatching,
      user: null,
    };
  }
}

async function emailLoginOperation(email) {
  try {
    let pool = await sql.connect(config);
    let userRes = await pool
      .request()
      .query(`SELECT * from Users where Email = '${email}'`);
    userRes = userRes.recordset[0];
    if (userRes.User_Id) {
      return { isSuccess: true };
    }

    return { isSuccess: false };
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
}

let tran = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fakelookf@gmail.com", // generated ethereal user //change to .env
    pass: "Eli123456", // generated ethereal password // chamge to .env
  },
});

async function changePasswordOperation(key, newPass, email) {
  try {
    console.log(key, newPass, email);
    let pool = await sql.connect(config);
    const userRes = await pool
      .request()
      .query(`SELECT * from Users where Email = '${email}'`);
    console.log("user info: ", userRes);

    const isKeyCorret = comparePasswords(key, userRes.Password);
    if (!isKeyCorret) {
      return { isSuccess: false };
    }
    const chosenPassword = newPass && newPass.length >= 4 ? newPass : key;
    console.log("chosen password: ", chosenPassword);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(chosenPassword, salt);

    upadteSqlPassword(hashedPassword, email);

    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
}

async function forgotpasswordOperation(email) {
  try {
    let pool = await sql.connect(config);
    const userRes = await pool
      .request()
      .query(`SELECT * from Users where Email = '${email}'`);
    const user = userRes.recordset[0];
    if (!user) {
      return { isSuccess: false };
    }

    const key = await randomstring.generate(7);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(key, salt);

    await upadteSqlPassword(hashedPassword, email);

    let mailDetails = {
      from: "fakelookf@gmail.com>",
      to: email,
      subject: "Forgot password for FakeLook",
      text: `key for get reset password ${key}`,
    };
    let isSuccess = "hello";
    tran.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.log(err);
        isSuccess = false;
      } else {
        console.log("Email sent successfully");
        db.write();
        isSuccess = true;
      }
    });
    return isSuccess;
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
}

async function upadteSqlPassword(newPassword, email) {
  console.log(newPassword);
  console.log(email);
  try {
    let pool = await sql.connect(config);

    await pool
      .request()
      .query(
        `update Users set Password = '${newPassword}' where Email = '${email}'`
      );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// needed for using google web token
// async function verify(token) {
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
//   });
//   const payload = ticket.getPayload();
//   const userid = payload["sub"];
// }

async function getPersonalInfoOperation(user_id) {
  try {
    let pool = await sql.connect(config);

    let userRes = await pool
      .request()
      .query(`SELECT * from Users where User_Id = '${user_id}'`);
    userRes = userRes.recordset[0];
    if (userRes) {
      const userInfo = {
        Id: userRes.User_Id,
        Firstname: userRes.Firstname,
        Lastname: userRes.Lastname,
        Age: userRes.Age,
        Address: userRes.Address,
        Place_Of_Work: userRes.Place_Of_Work,
      };
      return { userInfo: userInfo };
    }
    return { userInfo: null };
  } catch (error) {
    console.log(error);
    return { userInfo: null };
  }
}

async function getInfoForSearchDisplayOperations(userIdes) {
  try {
    let pool = await sql.connect(config);
    const userIdesForSql = userIdesToSqlUserIdes(userIdes);
    if (userIdesForSql === "") {
      return null;
    }
    let information = "";
    console.log("find this");
    console.log(userIdes[0]);
    console.log(userIdes.length);
    if (userIdes?.length > 1) {
      information = await pool
        .request()
        .query(
          `SELECT Firstname, Lastname, User_Id from Users WHERE User_Id In (${userIdesForSql})`
        );
    } else {
      information = await pool
        .request()
        .query(
          `SELECT Firstname, Lastname, User_Id from Users WHERE User_Id = ${userIdes[0]}`
        );
    }
    return information.recordset;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function userIdesToSqlUserIdes(userIdes) {
  let userIdesRes = "";
  for (let index = 0; index < userIdes.length; index++) {
    if (index < userIdes.length - 1) {
      userIdesRes += userIdes[index] + ", ";
    } else {
      userIdesRes += userIdes[index];
    }
  }
  return userIdesRes;
}

async function addFriendsOperation(firstUserId, secondUserId) {
  try {
    const firstUserIdSql = firstUserId.userId;
    console.log("first user id: ", firstUserIdSql);
    console.log("first user id: ", secondUserId);
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        `insert into UsersToFriends (User_Id, Friend_Id) values (${firstUserIdSql}, ${secondUserId})`
      );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  signinOperation,
  signupOperation,
  editUserOperation,
  emailLoginOperation,
  forgotpasswordOperation,
  changePasswordOperation,
  getPersonalInfoOperation,
  getInfoForSearchDisplayOperations,
  addFriendsOperation,
  getUserByEmailOperation,
};
