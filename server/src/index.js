const express = require('express')
const app = express()

const db = require('./config/mongodb')


const Route = require('./routes/index')


const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')

const cors = require("cors")

const moment = require('moment')

moment().format()



db.connect()
app.use(cookieParser(process.env.SERECT_COOKIES))

app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://192.168.1.6:3000",
        "http://192.168.1.4:3000",
        "http://192.168.1.5:3000",
        "http://192.168.1.8:3000",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"]
}))



/* setup parse */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



/* Route */
Route(app)
const http = require("http")
const server = http.createServer(app)
const socketIo = require("socket.io")(server, { cors: { origin: "*", } });
const socketHandle = require("./app/socket/index")
socketHandle(socketIo)

server.listen(process.env.PORT || 5000, () => console.log(`thành công`))

