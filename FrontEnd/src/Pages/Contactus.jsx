import React from "react";
import "../CSS/Contact us Style.css";
import favicon from "../Assets/AASTUMARKETPLACE.png";
import phoneIcon from "../Assets/icons-phone.png";
import mailIcon from "../Assets/icons-mail.png";

const Contactus = () => {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Contact us page of the ASTU marketplace"
      />
      <meta name="author" content="Team 1 Section B AASTU students" />
      <meta
        name="keywords"
        content="AASTU, Marketplace, Buy, Sell, Contact Us"
      />
      <meta name="robots" content="index, follow" />
      <title>Contact Us</title>
      <link rel="icon" href={favicon} type="image/x-icon" />
      <link
        rel="stylesheet"
        href="/Styles/Common Header and footer/style.css"
      />
      <link rel="stylesheet" href="/Contact us page/Contact us Style.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Sora:wght@100..800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <div className="homeText">
        <span>Home /</span>
        <h4 style={{ display: "inline" }}>Contact</h4>
      </div>
      <div className="page-container">
        <section className="section-1">
          <form action>
            <div className="contact-item">
              <img className="a" src={phoneIcon} alt="Call to Us" />
              <span className="a">Call to Us</span>
            </div>
            <br />
            <br />
            <span>We are available 24/7, 7 days a week</span>
            <br />
            <br />
            <h4>Phone:+251934556789</h4>
            <br />
            <div className="bottom-line2" />
            <br />
            <div className="contact-item">
              <img className="a" src={mailIcon} alt="Write To Us" />
              <span>Write to Us</span>
            </div>
            <br />
            <span>
              Fill out our form and we will contact you within 24 hours.
            </span>
            <br />
            <br />
            <h4>
              Emails:
              <a href="customer@AASTUMarketPlace.com">
                AASTUMarketPlace@gmail.com
              </a>
            </h4>
            <h4>
              Emails:
              <a href="support@AASTUMarketPlace.com">
                AASTUMarketPlace@gmail.com
              </a>
            </h4>
            <h4>
              Emails:
              <a href="mailto:AASTUMarketPlace@gmail.com">
                AASTUMarketPlace@gmail.com
              </a>
            </h4>
          </form>
        </section>
        <section className="section-2">
          <span>
            <input
              required
              className="Name"
              type="text"
              name="FullName"
              placeholder="Your Name *"
            />
            <input
              className="Email"
              type="email"
              name="EmailAddress"
              placeholder="Your Email *"
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Please enter a valid email address (e.g., example@domain.com)"
            />
            <input
              required
              className="Phone"
              type="tel"
              name="PhoneNumber"
              placeholder="Your Phone *"
            />
          </span>
          <textarea
            name="Message"
            placeholder="Your Message"
            required
            defaultValue={""}
          />
          <button className="send-btn" type="submit">
            Send Message
          </button>
        </section>
      </div>
    </div>
  );
};

export default Contactus;
