// Firebase Related Imports
const functions = require("firebase-functions");

// Express Related Imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthenticationMiddleware = require("./src/utilities/authMiddleware");

// Swagger Related Imports
const swaggerUi = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");

const file = fs.readFileSync("./swagger_config.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

// Router
const router = require("./src/routes/router");

const app = express();

// Middleware Stack
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(AuthenticationMiddleware.decodeToken);

app.use(router);

app.use(["/"], swaggerUi.serve, swaggerUi.setup(swaggerDocument));

exports.api = functions.https.onRequest(app);
