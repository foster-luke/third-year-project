import React from 'react';
import EpisodeDetails from './EpisodeDetails';
import PropTypes from 'prop-types';

/**
 *
 */
class EpisodeUpload extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      uploadSuccess: null,
      uploadedFiles: [],
    };
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.moveTempEpisodeFile = this.moveTempEpisodeFile.bind(this);
    this.moveToNextUploadedFile = this.moveToNextUploadedFile.bind(this);
  }

  /**
 * Handle file dropped in the upload area
 * @param {*} e
 */
  async handleFileDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    let tempFileLocation = true;
    const uploadedFiles = [];
    if (e.dataTransfer != null) {
      // Loop through all uploaded files
      for (const f of e.dataTransfer.files) {
        // Save to temp storage
        tempFileLocation = await window.podcastStorage.uploadFileToTemp(f.path);
        if (!tempFileLocation) {
          break;
        }
        // Add uploaded file details to array
        uploadedFiles.push({
          location: f.path,
          tempFileLocation: tempFileLocation,
        });
      }

      if (tempFileLocation) {
        this.setState({
          uploadSuccess: true,
          uploadedFiles: uploadedFiles,
        });
      } else {
        this.setState({
          uploadSuccess: false,
        });
      }
    }
  }

  /**
   * @param {*} e
   */
  handleFileDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   *
   * @param {*} tmpFileName
   * @param {*} newFileName
   */
  async moveTempEpisodeFile(tmpFileName, newFileName) {
    // Save to temp storage
    const res =
      await window.podcastStorage.moveToPermStorage(tmpFileName, newFileName);
    return res;
  }

  /**
   *
   * @param {*} tmpFileName
   * @param {*} newFileName
   */
  async moveToNextUploadedFile() {
    const uploadedFiles = this.state.uploadedFiles;
    uploadedFiles.splice(0, 1);
    this.setState({
      uploadedFiles: uploadedFiles,
    });
  }

  /**
   * @return {string}
   */
  render() {
    let uploadSuccess = '';
    if (this.state.uploadSuccess === true) {
      uploadSuccess = 'Upload Succesful!';
    } else if (this.state.uploadSuccess === false) {
      uploadSuccess = 'Upload Failed!';
    }
    if (this.state.uploadedFiles.length) {
      const uploadedFile = this.state.uploadedFiles[0];
      return <EpisodeDetails
        tempFileLocation={uploadedFile.tempFileLocation}
        location={uploadedFile.location}
        moveTempEpisodeFile={this.moveTempEpisodeFile}
        moveToNextUploadedFile={this.moveToNextUploadedFile}
        updateStoredPodcasts={this.props.updateStoredPodcasts}
        storedPodcasts={this.props.storedPodcasts}
      />;
    } else {
      return <div
        id="episodeUpload"
        className="text-center"
        onDrop={this.handleFileDrop}
        onDragOver={this.handleFileDragOver}
      >
        <div className="row">
          <div className="col">
            <i className="bi bi-upload"></i> <br />
                      Drag your episode files here to upload them.<br/>
            {uploadSuccess}
          </div>
        </div>
      </div>;
    }
  }
}

EpisodeUpload.propTypes = {
  updateStoredPodcasts: PropTypes.func.isRequired,
  storedPodcasts: PropTypes.array.isRequired,
};

export default EpisodeUpload;
