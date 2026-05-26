const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

// All possible slots — every doctor has these by default
const ALL_SLOTS = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

const getAllDoctors = async (req, res) => {
  try {
    const { specialty, search } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { name:      { $regex: search, $options: "i" } },
        { specialty: { $regex: search, $options: "i" } },
        { hospital:  { $regex: search, $options: "i" } },
      ];
    }

    if (specialty && specialty !== "All Specializations") {
      filter.specialty = { $regex: specialty, $options: "i" };
    }

    const doctors = await Doctor.find(filter).select("-password");
    res.json({ doctors });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Find actually booked slots for this doctor on this date
    const booked = await Appointment.find({
      doctor: req.params.id,
      date,
      status: { $in: ["pending", "confirmed"] },
    }).select("slot");

    const bookedSlots = booked.map((a) => a.slot);

    // Always use ALL_SLOTS as base — remove only actually booked ones
    const availableSlots = ALL_SLOTS.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    res.json({ availableSlots, bookedSlots });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllDoctors, getDoctorById, getAvailableSlots };