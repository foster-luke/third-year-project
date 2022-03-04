import React from 'react';
import PropTypes from 'prop-types';

/**
 * Section labelling component
 */
class SectionLabelling extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleInputChange = this.handleInputChange.bind(this);
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
   * @return {string}
   */
  render() {
    return <div id="sectionLabelling" className='container p-3'>
      Section Labelling
    </div>;
  }
}

SectionLabelling.propTypes = {
  // episodeName: PropTypes.string.isRequired,
  // episodeSlug: PropTypes.string.isRequired,
  // podcastName: PropTypes.string.isRequired,
  // podcastSlug: PropTypes.string.isRequired,
  // sections: PropTypes.array.isRequired,
};

export default SectionLabelling;
