import { Component } from 'react';
import { Link } from 'react-router-dom';
import CourseList from '../components/CourseList';
import { listCourses } from './../services/course';

class HomeView extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  async componentDidMount() {
    try {
      const courses = await listCourses();
      this.setState({ courses });
    } catch (error) {
      alert('Something went wrong loading your courses');
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h1>
          Welcome to Edflix{this.props.user && ` ${this.props.user.name}`}
        </h1>
        <h3>Here are some of our newest courses</h3>
        <CourseList courses={this.state.courses} />
        {/* <ul>
          {this.state.courses.map((course) => (
            <li key={course._id}>
              <Link to={`/course/${course._id}`}>{course.title}</Link>
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}

export default HomeView;
