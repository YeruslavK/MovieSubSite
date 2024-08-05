import { combineReducers } from "redux";

// Initial States
export const initialMoviesState = {
  movies: [],
};

export const initialMembersState = {
  members: [],
};

export const initialSubscriptionsState = {
  subscriptions: [],
};

// Movies Reducer
export const movieReducer = (state = initialMoviesState, action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case "LOAD_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
      };
    case "UPDATE_MOVIE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        ),
      };
    default:
      return state;
  }
};

// Members Reducer
export const membersReducer = (state = initialMembersState, action) => {
  switch (action.type) {
    case "LOAD_MEMBERS":
      return {
        ...state,
        members: action.payload,
      };
    case "ADD_MEMBER":
      console.log("Adding member:", action.payload);
      return {
        ...state,
        members: [...state.members, action.payload],
      };
    case "DELETE_MEMBER":
      return {
        ...state,
        members: state.members.filter(
          (member) => member._id !== action.payload
        ),
      };
    case "UPDATE_MEMBER":
      return {
        ...state,
        members: state.members.map((member) => {
          if (member._id === action.payload._id) {
            return {
              ...member,
              ...action.payload,
            };
          } else {
            return member;
          }
        }),
      };
    default:
      return state;
  }
};

// Subscriptions Reducer
export const subscriptionsReducer = (
  state = initialSubscriptionsState,
  action
) => {
  switch (action.type) {
    case "LOAD_SUBSCRIPTIONS":
      return {
        ...state,
        subscriptions: action.payload,
      };
    case "ADD_SUBSCRIPTION":
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
      };
    case "DELETE_SUBSCRIPTION":
      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          (subscription) => subscription.id !== action.payload
        ),
      };
    case "UPDATE_SUBSCRIPTION":
      return {
        ...state,
        subscriptions: state.subscriptions.map((subscription) => {
          if (subscription.id === action.payload.id) {
            return {
              ...subscription,
              ...action.payload,
            };
          } else {
            return subscription;
          }
        }),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  movies: movieReducer,
  members: membersReducer,
  subscriptions: subscriptionsReducer,
});

export default rootReducer;
