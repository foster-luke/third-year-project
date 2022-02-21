import React from 'react';

class EpisodeUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { uploadSuccess: null }
        this.handleFileDrop = this.handleFileDrop.bind(this);
    }


    async handleFileDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        let success = true;
        if (e.dataTransfer != null) {
            for (const f of e.dataTransfer.files) {
                success = await window.electron.uploadFile(f.path)
                if (!success) {
                    break;
                }
            }
            if (success) {
                this.setState({
                    uploadSuccess: true
                });
            } else {
                this.setState({
                    uploadSuccess: false
                });
            }
        }
    }

    handleFileDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }


    render() {
        let uploadSuccess = "";
        if (this.state.uploadSuccess === true) {
            uploadSuccess = "Upload Succesful!";
        } else if (this.state.uploadSuccess === false) {
            uploadSuccess = "Upload Failed!";
        }
        return <div id="episodeUpload" className="text-center" onDrop={this.handleFileDrop} onDragOver={this.handleFileDragOver} >
            <div className="row">
                <div className="col">
                    <i className="bi bi-upload"></i> <br />
                    Drag your episode files here to upload them.<br/>
                    {uploadSuccess}
                </div>
            </div>
        </div>
    }
}
export default EpisodeUpload;