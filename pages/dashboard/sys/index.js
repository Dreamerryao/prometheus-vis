import React from 'react'
import http from '../../../utils/http'
import Layout from '../layout'
import { Column, DualAxes } from '@ant-design/plots';

const config = {
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
const DemoDualAxes = () => {
    const uvBillData = [
      {
        time: '2019-03',
        value: 350,
        type: 'uv',
      },
      {
        time: '2019-04',
        value: 900,
        type: 'uv',
      },
      {
        time: '2019-05',
        value: 300,
        type: 'uv',
      },
      {
        time: '2019-06',
        value: 450,
        type: 'uv',
      },
      {
        time: '2019-07',
        value: 470,
        type: 'uv',
      },
      {
        time: '2019-03',
        value: 220,
        type: 'bill',
      },
      {
        time: '2019-04',
        value: 300,
        type: 'bill',
      },
      {
        time: '2019-05',
        value: 250,
        type: 'bill',
      },
      {
        time: '2019-06',
        value: 220,
        type: 'bill',
      },
      {
        time: '2019-07',
        value: 362,
        type: 'bill',
      },
    ];
    const transformData = [
      {
        time: '2019-03',
        count: 800,
        name: 'a',
      },
      {
        time: '2019-04',
        count: 600,
        name: 'a',
      },
      {
        time: '2019-05',
        count: 400,
        name: 'a',
      },
      {
        time: '2019-06',
        count: 380,
        name: 'a',
      },
      {
        time: '2019-07',
        count: 220,
        name: 'a',
      },
      {
        time: '2019-03',
        count: 750,
        name: 'b',
      },
      {
        time: '2019-04',
        count: 650,
        name: 'b',
      },
      {
        time: '2019-05',
        count: 450,
        name: 'b',
      },
      {
        time: '2019-06',
        count: 400,
        name: 'b',
      },
      {
        time: '2019-07',
        count: 320,
        name: 'b',
      },
      {
        time: '2019-03',
        count: 900,
        name: 'c',
      },
      {
        time: '2019-04',
        count: 600,
        name: 'c',
      },
      {
        time: '2019-05',
        count: 450,
        name: 'c',
      },
      {
        time: '2019-06',
        count: 300,
        name: 'c',
      },
      {
        time: '2019-07',
        count: 200,
        name: 'c',
      },
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
// 首页概览
function Page() {
    http.get("/1360708/v1/api/behavior")
    .then(e=>{
        console.log(e)
    })
    return <div className='system'>
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
                <div className='behavior-chart'>
                    <Column {...config} />
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
                <div className='behavior-chart'>
                    <DemoDualAxes />
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