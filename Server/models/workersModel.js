const mongoose = require("mongoose");

const WorkersSchema = new mongoose.Schema({
  FullName: String,
  Username: String,
  Password: String,
});

const Workers = mongoose.model(
  "WorkersCollection",
  WorkersSchema,
  "WorkersCollection"
);

module.exports = Workers;
