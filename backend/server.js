const express=require("express");
const postgresClient=require("./config/postgresDbConnect.js");
require("./config/mindsDbConnect.js");
const mainRoute = require("./routers/index.js");
const cors = require('cors');
require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json());
app.use("/api", mainRoute);


const PORT=process.env.PORT ||3002;

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
    postgresClient.connect(err => {
        if(err) {
            console.log('db connection error', err.stack)
        }else {
            console.log('Successful connected to PostgreSql!')
        }
    });

});