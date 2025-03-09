const {logEvents}=require("./logEvents");
const errorHandler =(err,req,res,next)=>{
    //hatayı logla
    const errorMessage =`${err.name}:\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\n`;
    logEvents(errorMessage,"errLog.log");

    console.log(err.stack);
    const status = res.statusCode === 200 ? 500 :res.statusCode;
    res.status(status);

    res.json({
        message:err.message,
        stack : process.env.NODE_ENV ==="production" ? null :err.stack,
    });
};
module.exports =errorHandler;