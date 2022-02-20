import React from 'react';

class MediaControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            podcast: {
                name: "My Brother, My Brother & Me",
                genre: "Comedy",
                hosts: "Justin, Travis and Griffin McElroy"
            },
            episodes: [
                {
                    number: 595,
                    name: "Episode595name",
                    length: 55.55,
                    analysed: true,
                    ads_removed: true
                },
                {
                    number: 596,
                    name: "Episode596name",
                    length: 64.04,
                    analysed: true,
                    ads_removed: false
                },
                {
                    number: 597,
                    name: "Episode597name",
                    length: 24.45,
                    analysed: false,
                    ads_removed: false
                },
            ]
        }
    }

    render() {
        return <>
            
        </>
    }
}

export default MediaControls;