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
      <form onSubmit={this.handlePodcastFormSubmit}>
        <div className="mb-4 row">
          <div className="col-sm-5">
            <legend>Labelled Sections</legend>
          </div>
          <div className="col-sm-7">
            {this.props.podcast.name}<br />
            {this.props.podcast.episode.name}
          </div>
        </div>
        <div className="mb-1 row">
          <div className="col-sm-4">
            Section 1
          </div>
          <div className="col-sm-4">
            <input
              type='text'
              id='section1StartTime'
              placeholder='Start Time'
              className='form-control form-control-sm'
              // onChange={this.handleInputChange}
            />
          </div>
          <div className="col-sm-4">
            <input
              type='text'
              id='section1EndTime'
              placeholder='End Time'
              className='form-control form-control-sm'
              // onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="mb-2 row mt-4">
          <div className="col">
            <button className='btn btnGrey'>
              Add New Section
            </button>
          </div>
        </div>
        <div className="mb-1 row">
          <div className="col-sm-6">
            <button
              type="submit"
              className="btn btnGrey"
              id="saveLabelledSections"
            >
            Save Labelled Sections
            </button>
          </div>
          <div className="col-sm-6">
            {/* <div
              className={'alert alert-danger py-0 ' +
                (this.state.podcastSlugAlert ? '' : 'invisible')
              }
              id="podcastSelectAlert"
              role="alert"
            >
              This name is already in use
            </div> */}
          </div>
        </div>
      </form>
    </div>;
  }
}

SectionLabelling.propTypes = {
  podcast: PropTypes.object.isRequired,
};

export default SectionLabelling;
