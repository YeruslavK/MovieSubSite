import "../CSS Files/MainMoviesPageComp.css";
import movieIcon from "../assets/MovieIcon.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const MainMoviesPageComp = () => {
  const [activeComponent, setActiveComponent] = useState("movies");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="movie-icon">
            <img src={movieIcon} alt="Movie Icon" className="button-icon" />
          </div>
          <div className="header">
            <h1 className="header-title">Movies - Subscriptions Web Site</h1>
          </div>
          <div className="links">
            <button onClick={() => navigate("/main-movies-page/movies")}>
              Movies
            </button>
            <button onClick={() => navigate("/main-movies-page/subscriptions")}>
              Subscriptions
            </button>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default MainMoviesPageComp;
