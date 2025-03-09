require("dotenv").config;
const redisClient = require("../config/redisClient");
const {sendEmail} = require("../utils/sendEmail");
const User = require("../model/User");

// Rastgele 6 haneli doğrulama kodu üretme fonksiyonu
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
// Kullanıcıya doğrulama emaili gönderme
const sendVerificationEmail = async (req, res) => {
    const { firstName, email } = req.body;
    try {
      const verificationCode = generateVerificationCode();
  
      // Redis'te email anahtarıyla doğrulama kodunu sakla (TTL: 600 saniye = 10 dakika)
      await redisClient.set(`email_verification:${email}`, verificationCode, { EX: 600 });
  
      // Email gönder
      await sendEmail(firstName, email, verificationCode);
  
      res.status(200).json({ message: "Doğrulama kodu gönderildi!" });
    } catch (error) {
      res.status(500).json({ message: "Doğrulama kodu gönderilemedi!", error: error.message });
    }
  };
  // Email doğrulama kontrolü
const verifyEmail = async (req, res) => {
    const { email, code } = req.body;
  
    try {
      // Redis'ten saklanan doğrulama kodunu al
      const storedCode = await redisClient.get(`email_verification:${email}`);
  
      if (!storedCode) {
        return res.status(400).json({ message: "Doğrulama kodunuz süresi dolmuş veya geçersiz!" });
      }
  
      if (storedCode !== code) {
        return res.status(400).json({ message: "Hatalı doğrulama kodu!" });
      }
  
      // Kod doğruysa, kullanıcının veritabanındaki kaydını güncelle (örn. isVerified: true)
      const user = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
      
      // Redis'teki doğrulama kodunu sil
      await redisClient.del(`email_verification:${email}`);
  
      res.status(200).json({ message: "Email doğrulaması başarılı!", user });
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası", error: error.message });
    }
  };
  
  module.exports = { sendVerificationEmail, verifyEmail };