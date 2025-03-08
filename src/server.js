require('dotenv').config();
const app =require("./app")
const connectDB = require("./config/dbConfig");

connectDB();



app.listen(process.env.PORT,()=>{
    console.log(`Server ${process.env.PORTPORT} portunda çalısıyor.`);
})