import React from 'react';

const SearchInput = (props) => (
  <div className="searchArea">
    <input
      type="search"
      id="searchBox"
      placeholder="Search Google..."
      onChange={props.handleGoogleChange}
    />
    <button className="submitButton" onClick={props.handleGoogleSubmit}>
      Search
        </button>
  </div>
);

export default SearchInput;
