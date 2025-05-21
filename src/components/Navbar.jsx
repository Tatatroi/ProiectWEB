import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">TripPlanner</a>
        <div className="d-flex">
          <button className="btn btn-outline-light me-2">Sign In</button>
          <button className="btn btn-light text-primary">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}