import React, {useEffect, useState} from 'react'
import http from '../../../utils/http'
import Layout from '../layout'
import {
    Table,
    Modal,
    Descriptions
} from 'antd'
import {formatDate} from '../../../utils/utils'
const HttpDetailModal = (props)=>{
    const [data, setData] = useState(props.detail)
    useEffect(()=>{
        setData(props.detail)
    }, [props.detail])
    if(!data) return <></>
    return (
    <Modal visible="true" footer={null} onCancel={()=>props.setDetail(null)}>
        <Descriptions bordered column={1}>
            <Descriptions.Item label="日期">{formatDate(data.timestamp*1000)}</Descriptions.Item>
            <Descriptions.Item label="日志类型">{data.type}</Descriptions.Item>
            <Descriptions.Item label="使用js接口">{data.apiType}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="接口地址">{data.pathUrl}</Descriptions.Item>
            <Descriptions.Item label="是否成功">{data.success?"成功":"失败"}</Descriptions.Item>
            <Descriptions.Item label="状态码">{data.status}</Descriptions.Item>
            <Descriptions.Item label="持续时间">{data.duration}</Descriptions.Item>
            <Descriptions.Item label="请求头">
                {data.requestHeader}
            </Descriptions.Item>
            <Descriptions.Item label="请求体">{data.requestBody}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="响应体">{data.responseBody}</Descriptions.Item>
        </Descriptions>
    </Modal>)
}
const HttpLogTable = (props)=>{
    const [data, setData] = useState([])
    const [detail, setDetail] = useState(null)
    useEffect(()=>{
        http.get("/v1/api/http")
        .then(e=>{
            console.log(e)
            e.data.forEach(i=>{
                i.key = i.id
            })
            setData(e.data)
        })
    }, [])
    const columns = [
        {
            title: "日期",
            dataIndex: 'timestamp',
            key: 'timestamp',
            render: (timestamp)=>formatDate(timestamp*1000),
            sorter: (a, b) => a.timestamp - b.timestamp,
            defaultSortOrder: "descend"
        },
        {
            title: "日志类型",
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: "使用js接口",
            dataIndex: 'apiType',
            key: 'apiType'
        },
        {
            title: "请求方法",
            dataIndex: 'method',
            key: 'method'
        },
        {
            title: "接口地址",
            dataIndex: 'pathUrl',
            key: 'pathUrl'
        },
        {
            title: "是否成功",
            dataIndex: 'success',
            key: 'success',
            render: (e)=>{
                if(e) return "成功"
                return "失败"
            }
        },
        {
            title: "状态码",
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: "持续时间",
            dataIndex: 'duration',
            key: 'duration'
        },
        {
            title: "详情",
            key: 'detail',
            render: (_, obj)=><div className='http-detail' onClick={()=>setDetail(obj)}>
                详情
                <style jsx>{`
                    .http-detail{
                        color: #2a79d7;
                        cursor: pointer;
                    }
                `}</style>
            </div>
        }
    ]
    return <>
        <Table columns={columns} dataSource={data}></Table>
        <HttpDetailModal detail={detail} setDetail={setDetail}></HttpDetailModal>
    </>
}
// 首页概览
function Page() {
    
    return <div>
        <HttpLogTable></HttpLogTable>
        
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