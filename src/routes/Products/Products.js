import React, { Component } from 'react';
import { DatePicker,Button,Table,Form,Pagination,Popconfirm,Select } from 'antd';
import moment from 'moment';
import styles from './Products.less'

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const Option = Select.Option;

function getDay(day){
       var today = new Date();
       var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
       today.setTime(targetday_milliseconds); //注意，这行是关键代码
       var tYear = today.getFullYear();
       var tMonth = today.getMonth();
       var tDate = today.getDate();
       tMonth = doHandleMonth(tMonth + 1);
       tDate = doHandleMonth(tDate);
       var h = doHandleMonth(today.getHours());
       var mm = doHandleMonth(today.getMinutes());
       var s = doHandleMonth(today.getSeconds());
       return tYear+"-"+tMonth+"-"+tDate+' '+h+':'+mm+':'+s;
}

function doHandleMonth(month){
       var m = month;
       if(month.toString().length == 1){
          m = "0" + month;
       }
       return m;
}
function onChangePage(page, pageSize) {
  console.log(page, pageSize);
}
function onShowSizeChange(current, size){
  console.log(current, size);
}
export default class Analysis extends Component {
  state={
    loading: false,
    startTime:'',
    endTime:''
  }
  componentWillMount(){
    //获取最近7天日期
    // let endTime=getDay(0);//当天日期
    // let startTime=getDay(-7);//7天前日期
    let time=getDay(-1);
    console.log(time,'time');
    let startTime=time.substring(0,10)+'00:00:00';
    let endTime=time.substring(0,10)+'23:59:59';
    this.setState({'startTime':startTime});
    this.setState({'endTime':endTime});
  }
  onChange=(dates, dateStrings)=>{
    this.setState({'startTime':dateStrings[0]});
    this.setState({'endTime':dateStrings[1]});
  }
  enterLoading = (e) => {
    e.stopPropagation();
  }
  handleChange=(val)=>{
    console.log(val);
  }
  outerClick=()=>{
    alert(1);
  }
  render() {
    const { startTime, endTime } = this.state;
    console.log(startTime, endTime);
    return (
      <div className="Analysis">
        {/* <div className={styles.search} onClick={this.outerClick} style={{ position: "absolute", width: '100%', height: 40}}>

        </div> */}
        <div style={{ position: "relative", top: 4}}>
          <RangePicker
            value={[moment(startTime, dateFormat), moment(endTime, dateFormat)]}
            format="YYYY-MM-DD HH:mm:ss"
            showTime
            onChange={this.onChange}
          />
          <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
          </Select>
          <Button className="button" type="primary" onClick={(e)=>this.enterLoading(e)}>
            搜索
          </Button>
        </div>
      </div>
    )
  }
}
