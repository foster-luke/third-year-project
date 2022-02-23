import React from 'react';
import PropTypes from 'prop-types';

/**
 * Progress slider for use in volume/playback control
 */
class Slider extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * @param {*} e
   */
  handleClick(e) {
    // If clicked element is the progress overlay then get the parent element
    if (e.target.className != 'progress') {
      e.target = e.target.parentElement;
    }
    this.props.onSliderChange(
        e.nativeEvent.offsetX / e.target.offsetWidth * 100,
    );
  }

  /**
   * @return {html}
   */
  render() {
    const progress = this.props.progress;
    return (
      <div className="slider">
        <div className="progress" onClick={this.handleClick}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{width: progress + '%'}}
          ></div>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  onSliderChange: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
};

export default Slider;
