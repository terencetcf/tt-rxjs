import React from "react";
import NavItem from "./NavItem";

const Header: React.FunctionComponent = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#">
          Book Store
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <NavItem to="/" label="Home" />
            <NavItem to="/books" label="Books" />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
