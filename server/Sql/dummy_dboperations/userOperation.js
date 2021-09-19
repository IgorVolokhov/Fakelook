const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const bcrypt = require("bcrypt");
const { uniqueId } = require("../../utils/uniqueId");

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
      return await comparePasswords(user.password, password);
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
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
};
