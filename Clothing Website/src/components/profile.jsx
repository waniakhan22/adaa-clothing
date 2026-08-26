import React from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="profile-page">

      <div className="profile-container">

        <div className="profile-icon-large">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
          </svg>
        </div>

        <p className="profile-eyebrow">
          MY ACCOUNT
        </p>

        <h1>
          {user?.name || "Welcome"}
        </h1>

        <p className="profile-email">
          {user?.email || "No email available"}
        </p>

        <div className="profile-options">

          <button onClick={() => navigate("/orders")}>
            <span>My Orders</span>
            <span>→</span>
          </button>

          <button onClick={() => navigate("/wishlist")}>
            <span>Wishlist</span>
            <span>→</span>
          </button>

          <button onClick={() => navigate("/settings")}>
            <span>Account Settings</span>
            <span>→</span>
          </button>

        </div>

        <button
          className="profile-logout"
          onClick={handleLogout}
        >
          LOG OUT
        </button>

      </div>

    </div>
  );
};

export default Profile;