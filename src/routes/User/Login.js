import React, { Component } from 'react';
import { connect } from 'dva';
import { doLogin } from '../../utils/api'

class Login extends Component {
  componentDidMount() {
    let params = {
       username:"lilu",
       password:"123456"
     };
     doLogin(params, function(res) {

     })
  }
  render() {
    return (
      <div className="login">
        login
      </div>
    );
  }
}

export default Login;
