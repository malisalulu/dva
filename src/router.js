import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage/IndexPage';
import Products from './routes/Products/Products';
import Login from './routes/User/Login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products"  component={Products} />
        <Route path="/user/login"  component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
