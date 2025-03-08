const app =require("./app")
const connectDB = require("./config/dbConfig");
require('dotenv').config();

connectDB();



app.listen(5000,()=>{
    console.log("server çalsıtı");
    
})