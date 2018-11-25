import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import {  Button  } from 'antd';

@connect(({ dispatch,products,example }) => ({
  products,example
}))
class Analysis extends Component {
  state={
    count:0
  }
  componentDidMount() {
    const { dispatch,products,example } = this.props;
    this.state.count=this.props.example.count;
    console.log(products,example)
  }
  add=num=>{
    this.props.dispatch({
      type: 'example/add',
      payload: {'num':num},
    });
    // this.setState({count:this.props.example.count})
  }
  snycAdd=num=>{
    this.props.dispatch({
      type: 'example/snycADD',
      payload: {'num':num},
    });
    // this.setState({count:this.props.example.count});
    console.log(this.props.example.count)
  }
  render() {
    return (
      <div className="Analysis">
        Analysis
        <p>{this.props.example.count}</p>
        <Button onClick={this.add.bind(this,2)}>+2</Button>
        <Button onClick={this.snycAdd.bind(this,3)}>+3异步</Button>
        <p><Link to="/products">products</Link></p>
        <p><Link to="/indexPage">IndexPage</Link></p>
      </div>
    );
  }
}

export default Analysis
