const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Doctor = require("../models/Doctor");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password, role: "patient" });

    res.status(201).json({
      message: "Registration successful",
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialty, experience, hospital, fee } = req.body;


    if (!name || !email || !password || !specialty) {
      return res.status(400).json({ message: "Name, email, password and specialty are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const exists = await Doctor.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const doctor = await Doctor.create({
      name,
      email,
      password,
      specialty,
      experience: experience || "1+ Years Experience",
      hospital: hospital || "MediConnect Clinic",
      fee: fee || "$100 - $200",
    });

    res.status(201).json({
      message: "Doctor registered successfully",
      token: generateToken(doctor._id, "doctor"),
      user: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        role: "doctor",
        specialty: doctor.specialty,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    let account = null;
    let accountRole = role || "patient";

    if (accountRole === "doctor") {
      account = await Doctor.findOne({ email });
    } else {
      account = await User.findOne({ email });
      if (account && account.role === "admin") accountRole = "admin";
    }

    if (!account) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await account.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(account._id, accountRole),
      user: {
        id: account._id,
        name: account.name,
        email: account.email,
        role: accountRole,
        specialty: account.specialty || null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getMe = async (req, res) => {
  res.json({ user: req.user });
};

module.exports = { registerPatient, registerDoctor, login, getMe };