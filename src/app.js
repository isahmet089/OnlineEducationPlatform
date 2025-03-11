const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const morgan = require('morgan')
const cors =require("cors");
const corsOption = require("./config/corsConfig.js");
const {logger} = require("./middleware/logEvents.js");
const errorHandler = require("./middleware/errorHandler");

//MİDDİLWARE
app.use(cors(corsOption))
app.use(express.json()); // JSON verisini parse eder.
app.use(cookieParser());
app.use(morgan("dev"));
app.use(logger);


// ROUTES REQIRE
const userRoutes =require("./routes/userRoutes");
const authRoutes =require("./routes/authRoutes.js");
const categoryRoutes =require("./routes/categoryRoutes.js");
const emailVerificationRoutes = require("./routes/emailVerificationRoutes");
const courseRoutes =require("./routes/courseRoutes.js");



//ROUTE 
app.use("/api/users",userRoutes);
app.use("/auth",authRoutes);
app.use("/api/email", emailVerificationRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/course",courseRoutes);

app.use(errorHandler);

module.exports=app;