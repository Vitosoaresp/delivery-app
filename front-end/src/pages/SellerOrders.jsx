import React, { useContext, useState } from 'react';
// import { useHistory } from 'react-router-dom';

import SellerNavbar from '../Components/SellerNavbar';
// import OrderDetails from '../Components/OrderDetails';
// import { DeliveryContext } from '../context/DeliveryContext';
// import createSale from '../services/createSales';
// import createSaleProduct from '../services/CreateSalesProducts';

export default function Checkout() {
  //   const { cart, sellers } = useContext(DeliveryContext);
  //   const [deliveryAddress, setDeliveryAddress] = useState('');
  //   const [deliveryNumber, setDeliveryNumber] = useState('');
  //   const [seller, setSeller] = useState(2);
  //   const history = useHistory();

  // const { token } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <SellerNavbar />
      Bem-vindo, Vendedor!
    </div>
  );
}
