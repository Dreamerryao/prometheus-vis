import React, { useState, useEffect } from 'react';
import http from '../../../utils/http'
import Layout from '../layout'
import { Column } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';
import ReactDOM from 'react-dom';
import { DualAxes } from '@ant-design/plots';

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
    http.get("/1360708/v1/api/behavior")
    .then(e=>{
        console.log(e)
    })
    return <div className='system'>
      <div className='wrapper'>
            <div className='title'>HTTP请求</div>
            <div className='container'>
                <div className='behavior-count'>
                    <div className='behavior-count-card count-card'>
                        <div className='count-card-title'>请求（ms）</div>
                        <div className='count-card-value'>2102ms</div>
                    </div>
                    <div className='behavior-count-card count-card'>
                        <div className='count-card-title'>响应（ms）</div>
                        <div className='count-card-value'>324ms</div>
                    </div>
                    <div className='behavior-count-card count-card'>
                        <div className='count-card-title'>成功率</div>
                        <div className='count-card-value'>32%</div>
                    </div>
                </div>
                <div>
               <DemoDualAxes />
                </div>
            </div>
        </div>
        <div className='wrapper'>
            <div className='title'>设备与异常类型</div>
            <div className='container'>
                <div className='behavior-count'>
                    <div className='behavior-count-card count-card'>
                        <div className='count-card-title'>浏览器占比</div>
                        <DemoPie1 />
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='behavior-count'>
                    <div className='behavior-count-card count-card'>
                        <div className='count-card-title'>操作系统占比</div>
                        <DemoPie2 />
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='behavior-count'>
                    <div className='behavior-count-card count-card'>
                        <div className='count-card-title'>异常类型占比</div>
                        <DemoPie3 />
                    </div>
                </div>
            </div>
        </div>

        <div className='wrapper'>
            <div className='title'>站点访问量</div>
            <div className='container'>
                <div className='behavior-count'>
                    <div className='behavior-count-card count-card'>
                        <div className='count-card-title'>pv总数</div>
                        <div className='count-card-value'>2102</div>
                    </div>
                    <div className='behavior-count-card count-card'>
                        <div className='count-card-title'>uv总数</div>
                        <div className='count-card-value'>324</div>
                    </div>
                </div>
                <div>
                <DemoPie4 />
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
            }
            .wrapper{
                width: 100%;
                border-bottom: 2px solid #666;
            }
            .wrapper .title{
                font-size: 15px;
                font-weight: 700;
            }
            .wrapper .container{
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
            .count-card{
                width: 140px;
                height: 80px;
                background: lightblue;
                padding: 10px;
                box-sizing: border-box;
                color: white;
            }
            .count-card-title{
                font-size: 15px;
                font-weight: 700;
            }
            .count-card-value{
                margin-top: 10px;
                font-size: 16px;
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