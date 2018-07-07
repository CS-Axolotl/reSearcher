import React, { Component } from 'react';


const SearchResult = (props) => (
  <div className="searchResult">
    <input id={props.checkId} type="checkbox"/>
    <div className="searchDetail">
      <p>Title: {props.name}</p>
      <p>URL {props.url}</p>
      <p>Description: {props.description}</p>
    </div>
  </div>
);

export default SearchResult;