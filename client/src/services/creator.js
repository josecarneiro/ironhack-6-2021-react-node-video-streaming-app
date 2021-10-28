import api from './api';

export const creatorCourseList = () => {
  return api.get('/creator/course/list').then((response) => response.data.list);
};

export const creatorCourseCreate = (data) => {
  return api
    .post('/creator/course', data)
    .then((response) => response.data.course);
};

export const creatorCourseEdit = (id, data) => {
  return api
    .patch(`/creator/course/${id}`, data)
    .then((response) => response.data.course);
};

export const creatorCourseDelete = (id) => {
  return api.delete(`/creator/course/${id}`);
};

export const creatorEpisodeAdd = (id, data) => {
  return api
    .post(`/creator/course/${id}/episode`, data)
    .then((response) => response.data.episode);
};
