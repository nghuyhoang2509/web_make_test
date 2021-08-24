import axios from "axios"
const URL = "http://192.168.1.6:5000"

const instance = axios.create({
    baseURL: URL
  })

export default instance