import React from 'react'
import http from '../../../utils/http'
import Layout from '../layout'
import { Space, Table, Tag } from 'antd'
import { useState, useEffect } from 'react'
import { formatDate } from '../../../utils/utils'

const columns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: "timestamp",
      render: (timestamp) => formatDate(new Date(timestamp*1000)),
    },
    {
        title: '资源地址',
        dataIndex: 'filename'
    },
    {
        title: '标签名称',
        dataIndex: 'tagName'
    },
    {
        title: '错误信息',
        dataIndex: 'errotMessage'
    },
    {
        title: '发生页面',
        dataIndex: 'title'
    },
    {
        title: '发生页面url',
        dataIndex: 'url'
    },
    {
      title: '浏览器',
      dataIndex: 'userAgent'
    },
]
  
// 首页概览
function Page() {
    const [data, setDate] = useState([])
    useEffect(function updateForm() {
        http.get("/v1/api/error/resource")
        .then(e=>{
            console.log(e)
            setDate(e.data.map(i=>{
                i.key = i.id
                return i
            }))
        })
    }, [])
    return <div className='js-error'>
        <div className='options-wrapper'>
            共{data.length}条错误
        </div>
        <div className='content-wrapper'>
            <Table columns={columns} dataSource={data} pagination={{position: ['bottomCenter']}}/>
        </div>
        <style jsx>{`
            .js-error{
                width: 100%;
                height: 100%;
                padding: 20px;
                box-sizing: border-box;
            }
            .options-wrapper{
                height: 60px;
                background: #eee;
                margin-bottom: 20px;
                line-height: 60px;
                text-indent: 1em;
            }
            .content-wrapper{
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