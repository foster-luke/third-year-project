import React from 'react';
import Slider from './Slider';
import {Howl} from 'howler';
import PropTypes from 'prop-types';

/**
 * Media Controls component
 */
class MediaControls extends React.Component {
  /**
     * @param {*} props
     */
  constructor(props) {
    super(props);
    this.handlePlaybackPositionChange =
          this.handlePlaybackPositionChange.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleVolumeMute = this.handleVolumeMute.bind(this);
    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
    this.handleSkipBackwardButtonClick =
        this.handleSkipBackwardButtonClick.bind(this);
    this.handleSkipForwardButtonClick =
          this.handleSkipForwardButtonClick.bind(this);

    this.state = {
      currentlyPlaying: {
        length: 0,
        playbackPosition: 0,
        sound: null,
      },
      volume: 1,
      playing: false,
    };
  }

  /**
   *
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps) {
    if (
      this.props.currentlyPlaying.filePath != null &&
      this.
          props.
          currentlyPlaying.
          filePath != prevProps.currentlyPlaying.filePath
    ) {
      if (this.state.currentlyPlaying.sound != null) {
        this.state.currentlyPlaying.sound.unload();
      }
      this.getCurrentlyPlayingFile(this.props.currentlyPlaying.filePath);
    }
  }

  /**
   * Get the currently selected podcast file from storage
   * @param {string} filePath
   * @return {Howl}
   */
  async getCurrentlyPlayingFile(filePath) {
    const blob = await window.mediaControls.getPodcast(filePath);
    const sound = await new Howl({
      src: ['data:audio/mp3;base64,' + blob],
      html5: true,
      format: 'mp3',
    });
    // Get the podcast duration once it has loaded
    sound.once('load', (sound, updateDuration) =>
      this.updateDuration(this.state.currentlyPlaying.sound));

    // Save the audio object to the state so it can be played
    this.setState((prevState) => {
      const currentlyPlaying = {...prevState.currentlyPlaying};
      currentlyPlaying.sound = sound;
      return {currentlyPlaying};
    },
    this.setState({playing: false}));

    return sound;
  }

  /**
   * Update the duration of the podcast in state
   * @param {Howl} sound
   */
  async updateDuration(sound) {
    this.setState((prevState) => {
      const currentlyPlaying = {...prevState.currentlyPlaying};
      currentlyPlaying.length = sound.duration() / 60;
      return {currentlyPlaying};
    });
  }

  /**
   * Change the playback position
   * @param {number} playbackPosition
   */
  handlePlaybackPositionChange(playbackPosition) {
    // Scale the slider position in relation to the playback file length
    playbackPosition =
      this.state.currentlyPlaying.length * playbackPosition / 100;

    this.setState((prevState) => {
      const currentlyPlaying = {...prevState.currentlyPlaying};
      currentlyPlaying.playbackPosition = playbackPosition;
      return {currentlyPlaying};
    });
    this.state.currentlyPlaying.sound.seek(playbackPosition * 60);
  }

  /**
   * Move the playback backwards by 1 minute
   */
  handleSkipBackwardButtonClick() {
    const playbackPosition = this.state.currentlyPlaying.playbackPosition - 1;
    this.state.currentlyPlaying.sound.seek(playbackPosition * 60);
  }

  /**
   * Move the playback forwards by 1 minute
   */
  handleSkipForwardButtonClick() {
    const playbackPosition = this.state.currentlyPlaying.playbackPosition + 1;
    this.state.currentlyPlaying.sound.seek(playbackPosition * 60);
  }

  /**
   * Change the playback volume
   * @param {number} volume
   */
  handleVolumeChange(volume) {
    volume = volume / 100;
    this.state.currentlyPlaying.sound.volume(volume);
    this.setState({volume: volume});
  }

  /**
   * Track the current position in the playback
   */
  startPlaybackTimer() {
    this.trackTime = setInterval(() => {
      this.setState((prevState) => {
        const currentlyPlaying = {...prevState.currentlyPlaying};
        currentlyPlaying.playbackPosition =
          this.state.currentlyPlaying.sound.seek() / 60;
        return {currentlyPlaying};
      });
    }, 1000);
  }

  /**
   * Toggle play/pause the playback
   */
  async handlePlayPauseClick() {
    const playing = !this.state.playing;
    this.setState({playing: playing});
    if (playing) {
      this.state.currentlyPlaying.sound.play();
      this.startPlaybackTimer();
    } else {
      this.state.currentlyPlaying.sound.pause();
      clearInterval(this.trackTime);
    }
  }

  /**
   * Mute the playback volume
   */
  handleVolumeMute() {
    this.handleVolumeChange(0);
  }

