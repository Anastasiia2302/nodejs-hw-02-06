const express = require("express");
const authController = require("../../controllers/authController");
const { schemas } = require("../../schemas/userSchema");
const { validateBody } = require("../../decorators");
const {authenticate} = require("../../middlewares");

const router = express.Router();


router.post("/register", validateBody(schemas.registerSchema), authController.register);

router.post("/login", validateBody(schemas.loginSchema), authController.login)

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

module.exports = router;