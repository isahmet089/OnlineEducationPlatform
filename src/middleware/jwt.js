const jwt =require("jsonwebtoken");
require("dotenv").config;

const generateToken=(user,res)=>{
    const token =jwt.sign(
        {id:user._id , role: user.role},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    );
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        sameSite:'strict',
        maxAge:7*24*60*60*1000,
    });
    return token;
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCES_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCES_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

module.exports = { generateAccessToken, generateRefreshToken,generateToken,verifyAccessToken,verifyRefreshToken };
