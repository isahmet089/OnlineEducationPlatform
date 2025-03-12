const express =require("express");
const router =express.Router();
const authController = require("../controller/authController.js");


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Kullanıcı giriş yapar
 *     description: Email ve şifre ile giriş yaparak JWT token döndürür.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Başarılı giriş
 *       401:
 *         description: Geçersiz kimlik bilgileri
 */
router.post("/login",authController.login);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı
 *     description: Yeni bir kullanıcı kaydeder.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Ahmet"
 *               lastName:
 *                 type: string
 *                 example: "Özcan"
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       201:
 *         description: Kayıt başarılı
 *       400:
 *         description: Kayıt başarısız
 */
router.post("/register",authController.register);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Kullanıcı çıkış yapar
 *     description: Kullanıcının refresh token'ını siler ve çıkış yapar.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Çıkış başarılı
 *       400:
 *         description: Çıkış başarısız
 */
router.post("/logout",authController.logout);
router.post("/refresh-token",authController.refreshAccessToken);

module.exports=router;  