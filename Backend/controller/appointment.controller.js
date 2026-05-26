const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");


const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, slot, symptoms, patientPhone, patientAge, patientGender } = req.body;

    if (!doctorId || !date || !slot) {
      return res.status(400).json({ message: "Doctor, date and slot are required" });
    }
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const existing = await Appointment.findOne({
      doctor: doctorId,
      date,
      slot,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existing) {
      return res.status(400).json({ message: "This slot is already booked. Please choose another." });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      patientName: req.user.name,
      patientEmail: req.user.email,
      patientPhone: patientPhone || "",
      patientAge: patientAge || null,
      patientGender: patientGender || "Male",
      date,
      slot,
      symptoms: symptoms || "",
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({ message: "This slot is already booked." });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate("doctor", "name specialty image hospital fee")
      .sort({ createdAt: -1 });

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id })
      .sort({ date: 1, slot: 1 });

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["confirmed", "rejected", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    if (appointment.doctor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: "Status updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
};
