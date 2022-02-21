import React from 'react';

class EpisodesListings extends React.Component {
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

        // Build the episodes view
        let episodes = <div id="episodes">
            <div className="row" id="episodesListingsHeader">
                <div className="col-1">
                    #
                </div>
                <div className="col-4">
                    Episode Name
                </div>
                <div className="col-2 text-center">
                    Length
                </div>
                <div className="col-2 text-center">
                    Analysed
                </div>
                <div className="col-2 text-center">
                    Trimmed
                </div>
            </div>
            {this.state.episodes.map(episode => {
                return <EpisodeListing episode={episode} key={episode.number}/>;
            })}
        </div>;

        return <div id="episodesListings">
            <div className="row" id="podcastHeader">
                <div className="col-6" id="podcastName">
                    {this.state.podcast.name}
                </div>
                <div className="col-6" id="podcastDetails">
                    Genre: {this.state.podcast.genre} <br />
                    Hosts: {this.state.podcast.hosts} <br />
                </div>
            </div>
            {episodes}
        </div>
    }
}

function EpisodeListing(props) {
    // Return a single episode row
    return <div className="row">
        <div className="col-1">
            {props.episode.number}.
        </div>
        <div className="col-4">
            {props.episode.name}
        </div>
        <div className="col-2 text-center">
            {props.episode.length}
        </div>
        <div className="col-2 text-center">
            {props.episode.analysed ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}
        </div>
        <div className="col-2 text-center">
            {props.episode.ads_removed ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}
        </div>
        <div className="col-1 text-center">
            <button className="btn btnIcon">
                <i className="bi bi-three-dots"></i>
            </button>
        </div>
    </div>
}

export default EpisodesListings;