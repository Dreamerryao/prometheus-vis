import React from 'react'
import http from '../../../utils/http'
import Layout from '../layout'
import {Space, Table, Tag, Select, Input} from 'antd'
import {useState, useEffect} from 'react'
import {formatDate} from '../../../utils/utils'
const {Search} = Input
const columns = [
	{
		title: '时间',
		dataIndex: 'timestamp',
		key: 'timestamp',
		render: (timestamp) => formatDate(new Date(timestamp * 1000)),
	},
	{
		title: '资源地址',
		dataIndex: 'filename',
	},
	{
		title: '标签名称',
		dataIndex: 'tagName',
	},
	{
		title: '错误信息',
		dataIndex: 'errorMessage',
	},
	{
		title: '发生页面',
		dataIndex: 'title',
	},
	{
		title: '发生页面url',
		dataIndex: 'url',
	},
	{
		title: '浏览器',
		dataIndex: 'userAgent',
	},
]

// 首页概览
function Page() {
	const [data, setDate] = useState([])
	useEffect(function updateForm() {
		http.get('/v1/api/error/resource').then((e) => {
			console.log(e)
			setDate(
				e.data.map((i) => {
					i.key = i.id
					return i
				})
			)
		})
	}, [])
	return (
		<div className="js-error">
			<div className="search-wrapper">
				<Search
					placeholder="关键词"
					enterButton="搜索"
					size="large"
					allowClear
				></Search>
			</div>
			<div className="options-wrapper">
				<div className="">
					<Select defaultValue={3600} style={{width: 120}}>
						<Select.Option value={3600}>1小时内</Select.Option>
						<Select.Option value={14400}>4小时内</Select.Option>
						<Select.Option value={21600}>6小时内</Select.Option>
						<Select.Option value={43200}>12小时内</Select.Option>
						<Select.Option value={86400}>24小时内</Select.Option>
						<Select.Option value={604800}>一周内</Select.Option>
					</Select>
				</div>
				<div className="">
					<Select defaultValue={''} style={{width: 120}}>
						<Select.Option value={''}>全部</Select.Option>
						<Select.Option value={'jserror'}>jserror</Select.Option>
					</Select>
				</div>
				<div className="">共{data.length}条错误</div>
			</div>
			<div className="content-wrapper">
				<Table
					columns={columns}
					dataSource={data}
					pagination={{position: ['bottomCenter']}}
					scroll={{
						scrollToFirstRowOnChange: true,
						y: '700px',
					}}
				/>
			</div>
			<style jsx>{`
				.js-error {
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
                    display: flex;
                }
                .search-wrapper{
                    width: 250px;
                    margin-bottom: 10px;
                }
				.content-wrapper {
					flex-grow: 1;
					overflow: scroll;
				}
			`}</style>
		</div>
	)
}
Page.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
export default Page
