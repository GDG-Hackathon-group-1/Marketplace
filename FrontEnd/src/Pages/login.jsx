import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginVector from "../Assets/login_vector2.png";
import loginIcon from "../Assets/login_icon.png";
import "../CSS/login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignupClick = (e) => {
    e.preventDefault();
    document.querySelector(".loginPage-content-container").style.animation =
      "fadeOut 0.5s ease forwards";
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Invalid credentials");
      }

      // Store tokens (Django SimpleJWT returns access and refresh tokens)
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      // Redirect to dashboard or home page
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="loginPage-login-page">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AASTU Marketplace - Login</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />

      <div className="loginPage-content-container">
        <div className="loginPage-form-container">
          <div className="loginPage-form-header">
            <img
              src={loginIcon}
              alt="AASTU Marketplace logo"
              className="loginPage-logo"
            />
            <h1 className="loginPage-title">Sign in to your account</h1>
            <p className="loginPage-subtitle">
              Enter your credentials to continue
            </p>
          </div>

          {error && <div className="loginPage-error-message">{error}</div>}

          <form className="loginPage-form" onSubmit={handleSubmit}>
            <div className="loginPage-form-group">
              <label htmlFor="username" className="loginPage-label">
                Username*
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="loginPage-input"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="loginPage-form-group">
              <label htmlFor="password" className="loginPage-label">
                Password*
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="loginPage-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <a href="/forgot-password" className="loginPage-forgot-password">
                Forgot password?
              </a>
            </div>

            <div className="loginPage-remember-me">
              <input
                type="checkbox"
                id="remember"
                className="loginPage-checkbox"
              />
              <label htmlFor="remember" className="loginPage-remember-label">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="loginPage-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="loginPage-signup-text">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="loginPage-signup-link"
              onClick={handleSignupClick}
            >
              Sign up
            </a>
          </p>
        </div>

        <div className="loginPage-vector-container">
          <img
            src={loginVector}
            alt="Login illustration"
            className="loginPage-vector-image"
          />
          <div className="loginPage-vector-content">
            <h2 className="loginPage-vector-title">
              Welcome to AASTU Marketplace
            </h2>
            <p className="loginPage-vector-text">
              Connect with students and staff across campus
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
