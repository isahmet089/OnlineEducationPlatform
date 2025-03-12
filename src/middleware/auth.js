const jwt = require("jsonwebtoken");
const User = require("../model/User");
const RefreshToken = require('../model/RefreshToken');

//  Kullanıcı Doğrulama (Giriş Yapılmış mı?)
const verifyUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "Lütfen giriş yapın!" });
  }
  if (!accessToken) {
      try {
          const storedToken = await RefreshToken.findOne({ token: refreshToken });
          if (!storedToken) {
              return res.status(403).json({ message: "Geçersiz veya süresi dolmuş refresh token!" });
          }
          const decoded = jwt.verifyRefreshToken(refreshToken);
           if (!decoded) {
              return res.status(403).json({ message: "Geçersiz veya süresi dolmuş refresh token!" });
          }
          const newAccessToken = jwt.generateAccessToken({ _id: decoded.id });
          res.cookie("accessToken", newAccessToken, {
              httpOnly: true,
              maxAge: 5 * 60 * 1000, // Daha kısa süre (5 dakika)
          });
          req.user = await User.findById(decoded.id).select("-password");
          next();
      } catch (error) {
          return res.status(403).json({ message: "Geçersiz veya süresi dolmuş refresh token!" });
      }
  } else {
      try {
          const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
           if (!decoded) {
              return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token!"});
          }
          req.user = await User.findById(decoded.id).select("-password");
          return next();
      } catch (error) {
          return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token!" });
      }
  }
};
const authorize = (...roles) => {
  return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
          return res.status(403).json({ message: "Bu işlemi yapmaya yetkiniz yok!" });
      }
      next();
  };
};
module.exports = {
  authorize,
  verifyUser
};
