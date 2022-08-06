import axios from 'axios'
const http = axios.create({
    baseURL: "http://localhost:4523/mock/1360708",
    headers: {
        "Content-Type": "application/x-www-http-urlencoded; charset=utf-8"
    }
})
export default http