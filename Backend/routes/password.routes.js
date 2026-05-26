const express = require("express");
const router  = express.Router();
const { verifyIdentity, resetPasswordLocal } = require("../controller/password.controller");

router.post("/verify-identity", verifyIdentity);
router.post("/reset-local",     resetPasswordLocal);

module.exports = router;