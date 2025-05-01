import React from "react";
import "../CSS/App.css"
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
const Layout = () => {
  return (
    <div>
      <div className="App">
        <Nav />
        <div>
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
