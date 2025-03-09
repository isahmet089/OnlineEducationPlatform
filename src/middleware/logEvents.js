const {format} =require("date-fns");
const{v4: uuid} =require("uuid");
const fs = require("fs");
const path =require("path");
const fsPromises =require("fs").promises;
const logEvents = async(message,logFileName)=>{
    const dateTime = format(new Date(),"dd.MM.yyyy\t HH.mm.ss");
    const logItem = `${dateTime}\t${uuid()}\t${message}`
    try {
        if (!fs.existsSync(path.join(__dirname,"..","..","logs"))) {
            await fsPromises.mkdir(path.join(__dirname,"..","..","logs"));
        }
        await fsPromises.appendFile(path.join(__dirname,"..","..","logs",logFileName),logItem);
    } catch (error) {
        console.log(err);
    }
};
// request loglama
const logger = (req,res,next)=>{
    const message=`${req.method}\t${req.url}\t${req.headers.origin}\n`;
    logEvents(message,"reqLog.log");
    next();
};
module.exports={
    logEvents,
    logger
};