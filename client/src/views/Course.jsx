import { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadCourse } from './../services/course';

class CourseView extends Component {
  constructor() {
    super();
    this.state = {
      course: null
    };
  }

  async componentDidMount() {
    try {
      const course = await loadCourse(this.props.match.params.id);
      this.setState({ course });
    } catch (error) {
      console.log(error);
    }
  }

  // foo = async () => {
  // }

  render() {
    return (
      <div>
        {this.state.course && (
          <>
            <h1>{this.state.course.title}</h1>
            <ul>
              {this.state.course.episodes.map((episode) => (
                <li key={episode._id}>
                  <Link to={`/episode/${episode._id}`}>{episode.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}

export default CourseView;
