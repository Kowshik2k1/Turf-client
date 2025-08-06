import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link to="/" className="navbar-brand">TurfBook</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/search" className="nav-link">Find Turfs</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">How it Works</Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">Contact</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <ThemeToggle />
            {user ? (
              <>
                <span className="text-white">Hi, {user.name}</span>
                <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-light btn-sm">Login</Link>
                <Link to="/register" className="btn btn-warning btn-sm">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
