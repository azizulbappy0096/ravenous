import React from 'react';
import './SuggestionList.css';

import {Suggest, arrray} from '../../util/Suggest';



class SuggestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matched: arrray
        };
        this.renderList = this.renderList.bind(this);
    }

    renderList(text) {
        Suggest.search(text);
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

export default SuggestionList;

