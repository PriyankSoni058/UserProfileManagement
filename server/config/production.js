const prod = {
  PORT: process.env.PORT || 1338,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/fantasy_admins",
};

module.exports = prod;
