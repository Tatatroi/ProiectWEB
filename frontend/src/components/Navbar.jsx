import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ loggedIn, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          TripPlanner
        </Link>
        <div className="d-flex align-items-center">
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