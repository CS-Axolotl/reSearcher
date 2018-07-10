import React from 'react';
const ResultsButtons = (props) => (
  <div className="filterButtons">
    <button id="allButton" onClick={props.allOrNoneSelector}>
      All
        </button>
    <button id="noneButton" onClick={props.allOrNoneSelector}>
      None
        </button>
    <button id="saveButton" onClick={props.saveResults}>
      Save
        </button>
  </div>
);

export default ResultsButtons;
