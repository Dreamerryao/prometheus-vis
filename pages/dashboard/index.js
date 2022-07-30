import React from 'react'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import http from '../../utils/http'

export default function index() {
    http.post("mock2/1360708/31487151")
    .then(e=>{
        console.log(e)
    })
    return (
        <div className='dashboard'>
            <div className='header'>
                <Header className='header'></Header>
            </div>
            <div className='container'>
                <div className='menu'><Menu></Menu></div>
                <div className='content'>
                    
                </div>
            </div>
            <style jsx>{`
                .dashboard{
                    width: 100vw;
                    height: 100vh;
                }
                .header{
                    height: 50px;
                }
                .container{
                    height: calc(100vh - 50px);
                    display: flex;
                }
                .menu{
                    width: 256px;
                    height: 100%;
                }
                .content{
                    flex-grow: 1;
                    flex-shrink: 1;
                    height: 100%;
                }
            `}</style>
        </div>
    )
}
