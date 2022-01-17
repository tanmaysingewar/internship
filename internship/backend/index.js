const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()


const app = express();

//Connecting to MONGODB (Locally)
mongoose.connect( process.env.MONGO_CONN_LOCAL,{
    useUnifiedTopology: true,
    useNewUrlParser: true

}).then(()=>{
    console.log('DB IS CONNECTED')
})

//Importing route
const userRoutes = require("./routes/user")

//middlewares
app.use(bodyParser.json())
app.use(cors())

app.use("/api",userRoutes)

// Port 
const port = process.env.PORT || 8080

app.listen(port, ()=>{
    console.log('SERVER IS RUNNING AT',port)
})