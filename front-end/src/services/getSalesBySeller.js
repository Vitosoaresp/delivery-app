import axios from 'axios';

export default function getSalesBySeller(id) {
  return axios.get(`http://localhost:3001/sales/seller/${id}`);
}
