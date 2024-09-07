const { userManagementDB } = require("../database/mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    userName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    bio: { type: String, trim: true },
    proPic: { type: String, trim: true },
  },
  { timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" } }
);

const userModel = userManagementDB.model("user", user);

userModel
  .syncIndexes()
  .then(() => {
    console.log("User Model Indexes Synced");
  })
  .catch((err) => {
    console.log("User Model Indexes Sync Error", err);
  });
module.exports = userModel;
