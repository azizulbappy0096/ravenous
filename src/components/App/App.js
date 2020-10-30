import React from 'react';
import './App.css';

import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Service from '../Service/Service';

import SuggestionList from '../SuggestionList/SuggestionList'

import Yelp from '../../util/Yelp';
import Suggestion from '../SuggestionList/Suggestion';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    };

    this.searchYelp = this.searchYelp.bind(this);
    this.check = this.check.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(business => {
      this.setState(
        {
          businesses: business
        }
      );
    });
  }

  check() {
    if(this.state.businesses.status) {
      return <Service apology={this.state.businesses}/>;
      
    }else {
      return <BusinessList businesses={this.state.businesses}/>;
    }
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp}/>
        {this.check()}
        <Suggestion />
      </div>
    );
  }
}

export default App;