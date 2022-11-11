import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';
// import { useHistory } from 'react-router-dom';

import SellerNavbar from '../Components/SellerNavbar';

import getSalesBySeller from '../services/getSalesBySeller';

import SaleBox from '../Components/SaleBox';

export default function Checkout() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const { id } = JSON.parse(localStorage.getItem('user'));
      const { data } = await getSalesBySeller(id);
      setSales(data);
    };

    fetchSales();
  }, []);

  const renderSaleBox = () => {
    const salesBox = sales.map((sale) => {
      const { id, totalPrice, deliveryAddress, deliveryNumber, saleDate, status } = sale;
      return (<SaleBox
        key={ id }
        id={ id }
        totalPrice={ totalPrice }
        deliveryAddress={ deliveryAddress }
        deliveryNumber={ deliveryNumber }
        saleDate={ moment(saleDate).format('L') }
        status={ status }
      />);
    });
    return salesBox;
  };

  return (
    <div>
      <SellerNavbar title="PEDIDOS" />
      <div>{ sales.length > 0 && renderSaleBox() }</div>
    </div>
  );
}
