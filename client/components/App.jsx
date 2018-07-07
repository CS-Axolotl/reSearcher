import React, { Component } from 'react';
import MainSearchContainer from './../containers/mainSearchContainer.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 id="titleHeader">The ReSearcher</h1>
        <MainSearchContainer />
      </div>
    )
  }
}

export default App;
