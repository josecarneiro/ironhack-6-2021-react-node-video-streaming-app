import { Component } from 'react';
import { Link } from 'react-router-dom';
import { creatorCourseList } from './../services/creator';

class CreatorCourseListView extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  async componentDidMount() {
    try {
      const courses = await creatorCourseList();
      this.setState({ courses });
    } catch (error) {
      alert('There was an error loading all of your courses.');
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h1>Creator Course List</h1>
        <ul>
          {this.state.courses.map((course) => (
            <li key={course._id}>
              <Link to={`/course/${course._id}/manage`}>{course.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CreatorCourseListView;
