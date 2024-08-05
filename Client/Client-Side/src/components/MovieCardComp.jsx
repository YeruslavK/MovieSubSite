import "../CSS Files/MovieCardComp.css";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../redux/actions";

const MovieCardComp = ({
  movie,
  onEdit,
  subscribedMembers,
  onSubscriberClick,
}) => {
  const { Title, Genre, Image, Released } = movie;
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      dispatch(deleteMovie(movie._id));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="movie-card">
      <h2 className="movie-title">{Title}</h2>
      <p className="movie-year">Released: {Released}</p>
      {Genre && <p className="movie-genres">Genres: {Genre.join(", ")}</p>}
      <div className="movie-content">
        {Image && <img className="movie-image" src={Image} alt={Title} />}
        <div className="movie-subscriptions">
          <h3>Subscriptions:</h3>
          {subscribedMembers && subscribedMembers.length > 0 ? (
            <ul>
              {subscribedMembers.map((member) => (
                <li key={member._id}>
                  <a
                    href="#"
                    style={{ color: "#4f46e5" }}
                    onClick={() => onSubscriberClick(member)}
                  >
                    {member.Name}
                  </a>
                  , {formatDate(member.subscriptionDate)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No subscriptions yet</p>
          )}
        </div>
      </div>

      <div className="movie-actions">
        <button className="action-button edit-button" onClick={onEdit}>
          Edit
        </button>
        <button className="action-button delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCardComp;
