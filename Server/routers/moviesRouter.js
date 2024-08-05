const express = require("express");
const moviesService = require("../services/moviesService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await moviesService.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await moviesService.getMovie(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { Title, Released, Genre, Image } = req.body;
  try {
    const newMovie = await moviesService.createMovie({
      Title,
      Released,
      Genre,
      Image,
    });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).send("Error adding movie: " + error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const status = await moviesService.updateMovie(req.params.id, req.body);
    res.send(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const status = await moviesService.deleteMovie(req.params.id);
    res.send(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
