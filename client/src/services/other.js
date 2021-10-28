import api from './api';

export const listBooks = () => {
  return api.get('/books').then((response) => {
    const data = response.data;
    const books = data.books;
    return books;
  });
};
