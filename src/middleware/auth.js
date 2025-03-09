const jwt = require('jsonwebtoken');
const User = require('../model/User');

// ✅ Kullanıcı Doğrulama (Giriş Yapılmış mı?)
const protect = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: 'Yetkisiz erişim!' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCES_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token!' });
  }
};

// ✅ Rol Kontrolü (Sadece belirli roller erişebilir)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Bu işlemi yapmaya yetkiniz yok!' });
    }
    next();
  };
};
module.exports ={
    protect,
    authorize
}