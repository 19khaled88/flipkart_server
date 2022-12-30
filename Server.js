const express  = require('express')
const cors = require('cors');
const env = require('dotenv');
const Con = require('./db/db');



const app = express();

// route api
const userRoute = require('./src/router/user')


env.config()
const PORT = 8000;
const user_name=process.env.USER_NAME
const user_pass=process.env.PASSWORD
const db_name=process.env.DB_NAME
Con(user_name,user_pass,db_name)

app.use(express.json())
app.use(cors())

//routes
app.use('/api',userRoute)

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))