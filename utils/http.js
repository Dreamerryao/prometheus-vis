import axios from 'axios'
// const baseURL = "http://localhost:4523/mock/1360708"
const baseURL = "http://120.55.12.109:8080"
const http = axios.create({
    baseURL,
})
http.oriGet = http.get
http.oriPost = http.post
http.get = function(...args){
    return http.oriGet(...args)
    .then(e=>{
        if(e instanceof Array){
            e.forEach(i=>{
                if(i._id) i.id = i._id
                if(i.updated_at) i.timestamp = Number(new Date(i.updated_at).getTime()/1000).toFixed()
            })
        }
        if(e.data instanceof Array){
            e.data.forEach(i=>{
                if(i._id) i.id = i._id
                if(i.updated_at) i.timestamp = Number(new Date(i.updated_at).getTime()/1000).toFixed()
            })
        }
        return e
    })
}
http.post = function(...args){
    return http.oriPost(...args)
    .then(e=>{
        if(e instanceof Array){
            e.forEach(i=>{
                if(i._id) i.id = i._id
                if(i.updated_at) i.timestamp = Number(new Date(i.updated_at).getTime()/1000).toFixed()
            })
        }
        if(e.data instanceof Array){
            e.data.forEach(i=>{
                if(i._id) i.id = i._id
                if(i.updated_at) i.timestamp = Number(new Date(i.updated_at).getTime()/1000).toFixed()
            })
        }
        return e
    })
}
export default http