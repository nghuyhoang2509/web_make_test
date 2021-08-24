import axios from "axios"
const URL = process.env.NODE_ENV !== "production" ? "http://localhost:5000" : "https://web-tfo-demo.herokuapp.com" 

const instance = axios.create({
    baseURL: URL
  })

export default instance