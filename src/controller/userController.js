const User = require("../model/User");

const userGet = async(req,res,next)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message : error})
    }
};
const userCreate = async (req,res,next)=>{
    try {
        const {firstName , lastName , email , password } =req.body;
        console.log(req.body)
        const user =  new User({
            firstName,
            lastName,
            email,
            password,
        });
        await user.save();
        res.status(200).json({message : "basarılı", eklenenKisi: user});
    } catch (error) {
        res.json({message : error})   
    }
};
module.exports = {
    userGet,
    userCreate
};