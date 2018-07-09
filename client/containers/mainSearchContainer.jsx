import React, { Component } from 'react';
import SearchResult from './../components/searchResult.jsx';
import axios from 'axios';
import { createMarkup } from './../utils';

class MainSearchContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hasRunSearch: false,
      searchResults: [],
      searchResultCount: 10,
      sessionResults: [],
      lastQuery: ''
    }
  }



  runSearch = () =>  {
    // extract search input out into a separate component
    // refs -- how you if you need to access a DOM node that's a child of component
    // make the serach input a ref 
    // no DOM manipulation 
    // 
    const searchQuery = document.getElementById('searchBox').value;
    if (searchQuery.length > 0) {
      this.setState({hasRunSearch: true, lastQuery: searchQuery});
      axios.get('/api/search', {params: {q: searchQuery}})
        .then(({ data }) => {
          document.getElementById('searchBox').value = '';
          this.setState({searchResults: [...data]});
        })
        .catch(err => console.log(err));
    } 
    console.log(searchQuery);
    // this.setState({lastQuery: searchQuery});
    // 
  }

  allOrNoneSelector = (e) =>  {
    // add a prop to search results 
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
    
    console.log('docs to save', checkedDocs);
    this.setState({searchResults: [...checkedDocs], hasRunSearch: false});

    // request to save resultDocsToSave
    // request to save queryToSave
    // bundle them both together 
  }
   

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

    const reSearchInput = (
      <div className="reSearchArea">
        <input type="search" id="reSearchBox"
          placeholder="reSearch Google..."
        />
        <button className="submitButton" onClick={this.runSearch}>reSearch</button>
      </div>
    )
    
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
        // make that a map
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
            <h2>Your Results: {this.state.lastQuery}</h2>
            {resultsButtons}
            {searchResultsArray}
          </div>
        );
        
        // return search and results sections 
      } else {
        return (
          <div className="mainSearchContainer">
            <div className="doubleSearch">
              {searchInput}
              {reSearchInput}
            </div>
            <h2>Hi, {this.props.username}. Run your first search...or reSearch.</h2>
          </div>
        );
        // return JUST the search sections 
      }
    }
    return renderSwitch();
  }
}



export default MainSearchContainer;