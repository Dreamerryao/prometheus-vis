import React from 'react'
import { LineChartOutlined} from '@ant-design/icons'
import {PageHeader, Tag, Button, Descriptions} from 'antd'
import {useRouter, Router} from 'next/router'

export default function Header(props) {
    const router = useRouter()
    return (
        <div className='header'>
            <PageHeader
                className="site-page-header"
                onBack={() => {router.push("/")}}
                title="Demo项目"
                subTitle="备注：test"
                extra={[
                    <Button key="2">Operation</Button>,
                    <Button key="1" type="primary">Primary</Button>
                ]}
                >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Created">端口已被占用</Descriptions.Item>
                    <Descriptions.Item label="系统编号">#3001</Descriptions.Item>
                    <Descriptions.Item label="Creation Time">2022-08-12</Descriptions.Item>
                    <Descriptions.Item label="Remarks">prometheus</Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <style jsx>{`
                .header {
                    height: 100%;
                    line-height: 50px;
                    padding-left: 2em;
                    border-bottom: 1px solid #eee;
                }
            `}</style>
        </div>
    )
}
