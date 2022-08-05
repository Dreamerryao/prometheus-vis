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
        title: '错误类型',
        dataIndex: 'errorType'
    },
    {
      title: '错误信息',
      dataIndex: 'message'
    },
    {
      title: '错误栈',
      dataIndex: 'stack'
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
    const [data, setDate] = useState(null)
    useEffect(function updateForm() {
        http.get("/1360708/v1/api/error/js")
        .then(e=>{
            console.log(e)
            setDate(e.data)
        })
    }, [])
    return <div className='js-error'>
        <div className='options-wrapper'>

        </div>
        <div className='content-wrapper'>
            <Table columns={columns} dataSource={data} pagination={false}/>
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
                background: lightblue;
                margin-bottom: 20px;
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