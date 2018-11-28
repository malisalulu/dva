import React, { Component } from 'react';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/zh-cn';
import intl from 'react-intl-universal';
import zh from '../i18n/zh.js'
import en from '../i18n/en.js'
const langType={
  "en_US":en_US,
  "zh_CN":zh_CN
};

@connect(({ dispatch,products,example }) => ({
  products,example
}))
class AppLayout extends Component {
  componentDidMount() {
    console.log(sessionStorage.getItem("token"),'sessionStorage.getItem("token")')
  }
  render() {
    const { products,example } = this.props;
    let currentLang=sessionStorage.getItem("lang");
    let localeLang=currentLang?currentLang:example.localeLang;
    intl.init({
      currentLocale: localeLang.split('-')[0],
      locales: {
        zh,
        en
      }
    })
    intl.options.currentLocale = localeLang==='zh_CN'?'zh':'en';
    return (
      <div className="appLayout">
        <LocaleProvider locale={langType[localeLang]}>
          <div>
            {this.props.children}
          </div>
        </LocaleProvider>
      </div>
    );
  }
}

export default AppLayout
