///////////////////////
//// Http Server
/// Using Nodemon for keep refreshing server

const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/connection');

const app = express()

dotenv.config({path:"config.env"})


// Variable Value comming from env file
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'));

// connection to monogodb
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))


// set view Engine
app.set("view engine","ejs")


// loading assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load Routers
app.use('/',require('./server/routes/router'))


// listen server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})