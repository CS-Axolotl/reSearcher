import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import SearchResult from '../components/SearchResult.jsx';
import DatabaseResult from '../components/DatabaseResult.jsx';
import SearchInput from '../components/SearchInput.jsx';
import ResultsButtons from '../components/ResultsButtons.jsx';

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
      googleQueryInput: event.target.value
    });
    if (this.state.googleQueryInput.length > 2) {
      // ********call db for all data *************
      axios.get('/api/queries')
        .then(({ data }) => {
          console.log(data);
        })
      // }
      // const fuse = new Fuse(database result array, options);
      // const result = fuse.search(this.state.googleQueryInput);
      // use fuse to search through
      // this.state.fuzzyResults.forEach((result) => {
      //   databaseResultsArray.push(<DatabaseResult result={this.state.fuzzyResults} />);
      // });
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
          const searchResults = data.map((element, i) => <SearchResult checkId={i} {...element} key={`result+${i}`} />);
          this.setState({ googleQueryInput: '', searchResults });
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
    this.setState({ searchResults: [...checkedDocs] });
    axios.post('/api/queries', { searchText: this.state.lastQuery, results: checkedDocs })
      .then(res => {
        console.log(res)
      })
  }

  render() {
    // render two different views, depending on if a search has been run in this session yet
    const header = this.state.hasRunSearch ? <h2>Your Results: {this.state.lastQuery}</h2> : <h2>Hi, {this.props.username}. Run your first search...or reSearch.</h2>
    return (
      // add results component in here, below the searchInput element
      <div className="mainSearchContainer">
        <div className="googleSearch">
          <SearchInput handleGoogleChange={this.handleGoogleChange} handleGoogleSubmit={this.handleGoogleSubmit} />
          {header}
          <ResultsButtons allOrNoneSelector={this.allOrNoneSelector} saveResults={this.saveResults} />
          {this.state.searchResults}
        </div>
        <div className="databaseSearch">
          <h2>Your Search: {this.state.googleQueryInput}</h2>
          {this.state.fuzzyResults}
        </div>
      </div>
    );
  }
}

export default MainSearchContainer;
