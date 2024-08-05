import "../CSS Files/DisplayMoviesComp.css";
import MovieCardComp from "./MovieCardComp";
import AddMovieComp from "./AddMovieComp";
import EditMovieComp from "./Movies/EditMovieComp";
import SubsComp from "./Subscriptions/SubsComp";
import { loadMovies, loadMembers, loadSubscriptions } from "../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const DisplayMoviesComp = ({}) => {
  const [activeButton, setActiveButton] = useState("All Movies");
  const [editingMovie, setEditingMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const members = useSelector((state) => state.members.members);
  const subscriptions = useSelector(
    (state) => state.subscriptions.subscriptions
  );

  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadMovies());
    dispatch(loadMembers());
    dispatch(loadSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  useEffect(() => {
    if (movieId) {
      const selectedMovie = movies.find((movie) => movie._id === movieId);
      setFilteredMovies(selectedMovie ? [selectedMovie] : []);
      setSearchTerm(selectedMovie ? selectedMovie.Title : "");
    }
  }, [movieId, movies]);

  const handleCancel = (updatedMovie = null) => {
    dispatch(loadMovies());
    setActiveButton("All Movies");
    setEditingMovie(null);
    setSelectedMember(null);
    navigate("/main-movies-page/movies");
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setActiveButton("Edit Movie");
  };

  const handleSearch = () => {
    const filtered = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const getSubscribedMembers = (movieId) => {
    const subscribedMembers = subscriptions
      .filter((sub) => sub.movieId.toString() === movieId.toString())
      .map((sub) => {
        const member = members.find(
          (member) =>
            member && member._id.toString() === sub.memberId.toString()
        );
        return member ? { ...member, subscriptionDate: sub.date } : null;
      })
      .filter(Boolean);

    return subscribedMembers;
  };

  const handleSubscriberClick = (member) => {
    setSelectedMember(member);
    navigate("/main-movies-page/subscriptions", { state: { member } });
  };

  if (activeButton === "View Subscription" && selectedMember) {
    return <SubsComp member={selectedMember} onBack={handleCancel} />;
  }

  return (
    <>
      {activeButton !== "Edit Movie" && (
        <div className="top-bar">
          <button
            className={`top-bar-button ${
              activeButton === "All Movies" ? "active" : ""
            }`}
            onClick={() => {
              setActiveButton("All Movies");
              setEditingMovie(null);
              navigate("/main-movies-page/movies");
            }}
          >
            All Movies
          </button>
          <button
            className={`top-bar-button ${
              activeButton === "Add Movie" ? "active" : ""
            }`}
            onClick={() => setActiveButton("Add Movie")}
          >
            Add Movie
          </button>
          {activeButton === "All Movies" && (
            <div className="find-movie">
              <label>Find Movie:</label>
              <input
                type="text"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="top-bar-button" onClick={handleSearch}>
                Find
              </button>
            </div>
          )}
        </div>
      )}

      {activeButton === "All Movies" ? (
        <div className="movies-list">
          {filteredMovies.map((movie) => (
            <MovieCardComp
              key={movie._id}
              movie={movie}
              onEdit={() => handleEdit(movie)}
              subscribedMembers={getSubscribedMembers(movie._id)}
              onSubscriberClick={handleSubscriberClick}
            />
          ))}
        </div>
      ) : activeButton === "Add Movie" ? (
        <AddMovieComp onCancel={handleCancel} />
      ) : (
        <EditMovieComp movie={editingMovie} onCancel={handleCancel} />
      )}
    </>
  );
};

export default DisplayMoviesComp;
