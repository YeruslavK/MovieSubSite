import React, { useState, useEffect } from "react";
import "../../CSS Files/EditMovieComp.css";
import { useDispatch } from "react-redux";
import { updateMovie } from "../../redux/actions";

const EditMovieComp = ({ movie, onCancel }) => {
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState("");
  const [image, setImage] = useState("");
  const [premiered, setPremiered] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (movie) {
      setTitle(movie.Title || "");
      setGenres((movie.Genre && movie.Genre.join(", ")) || "");
      setImage(movie.Image || "");
      setPremiered(formatDateForInput(movie.Released || ""));
    }
  }, [movie]);

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  const handleSave = () => {
    const updatedMovie = {
      _id: movie._id,
      Title: title,
      Genre: genres.split(",").map((genre) => genre.trim()),
      Image: image,
      Released: premiered,
    };

    dispatch(updateMovie(movie._id, updatedMovie)).then((updatedMovieData) => {
      onCancel(updatedMovieData);
    });
  };

  return (
    <div className="update-movie-card">
      <h2 className="update-movie-title">Edit Movie</h2>
      <div className="input-group">
        <label htmlFor="title">Name:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="genres">Genres:</label>
        <input
          type="text"
          id="genres"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="premiered">Premiered:</label>
        <input
          type="date"
          id="premiered"
          value={premiered}
          onChange={(e) => setPremiered(e.target.value)}
          required
        />
      </div>
      <div className="add-movie-actions">
        <button className="action-button save-button" onClick={handleSave}>
          Save
        </button>
        <button
          className="action-button cancel-button"
          onClick={() => onCancel(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditMovieComp;
