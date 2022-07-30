import React from 'react';
import Head from 'next/head'
import DemoPie from '../../components/demo'
export default class Dashboard extends React.Component{
    constructor(props){
        super(props)
        var time = new Date()
        time.setSeconds(0)
        this.state = {
            time
        }
    }
    
    componentDidMount(){
        console.log("mount")
        this.setState({time: new Date()}, ()=>{
            console.log("tick")
        })
        this.timer = setInterval(()=>{
            this.setState({time: new Date()}, ()=>{
                console.log("tick")
            })
        }, 1000)
    }
    componentWillUnMount(){
        clearInterval(this.timer) 
        console.log("unmount")
    }
    render(){
        return <div>
            <Head>
                <title>监控可视化面板</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>Welcome To Dashboard</div>
            <div>{this.state.time.toString()}</div>
            <DemoPie></DemoPie>
        </div>
    }

}