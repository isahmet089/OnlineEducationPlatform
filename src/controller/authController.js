const User = require("../model/User");
const jwt = require("../middleware/jwt");
const RefreshToken = require('../model/RefreshToken');
const {sendEmail} =require("../utils/sendEmail");


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await user.comparePassword(password)) {
        return res.status(401).json({ message: "Geçersiz email veya şifre!" });
      }
    

    // ✅ Yeni Access Token ve Refresh Token oluştur
    const accessToken = jwt.generateAccessToken(user);
    const refreshToken = jwt.generateRefreshToken(user);
    //Refresh Token’ı veritabanına kaydet
    await new RefreshToken({ userId: user._id, token: refreshToken }).save();

    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ message: "Giriş başarılı!", accessToken, refreshToken});
  } catch (error) {
    res.status(500).json(error);
  }
};
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (role === "admin") {
      return res
        .status(403)
        .json({ message: "Admin  Oluşturma Yetkiniz yok!" });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    await user.save();
    jwt.generateToken(user, res);
    await sendEmail(firstName,email);
    res.status(201).json({ message: "Kayıt Başarılı!", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const logout = async (req, res) => {
    try {
      await RefreshToken.deleteOne({ token: req.cookies.refreshToken });
  
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
  
      res.status(200).json({ message: "Çıkış başarılı!" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
// Access Token Yenileme şuanlık bir işe yarmıyor
const refreshAccessToken = async (req, res,next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
  
      if (!refreshToken) {
        return res.status(403).json({ message: "Refresh token eksik!" });
      }
  
      // Refresh Token veritabanında var mı kontrol et
      const storedToken = await RefreshToken.findOne({ token: refreshToken });
  
      if (!storedToken) {
        return res.status(403).json({ message: "Geçersiz refresh token!" });
      }
  
      // Refresh Token geçerli mi?
      const decoded = jwt.verifyRefreshToken(refreshToken);
  
      // Yeni Access Token üret
      const newAccessToken = jwt.generateAccessToken({ _id: decoded.id });
  
      res.cookie("accessToken", newAccessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
      req.user = await User.findById(decoded.id).select('-password');
      console.log()
      next()
    } catch (error) {
      return res.status(403).json({ message: "Refresh token geçersiz veya süresi dolmuş!" });
    }
  };
module.exports = {
  login,
  register,
  logout,
  refreshAccessToken
};
