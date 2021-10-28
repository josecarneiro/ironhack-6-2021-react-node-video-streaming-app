import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3010',
  withCredentials: true
});

export default api;
