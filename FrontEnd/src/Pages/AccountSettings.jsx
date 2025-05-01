import React from "react";
import "../CSS/AccountSetting Style.css";

const AccountSettings = () => {
  return (
    <div>
      <title>Account Settings</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Contact us page of the ASTU marketplace"
      />
      <meta name="author" content="Team 1 Section B AASTU students" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="/Assets/favicon.png" type="image/x-icon" />
      <div className="account-settings-homeText">
        <span>Home /</span>
        <h4 style={{ display: "inline" }}>My Account</h4>
      </div>
      <div className="account-settings-content-container">
        <section className="account-settings-section-1">
          <ul>
            <h3>Manage My Account</h3>
            <li>
              <a href="#">My Profile</a>
            </li>
            <li>
              <a href="#">Address Book</a>
            </li>
            <li>
              <a href="#">My Payment Options</a>
            </li>
          </ul>
          <ul>
            <h3>My Orders</h3>
            <li>
              <a href="#">My Connections</a>
            </li>
            <h3>My wishlist</h3>
          </ul>
        </section>
        <section className="account-settings-section-2">
          <form className="account-settings-form">
            <span>
              <label>
                <h2 className="account-settings-Edit">Edit your profile</h2>
                <br />
                First Name
                <br />
                <input
                  required
                  className="account-settings-Name"
                  type="text"
                  name="fname"
                  placeholder="Your Name *"
                />
              </label>
              <label className="account-settings-lastName">
                Last Name
                <br />
                <input
                  required
                  className="account-settings-Name"
                  type="text"
                  name="lname"
                  placeholder="Your Last Name *"
                />
              </label>
              <label>
                Email
                <br />
                <input
                  className="account-settings-Email"
                  type="email"
                  name="EmailAddress"
                  placeholder="Your Email *"
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address (e.g., example@domain.com)"
                />
              </label>
              <label className="account-settings-Address">
                Address
                <br />
                <input
                  className="account-settings-Email"
                  type="text"
                  name="Address"
                  placeholder="Koye, AASTU, Addis Abeba"
                  required
                />
              </label>
            </span>
            <div className="account-settings-password-changes">
              <div className="form-group">
                <h4>Password Changes</h4>
                <input
                  type="password"
                  id="current-password"
                  name="current-password"
                  placeholder="Enter your current password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="new-password"
                  name="new-password"
                  placeholder="Enter your new password"
                  required
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%])[A-Za-z\d@#$%]{8,}"
                  title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol (@, #, $, %)."
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Re-enter your new password"
                  required
                />
              </div>
            </div>
            <div className="account-settings-buttons">
              <button
                className="account-settings-cancel-btn"
                style={{ backgroundColor: "white", border: "none" }}
                type="reset"
              >
                Cancel
              </button>
              <div>
                <button className="account-settings-send-btn" type="submit">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AccountSettings;
