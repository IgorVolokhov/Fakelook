const bcrypt = require("bcrypt");
const { uniqueId } = require("../utils/uniqueId");
const jsonFileName = "./Data/Users.json";
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// TODO come back to -1
// TODO change so you recieve already bcrypted password and work with it

class LoginRepository {
  async comparePasswords(password, bcryptPassword) {
    return await bcrypt.compare(password, bcryptPassword);
  }

  async userLogin(user) {
    const data = await JSON.parse(await readFile(jsonFileName));
    const foundUser = data.find(
      (x) =>
        x.username === user.username &&
        this.comparePasswords(user.password, x.password)
    );
    return foundUser;
  }

  async removeUserDB(userId) {
    let data = await JSON.parse(await readFile(jsonFileName));
    try {
      data = data.filter((x) => x.id !== userId);
      await writeFile(jsonFileName, JSON.stringify(data));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addUserDb(user) {
    let data = JSON.parse(await readFile(jsonFileName));
    for (let i = 0; i < data.length; i++) {
      if (data[i].username === user.username || data[i].email === user.email)
        return false;
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      data.push({
        id: uniqueId(),
        username: user.username,
        password: hashedPassword,
        email: user.email,
      });
      await writeFile(jsonFileName, JSON.stringify(data));
    } catch {
      console.log("error");
      return -1;
    }
    return true;
  }
}

module.exports = new LoginRepository();
