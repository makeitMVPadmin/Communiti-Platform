var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.pp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
