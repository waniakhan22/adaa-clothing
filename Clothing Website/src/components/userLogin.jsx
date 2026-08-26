import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../api";
import "./auth.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        apiUrl("/auth/login"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      // Token save
      localStorage.setItem("token", data.token);

      // User information save
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Login successful → Landing Page / Hero
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Wrong email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      {/* LEFT SIDE - BRANDING */}
      <div className="signup-brand">
        <img
          src="https://i.pinimg.com/736x/dd/cc/7f/ddcc7f9ab6ab7958d3312aa845077c4c.jpg"
          alt="Fashion"
        />
      </div>

      {/* RIGHT SIDE - LOGIN */}
      <div className="signup-section">
        <div className="signup-container">

          {/* HEADER */}
          <div className="signup-header">
            <h2>Sign In</h2>

            <p>
              Welcome back. Sign in to continue shopping.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          <form
            className="signup-form"
            onSubmit={handleLogin}
          >

            {/* EMAIL */}
            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label>Password</label>

              <div className="password-box">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="login-options">

              <label className="remember">

                <input type="checkbox" />

                <span>
                  Remember me
                </span>

              </label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="signup-btn"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Log In"}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            className="google-btn"
          >
            <span>G</span>
            Continue with Google
          </button>

          {/* SIGNUP */}
          <p className="login-text">
            Don't have an account?

            <Link to="/signup">
              {" "}Sign Up
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;