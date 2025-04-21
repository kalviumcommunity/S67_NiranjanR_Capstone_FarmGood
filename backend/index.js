const express = require('express')
const app = express();
require('dotenv').config({path:'./src/config/.env'})
const connectDB = require('./src/db/connectDB')
const userRouter = require('./src/Controllers/user')
const cookieParser = require('cookie-parser')

const port = process.env.PORT
const url = process.env.DB_URI

app.use(express.json())
app.use(cookieParser())

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connectDB(url)
})

app.use('/auth',userRouter)
