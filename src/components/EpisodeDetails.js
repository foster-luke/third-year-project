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
      storedPodcasts: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEpisodeFormSubmit = this.handleEpisodeFormSubmit.bind(this);
    this.handlePodcastFormSubmit = this.handlePodcastFormSubmit.bind(this);
    this.handleSelectedPodcastChange =
      this.handleSelectedPodcastChange.bind(this);
  }

  /**
   *
   */
  async componentDidMount() {
    const storedPodcasts =
      await this.getStoredPodcasts().then(function(result) {
        return result;
      });
    this.setState({
      storedPodcasts: storedPodcasts,
    });
  }

  /**
   * Get all podcasts that are currently stored in the file system
   * @return {JSON}
   */
  async getStoredPodcasts() {
    const result =
      await window.podcastStorage.getPodcastInfoDataFile();
    return result;
  }

  /**
   * Episode details form submission
   * @param {*} e
   */
  handleEpisodeFormSubmit(e) {
    e.preventDefault();
    const filename =
      this.state.selectedPodcastSlug + '-' +
      this.slugify(this.state.episodeNumber) + '-' +
      this.slugify(this.state.episodeName);
    this.props.saveEpisodeDetails(this.props.tempFileLocation, filename);
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
  handlePodcastFormSubmit(e) {
    e.preventDefault();
    const slug = this.slugify(this.state.podcastName);
    const podcasts = this.state.storedPodcasts;
    podcasts.push({
      name: this.state.podcastName,
      slug: slug,
      hosts: this.state.podcastHosts,
      genre: this.state.podcastGenre,
    });

    console.log(podcasts);

    this.setState({
      storedPodcasts: podcasts,
      selectedPodcastSlug: slug,
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

    if (slug == 'new') {
      // If adding a new podcast
      this.setState(
          {
            selectedPodcastSlug: 'new',
            podcastName: '',
            podcastHosts: '',
            podcastGenre: '',
          },
      );
    } else {
      // Find the selected podcast from the list of stored ones
      const podcast = this.state.storedPodcasts.find(function(e) {
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
    const podcastOptions = this.state.storedPodcasts.map((podcast) =>
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
              <option value="" disabled>Select Podcast</option>
              <option value="new">New Podcast</option>
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
              disabled={this.state.selectedPodcastSlug != 'new'}
              value={this.state.podcastName}
              name="podcastName"
              onChange={this.handleInputChange}
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
              disabled={this.state.selectedPodcastSlug != 'new'}
              value={this.state.podcastHosts}
              name="podcastHosts"
              onChange={this.handleInputChange}
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
              disabled={this.state.selectedPodcastSlug != 'new'}
              value={this.state.podcastGenre}
              name="podcastGenre"
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary btnGrey btn-sm"
          id="savePodcast"
        >
          Save New Podcast
        </button>
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
            />
          </div>
        </div>
        <div className="mb-1 row">
          <div className="col-sm-4">
            File Location
          </div>
          <div className="col-sm-8 mb-2">
            {this.props.location}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary btnGrey btn-sm"
          id="saveEpisode"
        >
          Save Episode Details
        </button>
      </form>
    </div>;
  }
}

EpisodeDetails.propTypes = {
  location: PropTypes.string.isRequired,
  saveEpisodeDetails: PropTypes.func.isRequired,
  tempFileLocation: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default EpisodeDetails;
