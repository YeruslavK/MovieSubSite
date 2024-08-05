import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../redux/actions";
import "../CSS Files/AddMovieComp.css";

const AddMovieComp = ({ onCancel }) => {
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState("");
  const [image, setImage] = useState("");
  const [premiered, setPremiered] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    const movieData = {
      Title: title,
      Genre: genres.split(",").map((genre) => genre.trim()),
      Image: image,
      Released: premiered,
    };
    dispatch(addMovie(movieData));
    onCancel();
  };

  return (
    <div className="add-movie-card">
      <h2 className="add-movie-title">Add New Movie</h2>
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
        <button className="action-button cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddMovieComp;
