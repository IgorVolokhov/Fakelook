function formatMessage(user, message) {
    let currentDate = new Date();
    let time =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();
    return {
      user,
      message,
      time: time,
    };
  }
  
  module.exports = formatMessage;
  