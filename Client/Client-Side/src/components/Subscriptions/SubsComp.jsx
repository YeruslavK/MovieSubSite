import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  loadMembers,
  loadMovies,
  addSubscription,
  loadSubscriptions,
  deleteMember,
} from "../../redux/actions";
import AddMemberComp from "../Members/AddMemberComp";
import EditMemberComp from "../Members/EditMemberComp";
import "../../CSS Files/SubsComp.css";
import { useNavigate } from "react-router-dom";

const SubsComp = ({ member: selectedMemberProp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const members = useSelector((state) => state.members.members);
  const movies = useSelector((state) => state.movies.movies);
  const subscriptions = useSelector(
    (state) => state.subscriptions.subscriptions
  );

  const [selectedMember, setSelectedMember] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [subscriptionDate, setSubscriptionDate] = useState("");
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [showAddMovieDiv, setShowAddMovieDiv] = useState({});

  useEffect(() => {
    dispatch(loadMembers());
    dispatch(loadMovies());
    dispatch(loadSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    if (selectedMemberProp) {
      setSelectedMember(selectedMemberProp._id);
    }
  }, [selectedMemberProp]);

  const handleSubscribe = (memberId) => {
    if (memberId && selectedMovie && subscriptionDate) {
      const newSubscription = {
        date: subscriptionDate,
        memberId: memberId,
        movieId: selectedMovie,
      };

      dispatch(addSubscription(newSubscription));
      setSelectedMovie("");
      setSubscriptionDate("");
      setShowAddMovieDiv((prevState) => ({
        ...prevState,
        [memberId]: false,
      }));
    }
  };

  const handleAddMember = () => setShowAddMember(true);
  const handleEditMember = (memberId) => setEditingMemberId(memberId);
  const handleCancelEdit = () => setEditingMemberId(null);
  const handleDeleteMember = (memberId) => dispatch(deleteMember(memberId));

  const handleAddMemberComplete = () => {
    setShowAddMember(false);
    dispatch(loadMembers());
  };

  const toggleAddMovieDiv = (memberId) => {
    setShowAddMovieDiv((prevState) => ({
      ...prevState,
      [memberId]: !prevState[memberId],
    }));
  };

  const handleMovieClick = (movieId) => {
    navigate(`/main-movies-page/movies/${movieId}`);
  };

  return (
    <div className="subs-container">
      {editingMemberId ? (
        <EditMemberComp
          memberId={editingMemberId}
          onCancel={handleCancelEdit}
        />
      ) : showAddMember ? (
        <AddMemberComp onCancel={handleAddMemberComplete} />
      ) : (
        <>
          <h1>Subscriptions:</h1>
          <button className="action-button active-button">All Members</button>
          <button className="action-button" onClick={handleAddMember}>
            Add Member
          </button>

          <div>
            {members.map((member) => {
              const memberId = member._id || uuidv4();
              const memberSubscriptions = subscriptions.filter(
                (sub) => sub.memberId === member._id
              );
              const memberMovies = memberSubscriptions
                .map((sub) => {
                  const movie = movies.find(
                    (movie) => movie._id === sub.movieId
                  );
                  return movie ? { ...movie, date: sub.date } : null;
                })
                .filter((movie) => movie !== null);

              return (
                <div key={memberId} className="subscriber-card">
                  <h1>Name: {member.Name}</h1>
                  <p>Email: {member.Email}</p>
                  <p>City: {member.City}</p>
                  <div>
                    <h4>Subscribed Movies:</h4>
                    {memberMovies.length > 0 ? (
                      <ul>
                        {memberMovies.map((movie) => (
                          <li key={movie._id}>
                            <a
                              href="#"
                              onClick={() => handleMovieClick(movie._id)}
                            >
                              {movie.Title}
                            </a>{" "}
                            - {new Date(movie.date).toISOString().split("T")[0]}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-movies">No watched movies</p>
                    )}
                  </div>
                  <div
                    className="add-movie-div"
                    style={{
                      display: showAddMovieDiv[member._id] ? "block" : "none",
                    }}
                  >
                    <h4>Add a new movie</h4>
                    <select
                      value={selectedMovie}
                      onChange={(e) => setSelectedMovie(e.target.value)}
                    >
                      <option value="">Select a movie</option>
                      {movies.map((movie) => (
                        <option key={movie._id} value={movie._id}>
                          {movie.Title}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={subscriptionDate}
                      onChange={(e) => setSubscriptionDate(e.target.value)}
                    />
                    <button onClick={() => handleSubscribe(member._id)}>
                      Subscribe
                    </button>
                  </div>
                  <button
                    className="action-button"
                    onClick={() => toggleAddMovieDiv(member._id)}
                  >
                    {showAddMovieDiv[member._id] ? "Cancel" : "Add Movie"}
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleEditMember(member._id)}
                  >
                    Edit Member
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleDeleteMember(member._id)}
                  >
                    Delete Member
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SubsComp;
