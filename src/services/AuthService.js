const User = require("../model/User");
const jwt = require("../middleware/jwt");
const RefreshToken = require("../model/RefreshToken");
const { sendEmail } = require("../utils/sendEmail");

class AuthService {
  constructor(userModel, refreshTokenModel) {
    this.userModel = userModel;
    this.refreshTokenModel = refreshTokenModel;
  }

  async login(email, password) {
    const user = await this.userModel.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Geçersiz email veya şifre!");
    }

    const accessToken = jwt.generateAccessToken(user);
    const refreshToken = jwt.generateRefreshToken(user);

    // Refresh Token’ı veritabanına kaydet
    await new this.refreshTokenModel({ userId: user._id, token: refreshToken }).save();

    return { accessToken, refreshToken, user };
  }

  async register(firstName, lastName, email, password, role) {
    if (role === "admin") {
      throw new Error("Admin oluşturma yetkiniz yok!");
    }
    
    const user = new this.userModel({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    await user.save();
    await sendEmail(firstName, email);

    return user;
  }

  async logout(refreshToken) {
    await this.refreshTokenModel.deleteOne({ token: refreshToken });
    return { message: "Çıkış başarılı!" };
  }
}

module.exports = new AuthService(User, RefreshToken);