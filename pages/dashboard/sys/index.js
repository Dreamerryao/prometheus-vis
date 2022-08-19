import React, {useState, useEffect} from 'react'
import http from '../../../utils/http'
import Layout from '../layout'
import {Column, DualAxes, Pie} from '@ant-design/plots'
import {Card} from 'antd'
import {parseUserAgent} from '../../../utils/detect-browser'
//获取
var date = new Date()
var mouth = date.getMonth(date) + 1
var year = date.getFullYear(date)
var day = date.getDate(date)
var mouth1 = []
mouth1.push(mouth)
var biaoji = 0
var zhou = date.getDay(date)
if (zhou == 0) {
	zhou = 7
}
//获取上周周日日期
const szhou = () => {
	var shang = 0
	if (day < 7) {
		biaoji = day
		mouth1.push(mouth - 1)
		if (
			mouth == 1 ||
			mouth == 3 ||
			mouth == 5 ||
			mouth == 7 ||
			mouth == 8 ||
			mouth == 10 ||
			mouth == 12
		) {
			shang = 31
		}
		if (mouth == 4 || mouth == 6 || mouth == 9 || mouth == 11) {
			shang = 30
		}
		if (mouth == 2) {
			if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
				shang = 29
			} else {
				shang = 28
			}
		}
		shang = shang - (zhou - day)
	}
	shang = day - zhou
	return shang
}
//获取上周日期数组
const shzhou = () => {
	var s = szhou()
	var sh = szhou()
	var zpv = []
	for (var i = 0; i < 7; i++) {
		if (sh == 0) {
			mouth1.push(mouth - 1)
			biaoji = i
			if (
				mouth == 1 ||
				mouth == 3 ||
				mouth == 5 ||
				mouth == 7 ||
				mouth == 8 ||
				mouth == 10 ||
				mouth == 12
			) {
				s = 31
			}
			if (mouth == 4 || mouth == 6 || mouth == 9 || mouth == 11) {
				s = 30
			}
			if (mouth == 2) {
				if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
					s = 29
				} else {
					s = 28
				}
			}
			i = 0
		}
		zpv.push(s - i)
		sh--
	}
	return zpv
}
//获取上周pv/uv数数组
const szhoupv = (detail1) => {
	var szpv = [0, 0, 0, 0, 0, 0, 0]
	var shang = shzhou()
	//如果没有跨月
	if (mouth1.length == 1) {
		for (var i = 0; i < detail1.length; i++) {
			var date = new Date(detail1[i].timestamp * 1000)
			var year11 = date.getFullYear()
			var mouth11 = date.getMonth() + 1
			var day11 = date.getDate()
			if (year11 == year && mouth11 == mouth1[0] && day11 == shang[0]) {
				szpv[0]++
			}
			if (year11 == year && mouth11 == mouth1[0] && day11 == shang[1]) {
				szpv[1]++
			}
			if (year11 == year && mouth11 == mouth1[0] && day11 == shang[2]) {
				szpv[2]++
			}
			if (year11 == year && mouth11 == mouth1[0] && day11 == shang[3]) {
				szpv[3]++
			}
			if (year11 == year && mouth11 == mouth1[0] && day11 == shang[4]) {
				szpv[4]++
			}
			if (year11 == year && mouth11 == mouth1[0] && day11 == shang[5]) {
				szpv[5]++
			}
			if (year11 == year && mouth11 == mouth1[0] && day11 == shang[6]) {
				szpv[6]++
			}
		}
	}
	//如果跨月了
	if (mouth1.length == 2) {
		for (var i = 0; i < detail1.length; i++) {
			var year11 = new Date(detail1[i].timestamp).getFullYear
			var mouth111 = new Date(detail1[i].timestamp).getMonth
			var day11 = new Date(detail1[i].timestamp).getDate
			for (var j = 0; j < biaoji; j++) {
				if (year11 == year && mouth111 == mouth1[1] && day11 == shang[j]) {
					szpv[j]++
				}
			}
			for (var j = 0; j < 7 - biaoji; j++) {
				if (year11 == year && mouth111 == mouth1[1] && day11 == shang[j]) {
					szpv[j]++
				}
			}
		}
	}
	return szpv
}
//获取上周pv数组
var szpv = [0, 0, 0, 0, 0, 0, 0]
const pvvv = (detail1) => {
	var a = szhoupv(detail1)
	for (var i = 0; i < a.length; i++) {
		szpv[i] = a[i]
	}
}
//获取上周uv数组
var szuv = [0, 0, 0, 0, 0, 0, 0]
const uvvv = (uv) => {
	var a = szhoupv(uv)
	for (var i = 0; i < a.length; i++) {
		szuv[i] = a[i]
	}
}

