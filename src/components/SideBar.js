import React from 'react';
import PropTypes from 'prop-types';

/**
 * Sidebar component
 */
class SideBar extends React.Component {
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
    return <div id="sideBar" className="container-fluid">
      <div className="row">
        <div className="col mt-2 me-2 mb-2 fs-4">
          Podcasts
          <button
            className='btn btnIcon float-end fs-4'
            onClick={this.handleUploadButtonClick}
          >
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
        <hr className='mb-0'/>
      </div>
      <div className="row">
        <div className="col">
          <PodcastsList
            podcasts={this.props.podcasts}
            handlePodcastLinkClick={this.handlePodcastLinkClick}
          />
        </div>
      </div>
    </div>;
  }

  /**
   * @param {*} e
   */
  handlePodcastLinkClick(e) {
    console.log('Click!');
  }

  /**
   * @param {*} e
   */
  handleUploadButtonClick(e) {
    console.log('Click!');
  }
}

SideBar.propTypes = {
  podcasts: PropTypes.array.isRequired,
};

/**
 *
 * @param {Object} props
 * @return {string}
 */
function PodcastsList(props) {
  return <>
    {props.podcasts.map(function(podcast) {
      return <PodcastLink
        key={podcast.slug}
        podcast={podcast}
        handlePodcastLinkClick={props.handlePodcastLinkClick}
      />;
    })}
  </>;
}

PodcastsList.propTypes = {
  podcasts: PropTypes.array.isRequired,
  handlePodcastLinkClick: PropTypes.func.isRequired,
};

/**
 * @param {Object} props
 * @return {string}
 */
function PodcastLink(props) {
  return <div
    className='row btnIcon fs-6 text-start podcastLink my-1 py-1 pb-2'
    onClick={props.handlePodcastLinkClick}
  >
    <div className="col-9 px-0">{props.podcast.name}</div>
    <div className="col-3" style={{alignSelf: 'center'}}>
      <i className='bi bi-arrow-right-circle float-end'></i>
    </div>
  </div>
  ;
}

PodcastLink.propTypes = {
  podcast: PropTypes.object.isRequired,
  handlePodcastLinkClick: PropTypes.func.isRequired,
};

export default SideBar;
