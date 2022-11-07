import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3001',
// });

export default function createSale(data, token) {
  return axios.post(
    'http://localhost:3001/sales',
    data,
    {
      headers: {
        Authorization: token,
      },
    },
  );
}
