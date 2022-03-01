import React from 'react';
import EpisodesListings from './EpisodesListings';
import EpisodeUpload from './EpisodeUpload';
import PropTypes from 'prop-types';

/**
 * Main Section component
 */
class MainSection extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @return {string}
   */
  render() {
    let displayedSection;
    switch (this.props.displayedSection) {
      case 'EpisodesListings':
        displayedSection = <EpisodesListings />;
        break;

      case 'EpisodeUpload':
        displayedSection =
          <EpisodeUpload
            updateStoredPodcasts={this.props.updateStoredPodcasts}
            storedPodcasts={this.props.storedPodcasts}
          />;
        break;

      default:
        break;
    }

    return <div id="mainSection" className="container-fluid">
      {displayedSection}
    </div>;
  }
}

MainSection.propTypes = {
  displayedSection: PropTypes.string.isRequired,
  updateStoredPodcasts: PropTypes.func.isRequired,
  storedPodcasts: PropTypes.array.isRequired,
};

export default MainSection;
