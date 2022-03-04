import React from 'react';
import PropTypes from 'prop-types';

/**
 * List of episodes component
 */
class EpisodesListings extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.handleEpisodeClick = this.handleEpisodeClick.bind(this);
    this.handleLabelSectionsButtonClick =
      this.handleLabelSectionsButtonClick.bind(this);
  }

  /**
   * @return {string}
   */
  render() {
    // Build the episodes view
    const episodes = <div id="episodes">
      <div className="row" id="episodesListingsHeader">
        <div className="col-1">
                    #
        </div>
        <div className="col-4">
                    Episode Name
        </div>
        <div className="col-2 text-center">
                    Length
        </div>
        <div className="col-2 text-center">
                    Analysed
        </div>
        <div className="col-2 text-center">
                    Trimmed
        </div>
      </div>
      {this.props.podcast.episodes.map((episode) => {
        return <EpisodeListing
          episode={episode}
          key={episode.number}
          handleEpisodeClick={this.handleEpisodeClick}
          handleLabelSectionsButtonClick={this.handleLabelSectionsButtonClick}
          podcastName={this.props.podcast.name}
        />;
      })}
    </div>;

    return <div id="episodesListings">
      <div className="row" id="podcastHeader">
        <div className="col-6" id="podcastName">
          {this.props.podcast.name}
        </div>
        <div className="col-6" id="podcastDetails">
                    Genre: {this.props.podcast.genre} <br />
                    Hosts: {this.props.podcast.hosts} <br />
        </div>
      </div>
      {episodes}
    </div>;
  }

  /**
   *  Change the currently playing episode
   * @param {object} episode
   * @param {string} podcastName
   */
  handleEpisodeClick(episode, podcastName) {
    this.props.updateCurrentlyPlaying({
      filePath: episode.filePath,
      episodeName: episode.name,
      podcastName: podcastName,
    });
  }

  /**
   *
   * @param {*} e
   */
  handleLabelSectionsButtonClick(e) {
    e.stopPropagation();
    this.props.updateDisplayedSection('SectionLabelling');
  }
}

EpisodesListings.propTypes = {
  storedPodcasts: PropTypes.array.isRequired,
  podcast: PropTypes.object.isRequired,
  updateCurrentlyPlaying: PropTypes.func.isRequired,
  updateDisplayedSection: PropTypes.func.isRequired,
};

/**
 * A single episode in the list
 * @param {*} props
 * @return {string}
 */
function EpisodeListing(props) {
  // Return a single episode row
  return <div
    className="row episodeListing"
    onClick={() => props.handleEpisodeClick(props.episode, props.podcastName)}
  >
    <div className="col-1">
      {props.episode.number}.
    </div>
    <div className="col-4">
      {props.episode.name}
    </div>
    <div className="col-2 text-center">
      {props.episode.length}
    </div>
    <div className="col-2 text-center">
      {props.episode.analysed ?
        <i className="bi bi-check-lg"></i> :
        <i className="bi bi-x-lg"></i>
      }
    </div>
    <div className="col-2 text-center">
      {props.episode.ads_removed ?
        <i className="bi bi-check-lg"></i> :
        <i className="bi bi-x-lg"></i>
      }
    </div>
    <div className="col-1 text-center">
      <div className="dropdown">
        <button
          className="btn btn-secondary btnIcon"
          type="button"
          data-bs-toggle="dropdown"
          onClick={handleSettingsButtonClick}
        >
          <i className="bi bi-three-dots"></i>
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={props.handleLabelSectionsButtonClick}
            >
              Label Sections
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>;
}

/**
 * Prevents the parent row onclick even from firing
 * @param {*} e
 */
function handleSettingsButtonClick(e) {
  e.stopPropagation();
}

EpisodeListing.propTypes = {
  episode: PropTypes.object.isRequired,
  podcastName: PropTypes.string.isRequired,
  handleEpisodeClick: PropTypes.func.isRequired,
  handleLabelSectionsButtonClick: PropTypes.func.isRequired,
};


export default EpisodesListings;
