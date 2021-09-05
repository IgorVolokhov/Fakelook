function addUserDb(db, username, password, email) {
  const users = db.get("users").value();

  if (
    users.find(
      (user) =>
        user.password === password ||
        user.username === username ||
        user.email === email
    )
  )
    return false;

  users.push({ username: username, password: password, email: email });

  db.write();

  return true;
}

function checkIfUserExistsDb(db, username, password) {
  const users = db.get("users").value();

  const doesExist = users.find(
    (user) => user.username === username && user.password === password
  );

  return doesExist ? true : false;
}

module.exports = {
  addUserDb,
  checkIfUserExistsDb,
};
