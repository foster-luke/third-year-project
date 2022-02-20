import React from 'react';
import EpisodesListings from './EpisodesListings';

class MainSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div id="mainSection" className="container-fluid">
            <EpisodesListings />
        </div>
    }
}

export default MainSection;