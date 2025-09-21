import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import "../App.css";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "light" : "dark"
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          🖥️Blog Management System
        </Link>
        <div className="navbar-links">
          <Link to="/blogs">✍️Blogs</Link>
          {localStorage.getItem("token") ? (
            <>
              <Link to="/dashboard">📊Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-primary">
                🚪Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">🔑Login</Link>
              <Link to="/register">🆕Register</Link>
            </>
          )}
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? (
              <SunIcon className="icon" />
            ) : (
              <MoonIcon className="icon" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
