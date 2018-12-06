import React from 'react';
import { Form, Input, Cascader, Select,  Checkbox, Button, AutoComplete,DatePicker } from 'antd';
import moment from 'moment';
import CascaderTem from '../../components/CascaderTem'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};

class AllForm extends React.Component {
  state = {
    show:false,
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        // Should format date value before submit.
        const rangeValue = fieldsValue['range-picker'];
        const rangeTimeValue = fieldsValue['range-time-picker'];
        const values = {
          ...fieldsValue,
          // 'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
          // 'range-time-picker': [
          //   rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
          //   rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
          // ]
        }
        console.log('Received values of form: ', values);
      }
      console.log(fieldsValue['cascaderTem']);
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  validateRule = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== "rule") {
      callback('please enter rule!');
    } else {
      callback();
    }
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
  onPressEnter=(e)=>{
    let str=e.target.value;
    let str2=str.split("\n");
    console.log(str2)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div>

        <Form onSubmit={this.handleSubmit}>
          <TextArea rows={4} defaultValue="TextArea" onPressEnter={this.onPressEnter}/>
          <FormItem  {...formItemLayout}  label="Habitual Residence">
            {getFieldDecorator('residence', {
              initialValue: ['zhejiang', 'hangzhou', 'xihu'],
              rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
            })(
              <Cascader options={residences} changeOnSelect/>
            )}
          </FormItem>
          <FormItem  {...formItemLayout}  label="RangePicker[showTime]">
            {getFieldDecorator('range-time-picker',{
              initialValue:[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)],
              rules: [{ type: 'array', required: true, message: 'Please select time!' }],
            })(
              <RangePicker showTime format="YYYY-MM-DD"/>
            )}
          </FormItem>
          <FormItem  {...formItemLayout}  label="E-mail">
            {getFieldDecorator('email', {
              initialValue:"3435535@qq.com",
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          {this.state.show?(
            <FormItem  {...formItemLayout}  label="下拉框">
              {getFieldDecorator('select', {
                initialValue:"lucy",
                rules: [{
                  required: true, message: 'Please input your select!',
                }]
              })(
                <Select style={{ width: 120 }} showSearch>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              )}
            </FormItem>
          ):null}

          <FormItem  {...formItemLayout}  label="自定义rule">
            {getFieldDecorator('rule', {
              rules: [{
                required: true, message: 'Please input your rule!',
              }, {
                validator: this.validateRule,
              }],
            })(
              <Input  />
            )}
          </FormItem>
          <FormItem  {...formItemLayout}  label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' },{
                pattern: /^1\d{10}$/,
                message: 'Wrong mobile number format!',
              }]
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem  {...formItemLayout}  label="Website">
            {getFieldDecorator('website', {
              rules: [{ required: true, message: 'Please input website!' }],
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="website"
              >
                <Input />
              </AutoComplete>
            )}
          </FormItem>
          <FormItem  {...formItemLayout}  label="DatePicker[showTime]">
            {getFieldDecorator('date-time-picker', config)(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">submit</Button>
          </FormItem>

        </Form>
      </div>
    );
  }
}

const BasicForm = Form.create()(AllForm);
export default BasicForm
