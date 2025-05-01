import React from "react";
import "../CSS/notfound.css";
const Page404 = () => {
  return (
    <div>
      <title>404 Not Found</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Page not found" />
      <meta name="author" content="Team 1 Section B AASTU students" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="/Assets/favicon.png" type="image/x-icon" />
      <link rel="stylesheet" href="notfound.css" />
      <link
        rel="stylesheet"
        href="/Styles/Common Header and footer/style.css"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Sora:wght@100..800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <div className="sub-nav">
        <a style={{ textDecoration: "none", color: "#aaa" }} href="#">
          Home
        </a>
        /<p style={{ display: "inline", color: "black" }}>404 Error</p>
      </div>
      <main>
        <div className="error-container">
          <h1 className="headerr">404 Not Found</h1>
          <p>
            The site you are looking for isn't found. You may go back to the
            homepage now.
          </p>
          <a href="/Home/Home.html" className="home-button">
            Back to home page
          </a>
        </div>
      </main>
    </div>
  );
};

export default Page404;
