import { Redirect, Route, Switch } from 'react-router-dom';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ <p>Login</p> } />
    </Switch>
  );
}
