import axios from "axios"
import { host } from "../config/var"
const URL = host

const instance = axios.create({
    baseURL: URL,
    withCredentials: true,
    
  })

export default instance