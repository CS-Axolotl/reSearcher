import React from "react";
import { createMarkup } from "./../utils";

const DatabaseResult = props => (
  <div className="databaseResult">
    <div className="resultDetail">
      <p>
        Title: <span dangerouslySetInnerHTML={createMarkup(props.htmlTitle)} />
      </p>
      <p>
        URL <a href={props.link}>{props.link}</a>
      </p>
      <p>
        Description:{" "}
        <span dangerouslySetInnerHTML={createMarkup(props.htmlSnippet)} />
      </p>
    </div>
  </div>
);

export default DatabaseResult;
