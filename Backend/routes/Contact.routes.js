const express = require("express");
const router = express.Router();
const { submitContact, getAllMessages } = require("../controller/Contact.controller");

router.post("/", submitContact);
router.get("/", getAllMessages);

module.exports = router;