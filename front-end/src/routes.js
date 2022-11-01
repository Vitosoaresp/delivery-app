import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

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
    </Switch>
  );
}
