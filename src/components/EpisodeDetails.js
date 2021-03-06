import React from 'react';
import PropTypes from 'prop-types';

/**
 * Episode details component
 */
class EpisodeDetails extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      podcastName: '',
      podcastHosts: '',
      podcastGenre: '',
      episodeNumber: '',
      episodeName: '',
      selectedPodcastSlug: '',
      podcastSelectAlert: false,
      podcastSlugAlert: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEpisodeFormSubmit = this.handleEpisodeFormSubmit.bind(this);
    this.handlePodcastFormSubmit = this.handlePodcastFormSubmit.bind(this);
    this.handleSelectedPodcastChange =
      this.handleSelectedPodcastChange.bind(this);
  }

  /**
   * Episode details form submission
   * @param {*} e
   */
  async handleEpisodeFormSubmit(e) {
    e.preventDefault();

    // Validate podcast has been selected
    if (this.state.selectedPodcastSlug == '') {
      this.setState({podcastSelectAlert: true});
      return false;
    }

    let filename =
      this.state.selectedPodcastSlug + '-' +
      this.slugify(this.state.episodeNumber) + '-' +
      this.slugify(this.state.episodeName);

    // Move temp file
    filename = await this.props.moveTempEpisodeFile(
        this.props.tempFileLocation, filename,
    );

    // Add episode to podcast
    const storedPodcasts = this.props.storedPodcasts;
    const podcastIndex = this.props.storedPodcasts.findIndex(function(podcast) {
      return podcast.slug == this.state.selectedPodcastSlug;
    }, this);
    storedPodcasts[podcastIndex].episodes.push({
      number: this.state.episodeNumber,
      name: this.state.episodeName,
      filePath: filename,
    });
    this.props.updateStoredPodcasts(storedPodcasts);

    // Save new podcast details to storage
    await window.podcastStorage.updatePodcastInfoDataFile(storedPodcasts);
    this.props.moveToNextUploadedFile();
  }

  /**
   * Turn a string into a filename friendly format
   * @param {string} string
   * @return {string} slugified string
   */
  slugify(string) {
    return string
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^\w-]+/g, '');
  }

  /**
   * Podcast details form submission
   * @param {*} e
   */
  async handlePodcastFormSubmit(e) {
    e.preventDefault();
    const slug = this.slugify(this.state.podcastName);
    const podcasts = this.props.storedPodcasts;

    // If that podcast slug already exists, show error
    if (podcasts.find(function(podcast) {
      return podcast.slug == slug;
    }, this)) {
      this.setState({podcastSlugAlert: true});
      return false;
    }

    // Add new podcast to list of podcasts
    podcasts.push({
      name: this.state.podcastName,
      slug: slug,
      hosts: this.state.podcastHosts,
      genre: this.state.podcastGenre,
      episodes: [],
    });

    // Save podcast to storage
    await window.podcastStorage.updatePodcastInfoDataFile(podcasts);
    this.props.updateStoredPodcasts(podcasts);

    // Set selected podcast to new podcast
    this.setState({
      selectedPodcastSlug: slug,
      podcastSlugAlert: false,
    });
  }

  /**
   * Control the form inputs
   * @param {*} e
   */
  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState(
        {
          [name]: value,
        },
    );
  }

  /**
   * Handle the user changing the podcast
   * @param {*} e
   */
  handleSelectedPodcastChange(e) {
    const target = e.target;
    const slug = target.value;

    if (slug == '') {
      // If adding a new podcast
      this.setState(
          {
            selectedPodcastSlug: '',
            podcastName: '',
            podcastHosts: '',
            podcastGenre: '',
          },
      );
    } else {
      // Find the selected podcast from the list of stored ones
      const podcast = this.props.storedPodcasts.find(function(e) {
        return e.slug == slug;
      });

      // Set the podcast details inputs to the details of the selected podcast
      this.setState(
          {
            selectedPodcastSlug: podcast.slug,
            podcastName: podcast.name,
            podcastHosts: podcast.hosts,
            podcastGenre: podcast.genre,
          },
      );
    }
  }

  /**
   * @return {string}
   */
  render() {
    const podcastOptions = this.props.storedPodcasts.map((podcast) =>
      <option value={podcast.slug} key={podcast.slug}>{podcast.name}</option>,
    );

    return <div id="episodeDetails" className='container p-3'>
      <form onSubmit={this.handlePodcastFormSubmit}>
        <div className="mb-1 row">
          <div className="col-sm-12">
            <legend>Podcast Details</legend>
          </div>
        </div>
        <div className="mb-1 row">
          <label htmlFor="podcastSelect" className="col-sm-4 col-form-label">
            Select Podcast
          </label>
          <div className="col-sm-8">
            <select
              className="form-select form-select-sm"
              id="podcastSelect"
              placeholder='Select Podcast'
              value={this.state.selectedPodcastSlug}
              onChange={this.handleSelectedPodcastChange}
            >
              <option value="">New Podcast</option>
              {podcastOptions}
            </select>
          </div>
        </div>
        <div className="mb-1 row">
          <label htmlFor="podcastName" className="col-sm-4 col-form-label">
            Podcast Name
          </label>
          <div className="col-sm-8">
            <input
              type='text'
              id='podcastName'
              className='form-control form-control-sm'
              disabled={this.state.selectedPodcastSlug != ''}
              value={this.state.podcastName}
              name="podcastName"
              onChange={this.handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-1 row">
          <label htmlFor="podcastHosts" className="col-sm-4 col-form-label">
            Hosts
          </label>
          <div className="col-sm-8">
            <input
              type='text'
              id='podcastHosts'
              className='form-control form-control-sm'
              disabled={this.state.selectedPodcastSlug != ''}
              value={this.state.podcastHosts}
              name="podcastHosts"
              onChange={this.handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-1 row">
          <label htmlFor="podcastGenre" className="col-sm-4 col-form-label">
            Genre
          </label>
          <div className="col-sm-8">
            <input
              type='text'
              id='podcastGenre'
              className='form-control form-control-sm'
              disabled={this.state.selectedPodcastSlug != ''}
              value={this.state.podcastGenre}
              name="podcastGenre"
              onChange={this.handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-1 row">
          <div className="col-sm-4">
            <button
              type="submit"
              className="btn btnGrey btn-sm"
              id="savePodcast"
              disabled={this.state.selectedPodcastSlug != ''}
            >
            Save New Podcast
            </button>
          </div>
          <div className="col-sm-8">
            <div
              className={'alert alert-danger py-0 ' +
                (this.state.podcastSlugAlert ? '' : 'invisible')
              }
              id="podcastSelectAlert"
              role="alert"
            >
              This name is already in use
            </div>
          </div>
        </div>
      </form>
      <hr className="mb-1 mt-3"/>
      <form onSubmit={this.handleEpisodeFormSubmit}>
        <div className="mb-1 row">
          <div className="col-sm-12">
            <legend>Episode Details</legend>
          </div>
        </div>
        <div className="mb-1 row">
          <label htmlFor="episodeNumber" className="col-sm-4 col-form-label">
            Episode Number
          </label>
          <div className="col-sm-8">
            <input
              type='number'
              id='episodeNumber'
              className='form-control form-control-sm'
              value={this.state.episodeNumber}
              name="episodeNumber"
              onChange={this.handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-1 row">
          <label htmlFor="episodeName" className="col-sm-4 col-form-label">
            Episode Name
          </label>
          <div className="col-sm-8">
            <input
              type='text'
              id='episodeName'
              className='form-control form-control-sm'
              value={this.state.episodeName}
              name="episodeName"
              onChange={this.handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-1 row">
          <div className="col-sm-4">
            File Location
          </div>
          <div
            className="col-sm-8 mb-2"
            style={{
              'whiteSpace': 'nowrap',
              'textOverflow': 'ellipsis',
              'direction': 'rtl',
              'overflow': 'hidden',
              'textAlign': 'left',
            }}
          >
            {this.props.location}
          </div>
        </div>
        <div className="mb-1 row">
          <div className="col-sm-4">
            <button
              type="submit"
              className="btn btnGrey btn-sm"
              id="saveEpisode"
            >
              Save Episode Details
            </button>
          </div>
          <div className="col-sm-8 mb-2">
            <div
              className={'alert alert-danger py-0 ' +
                (this.state.podcastSelectAlert ? '' : 'invisible')
              }
              id="podcastSelectAlert"
              role="alert"
            >
              Please select a podcast
            </div>
          </div>
        </div>
      </form>
    </div>;
  }
}

EpisodeDetails.propTypes = {
  location: PropTypes.string.isRequired,
  moveTempEpisodeFile: PropTypes.func.isRequired,
  moveToNextUploadedFile: PropTypes.func.isRequired,
  tempFileLocation: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  storedPodcasts: PropTypes.array.isRequired,
  updateStoredPodcasts: PropTypes.func.isRequired,
};

export default EpisodeDetails;
