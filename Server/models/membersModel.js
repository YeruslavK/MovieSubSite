const mongoose = require("mongoose");

const MembersSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  City: String,
});

const Members = mongoose.model("Member", MembersSchema, "MembersCollection");

module.exports = Members;
