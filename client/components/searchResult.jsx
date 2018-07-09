import React from 'react';
import { createMarkup } from './../utils';


const SearchResult = (props) => (
  <div className="searchResult">
    <input id={props.checkId} type="checkbox"/>
    <div className="searchDetail">
      <p>Title: <span dangerouslySetInnerHTML={createMarkup(props.htmlTitle)} /></p>
      <p>URL <a href={props.link}>{props.link}</a></p>
      <p>Description: <span dangerouslySetInnerHTML={createMarkup(props.htmlSnippet)} /></p>
    </div>
  </div>
);

export default SearchResult;