const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const bcrypt = require("bcrypt");
const { uniqueId } = require("../../utils/uniqueId");
const nodemailer = require("nodemailer");
var randomstring = require("randomstring");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "930253588119-dsir0h8j06nq0t2dc3avmm0i11n0adq6.apps.googleusercontent.com"; // change to .env
const client = new OAuth2Client(CLIENT_ID);

async function comparePasswords(password, bcryptPassword) {
  return await bcrypt.compare(password, bcryptPassword);
}

async function signinOperation(user) {
  try {
    const users = db.get("users").value();
    let userRes = undefined;
    for (let index = 0; index < users.length; index++) {
      if (users[index].Username === user.username) {
        userRes = users[index];
        break;
      }
    }
    if (userRes) {
      let password = userRes.Password;
      return {
        isSignedIn: await comparePasswords(user.password, password),
        user: userRes,
      };
    }
    return { isSignedIn: false, user: null };
  } catch (error) {
    console.log(error);
    return { isSignedIn: false, user: null };
  }
}

async function signupOperation(user) {
  try {
    const users = db.get("users").value();
    let passwords = [];
    for (let index = 0; index < users.length; index++) {
      passwords.push(users[index].Password);
    }
    // check that password is not taken
    if (passwords && passwords.length > 0) {
      let password = "";
      for (let index = 0; index < passwords.length; index++) {
        password = passwords[index];

        if (await comparePasswords(user.password, password)) {
          return false;
        }
      }
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    users.push({
      User_Id: uniqueId(),
      Username: user.username,
      Password: hashedPassword,
      Email: user.email,
      Firstname: null,
      Lastname: null,
      Age: null,
      Address: null,
      Place_Of_Work: null,
    });
    db.write();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function editUserOperation(user) {
  console.log("in edit");
  try {
    const users = db.get("users").value();
    console.log({ users });
    console.log({ user });
    for (let index = 0; index < users.length; index++) {
      if (users[index].User_Id === user.user_id) {
        console.log("should edit: ");
        console.log({ user });
        users[index].Firstname = user.firstname;
        users[index].Lastname = user.lastname;
        users[index].Age = user.age;
        users[index].Address = user.address;
        users[index].Place_Of_Work = user.place_of_work;
        break;
      }
    }
    db.write();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function googleLoginOperation(email, googleId, id_token) {
  try {
    const users = db.get("users").value();

    for (let i = 0; i < users.length; i++) {
      if (users[i].Email === email) {
        // verify(id_token)
        //   .then(() => {
        //     return { isSuccess: true, token: id_token };
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     return { isSuccess: false };
        //   });
        users[i].id_token = id_token;
        db.write();
        return { isSuccess: true, token: id_token };
      }
    }

    return { isSuccess: false };
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
}

//fakelookf@gmail.com
//Eli123456

let tran = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fakelookf@gmail.com", // generated ethereal user //change to .env
    pass: "Eli123456", // generated ethereal password // chamge to .env
  },
});

async function changePasswordOperation(key, newPass, email) {
  console.log(key, newPass, email);
  const users = db.get("users").value();
  console.log("go there");
  let checkifExist = false;
  for (let i = 0; i < users.length; i++) {
    if (
      (users[i].Email === email && users[i].Password === key) ||
      (comparePasswords(key, users[i].Password).then(
        (res) => (checkifExist = res)
      ) &&
        users[i].Email === email)
    ) {
      //need to check if password already crypt
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPass, salt);
      console.log(newPass);
      console.log("find user");
      users[i].Password = hashedPassword;
      db.write();
    }
  }
}
async function forgotpasswordOperation(email) {
  const users = db.get("users").value();
  for (let index = 0; index < users.length; index++) {
    if (users[index].Email === email) {
      console.log("find email");
      const key = randomstring.generate(7);
      //key cannot be the same in db should be uniqe
      console.log(key);
      users[index].Password = key;
      let mailDetails = {
        from: "fakelookf@gmail.com>",
        to: email,
        subject: "Forgot password for FakeLook",
        text: `key for get reset password ${key}`,
      };
      let isSuccess = "hello";
      tran.sendMail(mailDetails, (err, data) => {
        if (err) {
          console.log("Error Occurs");
          console.log(err);
          isSuccess = false;
        } else {
          console.log("Email sent successfully");
          db.write();
          isSuccess = true;
        }
      });
      return isSuccess;
    }
  }
}

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
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
  signinOperation,
  signupOperation,
  editUserOperation,
  googleLoginOperation,
  forgotpasswordOperation,
  changePasswordOperation,
};
