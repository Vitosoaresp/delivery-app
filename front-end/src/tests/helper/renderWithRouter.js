import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { DeliveryContext } from '../../context/DeliveryContext';

const renderWithRouter = (component, valueContext) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <DeliveryContext.Provider value={ valueContext }>
        <Router history={ history }>{component}</Router>
      </DeliveryContext.Provider>,
    ),
    history,
  });
};
export default renderWithRouter;
