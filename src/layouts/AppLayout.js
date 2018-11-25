import React, { Component } from 'react';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/zh-cn';
const langType={
  "en_US":en_US,
  "zh_CN":zh_CN
};
@connect(({ dispatch,products,example }) => ({
  products,example
}))
class AppLayout extends Component {
  state = {
    locale: "en_US"
  };
  componentDidMount() {
    const { dispatch,products,example } = this.props;
    // this.state.locale=this.props.example.localeLang;
    console.log(example.localeLang)
    console.log(langType[this.state.locale])
  }
  render() {
    const { products,example } = this.props;
    return (
      <div className="appLayout">
        <LocaleProvider locale={langType[example.localeLang]}>
          <div>
            <p>{example.localeLang}</p>
            {this.props.children}
          </div>
        </LocaleProvider>
      </div>
    );
  }
}

export default AppLayout
