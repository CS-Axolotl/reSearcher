import React, {Component} from 'react';

const NavBarContainer = (props) => {
  return (
  <div className="navBar">
    <button id="logout" onClick={props.logout}>Logout</button>
  </div>
  );
}

export default NavBarContainer;