import express from 'express'
const app =express()
import colors from 'colors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'



// init environment variable 
dotenv.config()

// port
const port =process.env.SERVER_PORT || "5001" 
const hostname =process.env.SERVER_HOSTNAME || "127.0.0.2"

// init json form data receive middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


import studentRoute  from './routes/student.route.js'
import userRoute  from './routes/user.route.js'
import mongoDBConnection from './config/db.js'
import globalError from './middlewares/globalError.middleware.js'


/**
 * @description home route
 * @method GET 
 * @name public 
 */

app.get('/',(req,res,next)=>{
    res.status(200).json({
        status:"success",
        message:"api is running successfully"
    }) 
})



 
// router
app.use('/api/v1/student',studentRoute)
app.use('/api/v1/user',userRoute)


// global error middleware
app.use(globalError)

/**
 * @description error route
 * @method GET 
 * @name public 
 */

app.use('*',(req,res,next)=>{
    res.status(404).json({
        status:"failed",
        message:"No route found"
    }) 
})

// listen
app.listen(port,()=>{
    mongoDBConnection()
    console.log(`server is running on http://localhost:${port} or http://${hostname}:${port}`)
})