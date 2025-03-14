const jwt = require("jsonwebtoken");
const User = require("../model/User");
const RefreshToken = require('../model/RefreshToken');

const verifyUser = async (req, res, next) => {
    try {
        let accessToken = req.cookies.accessToken;
        let refreshToken = req.cookies.refreshToken;

        if (!accessToken && !refreshToken) {
            return res.status(401).json({ message: "Lütfen giriş yapın!" });
        }

        if (accessToken) {
            try {
                const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select("-password");
                if (!req.user) {
                    return res.status(403).json({ message: "Kullanıcı bulunamadı!" });
                }
                return next();
            } catch (error) {
                return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token!" });
            }
        }

        // Eğer accessToken yoksa, refreshToken ile yeni accessToken üret
        const storedToken = await RefreshToken.findOne({ token: refreshToken });
        if (!storedToken) {
            return res.status(403).json({ message: "Geçersiz veya süresi dolmuş refresh token!" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(403).json({ message: "Kullanıcı bulunamadı!" });
        }

        // Yeni accessToken oluştur ve çereze ekle
        const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        res.cookie("accessToken", newAccessToken, { httpOnly: true, maxAge: 5 * 60 * 1000 });

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Geçersiz veya süresi dolmuş token!" });
    }
};
module.exports = {
  verifyUser
};
