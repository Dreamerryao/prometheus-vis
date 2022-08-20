import React, { useState } from 'react'
import { LineChartOutlined} from '@ant-design/icons';
import {Row, Col, Button} from 'antd'
import Link from 'next/link'
import { DualAxes } from '@ant-design/plots';


const index = () => {
    const data1 = [{"time":"0时","pv":10,"uv":4},{"time":"1时","pv":54,"uv":17},{"time":"2时","pv":231,"uv":331},{"time":"3时","pv":210,"uv":9},{"time":"4时","pv":12,"uv":23},{"time":"5时","pv":64,"uv":312},{"time":"6时","pv":321,"uv":32},{"time":"7时","pv":123,"uv":231},{"time":"8时","pv":32,"uv":46},{"time":"9时","pv":312,"uv":324},{"time":"10时","pv":198,"uv":123},{"time":"11时","pv":299,"uv":435},{"time":"12时","pv":643,"uv":399},{"time":"13时","pv":224,"uv":24},{"time":"14时","pv":666,"uv":420},{"time":"15时","pv":256,"uv":155},{"time":"16时","pv":90,"uv":23},{"time":"17时","pv":124,"uv":34},{"time":"18时","pv":168,"uv":425},{"time":"19时","pv":24,"uv":152},{"time":"20时","pv":163,"uv":25},{"time":"21时","pv":75,"uv":35},{"time":"22时","pv":64,"uv":35},{"time":"23时","pv":63,"uv":64},{"time":"24时","pv":85,"uv":35}]
    const config = {
        autoFit: true,
        data: [data1, data1],
        xField: 'time',
        yField: ['pv', 'uv'],
        legend: false,
        xAxis: {
			grid: null,
			line: null,
			title: null,
			label: null,
		},
        yAxis: {
            pv: {
                grid: null,
                line: null,
                title: null,
                label: null,
            },
            uv: {
                grid: null,
                line: null,
                title: null,
                label: null,
            }
        },
        padding: 20,
        geometryOptions: [
            {
                geometry: 'line',
                color: '#5B8FF9',
                smooth: true,
              },
              {
                geometry: 'line',
                color: '#5AD8A6',
                smooth: true,
              },
        ],
    };
    const [data, setData] = useState([
        {
            name: "Demo网站",
            url: "https://prometheus-vis.vercel.app"
        },
        {
            name: "前端监控系统",
            url: "https://prometheus-vis.vercel.app"
        },
        {
            name: "个人博客",
            url: "https://prometheus-vis.vercel.app"
        },
        {
            name: "监控系统",
            url: "https://prometheus-vis.vercel.app"
        }
    ])
    return (
        <>
            <div className='header'>
                <LineChartOutlined />
                <div className='title'>prometheus-vis</div>
                
            </div>
            <div className='float-right'>
                <Button key="1" type="primary" style={{marginRight: '1em', float: 'right'}}>添加</Button>
                <Button key="2" style={{marginRight: '1em', float: 'right'}}>编辑</Button>
            </div>
            <div className='content'>
                <Row gutter={[24, 24]}>
                    {data.map((i, index)=>(
                        <Col span={6} key={index}>
                            <div className='item'>
                                <div className='name'>
                                    <Link href="/dashboard">{i.name}</Link>
                                </div>
                                <div className='chart'>
                                    <DualAxes {...config}></DualAxes>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <style jsx>{`
                .header {
                    height: 75px;
                    line-height: 75px;
                    padding-left: 2em;
                    border-bottom: 1px solid #eee;
                    font-size: 20px;
                }
                .title{
                    display: inline;
                    margin-left: 1em;
                    cursor: pointer;
                }
                .content{
                    margin: 2em;
                    overflow: hidden;
                }
                .item{
                    width: 100%;
                    height: 220px;
                    border: 1px solid #eee;
                    border-radius: 8px;
                }
                .item .name{
                    font-size: 20px;
                    height: 20px;
                    line-height: 20px;
                    margin: 1em;
                    cursor: pointer;
                }
                .item .chart{
                    height: 160px;
                }
                .item:hover{
                    box-shadow: 0 7px 7px 0px #eee;
                }
                .float-right{
                    margin: 1em 0;
                    overflow: hidden;
                }
            `}</style>
        </>
    )
}

export default index