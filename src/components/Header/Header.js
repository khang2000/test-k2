import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to="/All">
          All
        </Link>
        <Link className="navbar-brand" to="/Active">
          Active
        </Link>
        <Link className="navbar-brand" to="/Completed">
          Complete
        </Link>
      </nav>
    </div>
  );
};

export default Header;
