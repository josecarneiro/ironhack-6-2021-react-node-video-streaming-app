import { Component } from 'react';
import { loadEpisode } from './../services/course';

class EpisodeView extends Component {
  constructor() {
    super();
    this.state = {
      episode: null
    };
  }

  async componentDidMount() {
    try {
      const episode = await loadEpisode(this.props.match.params.id);
      this.setState({ episode });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        {this.state.episode && (
          <>
            <h1>{this.state.episode.title}</h1>
            <video src={this.state.episode.url} autoPlay controls />
          </>
        )}
      </div>
    );
  }
}

export default EpisodeView;
