import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs,Form, Icon, Input, Button, Checkbox  } from 'antd';
import UserLayout from '../../layouts/UserLayout'
import { doLogin } from '../../utils/api'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
let tabType={
  account:["userName","password"],
  mobile:["mobile","captcha"]
}

class NormalLoginForm extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };
  componentDidMount() {
    let params = {
       username:"lilu",
       password:"123456"
     };
     // doLogin(params, function(res) {
     //
     // })
  }
  onTabChange = type => {
    this.setState({ type });
  };
  onSubmit=params=>{
    sessionStorage.setItem("token","1223sdfs");
    this.props.history.push({ pathname : '/i18n' ,query : { day: 'Friday'} });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let _this=this;
    let fieldNames=tabType[this.state.type];
    this.props.form.validateFields(fieldNames,(err, values) => {
      if (!err) {
        _this.onSubmit({...values,type:_this.state.type})
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <UserLayout>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Tabs defaultActiveKey="account" onChange={this.onTabChange}>
            <TabPane tab="Tab 1" key="account">
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
            </TabPane>
            <TabPane tab="Tab 2" key="mobile">
              <FormItem>
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true,
                    message: 'Please enter mobile number!',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: 'Wrong mobile number format!',
                  }],
                })(
                  <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="mobile number" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true,  message: 'Please enter Captcha!'}],
                })(
                  <Input prefix={<Icon type="captcha" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="captcha" />
                )}
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </UserLayout>
    );
  }
}
const Login = Form.create()(NormalLoginForm);
export default Login;
