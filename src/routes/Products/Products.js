// import React from 'react';
// import { connect } from 'dva';
// import { LocaleProvider, Pagination, DatePicker, TimePicker, Calendar,
//   Popconfirm, Table, Modal, Button, Select, Transfer, Radio } from 'antd';
// import ProductList from '../../components/ProductList';
//
// const Products = ({ dispatch, products,example }) => {
//   console.log(products,example)
//   function handleDelete(id) {
//     dispatch({
//       type: 'products/delete',
//       payload: id,
//     });
//   }
//   return (
//     <div>
//       <h2>List of Products</h2>
//       <DatePicker />
//       <TimePicker />
//       <ProductList onDelete={handleDelete} products={products} />
//     </div>
//   );
// };
//
// // export default Products;
// export default connect(({ products,example }) => ({
//   products,example
// }))(Products);


import React, { Component } from 'react';
import { DatePicker,Button,Table,Form,Pagination,Popconfirm } from 'antd';
import moment from 'moment';
import styles from './Products.less'

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];
const dataSource2= [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: 1,
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: 0,
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: 1
}];

const columns2 = [{
  title: '姓名',
  dataIndex: 'name'
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '住址',
  dataIndex: 'address'
},{
  title: 'Tags',
  dataIndex: 'tags',
  render: tags => (
    <div>
      {tags==1?(<span>是</span>):(<span>否</span>)}
    </div>
  ),
}];

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
    let endTime=getDay(0);//当天日期
    let startTime=getDay(-7);//7天前日期
    this.setState({'startTime':startTime});
    this.setState({'endTime':endTime});
  }
  onChange=(dates, dateStrings)=>{
    this.setState({'startTime':dateStrings[0]});
    this.setState({'endTime':dateStrings[1]});
  }
  enterLoading = () => {
    this.setState({ loading: true });
  }
  render() {
    const { startTime, endTime } = this.state;
    console.log(startTime, endTime);
    return (
      <div className="Analysis">
        <div className={styles.search}>
          <RangePicker
          value={[moment(startTime, dateFormat), moment(endTime, dateFormat)]}
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          onChange={this.onChange}
        />

        <Popconfirm title="Delete?" onConfirm={this.enterLoading}>
            <Button className={styles.button} type="primary" loading={this.state.loading} onClick={this.enterLoading}>
              搜索
            </Button>
        </Popconfirm>
        </div>
        <div className={styles.tables}>
          <Table dataSource={dataSource} columns={columns} bordered pagination={false} className={styles.table1}/>
        <Table dataSource={dataSource2} columns={columns2} bordered pagination={false} className={styles.table2}/>
          <Pagination showSizeChanger showQuickJumper defaultCurrent={1} total={50}
            onChange={onChangePage}
            onShowSizeChange={onShowSizeChange}/>
        </div>
      </div>
    )
  }
}
