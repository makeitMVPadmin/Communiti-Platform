// const test = require("firebase-functions-test")(
//   {
//     databaseURL: "http://127.0.0.1:4000/firestore",
//     storageBucket: "my-project.appspot.com",
//     projectId: "communiti-630fc",
//   },
//   "../config/serviceAccount.json"
// );

const test = require("firebase-functions-test")();

const functions = require("firebase-functions");
const key = functions.config().stripe.key;

test.mockConfig({ stripe: { key: "23wr42ewr34" } });

adminInitStub = sinon.stub(admin, "initializeApp");
// Now we can require index.js and save the exports inside a namespace called myFunctions.

const myFunctions = require("../index.js");
const wrapped = test.wrap(myFunctions.makeUppercase);
