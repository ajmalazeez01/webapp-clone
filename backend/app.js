const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
app.use(express.json());
const AuthRoutes = require('./routes/userRouter/router')
const AdminRouter = require('./routes/adminRouter/admin')
const cookieParser = require('cookie-parser')

require('./config/db')
app.use(express.urlencoded({ extended: false }))

// app.use(cors())
app.use(cors({
    origin:["http://localhost:3000"],
    method : ["GET","POST"],
    credentials: true,
}));

app.use(cookieParser())
app.use('/',AuthRoutes)
app.use('/admin',AdminRouter)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(2000 , ()=>{
    console.log('server runing!!!!');
    console.log('http://localhost:2000');
})