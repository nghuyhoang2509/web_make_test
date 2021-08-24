const express = require('express')

const Route = require('./routes/index')
const db = require('./config/mongodb')

const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')

const cors = require("cors")

const app = express()


db.connect()
app.use(cookieParser('Tjahgadhzdh'))

app.use(cors())



/* setup parse */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/* Route */
Route(app)



app.listen(process.env.PORT || 5000,()=> console.log(`thành công`))