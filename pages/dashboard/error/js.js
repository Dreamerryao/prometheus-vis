import React from 'react'
import http from '../../../utils/http'
import Layout from '../layout'

// 首页概览
function Page() {
    // http.post("mock2/1360708/31487151")
    // .then(e=>{
    //     console.log(e)
    // })
    return "js"
}
Page.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Page