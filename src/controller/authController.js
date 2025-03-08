const User =require("../model/User");
const jwt = require("../middleware/jwt");

const login= async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user =await User.findOne({email});
        console.log(user.password)

        if(!user) return res.status(401).json({message :"Geçeriz kimlik bilgileri!"});
         // Şifreyi kontrol et
        const validPassword = await user.comparePassword(password);
         if (!validPassword) {
         return res.status(401).json({ message: "Geçersiz email veya şifre." });
    }
        jwt.generateToken(user, res);
        res.status(200).json({ message: 'Giriş başarılı!', user });
    } catch (error) {
        res.status(500).json(error);
    }
};
const register= async (req,res)=>{
    try {
        const {firstName,lastName,email,password,role}=req.body;
        if (role === 'admin') {
            return res.status(403).json({message:'Admin  Oluşturma Yetkiniz yok!'});
        }
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            role,
        });
        await user.save();
        jwt.generateToken(user,res);
        res.status(201).json({message:"Kayıt Başarılı!",user})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};
const logout=(req,res)=>{
    try {
        res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: 'Çıkış yapıldı!' });
    } catch (error) {
        
    }
}
module.exports={
   login,
   register,
   logout
}