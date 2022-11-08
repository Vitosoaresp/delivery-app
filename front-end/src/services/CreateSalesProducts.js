import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3001',
// });

export default function createSaleProduct(data) {
  return axios.post(
    'http://localhost:3001/sales/products',
    data,
  );
}
