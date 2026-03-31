import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="nav-shell">
      <div className="nav-left">
        <div className="nav-logo-mark">EA</div>
        <div className="nav-logo-text">
          <span className="nav-title">Ecom Analytics</span>
          <span className="nav-subtitle">Sales Intelligence</span>
        </div>
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-chip">
          Dashboard
        </Link>
        <button className="nav-chip nav-chip-muted">Reports</button>
        <button className="nav-chip nav-chip-muted">Settings</button>

        <div className="nav-divider" />

        {user ? (
          <div className="nav-user">
            <div className="nav-user-info">
              <span className="nav-user-name">{user.name || user.email}</span>
              <span className="nav-user-role">Business Owner</span>
            </div>
            <button
              onClick={() => logout()}
              className="nav-chip nav-chip-ghost"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="nav-auth-links">
            <Link to="/login" className="nav-chip">
              Login
            </Link>
            <Link to="/register" className="nav-chip nav-chip-muted">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
