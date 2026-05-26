const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      default: "doctor",
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
    },
    experience: {
      type: String,
      default: "1+ Years Experience",
    },
    hospital: {
      type: String,
      default: "MediConnect Clinic",
    },
    fee: {
      type: String,
      default: "$100 - $200",
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    badge: {
      type: String,
      default: "Verified",
    },
    image: {
      type: String,
      default: "/maledoc.2.avif",
    },
    
    availableSlots: {
      type: [String],
      default: ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"],
    },
    isApproved: {
      type: Boolean,
      default: true, 
    },
  },
  { timestamps: true }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Doctor", doctorSchema);
