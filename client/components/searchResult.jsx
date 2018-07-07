import React, { Component } from 'react';


const SearchResult = (props) => (
  <div className="searchResult">
    <input type="checkbox"/>
    <div className="searchDetail">
      <p>Title: {props.name}</p>
      <p>Description: {props.description}</p>
      <p>URL {props.url}</p>
    </div>
  </div>
);

export default SearchResult;