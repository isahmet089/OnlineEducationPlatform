const express = require('express');
const app = express();

//MİDDİLWARE
app.use(express.json()); // JSON verisini parse eder.

// ROUTES REQIRE
const userRoutes =require("./routes/userRoutes");


//ROUTE 
app.use("/api/users",userRoutes);

module.exports=app;