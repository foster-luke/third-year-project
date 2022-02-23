import React from 'react';

/**
 * Sidebar component
 */
class SideBar extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @return {string}
   */
  render() {
    return <div id="sideBar" className="container-fluid">
      <div className="row">
        <div className="col">
                    Side Bar
        </div>
      </div>
    </div>;
  }
}

export default SideBar;
