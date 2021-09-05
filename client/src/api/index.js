import axios from "axios"
const URL = "http://localhost:5000"

const instance = axios.create({
    baseURL: URL,
  })

export default instance