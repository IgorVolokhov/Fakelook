const bcrypt = require("bcrypt");

// TODO come back to -1

async function comparePasswords(password, bcryptPassword) {
  return await bcrypt.compare(password, bcryptPassword);
}

async function addUserDb(db, username, password, email) {
  const users = db.get("users").value();

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

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    users.push({ username: username, password: hashedPassword, email: email });
  } catch {
    console.log("error");
    return -1;
  }
  db.write();

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
};
