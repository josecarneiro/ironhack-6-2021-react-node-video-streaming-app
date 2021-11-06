import { Component } from 'react';
import { creatorCourseCreate } from './../services/creator';
import CourseCreationEpisode from './../components/CourseCreationEpisode';

class CourseCreateView extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Introduction to JavaScript',
      description: 'JavaScript topics for beginners.',
      episodes: [{ _id: 'abc', title: 'Episode 1: Value Types', url: '' }]
    };
  }

  handleFormSubmission = async (event) => {
    event.preventDefault();
    const { title, description, episodes } = this.state;
    try {
      await creatorCourseCreate({ title, description, episodes });
      this.props.history.push('/course/list');
    } catch (error) {
      alert('There was an error creating course.');
      console.log(error);
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEpisodeAddition = () => {
    this.setState((previousState) => ({
      episodes: [
        ...previousState.episodes,
        { _id: String(Math.random()), title: '', url: '' }
      ]
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
