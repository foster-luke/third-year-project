import React from 'react';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div id="sideBar" className="container-fluid">
            <div className="row">
                <div className="col">
                    Side Bar
                </div>
            </div>
        </div>
    }
}

export default SideBar;