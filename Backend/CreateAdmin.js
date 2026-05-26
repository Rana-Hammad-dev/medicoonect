// Run once: node createAdmin.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        const exists = await User.findOne({ email: "admin@mediconnect.com" });
        if (exists) {
            console.log(process.env.MONGO_URI);
            console.log("Admin already exists!");
            process.exit(0);
        }

        await User.create({
            name: "MediConnect Admin",
            email: "admin@mediconnect.com",
            password: "admin123",
            role: "admin",
        });

        console.log("Admin created!");
        console.log("   Email:    admin@mediconnect.com");
        console.log("   Password: admin123");
        process.exit(0);
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
};

createAdmin();