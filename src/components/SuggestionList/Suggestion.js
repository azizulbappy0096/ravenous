import React from 'react';
import './SuggestionList.css';

import {Suggest, arrray} from '../../util/Suggest';



class Suggestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matched: []
        };
        this.renderList = this.renderList.bind(this);
    }

    renderList(text='as') {
        Suggest.search(text).then(jsonResponse => {
            const states =  jsonResponse;
            const city = states.map(cities => cities.cities);
            const helper = city.map(helper => helper.map(name => name.name));
          
            let name = [];
            for(let i=0; i<helper.length; i++) {
              helper[i].map(arr => {
                name.push(arr);
              })
            }
          
            let matches = name.filter(matchesCity => {
              const regex = new RegExp(`^${text}`, 'gi');
              return matchesCity.match(regex);
            })
            
            if(text.length === 0) {
              matches = [];
            }
            
            this.setState({
                matched: matches
            })
          }
          );
        //return <div>{this.state.matched}</div>
    }

    render() {
        
        return(
            <div>
            {this.renderList.bind(this, 'as')}
            <div>{this.state.matched}</div>
            </div>
            
        );   
    }

}

export default Suggestion;