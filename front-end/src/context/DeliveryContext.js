import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';

import fetchProducts from '../services/fetchProducts';
import getSellers from '../services/getSellers';

export const DeliveryContext = createContext(null);

export default function DeliveryContextProvider({ children }) {
  const [productsInfo, setProductsInfo] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProductsInfo(data);
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
    sellers,
  };

  return (
    <DeliveryContext.Provider
      value={ useMemo(
        () => providerValue,
        [productsInfo, setProductsInfo, cart, setCart, sellers],
      ) }
    >
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
