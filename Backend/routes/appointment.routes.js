const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
} = require("../controller/appointment.controller");
const { protect, patientOnly, doctorOnly } = require("../middlewares/auth.middleware");

router.post("/", protect, patientOnly, bookAppointment);
router.get("/mine", protect, patientOnly, getMyAppointments);
router.get("/doctor", protect, doctorOnly, getDoctorAppointments);
router.patch("/:id", protect, doctorOnly, updateAppointmentStatus);

module.exports = router;
