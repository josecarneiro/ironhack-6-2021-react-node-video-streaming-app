import api from './api';

export const loadSubscription = () =>
  api.get('/subscription').then((response) => response.data.subscription);

export const createSubscription = (data) =>
  api
    .post('/subscription', data)
    .then((response) => response.data.subscription);

export const cancelSubscription = () => api.patch('/subscription');
