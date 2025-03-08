const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const morgan = require('morgan')
//MİDDİLWARE
app.use(express.json()); // JSON verisini parse eder.
app.use(cookieParser());
app.use(morgan("dev"))
// ROUTES REQIRE
const userRoutes =require("./routes/userRoutes");
const authRoutes =require("./routes/authRoutes.js")

//ROUTE 
app.use("/api/users",userRoutes);
app.use("/auth",authRoutes)

module.exports=app;