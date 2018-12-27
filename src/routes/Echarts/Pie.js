import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import {  Button  } from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import styles from './Pie.less'

@connect(({ dispatch,products,example }) => ({
  products,example
}))
class Pie extends Component {
    constructor(props){
      super(props);
      this.state={
        color:[

        ],
        resultList:[
          {title:"1xxxx",content:"生生世世生生世世生生世世生生世世生生世世生生世世生生世世是谁"},
          {title:"2xxxx",content:"生生世世生生世世生生世世生生世世生生世世生生世世生生世世是谁"},
        ]
      }
    }
    componentWillMount(){
      let resultList=this.state.resultList.map(function(item,key,ary) {
           return {...item,rotate:false}
      });
      this.setState({'resultList':resultList});
    }
    componentDidMount() {
        let color=['red','yellow', 'green'];
        let data=[
            {value:1, name:'直接访问'},
            {value:1, name:'邮件营销'},
            {value:1, name:'联盟广告'}
        ];
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        this.drawPie(myChart,color,data);

    }

    toggle=(index)=>{
      this.state.resultList[index].rotate = !this.state.resultList[index].rotate;
      this.setState({resultList: this.state.resultList});
    }

    drawPie = (myChart,color,data) => {
      myChart.setOption({
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['直接访问','邮件营销','联盟广告']
        },
        color:color,
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['80%', '100%'],
                avoidLabelOverlap: false,
                hoverAnimation:false,
                center:['50%', '50%'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:data
            }
        ]
      });
    }

    render() {
        return (
          <div className="all">
            <div className="circles">
              <div className="circle">
                <div id="main"  style={{ width: 140, height: 140 }}></div>

              </div>
            </div>
            {this.state.resultList.map((item,index)=>{
              return(
                <div className={`resultList ${ item.rotate ? styles.rotateActive: '' }`} key={index} onClick={this.toggle.bind(this,index)}>
                  <button className={styles.arrow}>旋转</button>
                  <span></span>
                  <div className="resultContent">
                    <p>
                      branch A 
                    </p>
                  </div>
                </div>
            )})}

          </div>
        );
    }
}

export default Pie
