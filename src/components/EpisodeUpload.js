import React from 'react';

class EpisodeUpload extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id="episodeUpload" className="text-center">
            <div className="row">
                <div className="col">
                    <i className="bi bi-upload"></i> <br />
                    Drag your episode files here to upload them.
                </div>
            </div>
        </div>
    }
}
export default EpisodeUpload;