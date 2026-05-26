const express = require("express");
const router = express.Router();
const { registerPatient, registerDoctor, login, getMe } = require("../controller/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/register", registerPatient);
router.post("/register-doctor", registerDoctor);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
