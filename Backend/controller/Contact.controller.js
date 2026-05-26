const Contact = require("../models/Contact");
 
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
 
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
 
    const contact = await Contact.create({ name, email, subject, message });
 
    res.status(201).json({
      message: "Message received! We'll get back to you within 2 hours.",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
 
const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
 
module.exports = { submitContact, getAllMessages };
 