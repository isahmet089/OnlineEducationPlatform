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
const userDelete = async(req,res)=>{
    try {
        const {id} =req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({message : "Kullanıcı bulunamadı!"})
        res.status(200).json({message : "Kullanıcı silindi!",user})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};
const userUpdate = async(req,res)=>{
    try {
        const {firstName , lastName , email , password} =req.body;
        const emailCheck = await User.find({email});
        if (emailCheck) return res.status(404).json({meesage :"Bu email zaten kayıtlı"});
        const {id} =req.params;
        const user = await User.findById(id);
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (password) user.password = password;
        res.status(200).json({message : "Kullanıcı güncellendi" ,user});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = {
    userGet,
    userCreate,
    userDelete,
    userUpdate
};