  /**
   * @return {string}
   */
  render() {
    return <>
      <div className='text-center'>
        <div className='row mediaControls'>
          <div className='col-3 currentlyPlaying'>
                        Currently Playing: <br/>
            { this.props.currentlyPlaying.podcastName } <br/>
            { this.props.currentlyPlaying.episodeName }
          </div>
          <div className='col-6'>
            <div className='row'>
              <div className='col-12'>
                <button
                  className="mediaControlButton"
                  onClick={this.handleSkipBackwardButtonClick}
                >
                  <i className="bi bi-skip-backward"></i>
                </button>
                <PlayPauseButton
                  playing={this.state.playing}
                  handlePlayPauseClick={this.handlePlayPauseClick}
                />
                <button
                  className="mediaControlButton"
                  onClick={this.handleSkipForwardButtonClick}
                >
                  <i className="bi bi-skip-forward"></i>
                </button>
              </div>
              <PlaybackProgress
                handlePlaybackPositionChange={this.handlePlaybackPositionChange}
                playbackPosition={this.state.currentlyPlaying.playbackPosition}
                length={this.state.currentlyPlaying.length}
              />
            </div>
          </div>
          <div className='col-3'>
            <VolumeControls
              volume={this.state.volume}
              handleVolumeChange={this.handleVolumeChange}
              handleVolumeMute={this.handleVolumeMute}
            />
          </div>
        </div>
      </div>
    </>;
  }
}

MediaControls.propTypes = {
  currentlyPlaying: PropTypes.object.isRequired,
};

/**
 * Volume controls component
 * @param {*} props
 * @return {html}
 */
function VolumeControls(props) {
  // Change icon depending on volume level
  let volumeIcon;
  if (props.volume == 0) {
    volumeIcon = <i className="bi bi-volume-mute"></i>;
  } else if (props.volume < 0.5) {
    volumeIcon = <i className="bi bi-volume-down"></i>;
  } else {
    volumeIcon = <i className="bi bi-volume-up"></i>;
  }

  return (
    <div className="row volumeControls">
      <div className="col-2">
        <button
          id="volumeMuteButton"
          className="btn btnIcon"
          onClick={props.handleVolumeMute}
        >
          {volumeIcon}
        </button>
      </div>
      <div className="col-10">
        <Slider
          onSliderChange={props.handleVolumeChange}
          progress={props.volume * 100}
        />
      </div>
    </div>
  );
}
VolumeControls.propTypes = {
  volume: PropTypes.number.isRequired,
  handleVolumeMute: PropTypes.func.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
};

/**
 * Format time from a float to a string
 * @param {number} time
 * @return {string}
 */
function formatTime(time) {
  const seconds = (time % 1);
  let relativeSeconds = parseInt(seconds * 60);

  // Add leading 0s if less than 2 digits long
  relativeSeconds = relativeSeconds.toString().padStart(2, '0');

  const hours = parseInt(time / 60);
  let minutes = parseInt(time) % 60;
  let formattedTime = '';

  if (hours > 0) {
    // Add hours to start of string and ensure minutes are 2 digits long
    minutes = minutes.toString().padStart(2, '0');
    formattedTime = hours + ':' + formattedTime;
  }

  formattedTime += minutes + ':' + relativeSeconds;
  return formattedTime;
}

/**
 * Playback progress component
 * @param {*} props
 * @return {string}
 */
function PlaybackProgress(props) {
  const progress = props.playbackPosition / props.length * 100;
  return (
    <div className='playbackProgress row'>
      <div className='col-2 text-right'>
        {formatTime(props.playbackPosition)}
      </div>
      <div className='col-8'>
        <Slider
          onSliderChange={props.handlePlaybackPositionChange}
          progress={progress}
        />
      </div>
      <div className='col-2 text-left'>
        {formatTime(props.length)}
      </div>
    </div>
  );
}
PlaybackProgress.propTypes = {
  playbackPosition: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  handlePlaybackPositionChange: PropTypes.func.isRequired,
};

/**
 * Play/Pause button component
 * @param {*} props
 * @return {string}
 */
function PlayPauseButton(props) {
  let icon;
  if (props.playing) {
    icon = <i className="bi bi-pause"></i>;
  } else {
    icon = <i className="bi bi-play"></i>;
  }
  return <button
    className="mediaControlButton"
    onClick={props.handlePlayPauseClick}
  >
    {icon}
  </button>;
}
PlayPauseButton.propTypes = {
  playing: PropTypes.bool.isRequired,
  handlePlayPauseClick: PropTypes.func.isRequired,
};

export default MediaControls;
