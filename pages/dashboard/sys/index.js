import React, { useState, useEffect } from 'react';
import http from '../../../utils/http'
import Layout from '../layout'
import {
    Column, 
    DualAxes,
    Pie
 } from '@ant-design/plots';


const DemoDualAxes = () => {
  const uvBillData = [
    {
      time: '8',
      value: 350,
      type: '请求',
    },
    {
      time: '10',
      value: 900,
      type: '请求',
    },
    {
      time: '12',
      value: 470,
      type: '请求',
    },
    {
      time: '16',
      value: 300,
      type: '请求',
    },
    {
      time: '20',
      value: 450,
      type: '请求',
    },
    {
      time: '24',
      value: 470,
      type: '请求',
    },
    {
      time: '4',
      value: 470,
      type: '请求',
    },
    {
      time: '6',
      value: 470,
      type: '请求',
    },
    {
      time: '8',
      value: 400,
      type: '响应',
    },
    {
      time: '10',
      value: 300,
      type: '响应',
    },
    {
      time: '12',
      value: 550,
      type: '响应',
    },
    {
      time: '16',
      value: 200,
      type: '响应',
    },
    {
      time: '20',
      value: 300,
      type: '响应',
    },
    {
      time: '24',
      value: 700,
      type: '响应',
    },
    {
      time: '4',
      value: 600,
      type: '响应',
    },
    {
      time: '6',
      value: 300,
      type: '响应',
    },
    {
      time: '8',
      value: 600,
      type: '总时间',
    },
    {
      time: '10',
      value: 1000,
      type: '总时间',
    },
    {
      time: '12',
      value: 400,
      type: '总时间',
    },
    {
      time: '16',
      value: 600,
      type: '总时间',
    },
    {
      time: '20',
      value: 300,
      type: '总时间',
    },
    {
      time: '24',
      value: 700,
      type: '总时间',
    },
    {
      time: '4',
      value: 650,
      type: '总时间',
    },
    {
      time: '6',
      value: 600,
      type: '总时间',
    },
  ];
  const transformData = [
    
  ];
  const config = {
    data: [uvBillData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'line',
        seriesField: 'type',
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
        smooth: true,
      },
      {
        geometry: 'line',
        seriesField: 'name',
        point: {},
      },
    ],
  };
  return <DualAxes {...config} />;
};

