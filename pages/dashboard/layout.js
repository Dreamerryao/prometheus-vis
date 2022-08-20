import React from 'react'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import Head from 'next/head'

export default function index({children}) {
    
    return <div className='dashboard'>
        <Head>
            <title>监控可视化面板</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className='header'>
            <Header></Header>
        </div>
        <div className='container'>
            <div className='menu'><Menu></Menu></div>
            <div className='content'>
                {children}
            </div>
        </div>
        <style jsx>{`
            .dashboard{
                width: 100vw;
                height: 100vh;
            }
            .header{
                height: 150px;
            }
            .container{
                height: calc(100vh - 150px);
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
}
