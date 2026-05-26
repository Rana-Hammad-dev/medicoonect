const express = require("express");
const router = express.Router();
const { getStats, getAllDoctors, getAllAppointments } = require("../controller/admin.controller");
const { protect, adminOnly } = require("../middlewares/auth.middleware");

router.get("/stats", protect, adminOnly, getStats);
router.get("/doctors", protect, adminOnly, getAllDoctors);
router.get("/appointments", protect, adminOnly, getAllAppointments);

module.exports = router;
