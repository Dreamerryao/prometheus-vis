import React from 'react'
import { LineChartOutlined} from '@ant-design/icons';

export default function Header(props) {

    return (
        <div className='header'>
            <div className='content'>
                <LineChartOutlined></LineChartOutlined>
                前端监控系统
            </div>
            <style jsx>{`
                .header {
                    height: 100%;
                    line-height: 50px;
                    background: #eee;
                    padding-left: 2em;
                }
            `}</style>
        </div>
    )
}
