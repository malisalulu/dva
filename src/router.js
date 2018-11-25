import React from 'react';
import { connect } from 'dva';
import { Router, Route, Switch } from 'dva/router';


import BasicLayout from './layouts/BasicLayout'
import AppLayout from './layouts/AppLayout'
import Products from './routes/Products/Products';
import Login from './routes/User/Login';
import Register from './routes/User/Register';
import Analysis from './routes/Dashboard/Analysis';
import IndexPage from './routes/IndexPage/IndexPage';

// @connect(({ dispatch,products,example }) => ({
//   products,example
// }))

function RouterConfig({ history }) {
  return (
    <AppLayout>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/user/login"  component={Login} />
          <Route path="/user/register"  component={Register} />
          <BasicLayout>
            <Route path="/dashboard/analysis"  component={Analysis} />
            <Route path="/products"  component={Products} />
            <Route path="/IndexPage"  component={IndexPage} />
          </BasicLayout>
        </Switch>
      </Router>
    </AppLayout>
  );
}

export default RouterConfig;
