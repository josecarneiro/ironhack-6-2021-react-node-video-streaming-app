import api from './api';

export const changeUserSettings = (data) =>
  api.patch('/settings', data).then((response) => response.data.user);
