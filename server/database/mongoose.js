const mongoose = require("mongoose");

const config = require("../config/config");

const userManagementDB = connection(
  config.DB_URL,
  parseInt(config.ADMINS_DB_POOLSIZE),
  "userProfileManagement"
);

function connection(DB_URL, maxPoolSize = 10, DB) {
  try {
    const conn = mongoose.createConnection(DB_URL);
    conn.on("connected", () => console.log(`Connected to ${DB} database...`));
    return conn;
  } catch (error) {
    handleCatchError(error);
  }
}

module.exports = {
  userManagementDB,
};
