import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import fetchProducts from '../services/fetchProducts';

export const DeliveryContext = createContext(null);

export default function DeliveryContextProvider({ children }) {
  const [productsInfo, setProductsInfo] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProductsInfo(data);
    };
    getProducts();
  }, []);

  const providerValue = {
    productsInfo,
    setProductsInfo,
    cart,
    setCart,
  };

  return (
    <DeliveryContext.Provider
      value={ useMemo(
        () => providerValue,
        [productsInfo, setProductsInfo, cart, setCart],
      ) }
    >
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
