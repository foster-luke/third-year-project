import React from 'react';
import EpisodesListings from './EpisodesListings';
import EpisodeUpload from './EpisodeUpload';
import PropTypes from 'prop-types';
import SectionLabelling from './SectionLabelling';

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
        displayedSection =
          <EpisodesListings
            podcast={this.props.selectedPodcast}
            storedPodcasts={this.props.storedPodcasts}
            updateCurrentlyPlaying={this.props.updateCurrentlyPlaying}
            updateDisplayedSection={this.props.updateDisplayedSection}
            updateCurrentlyEditing={this.props.updateCurrentlyEditing}
          />;
        break;

      case 'EpisodeUpload':
        displayedSection =
          <EpisodeUpload
            updateStoredPodcasts={this.props.updateStoredPodcasts}
            storedPodcasts={this.props.storedPodcasts}
          />;
        break;

      case 'SectionLabelling':
        displayedSection =
          <SectionLabelling
            podcast={this.props.currentlyEditing}
            updateStoredLabelledSections=
              {this.props.updateStoredLabelledSections}
            updateDisplayedSection={this.props.updateDisplayedSection}
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
  selectedPodcast: PropTypes.object.isRequired,
  updateCurrentlyPlaying: PropTypes.func.isRequired,
  updateCurrentlyEditing: PropTypes.func.isRequired,
  updateDisplayedSection: PropTypes.func.isRequired,
  updateStoredLabelledSections: PropTypes.func.isRequired,
  currentlyEditing: PropTypes.object,
};

export default MainSection;
