import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
}
