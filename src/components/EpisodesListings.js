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
        return <EpisodeListing episode={episode} key={episode.number}/>;
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
}

EpisodesListings.propTypes = {
  storedPodcasts: PropTypes.array.isRequired,
  podcast: PropTypes.object.isRequired,
};

/**
 * A single episode in the list
 * @param {*} props
 * @return {string}
 */
function EpisodeListing(props) {
  // Return a single episode row
  return <div className="row">
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
      <button className="btn btnIcon">
        <i className="bi bi-three-dots"></i>
      </button>
    </div>
  </div>;
}

EpisodeListing.propTypes = {
  episode: PropTypes.object.isRequired,
};


export default EpisodesListings;
