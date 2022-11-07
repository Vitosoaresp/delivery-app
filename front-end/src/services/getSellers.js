import axios from 'axios';

export default function getSellers() {
  return axios.get('http://localhost:3001/users/sellers');
}
