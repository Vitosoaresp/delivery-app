import axios from 'axios';

export default async function getSaleById(id) {
  try {
    const { data } = await axios.get(`http://localhost:3001/seller/orders/${id}`, { id });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
