const express = require('express')
 require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db.js')
const authRoutes = require('./routes/authRoutes.js')
const taskRoutes = require('./routes/taskRoutes.js')
const { errorHandler} = require('./middleware/errorMiddleware.js')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('sendgrid_api_key');

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use(errorHandler)
 

app.listen(port, ()=> {
    console.log(`server is runnng under port ${port}`)
})