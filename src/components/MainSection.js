import React from 'react';
import EpisodesListings from './EpisodesListings';
import EpisodeUpload from './EpisodeUpload';

class MainSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let displayedSection;
        switch (this.props.displayedSection) {
            case "EpisodesListings":
                displayedSection = <EpisodesListings />;
                break;

            case "EpisodeUpload":
                displayedSection = <EpisodeUpload />;
                break;

            default:
                break;
        }

        return <div id="mainSection" className="container-fluid">
            {displayedSection}
        </div>
    }
}

export default MainSection;