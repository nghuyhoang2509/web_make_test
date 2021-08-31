const express = require('express')
const app = express()

const db = require('./config/mongodb')


const Route = require('./routes/index')

const session = require("express-session")

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
        "http://192.168.1.6:3000"
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"]
}))


app.use(session({
    secret: process.env.SERECT_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}))

/* setup parse */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



/* Route */
Route(app)

const server = app.listen(process.env.PORT || 5000, () => console.log(`thành công`))


