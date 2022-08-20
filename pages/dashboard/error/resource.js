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
        sorter: (a, b) => a.timestamp - b.timestamp,
        defaultSortOrder: "descend"
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
const useSelected = (data, defaultLimitTime = 0, defaultSearchKey = '', defaultErrorType) => {
	const [limitTime, setLimitTime] = useState(defaultLimitTime)
	const [searchKey, setSearchKey] = useState(defaultSearchKey)
    const [errorType, setErrorType] = useState(defaultErrorType)
	const [selectedData, setSelectedData] = useState([])
	useEffect(() => {
		let selectedData
		selectedData = data.filter((i) => {
			if (limitTime != 0 && Date.now() / 1000 - i.timestamp >= limitTime) {
				return false
			}
            // console.log(i.tagName, errorType)
            if(errorType != "" && i.tagName != errorType){
                return false
            }
			let ret = false
			for (let key in i) {
				if (i[key].match(searchKey)) {
					ret = true
					break
				}
			}
			return ret
		})
		console.log(data, selectedData)
		setSelectedData(selectedData)
	}, [limitTime, searchKey, errorType, data])
	return [
		[limitTime, setLimitTime],
		[searchKey, setSearchKey],
        [errorType, setErrorType],
		[selectedData, setSelectedData],
	]
}
// 首页概览
function Page() {
	const [data, setDate] = useState([])
    const [allErrorType, setAllErrorType] = useState([])
	const [
		[limitTime, setLimitTime],
		[searchKey, setSearchKey],
        [errorType, setErrorType],
		[selectedData, setSelectedData],
	] = useSelected(data, 0, '', '')
	useEffect(function updateForm() {
		http.get('/v1/api/error/resource').then((e) => {
            let allErrorType = {}
			console.log(e)
			setDate(
				e.data.map((i) => {
					i.key = i.id
                    if(!allErrorType[i.tagName]) allErrorType[i.tagName] = 1
					return i
				})
			)
            setAllErrorType(Object.keys(allErrorType))
		})
        .catch(e=>{
            console.log(e)
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
					onChange={(e) => {
						setSearchKey(e.target.value)
					}}
				></Search>
			</div>
			<div className="options-wrapper">
				<div className="">
					<Select
						value={limitTime}
						style={{width: 120}}
						onChange={(i) => {
							setLimitTime(i)
						}}
					>
                        <Select.Option key={0} value={0}>全部</Select.Option>
						<Select.Option key={3600} value={3600}>1小时内</Select.Option>
						<Select.Option key={14400} value={14400}>4小时内</Select.Option>
						<Select.Option key={21600} value={21600}>6小时内</Select.Option>
						<Select.Option key={43200} value={43200}>12小时内</Select.Option>
						<Select.Option key={86400} value={86400}>24小时内</Select.Option>
						<Select.Option key={604800} value={604800}>一周内</Select.Option>
					</Select>
				</div>
				<div className="">
					<Select value={errorType} onChange={(i)=>{setErrorType(i)}} style={{width: 120}}>
						<Select.Option key={''} value={''}>全部</Select.Option>
						{allErrorType.map((i)=>(<Select.Option key={i} value={i}>{i}</Select.Option>))}
					</Select>
				</div>
				<div className="">共{selectedData.length}条错误</div>
			</div>
			<div className="content-wrapper">
				<Table
					columns={columns}
					dataSource={selectedData}
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
				.options-wrapper {
					height: 60px;
					background: #eee;
					margin-bottom: 20px;
					line-height: 60px;
					text-indent: 1em;
					display: flex;
				}
				.search-wrapper {
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
