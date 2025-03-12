const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const morgan = require('morgan')
const cors =require("cors");
const corsOption = require("./config/corsConfig.js");
const {logger} = require("./middleware/logEvents.js");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config");

//MİDDİLWARE
app.use(cors(corsOption))
app.use(express.json()); 
app.use(cookieParser());
app.use(morgan("dev"));
app.use(logger);

// Swagger dokümantasyonu
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ROUTES REQIRE
const userRoutes =require("./routes/userRoutes");
const categoryRoutes =require("./routes/categoryRoutes.js");
const courseRoutes =require("./routes/courseRoutes.js");
const reviewRoutes =require("./routes/reviewRoutes.js");
const lessonRoutes =require("./routes/lessonRoutes.js");

const emailVerificationRoutes = require("./routes/emailVerificationRoutes");
const authRoutes =require("./routes/authRoutes.js");


//ROUTE 
app.use("/api/users",userRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/course",courseRoutes);
app.use("/api/review",reviewRoutes);
app.use("/api/lesson",lessonRoutes);

app.use("/auth",authRoutes);
app.use("/api/email", emailVerificationRoutes);

app.use(errorHandler);

module.exports=app;