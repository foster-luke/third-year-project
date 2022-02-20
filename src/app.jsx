import * as React from 'react';
import MainSection from './components/MainSection';
import MediaControls from './components/MediaControls';
import SideBar from './components/SideBar';
import TensorFlow from './components/TensorFlow'

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 p-0">
                        <SideBar />
                    </div>
                    <div className="col-9 p-0">
                        <MainSection />
                    </div>
                </div>
                <MediaControls />
            </div>
        )
    }
}

export default App;