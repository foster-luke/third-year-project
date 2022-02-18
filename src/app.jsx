import * as React from 'react';
import TensorFlow from './components/TensorFlow/TensorFlow'

class App extends React.Component {
    render() {
        return (
            <>
                <h2>Hello from React!</h2>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            One of three columns
                        </div>
                        <div className="col">
                            One of three columns
                        </div>
                        <div className="col">
                            One of three columns
                            <TensorFlow />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default App;