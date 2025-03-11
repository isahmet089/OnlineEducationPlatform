const jwt = require("jsonwebtoken");
const User = require("../model/User");
const RefreshToken = require('../model/RefreshToken');

//  Kullanıcı Doğrulama (Giriş Yapılmış mı?)
const verifyUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (!accessToken && !refreshToken)
    return res.status(400).json({ message: "lütefen giriş yapın !!" });
  if (!accessToken) {
    try {
      // Refresh Token veritabanında var mı kontrol et
      const storedToken = await RefreshToken.findOne({ token: refreshToken });
      if (!storedToken) {
        return res.status(403).json({ message: "Geçersiz refresh token!" });
      }
      // Refresh Token geçerli mi?
      const decoded = jwt.verifyRefreshToken(refreshToken);
      // Yeni Access Token üret
      const newAccessToken = jwt.generateAccessToken({ _id: decoded.id });
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
      req.user = await User.findById(decoded.id).select("-password");
      console.log();
      next();
    } catch (error) {
      res
        .status(403)
        .json({ message: "Refresh token geçersiz veya süresi dolmuş2!" });
    }
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token1!",message: error.message });
    next();
  }
};
//  Rol Kontrolü (Sadece belirli roller erişebilir)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Bu işlemi yapmaya yetkiniz yok!" });
    }
    next();
  };
};
module.exports = {
  authorize,
  verifyUser
};
