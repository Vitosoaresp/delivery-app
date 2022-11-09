import { Redirect, Route, Switch } from 'react-router-dom';
import Checkout from './pages/Checkout';
import CustomerOrderById from './pages/CustomerOrderById';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';
import SellerOrderDetails from './pages/SellerOrderDetails';
import SellerOrders from './pages/SellerOrders';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/customer/products">
        <Products />
      </Route>
      <Route path="/customer/checkout">
        <Checkout />
      </Route>
      <Route path="/seller/orders/:id">
        <SellerOrderDetails />
      </Route>
      <Route path="/customer/orders/:id">
        <CustomerOrderById />
      </Route>
      <Route path="/seller/orders">
        <SellerOrders />
      </Route>
      <Route path="/seller/orders/:id">
        <h1>Estou aqui</h1>
      </Route>
      <Route path="/customer/orders">
        <Orders />
      </Route>
    </Switch>
  );
}
