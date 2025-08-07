import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          TurfBook
        </Link>

        <button
          className="navbar-toggler p-0 shadow-none"
          type="button"
          onClick={handleClick}
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          {isOpen ? (
            <img
              src="/close-icon.png"
              alt="Close menu"
              width={50}
              height={50}
            />
          ) : (
            <img
              src="/hamburger-open.svg"
              alt="Open menu"
              width={50}
              height={50}
            />
          )}
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/search" className="nav-link">
                Find Turfs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/how-it-works" className="nav-link">
                How it Works
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>

          <div className="d-flex wrap align-items-center gap-2">
            <ThemeToggle />
            {user ? (
              <>
                <span className="text-white">Hi, {user.name}</span>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn login btn-light btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn signup btn-warning btn-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
