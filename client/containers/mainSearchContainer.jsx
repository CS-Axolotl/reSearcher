import React, { Component } from 'react';
import SearchResult from './../components/searchResult.jsx';

class MainSearchContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hasRunSearch: true,
      searchResults: [],
      searchResultCount: 10
    }

  }
      populateSearchResults = () => {
        const output = [];
        for (let i = 0; i < this.state.searchResultCount; i += 1) {
          output.push(
            {
              name: `name_${i}`,
              id: `id_${i}`,
              title: `titleURL_${i}`,
              description: `this is a huge long description, but number ${i}`
            }
          );
        }
        this.setState({searchResults: output});
      }

  componentDidMount() {
    this.populateSearchResults();
  }
   

  render() {

    const searchInput = (
      <div className="searchArea">
        <input type="search" id="searchBox"
        placeholder="Search Google..." />
        <button className="submitButton">Search</button>
      </div>
    );

    const renderSwitch = () => {
      if (this.state.hasRunSearch) {
        const searchResultsArray = [];
        for (let i = 0; i < this.state.searchResults.length; i += 1) {
          const doc = this.state.searchResults[i];
          searchResultsArray.push(
            <SearchResult 
            {...doc}
            key={`result+${i}`} 
            />
          );
        }
        return (
          // add results component in here, below the searchInput element
          <div className="mainSearchContainer">
            {searchInput}
            <h2>Here are some search results</h2>
            {searchResultsArray}
          </div>
        );
        
        // return search and results sections 
      } else {
        return (
          <div className="mainSearchContainer">
            {searchInput}
            <h2>search has not not been run</h2>
          </div>
        );
        // return JUST the search sections 
      }
    }
    return renderSwitch();
  }

}

export default MainSearchContainer;