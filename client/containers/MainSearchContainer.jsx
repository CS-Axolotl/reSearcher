import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import SearchResult from '../components/SearchResult.jsx';
import DatabaseResult from '../components/DatabaseResult.jsx';

const options = {
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  distance: 50,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['htmlTitle', 'link', 'htmlSnippet'],
};

class MainSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasRunSearch: false,
      searchResults: [],
      searchResultCount: 10,
      sessionResults: [],
      googleQueryInput: '',
      lastQuery: '',
      fuzzyResults: [],
    };
  }

  handleGoogleChange = (event) => {
    this.setState({
      googleQueryInput: event.target.value,
      hasRunSearch: true,
    });
    if (this.state.googleQueryInput.length > 2) {
      // ********call db for all data *************
      // const fuse = new Fuse(database result array, options);
      // const result = fuse.search(this.state.googleQueryInput);
      // use fuse to search through
    }
  }

  handleGoogleSubmit = (event) => {
    event.preventDefault();
    const getData = () => {
      const searchQuery = this.state.googleQueryInput;
      this.setState({
        lastQuery: this.state.googleQueryInput,
        hasRunSearch: true,
      });

      axios
        .get('/api/search', { params: { q: searchQuery } })
        .then(({ data }) => {
          this.setState({ googleQueryInput: '', searchResults: [...data] });
        })
        .catch(err => console.log(err));
    };
    getData();
  }

  allOrNoneSelector = (e) => {
    const checkBox = () => {
      // add a prop to search results
      const checkboxArray = document.querySelectorAll('div.searchResult > input');

      const status = e.target.id === 'allButton';
      checkboxArray.forEach((x) => {
        x.checked = status;
      });
    };
    checkBox();
  }

  saveResults = () => {
    const checkboxArray = Array.from(document.querySelectorAll('div.searchResult > input'));
    const checkedDocs = checkboxArray.reduce((acc, current, index) => {
      if (current.checked === true) acc.push(this.state.searchResults[index]);
      return acc;
    }, []);
    this.setState({ searchResults: [...checkedDocs], hasRunSearch: false });
    axios.post('/api/queries', { searchText: this.state.lastQuery, results: checkedDocs })
      .then(res => {
        console.log(res)
      })
  }

  render() {
    // search input box and button component
    const searchInput = (
      <div className="searchArea">
        <input
          type="search"
          id="searchBox"
          placeholder="Search Google..."
          onChange={this.handleGoogleChange}
        />
        <button className="submitButton" onClick={this.handleGoogleSubmit}>
          Search
        </button>
      </div>
    );

    const reSearchInput = (
      <div className="reSearchArea">
        <input
          type="search"
          id="reSearchBox"
          placeholder="reSearch Google..."
          // onChange={this.handleDatabaseChange}
        />
        <button
          className="submitButton"
          // onClick={this.handleDatabaseSubmit}
        >
          reSearch
        </button>
      </div>
    );

    const resultsButtons = (
      <div className="filterButtons">
        <button id="allButton" onClick={this.allOrNoneSelector}>
          All
        </button>
        <button id="noneButton" onClick={this.allOrNoneSelector}>
          None
        </button>
        <button id="saveButton" onClick={this.saveResults}>
          Save
        </button>
      </div>
    );
    // render two different views, depending on if a search has been run in this session yet
    const renderSwitch = () => {
      if (this.state.hasRunSearch) {
        const searchResultsArray = [];
        // make that a map
        for (let i = 0; i < this.state.searchResults.length; i += 1) {
          const doc = this.state.searchResults[i];
          searchResultsArray.push(<SearchResult checkId={i} {...doc} key={`result+${i}`} />);
        }
        const databaseResultsArray = [];
        this.state.fuzzyResults.forEach((result) => {
          databaseResultsArray.push(<DatabaseResult result={this.state.fuzzyResults} />);
        });

        return (
          // add results component in here, below the searchInput element
          <div className="mainSearchContainer">
            <div className="googleSearch">
              {searchInput}
              <h2>Your Results: {this.state.lastQuery}</h2>
              {resultsButtons}
              {searchResultsArray}
            </div>
            <div className="databaseSearch">
              <h2>Your Search: {this.state.googleQueryInput}</h2>
              {databaseResultsArray}
            </div>
          </div>
        );

        // return search and results sections
      }
      return (
        <div className="mainSearchContainer">
          <div className="doubleSearch">
            {searchInput}
          </div>
          <h2>Hi, {this.props.username}. Run your first search...or reSearch.</h2>
        </div>
      );
    };
    return renderSwitch();
  }
}

export default MainSearchContainer;