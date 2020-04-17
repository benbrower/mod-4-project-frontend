import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  const { handleLogout } = props;

  return (
    <div className="navbar">
      <NavLink to="/">Login</NavLink>
      <NavLink to="/leaderboard">Leaderboard</NavLink>
      <NavLink to="/play">Play</NavLink>
      {props.logged_in ? <button onClick={handleLogout}>Log Out</button> : null}
    </div>
  );
};

export default NavBar;
