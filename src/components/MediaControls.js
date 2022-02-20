import React from 'react';
import Slider from './Slider';

class MediaControls extends React.Component {
    constructor(props) {
        super(props);

        this.handlePlaybackPositionChange = this.handlePlaybackPositionChange.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.handleVolumeMute = this.handleVolumeMute.bind(this);
        this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this);

        this.state = {
            currentlyPlaying: {
                podcastName: "Lorem Ipsum",
                episodeName: "Episode 123: Dolor Est",
                length: 25.25,
                playbackPosition:  4
            },
            volume: 0.2,
            playing: false
        }
    }

    handlePlaybackPositionChange(playbackPosition) {
        // Scale the slider position in relation to the playback file length
        playbackPosition = this.state.currentlyPlaying.length * playbackPosition / 100;

        this.setState(prevState => {
            let currentlyPlaying = { ...prevState.currentlyPlaying };
            currentlyPlaying.playbackPosition = playbackPosition;
            return { currentlyPlaying };
        });
    }

    handleVolumeChange(volume) {
        volume = volume / 100;
        this.setState({volume: volume});
    }

    handlePlayPauseClick() {
        this.setState({playing: !this.state.playing});
    }

    handleVolumeMute() {
        this.handleVolumeChange(0);
    }

    render() {
        return <>
            <div className='text-center'>
                <div className='row mediaControls'>
                    <div className='col-3 currentlyPlaying'>
                        Currently Playing: <br/>
                        { this.state.currentlyPlaying.podcastName } <br/>
                        { this.state.currentlyPlaying.episodeName }
                    </div>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-12'>
                                <button className="mediaControlButton">
                                    <i className="bi bi-skip-backward"></i>
                                </button>
                                <PlayPauseButton playing={this.state.playing} handlePlayPauseClick={this.handlePlayPauseClick} />
                                <button className="mediaControlButton">
                                    <i className="bi bi-skip-forward"></i>
                                </button>
                            </div>
                            <PlaybackProgress handlePlaybackPositionChange={this.handlePlaybackPositionChange} playbackPosition={this.state.currentlyPlaying.playbackPosition} length={this.state.currentlyPlaying.length}/>
                        </div>
                    </div>
                    <div className='col-3'>
                        <VolumeControls volume={this.state.volume} handleVolumeChange={this.handleVolumeChange} handleVolumeMute={this.handleVolumeMute}/>
                    </div>
                </div>
            </div>
        </>
    }
}

function VolumeControls(props) {
    // Change icon depending on volume level
    let volumeIcon;
    if (props.volume == 0) {
        volumeIcon = <i className="bi bi-volume-mute"></i>
    } else if (props.volume < 0.5) {
        volumeIcon = <i className="bi bi-volume-down"></i>
    } else {
        volumeIcon = <i className="bi bi-volume-up"></i>
    }

    return (
        <div className="row volumeControls">
            <div className="col-2">
                <button id="volumeMuteButton" className="btn" onClick={props.handleVolumeMute}>
                    {volumeIcon}
                </button>
            </div>
            <div className="col-10">
                <Slider onSliderChange={props.handleVolumeChange} progress={props.volume * 100} />
            </div>
        </div>
    );
}

// Format time from a float to a string
function formatTime(time) {
    let seconds = (time % 1);
    let relativeSeconds = parseInt(seconds * 60);

    // Add leading 0s if less than 2 digits long
    relativeSeconds = relativeSeconds.toString().padStart(2, '0')

    let hours = parseInt(time / 60);
    let minutes = parseInt(time) % 60;
    let formattedTime = '';

    if (hours > 0) {
        // Add hours to start of string and ensure minutes are 2 digits long
        minutes = minutes.toString().padStart(2, '0');
        formattedTime = hours + ":" + formattedTime;
    }

    formattedTime += minutes + ":" + relativeSeconds
    return formattedTime;
}

function PlaybackProgress(props) {
    let progress = props.playbackPosition / props.length * 100
    return (
        <div className='playbackProgress row'>
            <div className='col-2 text-right'>
                {formatTime(props.playbackPosition)}
            </div>
            <div className='col-8'>
                <Slider onSliderChange={props.handlePlaybackPositionChange} progress={progress}/>
            </div>
            <div className='col-2 text-left'>
                {formatTime(props.length)} 
            </div>
        </div>
        
    );
}

function PlayPauseButton(props) {
    let icon;
    if (props.playing) {
        icon = <i className="bi bi-pause"></i>
    } else {
        icon = <i className="bi bi-play"></i>
    }
    return <button className="mediaControlButton" onClick={props.handlePlayPauseClick}>{ icon }</button>
}

export default MediaControls;