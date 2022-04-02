import * as React from 'react';
import MainSection from './components/MainSection';
import MediaControls from './components/MediaControls';
import SideBar from './components/SideBar';

/**
 *  Main app component
 */
class App extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      displayedSection: 'EpisodeUpload',
      selectedPodcast: {},
      storedPodcasts: [],
      currentlyPlaying: {},
      currentlyEditing: {},
    };
    this.updateStoredPodcasts = this.updateStoredPodcasts.bind(this);
    this.updateDisplayedSection = this.updateDisplayedSection.bind(this);
    this.updateSelectedPodcast = this.updateSelectedPodcast.bind(this);
    this.updateCurrentlyPlaying = this.updateCurrentlyPlaying.bind(this);
    this.updateCurrentlyEditing = this.updateCurrentlyEditing.bind(this);
    this.findStoredPodcast = this.findStoredPodcast.bind(this);
    this.updateStoredLabelledSections =
      this.updateStoredLabelledSections.bind(this);
  }

  /**
   *
   */
  async componentDidMount() {
    // Get stored podcasts and save them to the state
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
   * @return {Array}
   */
  async getStoredPodcasts() {
    const result =
      await window.podcastStorage.getPodcastInfoDataFile();
    return result;
  }

  /**
   * @param {*} storedPodcasts
   */
  updateStoredPodcasts(storedPodcasts) {
    this.setState({
      storedPodcasts: storedPodcasts,
    });
  }

  /**
   * Update the labelled sections in storage
   * @param {string} podcastSlug
   * @param {string} episodeNumber
   * @param {Array} sections
   */
  async updateStoredLabelledSections(podcastSlug, episodeNumber, sections) {
    console.log(podcastSlug, episodeNumber, sections);
    const storedPodcasts = this.state.storedPodcasts;
    const podcastIndex = storedPodcasts.findIndex(function(podcast) {
      return podcast.slug == podcastSlug;
    });
    const episodeIndex =
      storedPodcasts[podcastIndex].episodes.findIndex(function(episode) {
        return episode.number == episodeNumber;
      });
    storedPodcasts[podcastIndex].episodes[episodeIndex].sections = sections;
    await window.podcastStorage.updatePodcastInfoDataFile(storedPodcasts);
    this.setState({
      storedPodcasts: storedPodcasts,
    });
  }

  /**
   *
   * @param {string} section
   */
  updateDisplayedSection(section) {
    this.setState({
      displayedSection: section,
    });
  }

  /**
   * Find a podcast in storage with a given slug
   * @param {string} podcastSlug
   * @return {object}
   */
  findStoredPodcast(podcastSlug) {
    const podcast =
      this.state.storedPodcasts.find(function(podcast) {
        return podcast.slug == podcastSlug;
      });

    return podcast;
  }

  /**
   * @param {string} podcastSlug
   */
  updateSelectedPodcast(podcastSlug) {
    const podcast = this.findStoredPodcast(podcastSlug);

    this.setState({
      selectedPodcast: podcast,
    });
  }

  /**
   * Change currently playing podcast episode
   * @param {object} currentlyPlaying
   */
  updateCurrentlyPlaying(currentlyPlaying) {
    this.setState({
      currentlyPlaying: currentlyPlaying,
    });
  }

  /**
   * Change podcast episode that is being edited
   * @param {string} podcastSlug
   * @param {string} episodeNumber
   */
  updateCurrentlyEditing(podcastSlug, episodeNumber) {
    const podcast = this.findStoredPodcast(podcastSlug);
    podcast.episode = podcast.episodes.filter(function(episode) {
      return episode.number == episodeNumber;
    })[0];
    this.setState({
      currentlyEditing: podcast,
    });
  }

  /**
   * @return {string}
   */
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-0">
            <SideBar
              podcasts={this.state.storedPodcasts}
              updateDisplayedSection={this.updateDisplayedSection}
              updateSelectedPodcast={this.updateSelectedPodcast}
            />
          </div>
          <div className="col-9 p-0">
            <MainSection
              displayedSection={this.state.displayedSection}
              updateStoredPodcasts={this.updateStoredPodcasts}
              storedPodcasts={this.state.storedPodcasts}
              selectedPodcast={this.state.selectedPodcast}
              updateCurrentlyPlaying={this.updateCurrentlyPlaying}
              updateDisplayedSection={this.updateDisplayedSection}
              updateCurrentlyEditing={this.updateCurrentlyEditing}
              currentlyEditing={this.state.currentlyEditing}
              updateStoredLabelledSections=
                {this.updateStoredLabelledSections}
            />
          </div>
        </div>
        <MediaControls currentlyPlaying={this.state.currentlyPlaying}/>
      </div>
    );
  }
}

export default App;
