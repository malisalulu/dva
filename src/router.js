import React from 'react';
import { connect } from 'dva';
import { Router, Route, Switch,Redirect } from 'dva/router';

import BasicLayout from './layouts/BasicLayout'
import AppLayout from './layouts/AppLayout'
import Products from './routes/Products/Products';
import Login from './routes/User/Login';
import Register from './routes/User/Register';
import Analysis from './routes/Dashboard/Analysis';
import IndexPage from './routes/IndexPage/IndexPage';
import I18n from './routes/I18n/I18n';
//表单
import BasicForm from './routes/Form/BasicForm';
import Pie from './routes/Echarts/Pie';



class AuthRequiredRoute extends Route{
    render() {
        let { component: Component, ...rest} = this.props;
        return sessionStorage.getItem("token")?(<Route {...rest} render={(props) => ( <Component {...props} /> )}/> ) : (<Redirect to="/user/login"></Redirect>)
    }
}

// function RouterConfig({ history }) {
const RouterConfig = ({ history }) => {
  return (
    <AppLayout>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/user/login"  component={Login} />
          <Route path="/user/register"  component={Register} />
          <BasicLayout>
            <AuthRequiredRoute path="/dashboard/analysis"  component={Analysis} />
            <AuthRequiredRoute path="/products"  component={Products} />
            <AuthRequiredRoute path="/indexPage"  component={IndexPage} />
            <AuthRequiredRoute path="/i18n"  component={I18n} />
            <AuthRequiredRoute path="/form/basic"  component={BasicForm} />
            <AuthRequiredRoute path="/echarts/pie"  component={Pie} />
          </BasicLayout>
        </Switch>
      </Router>
    </AppLayout>
  );
}

export default RouterConfig;
