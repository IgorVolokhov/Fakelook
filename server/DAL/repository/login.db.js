const bcrypt = require("bcrypt");
const { uniqueId } = require("../../utils/uniqueId");

// TODO come back to -1
// TODO change so you recieve already bcrypted password and work with it

async function comparePasswords(password, bcryptPassword) {
  return await bcrypt.compare(password, bcryptPassword);
}

async function removeUserDB(db, email) {
  const users = db.get("users").value();
  try {
    users.fillter((x) => x.email !== email);
    db.write();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addUserDb(db, username, password, email) {
  const users = db.get("users").value();

  const isUserOpen = await checkIfUserIsOpen(users, username, password, email);
  if (!isUserOpen) {
    return false;
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    users.push({
      id: uniqueId(),
      username: username,
      password: hashedPassword,
      email: email,
    });
  } catch {
    console.log("error");
    return -1;
  }
  db.write();

  return true;
}

async function checkIfUserIsOpen(users, username, password, email) {
  let user = "";
  let doesPasswordExist = false;
  for (let i = 0; i < users.length; i++) {
    user = users[i];
    doesPasswordExist = await comparePasswords(password, user.password);
    if (
      doesPasswordExist ||
      user.username === username ||
      user.email === email
    ) {
      return false;
    }
  }
  return true;
}

async function checkIfUserExistsDb(db, username, password) {
  const users = db.get("users").value();

  let doesPasswordExist = false;
  for (let i = 0; i < users.length; i++) {
    user = users[i];
    doesPasswordExist = await comparePasswords(password, user.password);
    if (doesPasswordExist || user.username === username) {
      return true;
    }
  }

  return false;
}

module.exports = {
  addUserDb,
  checkIfUserExistsDb,
  removeUserDB,
};
