const Movie = require("../models/moviesModel");

const getAllMovies = async () => {
  try {
    return await Movie.find({});
  } catch (error) {
    throw error;
  }
};

const getMovie = async (id) => {
  try {
    return await Movie.findById(id);
  } catch (error) {
    throw error;
  }
};

const createMovie = async (obj) => {
  try {
    const movie = new Movie(obj);
    await movie.save();
    return movie;
  } catch (error) {
    throw error;
  }
};

const updateMovie = async (id, obj) => {
  try {
    await Movie.findByIdAndUpdate(id, obj);
    return "Updated!";
  } catch (error) {
    throw error;
  }
};

const deleteMovie = async (id) => {
  try {
    await Movie.findByIdAndDelete(id);
    return "Deleted!";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
