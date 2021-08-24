import axios from "axios"
const URL = process.env.NODE_ENV !== "production" ?  "https://web-tfo-demo.herokuapp.com" : "http://localhost:5000" 

const instance = axios.create({
    baseURL: URL
  })

export default instance