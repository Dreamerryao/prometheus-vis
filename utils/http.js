import axios from 'axios'
const http = axios.create({
    baseURL: "http://localhost:4523/mock"
})
export default http