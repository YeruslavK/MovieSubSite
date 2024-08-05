import axios from "axios";

// Movies Actions
export const ADD_MOVIE = "ADD_MOVIE";
export const UPDATE_MOVIE = "UPDATE_MOVIE";
export const DELETE_MOVIE = "DELETE_MOVIE";
export const LOAD_MOVIES = "LOAD_MOVIES";

export const addMovie = (movie) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3000/movies", movie);
    dispatch({
      type: ADD_MOVIE,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error adding movie:", error);
  }
};

export const deleteMovie = (_id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/movies/${_id}`);
    dispatch({
      type: DELETE_MOVIE,
      payload: _id,
    });
  } catch (error) {
    console.error(`Error deleting movie with ID ${_id}:`, error);
  }
};
export const updateMovie = (_id, updatedMovie) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/movies/${_id}`,
      updatedMovie
    );
    dispatch({
      type: UPDATE_MOVIE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating movie with ID ${_id}:`, error);
  }
};

export const editMovie = (_id, updatedMovie) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/movies/${_id}`,
      updatedMovie
    );
    dispatch({
      type: UPDATE_MOVIE,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating movie with ID ${_id}:`, error);
  }
};

export const loadMovies = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/movies");
    dispatch({
      type: LOAD_MOVIES,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error loading movies:", error);
  }
};

// Members Actions
export const LOAD_MEMBERS = "LOAD_MEMBERS";
export const ADD_MEMBER = "ADD_MEMBER";
export const UPDATE_MEMBER = "UPDATE_MEMBER";

export const loadMembers = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/members");
    dispatch({
      type: LOAD_MEMBERS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error Loading Members:", error);
  }
};

export const addMember = (member) => async (dispatch) => {
  try {
    const reponse = await axios.post("http://localhost:3000/members", member);
    dispatch({
      type: ADD_MEMBER,
      payload: reponse.data,
    });
  } catch (error) {
    console.error("Error adding member:", error);
  }
};

export const updateMember = (memberId, updatedMember) => async (dispatch) => {
  const response = await axios.put(
    `http://localhost:3000/members/${memberId}`,
    updatedMember
  );
  dispatch({ type: UPDATE_MEMBER, payload: response.data });
};

export const deleteMember = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:3000/members/${id}`);
  dispatch({
    type: "DELETE_MEMBER",
    payload: id,
  });
};

// Subscriptions Actions
export const LOAD_SUBSCRIPTIONS = "LOAD_SUBSCRIPTIONS";
export const ADD_SUBSCRIPTION = "ADD_SUBSCRIPTION";
export const DELETE_SUBSCRIPTION = "DELETE_SUBSCRIPTION";

export const loadSubscriptions = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/subscriptions");
    dispatch({
      type: LOAD_SUBSCRIPTIONS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error loading subscriptions:", error);
  }
};

export const addSubscription = (subscription) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/subscriptions",
      subscription
    );
    dispatch({
      type: ADD_SUBSCRIPTION,
      payload: response.data,
    });
  } catch (error) {
    console.error(
      "Error adding subscription:",
      error.response ? error.response.data : error.message
    );
  }
};

export const deleteSubscription = (_id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/subscriptions/${_id}`);
    dispatch({
      type: DELETE_SUBSCRIPTION,
      payload: _id,
    });
  } catch (error) {
    console.error(`Error deleting subscription with ID ${_id}:`, error);
  }
};
