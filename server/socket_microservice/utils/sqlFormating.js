function getToDayDate() {
  return new Date().toISOString().slice(0, 10);
}

function dateToYYMMDD(date) {
  return date.toISOString().slice(0, 10);
}

function turnStringSuitableForSql(someString) {
  return someString !== null ? `'${someString}'` : someString;
}

module.exports = {
  getToDayDate,
  turnStringSuitableForSql,
  dateToYYMMDD,
};
