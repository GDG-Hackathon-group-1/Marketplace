import React from "react";
import { useNavigate } from "react-router-dom";
import loginVector from "../Assets/login_vector2.png";
import loginIcon from "../Assets/login_icon.png";
import "../CSS/login.css";
const LoginPage = () => {
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault();
    // Add transition effect before navigation
    document.querySelector(".loginPage-content-container").style.animation =
      "fadeOut 0.5s ease forwards";
    setTimeout(() => {
      navigate("/signup");
    }, 500);
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
        {/* Left Form Container */}
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

          <form className="loginPage-form">
            <div className="loginPage-form-group">
              <label htmlFor="email" className="loginPage-label">
                Email address*
              </label>
              <input
                type="email"
                id="email"
                className="loginPage-input"
                placeholder="Enter your AASTU email"
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
                className="loginPage-input"
                placeholder="Enter your password"
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

            <button type="submit" className="loginPage-submit-btn">
              Sign in
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

        {/* Right Vector Container */}
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
