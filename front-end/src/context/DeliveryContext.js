import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import { fetchCustomerOrders } from '../services/fetchCustomerOrders';

import fetchProducts from '../services/fetchProducts';
import getSellers from '../services/getSellers';

export const DeliveryContext = createContext(null);

export default function DeliveryContextProvider({ children }) {
  const [productsInfo, setProductsInfo] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProductsInfo(products);
      const userData = localStorage.getItem('user');
      if (userData) {
        const { token } = JSON.parse(userData);
        const ordersData = await fetchCustomerOrders(token);
        setOrders(ordersData);
      }
    };

    const fetchSellers = async () => {
      const reponse = await getSellers();
      setSellers(reponse.data);
    };

    getProducts();
    fetchSellers();
  }, []);

  const providerValue = {
    productsInfo,
    setProductsInfo,
    cart,
    setCart,
    orders,
    sellers,
  };

  return (
    <DeliveryContext.Provider
      value={useMemo(
        () => providerValue,
        [productsInfo, setProductsInfo, cart, setCart, orders, sellers],
      )}
    >
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
