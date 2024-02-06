const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Communiti API - By MergeIntegration @makeitMVP ©",
    description: `Fully serverless REST api managing the backend for Communiti, SuperGroup, Coffee Chat, and MergeIntegration teams. 
    The Objective of this API is to provide a Centralized solution for the Software Solutions within the makeitMVP ecosystem. `,
  },
  host: "127.0.0.1:5001/communiti-630fc/us-central1/api",
};

const outputFile = "./swagger_output.json";
const routes = ["./src/routes/router.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
