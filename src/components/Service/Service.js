import React from 'react';

import './Service.css';

class Service extends React.Component {
    render() {
        return(
            <div className="class">
                <h3 className="classname">{this.props.apology.apology}</h3>            
                <h3 className="classname">{this.props.apology.status}</h3>            
            </div>
        )
    }
}

export default Service;