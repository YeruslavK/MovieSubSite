import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LogInComp from "./components/LogInComp";
import MainMoviesPageComp from "./components/MainMoviesPageComp";
import DisplayMoviesComp from "./components/DisplayMoviesComp";
import SubsComp from "./components/Subscriptions/SubsComp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LogInComp />} />
          <Route path="/main-movies-page" element={<MainMoviesPageComp />}>
            <Route path="movies" element={<DisplayMoviesComp />} />
            <Route path="subscriptions" element={<SubsComp />} />
            <Route path="movies/:movieId" element={<DisplayMoviesComp />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
