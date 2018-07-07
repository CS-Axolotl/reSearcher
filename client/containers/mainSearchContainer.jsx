import React, { Component } from 'react';
import SearchResult from './../components/searchResult.jsx';

class MainSearchContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hasRunSearch: false,
      searchResults: [],
      searchResultCount: 10
    }
  }

  runSearch = () =>  {
    const searchQuery = document.getElementById('searchBox').value;
    this.setState({hasRunSearch: true});
    this.populateSearchResults();
    console.log(searchQuery);
    // this.setState({lastQuery: searchQuery});
  }

  allOrNoneSelector = (e) =>  {
    const checkboxArray = document.querySelectorAll("div.searchResult > input");
    console.log(e.target.id);
    const status = e.target.id === 'allButton';
    checkboxArray.forEach(x => x.checked = status);
  }

  saveResults = () => {
    const checkboxArray = Array.from(document.querySelectorAll("div.searchResult > input"));
    const checkedDocs = checkboxArray.reduce((acc, current, index) => {
      if (current.checked === true) acc.push(this.state.searchResults[index]);
      return acc;
    }, []);
    console.log('checkbox array', checkboxArray);
    
    console.log('docs to save', checkedDocs);
    this.setState({searchResults: [...checkedDocs], hasRunSearch: false});

    // request to save resultDocsToSave
    // request to save queryToSave
    // bundle them both together 
  }

  // temporary function to populate dummy search results 
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
// temporary method to update state with dummy search results
  // componentDidMount() {
  //   if (this.state.hasRunSearch) this.populateSearchResults();
  // }

   

  render() {

    // search input box and button component 
    const searchInput = (
      <div className="searchArea">
        <input type="search" id="searchBox"
        placeholder="Search Google..."
         />
        <button className="submitButton" onClick={this.runSearch}>Search</button>
      </div>
    );
    
    const resultsButtons = (
      <div className="filterButtons">
        <button id="allButton" onClick={this.allOrNoneSelector}>All</button>
        <button id="noneButton" onClick={this.allOrNoneSelector}>None</button>
        <button id="saveButton" onClick={this.saveResults}>Save</button>
      </div>
    )
// render two different views, depending on if a search has been run in this session yet
    const renderSwitch = () => {
      if (this.state.hasRunSearch) {
        const searchResultsArray = [];
        for (let i = 0; i < this.state.searchResults.length; i += 1) {
          const doc = this.state.searchResults[i];
          searchResultsArray.push(
            <SearchResult checkId={i}
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
            {resultsButtons}
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