import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
export default function Navbar() {
  const navigate = useNavigate();
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to='/' className="navbar-brand fw-bold">TripPlanner</Link>
        <div className="d-flex">
          <button onClick={() => navigate("/signin")} className="btn btn-outline-light me-2">Sign In</button>
          <button onClick={() => navigate("/signup")} className="btn btn-light text-primary">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}