const DemoPie1 = () => {
  const data = [
    {
      type: 'Edge',
      value: 40,
    },
    {
      type: 'Google',
      value: 40,
    },
    {
      type: 'Firefox',
      value: 20,
    },
    {
      type: '360',
      value: 20,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 20,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};
const DemoPie2 = () => {
  const data = [
    {
      type: 'windows',
      value: 40,
    },
    {
      type: 'Linux',
      value: 40,
    },
    {
      type: 'mac',
      value: 20,
    },
    {
      type: 'ios',
      value: 20,
    },
    {
      type: 'android',
      value: 20,
    },
    {
      type: '华为',
      value: 20,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 20,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};
const DemoPie3 = () => {
  const data = [
    {
      type: '系统异常',
      value: 40,
    },
    {
      type: '网络异常',
      value: 40,
    },
    {
      type: 'JS异常',
      value: 20,
    },
    {
      type: '应用异常',
      value: 20,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 20,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};
const DemoPie4 = () => {
  const data = [
    {
      type: 'PC',
      value: 2102,
    },
    {
      type: 'UV',
      value: 324,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 20,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};
const config1 = {
    data: [
        
        {
          "time": "8时",
          "type": "pv",
          "value": 1800
        },
        {
          "time": "8时",
          "type": "uv",
          "value": 1100
        },
        {
          "time": "9时",
          "type": "pv",
          "value": 1450
        },
        {
          "time": "9时",
          "type": "uv",
          "value": 850
        },
        {
          "time": "10时",
          "type": "pv",
          "value": 900
        },
        {
          "time": "10时",
          "type": "uv",
          "value": 850
        },
        {
          "time": "11时",
          "type": "pv",
          "value": 1600
        },
        {
          "time": "11时",
          "type": "uv",
          "value": 500
        },
        {
          "time": "12时",
          "type": "pv",
          "value": 1400
        },
        {
          "time": "12时",
          "type": "uv",
          "value": 900
        },
        {
          "time": "13时",
          "type": "pv",
          "value": 1400
        },
        {
          "time": "13时",
          "type": "uv",
          "value": 900
        },
        {
          "time": "14时",
          "type": "pv",
          "value": 900
        },
        {
          "time": "14时",
          "type": "uv",
          "value": 850
        },
        {
          "time": "15时",
          "type": "pv",
          "value": 1700
        },
        {
          "time": "15时",
          "type": "uv",
          "value": 600
        }
    ],
    xField: 'time',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
}
// 首页概览
function Page() {
    return <div className='system'>
      <div className='wrapper1'>
      <span className='shouye1'>
          <div className='s1'>总异常数：</div>
          <div className='s2'>66</div>
          <div className='s3'>日异常数：</div>
          <span className='s4'>66</span>
        </span>
        <span className='shouye1'>
          <div className='s1'>网络请求个数：</div>
          <div className='s2'>666</div>
          <div className='s3'>日请求数：</div>
          <span className='s4'>66</span>
        </span>
        <span className='shouye1'>
          <div className='s1'>异常占比：</div>
          <div className='s2'>66%</div>
          <div className='s3'>日异常占比：</div>
          <span className='s4'>66</span>
        </span>
        <span className='shouye1'>
          <div className='s1'>访问量</div>
          <div className='s2'>66</div>
          <div className='s3'>日访问量：</div>
          <span className='s4'>66</span>
        </span>
      </div>
      <div className='wrapper'>
            <div className='title2'>HTTP请求</div>
            <div className='container'>
                <div className='behavior-count2'>
                    <div className='behavior-count-card count-card2'>
                        <div className='count-card-title2'>请求（ms）</div>
                        <div className='count-card-value2'>2102ms</div>
                    </div>
                    <div className='behavior-count-card count-card2'>
                        <div className='count-card-title2'>响应（ms）</div>
                        <div className='count-card-value2'>324ms</div>
                    </div>
                    <div className='behavior-count-card count-card2'>
                        <div className='count-card-title2'>成功率</div>
                        <div className='count-card-value2'>32%</div>
                    </div>
                </div>
                <div className='dempdualaxes'>
                  <div className='ddl'>
               <DemoDualAxes />
               </div>
                </div>
            </div>
        </div>
        <br></br>
        <br></br>
        <div className='wrapper'>
            <div className='title1'>设备与异常类型</div>
            <div className='container'>
                <div className='behavior-count1'>
                    <div className='behavior-count-card count-card1'>
                        <div className='count-card-title1'>浏览器占比</div>
                        <div className='d1'>
                        <DemoPie1 />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='behavior-count1'>
                    <div className='behavior-count-card count-card1'>
                        <div className='count-card-title1'>操作系统占比</div>
                        <div className='d1'>
                        <DemoPie2 />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='behavior-count1'>
                    <div className='behavior-count-card count-card1'>
                        <div className='count-card-title1'>异常类型占比</div>
                        <div className='d1'>
                        <DemoPie3 />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br></br>
        <br></br>
        <div className='wrapper2'>
            <div className='title'>站点访问量</div>
            <div className='container'>
                <div className='behavior-count'>
                    <div className='behavior-count-card count-card'>
                        <div className='count-card-title'>pv总数：</div>
                        <div className='count-card-value'>2102</div>
                    </div>
                    <div className='behavior-count-card count-card'>
                        <div className='count-card-title'>uv总数：</div>
                        <div className='count-card-value'>324</div>
                    </div>
                </div>
                <div className='d2'>
                <div className='D4'>
                <DemoPie4 />
                </div>
                </div>
                <div className='behavior-chart'>
                    <Column {...config1} />
                </div>
            </div>
        </div>
        <style jsx>{`
            .system{
                padding: 20px;
                box-sizing: border-box;
                height: 100%;
                overflow: scroll;
                background: #f0f2f5;
            }
            .wrapper1{
              height: 195px;
              width: 100%;
              display: inline-flex;
          }
            .wrapper{
                background: white;
                height: 435px;
                width: 100%;
                display: inline-flex;
            }
            .wrapper2{
              background: white;
              height: 510px;
              width: 100%;
              display: inline-flex;
          }
            .wrapper .title1{
              color: black;
              width: 490px;
              margin-top: 0px;
              font-size: 18px;
              text-align: center;
              font-weight: bolder;
              border-width: 6px;
              border-color: cyan;
              border-style: ridge;
              display: inline;
              height: 40px;
            }
            .wrapper2 .title{
              color: black;
              width: 145px;
              margin-top: 0px;
              font-size: 18px;
              text-align: center;
              font-weight: bolder;
              border-width: 6px;
              border-color: cyan;
              border-style: ridge;
              display: inline;
              height: 40px;
          }
          .wrapper .title2{
            color: black;
            width: 145px;
            margin-top: 0px;
            font-size: 18px;
            text-align: center;
            font-weight: bolder;
            border-width: 6px;
            border-color: cyan;
            border-style: ridge;
            display: inline;
            height: 40px;
        }
            .wrapper .container{
                width: 100%;
                display: flex;
                padding: 20px;
                box-sizing: border-box;
                justify-content: space-between;
                flex-wrap: wrap;
            }
            .wrapper2 .container{
              width: 100%;
              display: flex;
              padding: 20px;
              box-sizing: border-box;
              justify-content: space-between;
              flex-wrap: wrap;
          }
            .wrapper .item{
                width: 400px;
                height: 280px;
                background: white;
            }
            .behavior-count{
                hieght: 300px;
                display: flex;
                width: 140px;
                flex-direction: column;
                justify-content: space-around;
            }
            .behavior-count1{
              hieght: 300px;
              display: flex;
              width: 140px;
              flex-direction: column;
              justify-content: space-around;
          }
          .behavior-count2{
            hieght: 300px;
            display: flex;
            width: 25%px;
            flex-direction: column;
            justify-content: space-around;
        }
            .dempdualaxes{
              border-left-width: 11px;
              border-left-color: white;
              border-left-style: inset;
              width: 75%;
            }
            .count-card{
              margin-left: -25px;
              background: aqua;
              width: 230px;
              height: 150px;
              padding: 10px;
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
              color: black;
              border-width: 8px;
              border-color: aqua;
              border-style: solid;
              -webkit-border-radius: 44px;
              -moz-border-radius: 44px;
              border-radius: 35px;
              margin-top: 34px;
            }
            .count-card1{
              background: white;
              width: 320px;
              height: 318px;
              padding: 10px;
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
              color: white;
              border-width: 11px;
              border-color: white;
              border-style: inset;
          }
          .count-card2{
            background: aqua;
            width: 210px;
            height: 90px;
            padding: 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            color: black;
            border-width: 8px;
            border-color: aqua;
            border-style: solid;
            border-radius: 44px;
            margin-top: 34px;
        }
            .count-card-title1{
              color: black;
              font-weight: 700;
              font-size: 17px;
              display: inline;
            }
            .count-card-value1{
                margin-top: 10px;
                font-size: 16px;
            }
            .count-card-title2{
              font-size: 17px;
              font-weight: 700;
          }
          .count-card-value2{
              margin-top: -7px;
              margin-left: 94px;
              font-size: 22px;
          }
            .count-card-title{
              font-size: 22px;
              font-weight: 700;
          }
          .count-card-value{
            margin-top: 10px;
            margin-left: 118px;
            font-size: 30px;
          }
          .d1{
            height: 240px;
            margin-left: -10px;
          }
          .d2{
            width: 30%;
            margin-top: 65px;
            border-width: 11px;
            border-color: white;
            border-style: inset;
            margin-left: 85px;
          }
          .behavior-chart{
            width:30%;
            margin-top: 58px;
          }
          .shouye1{
            width: 33%;
            height: 211px;
            padding: 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            color: black;
            border-width: 20px;
            background: white;
            border-style: solid;
            border-color: #f0f2f5;
            background: white;
            margin-top: -18px;
          }
          .s1{
            font-size: 16px;
            display: inline;
            font-weight: bolder;
            color: darkcyan;
          }
          .s2{
            margin-left: 85px;
            margin-top: 8px;
            font-size: 41px;
            height: 76px;
            margin-right: 20px;
          }
          .s3{
            margin-left: 2px;
            margin-top: 20px;
            font-size: 17px;
            display: inline;
            margin-right: 20px;
          }
          .s4{
            font-size: 22px;
          }
          .ddl{
            margin-left: 8%;
          }
          .D4{
            width: 125%;
          }
        `}</style>
    </div>
}
Page.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Page