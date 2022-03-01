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
      storedPodcasts: [],
    };
    this.updateStoredPodcasts = this.updateStoredPodcasts.bind(this);
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
   * @return {string}
   */
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-0">
            <SideBar podcasts={this.state.storedPodcasts}/>
          </div>
          <div className="col-9 p-0">
            <MainSection
              displayedSection={this.state.displayedSection}
              updateStoredPodcasts={this.updateStoredPodcasts}
              storedPodcasts={this.state.storedPodcasts}
            />
          </div>
        </div>
        <MediaControls />
      </div>
    );
  }
}

export default App;
