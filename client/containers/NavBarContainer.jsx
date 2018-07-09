import React from 'react';

const NavBarContainer = props => (
  <div className="navBar">
    <button id="logout" onClick={props.logout}>Logout</button>
  </div>
);

export default NavBarContainer;
