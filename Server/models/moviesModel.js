const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  Title: String,
  Released: String,
  Genre: [String],
  Image: String,
});

const Movie = mongoose.model("Movie", MovieSchema, "MoviesCollection");

module.exports = Movie;
