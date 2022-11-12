import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import DeliveryContextProvider from '../../context/DeliveryContext';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <DeliveryContextProvider>
        <Router history={ history }>{component}</Router>
      </DeliveryContextProvider>,
    ),
    history,
  });
};
export default renderWithRouter;
