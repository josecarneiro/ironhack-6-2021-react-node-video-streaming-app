import { Component } from 'react';
import { creatorCourseCreate } from './../services/creator';

class CourseCreationEpisode extends Component {
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.props.onChange({ [name]: value });
  };

  render() {
    return (
      <>
        <label htmlFor="input-title">Episode Title</label>
        <input
          id="input-title"
          type="text"
          placeholder="Episode Title"
          name="title"
          value={this.props.episode.title}
          onChange={this.handleInputChange}
        />
        <label htmlFor="input-file">Video URL</label>
        <input
          id="input-file"
          type="text"
          placeholder="URL"
          name="url"
          value={this.props.episode.url}
          onChange={this.handleInputChange}
        />
      </>
    );
  }
}

class CourseCreateView extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      episodes: []
    };
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { title, description, episodes } = this.state;
    creatorCourseCreate({ title, description, episodes })
      .then((course) => {
        alert('Course was created ' + course._id);
        this.props.history.push('/course/list');
      })
      .catch((error) => {
        alert('There was an error creating course.');
        console.log(error);
      });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEpisodeAddition = () => {
    this.setState((previousState) => ({
      episodes: [...previousState.episodes, { _id: String(Math.random()) }]
    }));
  };

  handleEpisodeChange = (id, data) => {
    this.setState((previousState) => {
      return {
        episodes: previousState.episodes.map((episode) =>
          episode._id === id ? { ...episode, ...data } : episode
        )
      };
    });
  };

  render() {
    return (
      <div>
        <h1>Course Create View</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-title">Title</label>
          <input
            id="input-title"
            type="text"
            placeholder="Course Title"
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <label htmlFor="input-description">Description</label>
          <textarea
            id="input-description"
            type="text"
            placeholder="Course Description"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          {this.state.episodes.map((episode) => (
            <CourseCreationEpisode
              key={episode._id}
              episode={episode}
              onChange={(data) => this.handleEpisodeChange(episode._id, data)}
            />
          ))}
          <button type="button" onClick={this.handleEpisodeAddition}>
            + Add one more
          </button>
          <button>Create Course</button>
        </form>
      </div>
    );
  }
}

export default CourseCreateView;
