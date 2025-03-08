const { body } = require("express-validator");

exports.validateRegister = [
  body("name").notEmpty().
  withMessage("İsim gereklidir"),
  body("email")
    .isEmail()
    .withMessage("Geçerli bir e-posta adresi giriniz"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Şifre en az 6 karakter olmalıdır"),
];

exports.validateLogin = [
  body("email").isEmail().withMessage("Geçerli bir e-posta adresi giriniz"),
  body("password").notEmpty().withMessage("Şifre gereklidir"),
];