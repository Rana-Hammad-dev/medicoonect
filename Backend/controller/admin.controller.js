const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

const getStats = async (req, res) => {
  try {
    const totalPatients = await User.countDocuments({ role: "patient" });
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    const recentActivity = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("doctor", "name specialty");

    const activities = recentActivity.map((a) => ({
      _id: a._id,
      name: a.patientName,
      desc: `Appointment with ${a.doctor?.name || "Doctor"}`,
      time: new Date(a.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: a.status.charAt(0).toUpperCase() + a.status.slice(1),
    }));

    res.json({
      stats: {
        patients: totalPatients,
        doctors: totalDoctors,
        appointments: totalAppointments,
        waitTime: 14,
      },
      activities,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password").sort({ createdAt: -1 });
    res.json({ doctors });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name specialty")
      .sort({ createdAt: -1 });
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getStats, getAllDoctors, getAllAppointments };
