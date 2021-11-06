import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EpisodeList from '../components/EpisodeList';
import { loadCourse } from './../services/course';

const CourseView = (props) => {
  const [course, changeCourse] = useState(null);
  const id = props.match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const course = await loadCourse(id);
        changeCourse(course);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {course && (
        <>
          <h2>{course.title}</h2>
          <EpisodeList episodes={course.episodes} />
        </>
      )}
    </div>
  );
};

export default CourseView;
