const express = require('express');
const app = express();

// ROUTES REQIRE
const userRoutes =require("./routes/userRoutes");

//ROUTE 
app.use("/api/users",userRoutes);

module.exports=app;