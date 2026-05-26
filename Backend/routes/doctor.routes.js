const express = require("express");
const router = express.Router();
const { getAllDoctors, getDoctorById, getAvailableSlots } = require("../controller/doctor.controller");

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.get("/:id/slots", getAvailableSlots);

module.exports = router;
