const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    patientPhone: { type: String, default: "" },
    patientAge: { type: Number, default: null },
    patientGender: { type: String, default: "Male" },

    date: {
      type: String, 
      required: [true, "Date is required"],
    },
    slot: {
      type: String, 
      required: [true, "Time slot is required"],
    },
    symptoms: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

appointmentSchema.index({ doctor: 1, date: 1, slot: 1 }, { unique: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
