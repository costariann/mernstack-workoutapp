require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutsRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

//express app
const app = express()

//cors for all route
app.use(cors({
    origin: 'http://localhost:3000'
}))

//global middleware
app.use((req,res,next) => {
 console.log(req.path, req.method)
 next()
})  

app.use(express.json());

// react to request or routes
app.use( '/api/workouts',workoutsRoutes)
app.use('/api/user',userRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
// listen for request 
app.listen(process.env.PORT, () => {
    console.log(' connected to db & listen on port', process.env.PORT)
})
})
.catch((error) =>{
    console.log(error)
})


