import api from './api';

export const signUp = (body) => {
  return api.post('/authentication/sign-up', body).then((response) => {
    const data = response.data;
    const user = data.user;
    return user;
  });
};

export const signIn = (body) =>
  api
    .post('/authentication/sign-in', body)
    .then((response) => response.data.user);

export const signOut = () => {
  return api.post('/authentication/sign-out');
};

export const loadAuthenticatedUser = () => {
  return api.get('/authentication/me').then((response) => response.data.user);
};
