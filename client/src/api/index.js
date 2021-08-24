import axios from "axios"
const URL = "https://web-tfo-demo.herokuapp.com"

const instance = axios.create({
    baseURL: URL
  })

export default instance