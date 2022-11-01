import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import fetchProducts from '../services/fetchProducts';

export const DeliveryContext = createContext(null);

export default function DeliveryContextProvider({ children }) {
  const [productsInfo, setProductsInfo] = useState([]);

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
  };

  return (
    <DeliveryContext.Provider
      value={ useMemo(() => providerValue, [productsInfo, setProductsInfo]) }
    >
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
