const User   = require("../models/User");
const Doctor = require("../models/Doctor");

const verifyIdentity = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name)
      return res.status(400).json({ message: "Email and name are required" });

    let account = await User.findOne({ email: email.toLowerCase() });
    let role    = "patient";

    if (!account) {
      account = await Doctor.findOne({ email: email.toLowerCase() });
      role    = "doctor";
    }

    if (!account)
      return res.status(404).json({ message: "No account found with this email" });

    const nameMatch = account.name.toLowerCase().trim() === name.toLowerCase().trim();
    if (!nameMatch)
      return res.status(400).json({ message: "Name does not match our records" });

    res.json({
      message:  "Identity verified",
      verified: true,
      email:    account.email,
      role,
    });
  } catch (error) {
    console.error("Verify Identity Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPasswordLocal = async (req, res) => {
  try {
    const { email, name, newPassword } = req.body;

    if (!email || !name || !newPassword)
      return res.status(400).json({ message: "All fields are required" });

    if (newPassword.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });

    let account = await User.findOne({ email: email.toLowerCase() });
    if (!account) account = await Doctor.findOne({ email: email.toLowerCase() });

    if (!account)
      return res.status(404).json({ message: "Account not found" });

    const nameMatch = account.name.toLowerCase().trim() === name.toLowerCase().trim();
    if (!nameMatch)
      return res.status(400).json({ message: "Identity verification failed" });

    account.password = newPassword;
    await account.save();

    res.json({ message: "Password reset successful! You can now login." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { verifyIdentity, resetPasswordLocal };