
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
      sorter:  (a, b) => a.timestamp - b.timestamp
    },
    {
        title: '错误类型',
        dataIndex: 'errorType',
        key: 'errorType'
    },
    {
        title: '错误信息',
        dataIndex: 'message',
        key: 'message'
    },
    {
        title: '错误栈',
        dataIndex: 'stack',
        key: 'stack'
    },
    {
        title: '发生页面',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: '发生页面url',
        dataIndex: 'url',
        key: 'url'
    },
    {
        title: '浏览器',
        dataIndex: 'userAgent',
        key: 'userAgent'
    },
    
]
// 首页概览
function Page() {
    const [data, setData] = useState([])
    useEffect(function updateForm() {
        http.get("/v1/api/error/js")
        .then(e=>{
            console.log(e)
            setData(e.data.map((i)=>{
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
            <Table 
                columns={columns} 
                dataSource={data} 
                pagination={{position: ['bottomCenter']}}
                scroll={{
                    scrollToFirstRowOnChange: true,
                    y: '700px'
                }}
            />
        </div>
        <style jsx>{`
            .js-error{
                width: 100%;
                height: 100%;
                padding: 20px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
            }
            .options-wrapper{
                height: 60px;
                background: #eee;
                margin-bottom: 20px;
                line-height: 60px;
                text-indent: 1em;
            }
            .content-wrapper{
                flex-grow: 1;
                overflow: scroll;
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