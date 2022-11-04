import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3001',
// });

export default function createSale(data, token) {
  console.log(token);
  return axios.post('http://localhost:3001/sales', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}
