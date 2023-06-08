const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const { schemas } = require("../../schemas/userSchema");
const { validateBody } = require("../../decorators");



router.post("/register", validateBody(schemas.registerSchema), authController.register);

router.post("/login", validateBody(schemas.loginSchema), authController.login)


module.exports = router;