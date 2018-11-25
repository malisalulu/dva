import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { LocaleProvider, Pagination, DatePicker, TimePicker, Calendar,
  Popconfirm, Table, Modal, Button, Select, Transfer, Radio } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';
const langType={
  "en_US":en_US,
  "zh_CN":zh_CN
};
// moment.locale('en');
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'filter1',
    value: 'filter1',
  }],
}, {
  title: 'Age',
  dataIndex: 'age',
}];

@connect(({ dispatch,products,example }) => ({
  products,example
}))


class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {
      locale: null,
      visible: false
    };
  }
  showModal = () => {
    console.log(this.props.products);
    this.setState({ visible: true });
  }

  hideModal = () => {
    this.setState({ visible: false });
  }
  changeLocale = (e) => {
    const localeValue = e.target.value;
    let lang;
    if (localeValue.locale=="zh-cn") {
      lang="zh_CN";
    } else {
      lang="en_US";
    }
    this.props.dispatch({
      type: 'example/changeLang',
      payload: {'lang':lang},
    });
  }

  render() {
    const { locale } = this.state;
    const { products,example } = this.props;
    const info = () => {
      Modal.info({
        title: 'some info',
        content: 'some info',
      });
    };
    const confirm = () => {
      Modal.confirm({
        title: 'some info',
        content: 'some info',
      });
    };
    return (
      <div>
        <p><Link to="/products">products</Link></p>
        <p>{example.localeLang}</p>
        <div className="change-locale">
          <span style={{ marginRight: 16 }}>Change locale of components: </span>
          <Radio.Group defaultValue={langType[example.localeLang]} onChange={this.changeLocale}>
            <Radio.Button key="en" value={en_US}>English</Radio.Button>
            <Radio.Button key="cn" value={zh_CN}>中文</Radio.Button>
          </Radio.Group>
        </div>
        <div className="locale-components">
          <div className="example">
            <Pagination defaultCurrent={1} total={50} showSizeChanger />
          </div>
          <div className="example">
            <Select showSearch style={{ width: 200 }}>
              <Option value="jack">jack</Option>
              <Option value="lucy">lucy</Option>
            </Select>
            <DatePicker />
            <TimePicker />
            <RangePicker style={{ width: 200 }} />
          </div>
          <div className="example">
            <Button type="primary" onClick={this.showModal}>Show Modal</Button>
            <Button onClick={info}>Show info</Button>
            <Button onClick={confirm}>Show confirm</Button>
            <Popconfirm title="Question?">
              <a href="#">Click to confirm</a>
            </Popconfirm>
          </div>
          <div className="example">
            <Transfer
              dataSource={[]}
              showSearch
              targetKeys={[]}
              render={item => item.title}
            />
          </div>
          <div style={{ width: 319, border: '1px solid #d9d9d9', borderRadius: 4 }}>
            <Calendar fullscreen={false} value={moment()} />
          </div>
          <div className="example">
            <Table dataSource={[]} columns={columns} />
          </div>
          <Modal title="Locale Modal" visible={this.state.visible} onCancel={this.hideModal}>
            <p>Locale Modal</p>
          </Modal>
        </div>
        {/*
          <LocaleProvider locale={locale}>
          <Page key={locale ? locale.locale : 'en'/>
        </LocaleProvider>
        */}
      </div>
    );
  }
}
export default IndexPage
