import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };

    
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchKey = this.handleSearchKey.bind(this);

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
  }

  getsortByClass(sortByOption) {
    if(sortByOption === this.state.sortBy) {
      return 'active';
    }else {
      return '';
    }
  }

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption
    });
    this.handleSearch();
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  handleSearch(event) {
    this.props.searchYelp(
      this.state.term,
      this.state.location,
      this.state.sortBy
    );
    //event.preventDefault();
  }

  handleSearchKey(event) {
    if(this.state.term && this.state.location) {
      if (event.key === "Enter") {
        this.handleSearch();    
      }
    }
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getsortByClass(sortByOptionValue)}  key={this.sortByOptionValue}>{sortByOption}</li>;
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={this.handleTermChange} onKeyPress={this.handleSearchKey} placeholder="Search Businesses" />
          <input onChange={this.handleLocationChange} onKeyPress={this.handleSearchKey} placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch} >Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;