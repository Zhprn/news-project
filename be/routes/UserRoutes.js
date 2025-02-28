const express = require("express");
const router = express.Router();
const authController = require("../controllers/UserController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.put('/reset-password/:id', authController.resetPassword);

module.exports = router;