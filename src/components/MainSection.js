import React from 'react';

class MainSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div id="mainSection" className="container-fluid">
            <div className="row">
                <div className="col">
                    Main Section
                </div>
            </div>
        </div>
    }
}

export default MainSection;