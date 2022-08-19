import React, {useEffect, useState} from 'react'
import http from '../../../utils/http'
import Layout from '../layout'
import {
    Column,
    Bar
} from '@ant-design/plots'
import {Popover} from 'antd'
const aliasMap = {
    "dnsTime": "DNS查询",
    "connectTime": "TCP连接耗时",
    "ttfbTime": "首字节到达",
    "responseTime": "响应时间",
    "parseDOMTime": "DOM解析渲染",
    "domContentLoadedTime": "DOMContentLoaded事件回调",
    "timeToInteractive": "首次可交互",
    "loadTime": "完整加载时间",
    "firstPaint": "首次绘制",
    "firstContentPaint": "首次内容绘制",
    "firstMeaningfulPaint": "首次有意义绘制",
    "largestContentfulPaint": "最大内容渲染",
    "firstInputDelay": "首次输入延迟"
}
const calcAverage = (arr, ...keys)=>{
    let data = {}
    keys.forEach(i=>{
        data[i] = 0
    })
    arr.forEach(i=>{
        keys.forEach(j=>{
            data[j] += Number(i[j])
        })
    })
    return data
}
const PerformentceColumn = (props)=>{
    const [data, setData] = useState([])
    useEffect(()=>{
        http.post("/v1/api/performence/paint", {
            url: props.urlIndex.url
        })
        .then((e)=>{
            // setData(e)
            console.log(e)
            let data = calcAverage(e.data, "firstPaint", "firstContentPaint", "firstMeaningfulPaint", "largestContentfulPaint", "firstInputDelay")
            console.log(data)
            Object.keys(data).forEach(key=>{
                data[key] /= e.data.length
            })
            let temp = []
            Object.keys(data).forEach(i=>{
                temp.push({name: i, time: data[i]})
            })
            setData(temp)
        })
    }, [props.urlIndex])
    const config = {
        data: data,
        xField: 'name',
        yField: 'time',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
            formatter(value){
                value.time = Number(value.time).toFixed()
            }
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            name: {
                alias: '渲染时期',
                formatter(name){
                    return aliasMap[name]
                }
            },
            time: {
                alias: '花费时间',
            },
        },
        color: "rgb(160, 68, 110)"
    };
    return <Column {...config} />;
}
const TimingBar = (props)=>{
    const [data, setData] = useState([])
    useEffect(()=>{
        http.post("/v1/api/performence/timing", {
            url: props.urlIndex.url
        })
        .then((e)=>{
            let data = calcAverage(e.data, "dnsTime", "connectTime", "ttfbTime", "responseTime", "parseDOMTime", "loadTime")
            let temp = []
            let temptime = 0
            Object.keys(data).forEach(i=>{
                if(i !== "loadTime")
                    temp.push({name: i, times: [temptime, temptime+=data[i]]})
            })
            temp.push({name: "loadTime", times: [0, data["loadTime"]]})
            setData(temp)
        })
    }, [props.urlIndex])
    const config = {
        data: data,
        xField: 'times',
        yField: 'name',
        isRange: true,
        label: {
            position: 'middle',
                layout: [
                {
                    type: 'adjust-color',
                },
            ],
            formatter(value){
                console.log("1",value)
                value.time = Number(value.time).toFixed()
            }
        },
        meta: {
            name: {
                formatter(name){
                    return aliasMap[name]
                }
            }
        },
        color: ({ name }) => {
            if(name === 'loadTime'){
              return 'rgb(255, 127, 121)';
            }
            return 'rgb(253, 208, 137)';
        }
    };
    return <Bar {...config} />;
}

// 首页概览
function Page() {
    const [urlList, setUrlList] = useState([])
    const [urlIndex, setUrlIndex] = useState(null)
    useEffect(()=>{
        http.get("/v1/api/urllist")
        .then((e)=>{
            console.log(e)
            setUrlList(e.data)
        })
    },[])
    useEffect(()=>{
        setUrlIndex(urlList[0])
    }, [urlList])
    function changeUrl(obj, e){
        setUrlIndex(obj)
    }
    return <div className='performence'>
        <div className='url-list-wrapper'>
            <div className='url-list-wrapper-header'>
                全部地址
            </div>
            <div className='url-list'>
                {urlList.map(i=>
                    <Popover content={i.url} placement="topRight" key={i.id}>
                        <div className='url-item' onClick={(e)=>changeUrl(i, e)}>{i.url}</div>
                    </Popover>
                )}
            </div>
        </div>
        <div className='container'>
            <div className='paint-wrapper'>
                <div className='paint-wrapper-header'>平均渲染时间 ms</div>
                <div className='paint-chart'>
                    {urlIndex && <PerformentceColumn urlIndex={urlIndex} ></PerformentceColumn>}
                </div>
            </div>
            <div className='paint-wrapper'>
                <div className='paint-wrapper-header'>平均加载时间 ms</div>
                <div className='paint-chart'>
                    {urlIndex && <TimingBar urlIndex={urlIndex}></TimingBar>}
                </div>
            </div>
        </div>
        <style jsx>{`
            .performence{
                display: flex;
                height: 100%;
            }
            .url-list-wrapper{
                width: 250px;
                padding: 20px;
            }
            .url-list{
                height: 100%;
                overflow: scroll;
            }
            .url-item{
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                margin-bottom: 10px;
                height: 40px;
                line-height: 40px;
                text-indent: 1em;
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-right: 50px;
                position: relative;
            }
            .url-item::after{
                content: ">";
                position: absolute;
                right: 1em;
                line-height: 40px;
            }
            .url-item:hover{
                background: #eee;
            }
            .container{
                flex-grow: 1;
                padding: 20px;
            }
            .paint-wrapper{
                border: 1px solid #ccc;
                padding: 0 20px;
                margin-bottom: 30px;
            }
            .paint-wrapper-header{
                height: 30px;
                line-height:30px;
                text-indent: 2em;
                border-bottom: 1px solid #ccc;
            }
            .paint-chart{
                height: 280px;
            }
            .url-list-wrapper-header{
                margin:8px;
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