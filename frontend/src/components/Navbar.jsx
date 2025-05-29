import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css"

export default function Navbar({ loggedIn, onLogout, theme, setTheme }) {
  const navigate = useNavigate();

   function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          TripPlanner
        </Link>
        <div className="d-flex align-items-center">
            <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Activate ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
          {loggedIn ? (
            <>
              <button
                className="btn btn-outline-light me-3"
                onClick={() => navigate("/mytrips")}
              >
                My Trips
              </button>
              <button
                className="btn btn-light text-primary fw-bold"
                onClick={onLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline-light me-2"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="btn btn-light text-primary fw-bold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}