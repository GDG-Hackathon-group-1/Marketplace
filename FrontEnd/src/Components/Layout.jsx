import React, { useRef, useEffect, useState } from "react";
import "../CSS/App.css";
import Nav from "./Nav";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { CSSTransition } from "react-transition-group";

const Layout = () => {
  const location = useLocation();
  const isSignupPage = location.pathname === "/signup";
  const isLoginPage = location.pathname === "/login";
  const navRef = useRef(null);
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    setAnimateKey((prevKey) => prevKey + 1);
  }, [location.pathname]);

  return (
    <div className="App">
      <CSSTransition
        in={!isSignupPage && !isLoginPage}
        timeout={{ enter: 500, exit: 300 }}
        classNames="fade"
        unmountOnExit
        nodeRef={navRef}
      >
        <div ref={navRef}>
          <Nav />
        </div>
      </CSSTransition>

      <div
        key={`content-${animateKey}`}
        ref={contentRef}
        className="animate-in"
      >
        <Outlet />
      </div>

      <CSSTransition
        in={!isSignupPage && !isLoginPage}
        timeout={{ enter: 500, exit: 300 }}
        classNames="fade"
        unmountOnExit
        nodeRef={footerRef}
      >
        <div ref={footerRef}>
          <Footer />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Layout;