//判断是否为当前日期
const panduan = (detail1) => {
	var data = new Date(detail1.timestamp * 1000)
	if (
		!(
			data.getFullYear() == new Date().getFullYear() &&
			data.getMonth() + 1 == new Date().getMonth() + 1 &&
			data.getDate() == new Date().getDate()
		)
	)
		return false
	return true
}
//统计今日pu，uv时刻数
const tongji = (detail1, time) => {
	var l = 0
	for (var i = 0; i < detail1.length; i++) {
		var date = new Date(detail1[i].timestamp * 1000)
		var hour1 = Number(date.getHours())
		if (panduan(detail1[i]))
			if (hour1 == time) {
				l++
			}
	}
	return l
}
//统计日pv数
const tongji1 = (pv) => {
	var l = 0
	for (var i = 0; i < pv.length; i++) {
		if (panduan(pv[i])) l++
	}
	return l
}
//统计日uv数
const tongji2 = (uv) => {
	var l = 0
	for (var i = 0; i < uv.length; i++) {
		if (panduan(uv[i])) l++
	}
	return l
}
//计算日uv占比
const jisuan = (pv, uv) => {
	if (uv == 0) return 0
	return (uv / pv) * 100
}
//szpv=[20,25,36,24,49,45,33]
//szuv=[65,44,31,44,45,47,63]
const A = (props) => {
	return (
		<Card
			style={{
				width: '33%',
				'border-style': 'solid',
				background: 'white',
				'margin-top': -18,
				'margin-bottom': 40,
				'margin-right': 50,
				'border-radius': 20,
			}}
			bodyStyle={{
				height: 211,
				'border-radius': 20,
				'box-shadow': '0px 0px 5px black',
			}}
			hoverable={true}
		>
			<p className="p1">{props.title}</p>
			<p className="p2">{props.a}</p>
			<span className="p3">{props.subtitle}</span>
			<span className="p4">{props.b}</span>
			<style jsx>
				{`
					.p1 {
						font-size: 16px;
						display: inline;
						font-weight: bolder;
						color: darkcyan;
					}
					.p2 {
						margin-left: 85px;
						margin-top: 10px;
						font-size: 41px;
						height: 76px;
						margin-right: 20px;
						margin-bottom: 0px;
					}
					.p3 {
						margin-left: 2px;
						margin-top: 20px;
						font-size: 17px;
						display: inline;
						margin-right: 20px;
					}
					.p4 {
						font-size: 22px;
					}
				`}
			</style>
		</Card>
	)
}
const A1 = (props) => (
	<Card
		style={{
			width: '33%',
			'border-style': 'solid',
			background: 'white',
			'margin-top': -18,
			'margin-bottom': 40,
			'margin-right': 50,
			'border-radius': 20,
		}}
		bodyStyle={{
			height: 211,
			'border-radius': 20,
			'box-shadow': '0px 0px 5px black',
		}}
		hoverable={true}
	>
		<p className="p1">总异常数</p>
		<p className="p2">{props.a}</p>
		<span className="p3">日异常数</span>
		<span className="p4">{props.b}</span>
		<style jsx>
			{`
				.p1 {
					font-size: 16px;
					display: inline;
					font-weight: bolder;
					color: darkcyan;
				}
				.p2 {
					margin-left: 85px;
					margin-top: 10px;
					font-size: 41px;
					height: 76px;
					margin-right: 20px;
					margin-bottom: 0px;
				}
				.p3 {
					margin-left: 2px;
					margin-top: 20px;
					font-size: 17px;
					display: inline;
					margin-right: 20px;
				}
				.p4 {
					font-size: 22px;
				}
			`}
		</style>
	</Card>
)
const A2 = (props) => (
	<Card
		style={{
			width: '33%',
			height: 211,
			'border-style': 'solid',
			background: 'white',
			'margin-top': -18,
			'border-radius': 20,
			'box-shadow': '0px 0px 5px black',
			'margin-bottom': 40,
			'margin-right': 50,
		}}
		hoverable={true}
	>
		<p className="p1">网络请求个数：</p>
		<p className="p2">{props.a}</p>
		<span className="p3">日请求数：</span>
		<span className="p4">{props.b}</span>
		<style jsx>
			{`
				.p1 {
					font-size: 16px;
					display: inline;
					font-weight: bolder;
					color: darkcyan;
				}
				.p2 {
					margin-left: 85px;
					margin-top: 10px;
					font-size: 41px;
					height: 76px;
					margin-right: 20px;
					margin-bottom: 0px;
				}
				.p3 {
					margin-left: 2px;
					margin-top: 20px;
					font-size: 17px;
					display: inline;
					margin-right: 20px;
				}
				.p4 {
					font-size: 22px;
				}
			`}
		</style>
	</Card>
)
const A3 = (props) => (
	<Card
		style={{
			width: '33%',
			height: 211,
			'border-style': 'solid',
			background: 'white',
			'margin-top': -18,
			'border-radius': 20,
			'box-shadow': '0px 0px 5px black',
			'margin-bottom': 40,
			'margin-right': 50,
		}}
		hoverable={true}
	>
		<p className="p1">总uv占比：</p>
		<p className="p2">{props.a}%</p>
		<span className="p3">日uv占比：</span>
		<span className="p4">{props.b}%</span>
		<style jsx>
			{`
				.p1 {
					font-size: 16px;
					display: inline;
					font-weight: bolder;
					color: darkcyan;
				}
				.p2 {
					margin-left: 85px;
					margin-top: 10px;
					font-size: 41px;
					height: 76px;
					margin-right: 20px;
					margin-bottom: 0px;
				}
				.p3 {
					margin-left: 2px;
					margin-top: 20px;
					font-size: 17px;
					display: inline;
					margin-right: 20px;
				}
				.p4 {
					font-size: 22px;
				}
			`}
		</style>
	</Card>
)
const A4 = (props) => (
	<Card
		style={{
			width: '33%',
			height: 211,
			'border-style': 'solid',
			background: 'white',
			'margin-top': -18,
			'border-radius': 20,
			'box-shadow': '0px 0px 5px black',
			'margin-bottom': 40,
			'margin-right': 50,
		}}
		hoverable={true}
	>
		<p className="p1">总用户量：</p>
		<p className="p2">{props.a}</p>
		<span className="p3">日用户量：</span>
		<span className="p4">{props.b}</span>
		<style jsx>
			{`
				.p1 {
					font-size: 16px;
					display: inline;
					font-weight: bolder;
					color: darkcyan;
				}
				.p2 {
					margin-left: 85px;
					margin-top: 10px;
					font-size: 41px;
					height: 76px;
					margin-right: 20px;
					margin-bottom: 0px;
				}
				.p3 {
					margin-left: 2px;
					margin-top: 20px;
					font-size: 17px;
					display: inline;
					margin-right: 20px;
				}
				.p4 {
					font-size: 22px;
				}
			`}
		</style>
	</Card>
)
const Ap1 = () => (
	<Card
		style={{
			height: 140,
			'border-radius': 20,
		}}
		bodyStyle={{
			height: '100%',
			'border-radius': 20,
			'box-shadow': '0px 0px 5px black',
		}}
		hoverable={true}
	>
		<p className="a">请求（ms）</p>
		<p className="b">112</p>
		<style jsx>
			{`
				.a {
					font-size: 25px;
					font-weight: bold;
				}
				.b {
					font-size: 25px;
					margin-left: 160px;
					margin-top: -15px;
				}
			`}
		</style>
	</Card>
)
const Ap2 = () => (
	<Card
		style={{
			height: 140,
			'border-radius': 20,
		}}
		bodyStyle={{
			height: '100%',
			'border-radius': 20,
			'box-shadow': '0px 0px 5px black',
		}}
		hoverable={true}
	>
		<p className="a">响应（ms）</p>
		<p className="b">112</p>
		<style jsx>
			{`
				.a {
					font-size: 25px;
					font-weight: bold;
				}
				.b {
					font-size: 25px;
					margin-left: 160px;
					margin-top: -15px;
				}
			`}
		</style>
	</Card>
)
const Ap3 = (props) => (
	<Card
		style={{
			height: 140,
			'border-radius': 20,
		}}
		bodyStyle={{
			height: '100%',
			'border-radius': 20,
			'box-shadow': '0px 0px 5px black',
		}}
		hoverable={true}
	>
		<p className="a">成功率</p>
		<p className="b">{props.a}%</p>
		<style jsx>
			{`
				.a {
					font-size: 25px;
					font-weight: bold;
				}
				.b {
					font-size: 25px;
					margin-left: 160px;
					margin-top: -15px;
				}
			`}
		</style>
	</Card>
)
const DemoDualAxes = () => {
	const uvBillData = [
		{
			time: '8',
			value: 350,
			type: '请求',
		},
		{
			time: '10',
			value: 900,
			type: '请求',
		},
		{
			time: '12',
			value: 470,
			type: '请求',
		},
		{
			time: '16',
			value: 300,
			type: '请求',
		},
		{
			time: '20',
			value: 450,
			type: '请求',
		},
		{
			time: '24',
			value: 470,
			type: '请求',
		},
		{
			time: '4',
			value: 470,
			type: '请求',
		},
		{
			time: '6',
			value: 470,
			type: '请求',
		},
		{
			time: '8',
			value: 400,
			type: '响应',
		},
		{
			time: '10',
			value: 300,
			type: '响应',
		},
		{
			time: '12',
			value: 550,
			type: '响应',
		},
		{
			time: '16',
			value: 200,
			type: '响应',
		},
		{
			time: '20',
			value: 300,
			type: '响应',
		},
		{
			time: '24',
			value: 700,
			type: '响应',
		},
		{
			time: '4',
			value: 600,
			type: '响应',
		},
		{
			time: '6',
			value: 300,
			type: '响应',
		},
		{
			time: '8',
			value: 600,
			type: '总时间',
		},
		{
			time: '10',
			value: 1000,
			type: '总时间',
		},
		{
			time: '12',
			value: 400,
			type: '总时间',
		},
		{
			time: '16',
			value: 600,
			type: '总时间',
		},
		{
			time: '20',
			value: 300,
			type: '总时间',
		},
		{
			time: '24',
			value: 700,
			type: '总时间',
		},
		{
			time: '4',
			value: 650,
			type: '总时间',
		},
		{
			time: '6',
			value: 600,
			type: '总时间',
		},
	]
	const transformData = []
	const config = {
		data: [uvBillData, transformData],
		legend: {
			position: 'bottom',
		},
		xField: 'time',
		yField: ['value', 'count'],
		geometryOptions: [
			{
				geometry: 'line',
				seriesField: 'type',
				lineStyle: {
					lineWidth: 3,
					lineDash: [5, 5],
				},
				smooth: true,
			},
			{
				geometry: 'line',
				seriesField: 'name',
				point: {},
			},
		],
	}
	return <DualAxes {...config} />
}
const PvColumn = (props) => {
	const data = [
		{
			type: '上周一',
			sales: szpv[6],
		},
		{
			type: '上周二',
			sales: szpv[5],
		},
		{
			type: '上周三',
			sales: szpv[4],
		},
		{
			type: '上周四',
			sales: szpv[3],
		},
		{
			type: '上周五',
			sales: szpv[2],
		},
		{
			type: '上周六',
			sales: szpv[1],
		},
		{
			type: '上周日',
			sales: szpv[0],
		},
	]
	const config = {
		data,
		xField: 'type',
		yField: 'sales',
		columnWidthRatio: 0.7,
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false,
			},
		},
		meta: {
			type: {
				alias: '类别',
			},
			sales: {
				alias: 'pv数',
			},
		},
		xAxis: {
			grid: null,
			line: null,
			title: null,
			label: null,
		},
		yAxis: {
			grid: null,
			line: null,
			title: null,
			label: null,
		},
	}
	return (
		<Card
			style={{
				height: '40%',
				width: '100%',
				'border-radius': 20,
			}}
			bodyStyle={{
				height: '100%',
				'border-radius': 20,
				'box-shadow': '0px 0px 5px black',
			}}
			hoverable={true}
		>
			<p className="a">pv数</p>
			<div className="b">
				<Column {...config} />
			</div>
			<div className="c">总pv数：</div>
			<p className="d">{props.a}</p>
			<style jsx>
				{`
					.a {
						font-weight: bold;
						margin-top: -15px;
						margin-bottom: 1em;
						font-size: 20px;
					}
					.b {
						width: 109%;
						height: 78%;
						margin-left: -10px;
						margin-top: -12px;
					}
					.c {
						font-size: 18px;
						margin-top: -15px;
						color: cadetblue;
					}
					.d {
						font-size: 18px;
						margin-top: -28px;
						margin-left: 80px;
						margin-bottom: 1em;
					}
				`}
			</style>
		</Card>
	)
}
const UvColumn = (props) => {
	const data = [
		{
			type: '上周一',
			sales: szuv[0],
		},
		{
			type: '上周二',
			sales: szuv[1],
		},
		{
			type: '上周三',
			sales: szuv[2],
		},
		{
			type: '上周四',
			sales: szuv[3],
		},
		{
			type: '上周五',
			sales: szuv[4],
		},
		{
			type: '上周六',
			sales: szuv[5],
		},
		{
			type: '上周日',
			sales: szuv[6],
		},
	]
	const config = {
		data,
		xField: 'type',
		yField: 'sales',
		columnWidthRatio: 0.7,
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false,
			},
		},
		meta: {
			type: {
				alias: '类别',
			},
			sales: {
				alias: '销售额',
			},
		},
		xAxis: {
			grid: null,
			line: null,
			title: null,
			label: null,
		},
		yAxis: {
			grid: null,
			line: null,
			title: null,
			label: null,
		},
	}
	return (
		<Card
			style={{
				height: '40%',
				width: '100%',
				'border-radius': 20,
			}}
			bodyStyle={{
				height: '100%',
				'border-radius': 20,
				'box-shadow': '0px 0px 5px black',
			}}
			hoverable={true}
		>
			<p className="a">uv数</p>
			<div className="b">
				<Column {...config} />
			</div>
			<div className="c">总uv数：</div>
			<p className="d">{props.a}</p>
			<style jsx>
				{`
					.a {
						font-weight: bold;
						margin-top: -15px;
						margin-bottom: 1em;
						font-size: 20px;
					}
					.b {
						width: 109%;
						height: 78%;
						margin-left: -10px;
						margin-top: -12px;
					}
					.c {
						font-size: 18px;
						margin-top: -15px;
						color: cadetblue;
					}
					.d {
						font-size: 18px;
						margin-top: -28px;
						margin-left: 80px;
						margin-bottom: 1em;
					}
				`}
			</style>
		</Card>
	)
}
const CountPie = (props) => {
	const data = [
		{
			type: 'Edge',
			value: 40,
		},
		{
			type: 'Google',
			value: 40,
		},
		{
			type: 'Firefox',
			value: 20,
		},
		{
			type: '360',
			value: 20,
		},
	]
	const config = {
		appendPadding: 10,
		data: props.data ? props.data : data,
		angleField: 'value',
		colorField: 'type',
		radius: 0.9,
		label: {
			type: 'inner',
			offset: '-30%',
			content: ({percent}) => `${(percent * 100).toFixed(0)}%`,
			style: {
				fontSize: 21,
				textAlign: 'center',
			},
		},
		interactions: [
			{
				type: 'element-active',
			},
		],
	}
	return (
		<>
			<Card
				title={props.title}
				style={{
					borderRadius: 20,
					height: 470,
					boxShadow: '0px 0px 5px black',
				}}
				headStyle={{
					fontWeight: 'bold',
					textAlign: 'center',
					fontSize: 25,
				}}
				bodyStyle={{
					marginTop: -25,
				}}
				hoverable={true}
			>
				<div>
					<Pie {...config} />
				</div>
			</Card>
		</>
	)
}
// 首页概览
function Page() {
	const [dataa, setData] = useState([])
	const [detail, setDetail] = useState([])
	const [detail2, setDetail2] = useState([])
	const [detail1, setDetail1] = useState([])
	const [browserData, setBrowserData] = useState([])
	const [osData, setOsData] = useState([])

	///v1/api/behavior
	useEffect(() => {
		http.get('/v1/api/behavior').then((e) => {
			let data = e.data
			let browserData = {}
			let osData = {}
			window.arr = e.data
			window.parseUserAgent = parseUserAgent
			e.data.forEach((i) => {
				i.key = i.id
			})
			setDetail1(data)
			data.forEach((i) => {
				let info = parseUserAgent(i.userAgent)
				browserData[info.name] = browserData[info.name]
					? browserData[info.name] + 1
					: 1
				osData[info.os] = osData[info.os] ? osData[info.os] + 1 : 1
			})
			browserData = Object.keys(browserData).map((i) => {
				return {type: i, value: browserData[i]}
			})
			osData = Object.keys(osData).map((i) => {
				return {type: i, value: osData[i]}
			})
			setBrowserData(browserData)
			setOsData(osData)
		})
	}, [])
	///v1/api/error/js
	useEffect(() => {
		http.get('/v1/api/error/js').then((e) => {
			e.data.forEach((i) => {
				i.key = i.id
			})
			setData(e.data)
		})
	}, [])
	///v1/api/error/resource
	useEffect(() => {
		http.get('/v1/api/error/resource').then((e) => {
			e.data.forEach((i) => {
				i.key = i.id
			})
			setDetail(e.data)
		})
	}, [])
	///v1/api/http
	useEffect(() => {
		http.get('/v1/api/http').then((e1) => {
			e1.data.forEach((i) => {
				i.key = i.id
			})
			setDetail2(e1.data)
		})
	}, [])
	var obj = {}
	var uv = []
	for (var i = 0; i < detail1.length; i++) {
		if (!obj[detail1[i].uuid]) {
			obj[detail1[i].uuid] = 1
			uv.push(detail1[i])
		}
	}
	//表格
	const config1 = {
		data: [
			{
				time: '0时',
				type: 'pv',
				value: tongji(detail1, 0),
			},
			{
				time: '0时',
				type: 'uv',
				value: tongji(uv, 0),
			},
			{
				time: '1时',
				type: 'pv',
				value: tongji(detail1, 1),
			},
			{
				time: '1时',
				type: 'uv',
				value: tongji(uv, 1),
			},
			{
				time: '2时',
				type: 'pv',
				value: tongji(detail1, 2),
			},
			{
				time: '2时',
				type: 'uv',
				value: tongji(uv, 2),
			},
			{
				time: '3时',
				type: 'pv',
				value: tongji(detail1, 3),
			},
			{
				time: '3时',
				type: 'uv',
				value: tongji(uv, 3),
			},
			{
				time: '4时',
				type: 'pv',
				value: tongji(detail1, 4),
			},
			{
				time: '4时',
				type: 'uv',
				value: tongji(uv, 4),
			},
			{
				time: '5时',
				type: 'pv',
				value: tongji(detail1, 5),
			},
			{
				time: '5时',
				type: 'uv',
				value: tongji(uv, 5),
			},
			{
				time: '6时',
				type: 'pv',
				value: tongji(detail1, 6),
			},
			{
				time: '6时',
				type: 'uv',
				value: tongji(uv, 6),
			},
			{
				time: '7时',
				type: 'pv',
				value: tongji(detail1, 7),
			},
			{
				time: '7时',
				type: 'uv',
				value: tongji(uv, 7),
			},
			{
				time: '8时',
				type: 'pv',
				value: tongji(detail1, 8),
			},
			{
				time: '8时',
				type: 'uv',
				value: tongji(uv, 8),
			},
			{
				time: '9时',
				type: 'pv',
				value: tongji(detail1, 9),
			},
			{
				time: '9时',
				type: 'uv',
				value: tongji(uv, 9),
			},
			{
				time: '10时',
				type: 'pv',
				value: tongji(detail1, 10),
			},
			{
				time: '10时',
				type: 'uv',
				value: tongji(uv, 10),
			},
			{
				time: '11时',
				type: 'pv',
				value: tongji(detail1, 11),
			},
			{
				time: '11时',
				type: 'uv',
				value: tongji(uv, 11),
			},
			{
				time: '12时',
				type: 'pv',
				value: tongji(detail1, 12),
			},
			{
				time: '12时',
				type: 'uv',
				value: tongji(uv, 12),
			},
			{
				time: '13时',
				type: 'pv',
				value: tongji(detail1, 13),
			},
			{
				time: '13时',
				type: 'uv',
				value: tongji(uv, 13),
			},
			{
				time: '14时',
				type: 'pv',
				value: tongji(detail1, 14),
			},
			{
				time: '14时',
				type: 'uv',
				value: tongji(uv, 14),
			},
			{
				time: '15时',
				type: 'pv',
				value: tongji(detail1, 15),
			},
			{
				time: '15时',
				type: 'uv',
				value: tongji(uv, 15),
			},
			{
				time: '16时',
				type: 'pv',
				value: tongji(detail1, 16),
			},
			{
				time: '16时',
				type: 'uv',
				value: tongji(uv, 16),
			},
			{
				time: '17时',
				type: 'pv',
				value: tongji(detail1, 17),
			},
			{
				time: '17时',
				type: 'uv',
				value: tongji(uv, 17),
			},
			{
				time: '18时',
				type: 'pv',
				value: tongji(detail1, 18),
			},
			{
				time: '18时',
				type: 'uv',
				value: tongji(uv, 18),
			},
			{
				time: '19时',
				type: 'pv',
				value: tongji(detail1, 19),
			},
			{
				time: '19时',
				type: 'uv',
				value: tongji(uv, 19),
			},
			{
				time: '20时',
				type: 'pv',
				value: tongji(detail1, 20),
			},
			{
				time: '20时',
				type: 'uv',
				value: tongji(uv, 20),
			},
			{
				time: '21时',
				type: 'pv',
				value: tongji(detail1, 21),
			},
			{
				time: '21时',
				type: 'uv',
				value: tongji(uv, 21),
			},
			{
				time: '22时',
				type: 'pv',
				value: tongji(detail1, 22),
			},
			{
				time: '22时',
				type: 'uv',
				value: tongji(uv, 22),
			},
			{
				time: '23时',
				type: 'pv',
				value: tongji(detail1, 23),
			},
			{
				time: '23时',
				type: 'uv',
				value: tongji(uv, 23),
			},
			{
				time: '24时',
				type: 'pv',
				value: tongji(detail1, 24),
			},
			{
				time: '24时',
				type: 'uv',
				value: tongji(uv, 24),
			},
		],
		xField: 'time',
		yField: 'value',
		seriesField: 'type',
		isGroup: true,
	}
	var qq = 0
	for (var i = 0; i < detail2.length; i++) {
		qq = Number(qq) + Number(detail2[i].duration)
	}
	var cgl = 0
	for (var i = 0; i < detail2.length; i++) {
		if (detail2[i].success) {
			cgl++
		}
	}
	var time = new Date()
	var year = time.getFullYear()
	var mouth = time.getMonth() + 1
	var day = time.getDate()
	//日异常数
	var dataatime = 0
	for (var i = 0; i < dataa.length; i++) {
		if (panduan(dataa[i])) {
			dataatime++
		}
	}
	for (var i = 0; i < detail.length; i++) {
		if (panduan(detail[i])) {
			dataatime++
		}
	}
	//日请求数
	var detail2time = 0
	for (var i = 0; i < detail2.length; i++) {
		if (panduan(detail2[i])) {
			detail2time++
		}
	}
	//日用户量
	var uvtime = 0
	for (var i = 0; i < uv.length; i++) {
		if (panduan(uv[i])) {
			uvtime++
		}
	}
	return (
		<div className="system">
			<div>
				{pvvv(detail1)}
				{uvvv(uv)}
			</div>
			<div className="A1">
				<A
					title="总异常数："
					subtitle="日异常数："
					a={dataa.length + detail.length}
					b={dataatime}
				/>
				<A
					title="网络请求个数："
					subtitle="日请求数："
					a={detail2.length}
					b={detail2time}
				/>
				<A
					title="总uv占比："
					subtitle="日uv占比："
					a={Math.round((uv.length / detail1.length) * 100) + '%'}
					b={Math.round(jisuan(tongji1(detail1), tongji2(uv))) + '%'}
				/>
				<A title="总用户量：" subtitle="日用户量：" a={uv.length} b={uvtime} />
			</div>
			<div className="wrapper">
				<div className="container">
					<div className="behavior-count2">
						<Ap1 />
						<Ap2 />
						<Ap3 a={Math.round((cgl / detail2.length) * 100)} />
					</div>
					<div className="dempdualaxes">
						<div className="ddl">
							<div className="dd2">性能</div>
							<DemoDualAxes />
						</div>
					</div>
				</div>
			</div>
			<br></br>
			<br></br>
			<div className="wrapper">
				<div className="ap1">
					<CountPie title="浏览器占比" data={browserData} />
				</div>
				<div className="ap1">
					<CountPie title="操作系统占比" data={osData} />
				</div>
				<div className="ap1">
					<CountPie
						title="异常占比"
						data={[
							{
								type: 'JS异常',
								value: dataa.length,
							},
							{
								type: '资源异常',
								value: detail.length,
							},
						]}
					/>
				</div>
			</div>
			<div className="wrapper2">
				<div className="container">
					<div className="behavior-count">
						<PvColumn a={detail1.length} />
						<UvColumn a={uv.length} />
					</div>
					<div className="behavior-chart">
						<div className="bc">
							<Column {...config1} />
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
				.qqqq {
					width: 10%;
					height: 26%;
				}
				.ap1 {
					width: 30%;
				}
				.A1 {
					margin-top: 35px;
					display: flex;
					flex-direction: row;
					margin-left: 30px;
					margin-right: -30px;
				}
				.app {
					background-color: rgb(3, 201, 215);
					border-radius: 20px;
					width: 300px;
				}
				.ant-card-bordered {
					background: red;
				}
				.system {
					padding: 20px;
					box-sizing: border-box;
					height: 100%;
					overflow: scroll;
					background: #f0f2f5;
				}
				.wrapper1 {
					height: 195px;
					width: 100%;
					display: inline-flex;
					padding: 0px;
				}
				.wrapper {
					height: 520px;
					width: 100%;
					display: inline-flex;
					padding: 0px;
					justify-content: space-around;
				}
				.wrapper2 {
					height: 510px;
					width: 100%;
					display: inline-flex;
					padding: 0px;
					margin-top: -35px;
				}
				.wrapper .title1 {
					color: black;
					width: 505px;
					margin-top: 0px;
					font-size: 18px;
					text-align: center;
					font-weight: bolder;
					border-width: 6px;
					border-color: cyan;
					border-style: ridge;
					display: inline;
					height: 40px;
				}
				.wrapper2 .title {
					color: black;
					width: 145px;
					margin-top: 0px;
					font-size: 18px;
					text-align: center;
					font-weight: bolder;
					border-width: 6px;
					border-color: cyan;
					border-style: ridge;
					display: inline;
					height: 40px;
				}
				.wrapper .title2 {
					color: black;
					width: 145px;
					margin-top: 0px;
					font-size: 18px;
					text-align: center;
					font-weight: bolder;
					border-width: 6px;
					border-color: cyan;
					border-style: ridge;
					display: inline;
					height: 40px;
				}
				.wrapper .container {
					width: 100%;
					display: flex;
					padding: 20px;
					box-sizing: border-box;
					justify-content: space-between;
					flex-wrap: wrap;
				}
				.wrapper .container1 {
					margin-right: 20px;
					width: 100%;
					display: flex;
					padding: 20px;
					box-sizing: border-box;
					justify-content: space-between;
					flex-wrap: wrap;
				}
				.wrapper2 .container {
					width: 100%;
					display: flex;
					padding: 20px;
					box-sizing: border-box;
					justify-content: space-between;
					flex-wrap: wrap;
				}
				.wrapper .item {
					width: 400px;
					height: 280px;
					background: white;
				}
				.behavior-count {
					hieght: 300px;
					display: flex;
					width: 22%;
					flex-direction: column;
					justify-content: space-around;
				}
				.behavior-count1 {
					hieght: 300px;
					display: flex;
					width: 140px;
					flex-direction: column;
					justify-content: space-around;
				}
				.behavior-count2 {
					hieght: 300px;
					display: flex;
					width: 27%;
					flex-direction: column;
					justify-content: space-between;
				}
				.dempdualaxes {
					background: white;
					width: 70%;
					border-radius: 20px;
					box-shadow: 0px 0px 5px black;
				}
				.count-card {
					margin-left: -25px;
					background: aqua;
					width: 230px;
					height: 150px;
					padding: 10px;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					color: black;
					border-width: 8px;
					border-color: aqua;
					border-style: solid;
					-webkit-border-radius: 44px;
					-moz-border-radius: 44px;
					border-radius: 35px;
					margin-top: 34px;
				}
				.count-card1 {
					background: white;
					width: 100%;
					height: 318px;
					padding: 10px;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					color: white;
					border-width: 11px;
					border-color: white;
					border-style: inset;
				}
				.count-card2 {
					background: aqua;
					width: 210px;
					height: 90px;
					padding: 10px;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					color: black;
					border-width: 8px;
					border-color: aqua;
					border-style: solid;
					border-radius: 44px;
					margin-top: 34px;
				}
				.count-card-title1 {
					color: black;
					font-weight: 700;
					font-size: 17px;
					display: inline;
				}
				.count-card-value1 {
					margin-top: 10px;
					font-size: 16px;
				}
				.count-card-title2 {
					font-size: 17px;
					font-weight: 700;
				}
				.count-card-value2 {
					margin-top: -7px;
					margin-left: 94px;
					font-size: 22px;
				}
				.count-card-title {
					font-size: 22px;
					font-weight: 700;
				}
				.count-card-value {
					margin-top: 10px;
					margin-left: 118px;
					font-size: 30px;
				}
				.d1 {
					height: 240px;
					margin-left: -10px;
				}
				.behavior-chart {
					border-radius: 20px;
					box-shadow: 0px 0px 5px black;
					background: white;
					width: 75%;
					margin-top: 25px;
					margin-bottom: 25px;
				}
				.shouye1 {
					width: 33%;
					height: 211px;
					padding: 10px;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					color: black;
					border-width: 20px;
					background: white;
					border-style: solid;
					border-color: #f0f2f5;
					background: white;
					margin-top: -18px;
				}
				.s1 {
					font-size: 16px;
					display: inline;
					font-weight: bolder;
					color: darkcyan;
				}
				.s2 {
					margin-left: 85px;
					margin-top: 8px;
					font-size: 41px;
					height: 76px;
					margin-right: 20px;
				}
				.s3 {
					margin-left: 2px;
					margin-top: 20px;
					font-size: 17px;
					display: inline;
					margin-right: 20px;
				}
				.s4 {
					font-size: 22px;
				}
				.ddl {
					margin-left: 8%;
					margin-right: 8%;
				}
				.dd2 {
					height: 63px;
					font-size: 26px;
					font-weight: bold;
					margin-top: 15px;
					margin-left: -56px;
				}
				.D {
					width: 199%;
				}
				.bc {
					margin-top: 20px;
					margin-bottom: 20px;
					margin-left: 40px;
					margin-right: 40px;
				}
			`}</style>
		</div>
	)
}

Page.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}
export default Page
