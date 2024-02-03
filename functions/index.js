const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const router = require("./src/routes/router");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(router);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

exports.api = functions.https.onRequest(app);
