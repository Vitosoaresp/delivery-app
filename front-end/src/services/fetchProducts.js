import axios from 'axios';

export default async function fetchProducts() {
  return axios.get('http://localhost:3001/products')
    .then((response) => response.data);
}
