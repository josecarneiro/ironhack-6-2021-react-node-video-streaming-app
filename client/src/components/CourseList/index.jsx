import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const CourseList = ({ courses }) => {
  return (
    <ul className={styles.CourseList}>
      {courses.map((course) => (
        <li className={styles.CourseItem} key={course._id}>
          <Link to={`/course/${course._id}`}>{course.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default CourseList;
