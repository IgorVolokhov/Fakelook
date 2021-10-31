export function uniqueId() {
  var idStrLen = 32;
  var idStr = (Math.floor(Math.random() * 25) + 10).toString(36) + "_";
  idStr += new Date().getTime().toString(36) + "_";
  do {
    idStr += Math.floor(Math.random() * 35).toString(36);
  } while (idStr.length < idStrLen);

  return idStr;
}
