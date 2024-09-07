require("dotenv").config();
console.log(`${process.env.NODE_ENV} is Running`);

let environment;
if (process.env.NODE_ENV === "production") {
  environment = require("./production.js");
} else if (process.env.NODE_ENV === "staging") {
  environment = require("./staging.js");
} else {
  environment = require("./development.js");
}

module.exports = environment;
