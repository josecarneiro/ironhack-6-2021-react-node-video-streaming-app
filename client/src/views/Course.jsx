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

  componentDidMount() {
    loadCourse(this.props.match.params.id)
      .then((course) => {
        this.setState({ course });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
