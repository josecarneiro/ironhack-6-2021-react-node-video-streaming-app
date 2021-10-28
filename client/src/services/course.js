import api from './api';

export const listCourses = () =>
  api.get('/course/list').then((response) => response.data.courses);

export const loadCourse = (id) =>
  api.get(`/course/${id}`).then((response) => response.data.course);

export const loadEpisode = (id) =>
  api.get(`/episode/${id}`).then((response) => response.data.episode);
