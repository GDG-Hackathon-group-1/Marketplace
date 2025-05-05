import React, { useState} from "react";
import signupVector from "../Assets/signup_vector2.png";
import "../CSS/Registration.css";
import favicon from "../Assets/AASTUMARKETPLACE.png";
import { Link, useNavigate } from "react-router-dom";
import { FiUpload, FiX } from "react-icons/fi";

export const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profile_image: null,
    is_seller: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errors, setErrors] = useState({});

  const checkPasswordStrength = (password) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const mediumRegex =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    if (strongRegex.test(password)) return "strong";
    if (mediumRegex.test(password)) return "medium";
    return "weak";
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value.includes("@aastustudent.edu.et")) {
          error = "Must use your AASTU institutional email";
        }
        break;
      case "password":
        if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (
          !/[A-Z]/.test(value) ||
          !/[a-z]/.test(value) ||
          !/[0-9]/.test(value)
        ) {
          error = "Must contain uppercase, lowercase, and numbers";
        }
        break;
      default:
        if (!value) {
          error = "This field is required";
        }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "profile_image") {
      if (files[0] && files[0].size > 2097152) {
        setErrors((prev) => ({
          ...prev,
          profile_image: "File size must be less than 2MB",
        }));
      } else {
        setFormData({ ...formData, [name]: files[0] });
        setErrors((prev) => ({ ...prev, profile_image: "" }));
      }
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "password") {
        setPasswordStrength(checkPasswordStrength(value));
      }
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate all fields
    let isValid = true;
    for (const [name, value] of Object.entries(formData)) {
      if (name !== "profile_image" && name !== "is_seller") {
        isValid = validateField(name, value) && isValid;
      }
    }

    if (!isValid) {
      setError("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("is_seller", formData.is_seller);
      if (formData.profile_image) {
        formDataToSend.append("profile_image", formData.profile_image);
      }

      const response = await fetch("http://localhost:8000/auth/register/", {
        method: "POST",
        body: formDataToSend,
        // Don't set Content-Type header for FormData - browser will set it automatically
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle Django validation errors
        const errorMsg =
          Object.values(data).flat().join(" ") || "Registration failed";
        throw new Error(errorMsg);
      }

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-page">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AASTU Marketplace - Sign Up</title>
      <link rel="icon" href={favicon} type="image/x-icon" />
      <link rel="stylesheet" href="signup.css" />

      <div className="registration-grid-container">
        <div className="registration-vector-container">
          <img
            src={signupVector}
            alt="AASTU Marketplace illustration"
            className="vector-image"
          />
          <div className="vector-content">
            <h2>Welcome to AASTU Marketplace</h2>
            <p>The official e-commerce platform for AASTU students and staff</p>
          </div>
        </div>

        <div className="registration-form-container">
          <div className="form-header">
            <i
              className="fas fa-user-circle"
              style={{ fontSize: "64px", color: "#555" }}
            ></i>
            <h1>Create Account</h1>
            <p>Join our community of buyers and sellers</p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form
            id="registration-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">Username*</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className={errors.username ? "error" : ""}
                />
                {errors.username && (
                  <span className="error-message">{errors.username}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">AASTU Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="username@aastustudent.edu.et"
                  value={formData.email}
                  onChange={handleChange}
                  pattern=".+@aastustudent\.edu\.et"
                  required
                  className={errors.email ? "error" : ""}
                />
                <small>Must use your AASTU institutional email</small>
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password*</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                  className={errors.password ? "error" : ""}
                />
                <div className="password-strength">
                  {formData.password && (
                    <>
                      <span
                        className={`strength-indicator ${passwordStrength}`}
                      >
                        Strength: {passwordStrength}
                      </span>
                      <div className="strength-bars">
                        <div
                          className={`strength-bar ${passwordStrength}`}
                        ></div>
                        <div
                          className={`strength-bar ${passwordStrength}`}
                        ></div>
                        <div
                          className={`strength-bar ${passwordStrength}`}
                        ></div>
                      </div>
                    </>
                  )}
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="profile_image">Upload Profile Picture</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="profile_image"
                    name="profile_image"
                    accept="image/*"
                    onChange={handleChange}
                    className="file-input"
                  />
                  <label htmlFor="profile_image" className="file-upload-label">
                    {formData.profile_image ? (
                      <>
                        <span className="file-name">
                          {formData.profile_image.name}
                        </span>
                        <span className="file-size">
                          {(formData.profile_image.size / 1024).toFixed(2)} KB
                        </span>
                      </>
                    ) : (
                      <>
                        <FiUpload className="upload-icon" />
                        <span>Choose a file (Max 2MB)</span>
                      </>
                    )}
                  </label>
                  {formData.profile_image && (
                    <button
                      type="button"
                      className="clear-file-btn"
                      onClick={() =>
                        setFormData({ ...formData, profile_image: null })
                      }
                    >
                      <FiX />
                    </button>
                  )}
                </div>
                {errors.profile_image && (
                  <span className="error-message">{errors.profile_image}</span>
                )}
                {formData.profile_image && (
                  <div className="image-preview">
                    <img
                      src={URL.createObjectURL(formData.profile_image)}
                      alt="Preview"
                      onLoad={() => URL.revokeObjectURL(formData.profile_image)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group account-type">
                <label>Account Type (Role)*</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="checkbox"
                      name="is_seller"
                      checked={formData.is_seller}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    Register as a seller
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group terms">
                <input type="checkbox" id="terms" name="terms" required />
                <label htmlFor="terms">
                  I agree to the <a href="#">Terms of Service</a> and{" "}
                  <a href="#">Privacy Policy</a>*
                </label>
              </div>
            </div>

            <div className="form-row">
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="form-footer">
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
