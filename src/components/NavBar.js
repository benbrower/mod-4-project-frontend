import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  const { handleLogout } = props;

  return (
    <div className="navbar">
      {props.logged_in ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : (
        <NavLink to="/">Log In</NavLink>
      )}

      <NavLink to="/leaderboard">Leaderboard</NavLink>
      <NavLink to="/play">Play</NavLink>
    </div>
  );
};

export default NavBar;
