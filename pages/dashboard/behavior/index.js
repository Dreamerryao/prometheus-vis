import React, { useState, useEffect } from 'react'
import http from '../../../utils/http'
import Layout from '../layout'
import {UserOutlined} from '@ant-design/icons'
import {
    List,
    Avatar,
    Timeline,
    Card
}from 'antd'
import {
    paddingNumber,
    randomColor,
    formatDate
} from '../../../utils/utils'

const calcSinglePv = (arr)=>{
    let ret = []
    let map = {}
    arr.forEach(i=>{
        if(map[i.uuid] !== undefined || (map[i.uuid] = {pv: 0, timestamp: 0})){
            map[i.uuid].pv++
            map[i.uuid].timestamp = Math.max(map[i.uuid].timestamp, i.timestamp)
        }
    })
    Object.keys(map).forEach(i=>{
        ret.push({uuid: i, pv: map[i].pv, color: randomColor(0,255), timestamp: map[i].timestamp})
    })
    console.log(ret)
    return ret
}
const UserList = (props)=>{
    return <List 
        pagination={{position: 'bottom'}}
        dataSource={props.users}
        header={
            <span className='item-wrapper' onClick={(e)=>props.setUserIndex(undefined)}>
                全部
            </span>
        }
        renderItem={(user) => (
        <div className={`item-wrapper item-wrapper-hover ${props.userIndex && props.userIndex.uuid == user.uuid ? "item-wrapper-selected" : ""}`}>
            <List.Item onClick={(e)=>props.setUserIndex(user)}>
                <List.Item.Meta
                    description={formatDate(user.timestamp*1000)}
                    avatar={<Avatar style={{background: "#fff"}} 
                    icon={<UserOutlined style={{color: user.color}} />}
                ></Avatar>} title={`uuid${paddingNumber(user.uuid, 5)}`}></List.Item.Meta>  
            </List.Item>
            <style>{`
                .item-wrapper{
                    cursor: pointer;
                    padding-left: 8px;
                }
                .item-wrapper-hover:hover, .item-wrapper-selected{
                    background: #eee
                }
            `}</style>
        </div>)}
    ></List>
}
const BehaviorTimeLine = (props)=>{
    const [data, setData] = useState(null)
    useEffect(()=>{
        let data = props.data.filter(i=>{
            if(i.uuid == props.userIndex.uuid) return true
        })
        setData(data)
    }, [props.userIndex, props.data])
    return <Timeline mode="left">
        {data && data.sort((a,b)=>b.timestamp - a.timestamp).map(i=>(
            <Timeline.Item 
                label={formatDate(i.timestamp*1000)} 
                key={i.id}
                
            >
                {<Card title={i.url} hoverable style={{width: '300px'}}>
                    <div>{`停留时间：${i.staytime}`}</div>
                </Card>}
            </Timeline.Item>
        ))}
    </Timeline>
}
function Page() {
    const [data, setData] = useState(null)
    const [users, setUsers] = useState([])
    const [userIndex, setUserIndex] = useState(undefined)
    useEffect(()=>{
        http.get("/v1/api/behavior")
        .then(e=>{
            console.log(e)
            setData(e.data)
            setUsers(calcSinglePv(e.data).sort((a,b)=>b.timestamp-a.timestamp))
        })
    }, [])
    useEffect(()=>{
        setUserIndex(users[0])
    }, [users])
    return <div className='behavior'>
        <div className='list-wrapper'>
            <UserList users={users} setUserIndex={setUserIndex} userIndex={userIndex}></UserList>
        </div>
        <div className='timeline-wrapper'>
            {data && userIndex && <BehaviorTimeLine userIndex={userIndex} data={data}></BehaviorTimeLine>}
        </div>
        <style jsx>{`
            .behavior{
                height: 100%;
                display: flex;
            }
            .list-wrapper{
                width: 240px;
                height: 100%;
                overflow: scroll;
            }
            .timeline-wrapper{
                padding-left: 30px;
                padding-top: 30px;
                overflow: scroll;
                flex-grow: 1;
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