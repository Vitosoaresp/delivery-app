import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

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
    </Switch>
  );
}
