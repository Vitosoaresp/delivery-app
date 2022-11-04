import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import { fetchCustomerOrders } from '../services/fetchCustomerOrders';
import fetchProducts from '../services/fetchProducts';

export const DeliveryContext = createContext(null);

export default function DeliveryContextProvider({ children }) {
  const [productsInfo, setProductsInfo] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const products = await fetchProducts();
      setProductsInfo(products);
      const userData = localStorage.getItem('user');
      if (userData) {
        const { token } = JSON.parse(userData);
        const ordersData = await fetchCustomerOrders(token);
        setOrders(ordersData);
      }
    };
    getData();
  }, []);

  const providerValue = {
    productsInfo,
    setProductsInfo,
    cart,
    setCart,
    orders,
  };

  return (
    <DeliveryContext.Provider
      value={ useMemo(
        () => providerValue,
        [productsInfo, setProductsInfo, cart, setCart, orders],
      ) }
    >
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
