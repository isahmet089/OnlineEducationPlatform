const express = require("express");
const { sendVerificationEmail, verifyEmail } = require("../controller/emailVerificationController.js");

const router = express.Router();

// Doğrulama kodunu gönderme endpoint'i
router.post("/send-verification", sendVerificationEmail);

// Email doğrulama endpoint'i
router.post("/verify-email", verifyEmail);

module.exports = router;