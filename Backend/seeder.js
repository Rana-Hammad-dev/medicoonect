const mongoose = require("mongoose");
const dotenv   = require("dotenv");
const Doctor   = require("./models/Doctor");

dotenv.config();

const DUMMY_DOCTORS = [
  // ── Cardiologists ──────────────────────────────────────────────────────────
  {
    name:           "Dr. Ahmed Raza",
    email:          "ahmed.raza@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Cardiology",
    experience:     "15+ Years Experience",
    hospital:       "Shaukat Khanum Memorial Hospital, Lahore",
    fee:            "Rs. 2000 - Rs. 3500",
    rating:         4.9,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop",
    availableSlots: ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"],
  },
  {
    name:           "Dr. Fatima Malik",
    email:          "fatima.malik@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Cardiology",
    experience:     "12+ Years Experience",
    hospital:       "Aga Khan University Hospital, Karachi",
    fee:            "Rs. 2500 - Rs. 4000",
    rating:         4.8,
    badge:          "Top Tier",
    image:          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop",
    availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"],
  },

  // ── Neurologists ───────────────────────────────────────────────────────────
  {
    name:           "Dr. Usman Tariq",
    email:          "usman.tariq@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Neurology",
    experience:     "10+ Years Experience",
    hospital:       "Pakistan Institute of Medical Sciences, Islamabad",
    fee:            "Rs. 1500 - Rs. 2500",
    rating:         4.7,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
  },
  {
    name:           "Dr. Sana Qureshi",
    email:          "sana.qureshi@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Neurology",
    experience:     "8+ Years Experience",
    hospital:       "Services Hospital, Lahore",
    fee:            "Rs. 1200 - Rs. 2000",
    rating:         4.6,
    badge:          "Active",
    image:          "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop",
    availableSlots: ["09:30 AM", "11:30 AM", "02:30 PM", "04:30 PM"],
  },

  // ── Pediatricians ──────────────────────────────────────────────────────────
  {
    name:           "Dr. Hina Baig",
    email:          "hina.baig@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Pediatrics",
    experience:     "14+ Years Experience",
    hospital:       "The Children's Hospital, Lahore",
    fee:            "Rs. 1000 - Rs. 1800",
    rating:         5.0,
    badge:          "Top Tier",
    image:          "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&auto=format&fit=crop",
    availableSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
  },
  {
    name:           "Dr. Bilal Hussain",
    email:          "bilal.hussain@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Pediatrics",
    experience:     "9+ Years Experience",
    hospital:       "National Institute of Child Health, Karachi",
    fee:            "Rs. 800 - Rs. 1500",
    rating:         4.7,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop",
    availableSlots: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"],
  },

  // ── Dermatologists ─────────────────────────────────────────────────────────
  {
    name:           "Dr. Ayesha Noor",
    email:          "ayesha.noor@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Dermatology",
    experience:     "7+ Years Experience",
    hospital:       "Jinnah Hospital, Lahore",
    fee:            "Rs. 1000 - Rs. 1500",
    rating:         4.8,
    badge:          "Active",
    image:          "https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=400&auto=format&fit=crop",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"],
  },
  {
    name:           "Dr. Kamran Sheikh",
    email:          "kamran.sheikh@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Dermatology",
    experience:     "11+ Years Experience",
    hospital:       "Liaquat National Hospital, Karachi",
    fee:            "Rs. 1500 - Rs. 2200",
    rating:         4.6,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop",
    availableSlots: ["10:00 AM", "12:30 PM", "03:00 PM", "05:30 PM"],
  },

  // ── Orthopedics ────────────────────────────────────────────────────────────
  {
    name:           "Dr. Tariq Mehmood",
    email:          "tariq.mehmood@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Orthopedics",
    experience:     "18+ Years Experience",
    hospital:       "Holy Family Hospital, Rawalpindi",
    fee:            "Rs. 2000 - Rs. 3000",
    rating:         4.9,
    badge:          "Top Tier",
    image:          "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&auto=format&fit=crop",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
  },
  {
    name:           "Dr. Rabia Saleem",
    email:          "rabia.saleem@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Orthopedics",
    experience:     "6+ Years Experience",
    hospital:       "Benazir Bhutto Hospital, Rawalpindi",
    fee:            "Rs. 1200 - Rs. 2000",
    rating:         4.5,
    badge:          "Active",
    image:          "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400&auto=format&fit=crop",
    availableSlots: ["09:30 AM", "11:30 AM", "02:30 PM", "04:30 PM"],
  },

  // ── Dentists ───────────────────────────────────────────────────────────────
  {
    name:           "Dr. Zara Ahmed",
    email:          "zara.ahmed@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Dentist",
    experience:     "8+ Years Experience",
    hospital:       "Fatima Memorial Hospital, Lahore",
    fee:            "Rs. 800 - Rs. 1500",
    rating:         4.7,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&auto=format&fit=crop",
    availableSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
  },
  {
    name:           "Dr. Hassan Ali",
    email:          "hassan.ali@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Dentist",
    experience:     "5+ Years Experience",
    hospital:       "Dow University Hospital, Karachi",
    fee:            "Rs. 600 - Rs. 1200",
    rating:         4.5,
    badge:          "Active",
    image:          "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=400&auto=format&fit=crop",
    availableSlots: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"],
  },

  // ── Urologists ─────────────────────────────────────────────────────────────
  {
    name:           "Dr. Imran Khan",
    email:          "imran.khan@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Urology",
    experience:     "13+ Years Experience",
    hospital:       "Mayo Hospital, Lahore",
    fee:            "Rs. 1500 - Rs. 2500",
    rating:         4.8,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&auto=format&fit=crop",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
  },
  {
    name:           "Dr. Nadia Iqbal",
    email:          "nadia.iqbal@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Urology",
    experience:     "9+ Years Experience",
    hospital:       "Civil Hospital, Karachi",
    fee:            "Rs. 1200 - Rs. 2000",
    rating:         4.6,
    badge:          "Active",
    image:          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&auto=format&fit=crop",
    availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"],
  },

  // ── General Physicians ─────────────────────────────────────────────────────
  {
    name:           "Dr. Shahid Nawaz",
    email:          "shahid.nawaz@mediconnect.pk",
    password:       "doctor123",
    specialty:      "General Physician",
    experience:     "20+ Years Experience",
    hospital:       "Sheikh Zayed Hospital, Lahore",
    fee:            "Rs. 500 - Rs. 1000",
    rating:         4.9,
    badge:          "Top Tier",
    image:          "https://images.unsplash.com/photo-1600250592611-7e4b87a60c78?w=400&auto=format&fit=crop",
    availableSlots: ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM"],
  },
  {
    name:           "Dr. Mehwish Rana",
    email:          "mehwish.rana@mediconnect.pk",
    password:       "doctor123",
    specialty:      "General Physician",
    experience:     "7+ Years Experience",
    hospital:       "Sandeman Provincial Hospital, Quetta",
    fee:            "Rs. 400 - Rs. 800",
    rating:         4.5,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&auto=format&fit=crop",
    availableSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
  },

  // ── Psychiatrists ──────────────────────────────────────────────────────────
  {
    name:           "Dr. Farhan Siddiqui",
    email:          "farhan.siddiqui@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Psychiatry",
    experience:     "10+ Years Experience",
    hospital:       "Institute of Psychiatry, Rawalpindi",
    fee:            "Rs. 1500 - Rs. 2500",
    rating:         4.8,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop&face",
    availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"],
  },
  {
    name:           "Dr. Amna Khalid",
    email:          "amna.khalid@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Psychiatry",
    experience:     "6+ Years Experience",
    hospital:       "Fountain House, Lahore",
    fee:            "Rs. 1000 - Rs. 2000",
    rating:         4.7,
    badge:          "Active",
    image:          "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&auto=format&fit=crop",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
  },

  // ── Oncologists ────────────────────────────────────────────────────────────
  {
    name:           "Dr. Junaid Memon",
    email:          "junaid.memon@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Oncology",
    experience:     "16+ Years Experience",
    hospital:       "Shaukat Khanum Cancer Hospital, Peshawar",
    fee:            "Rs. 3000 - Rs. 5000",
    rating:         4.9,
    badge:          "Top Tier",
    image:          "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=400&auto=format&fit=crop",
    availableSlots: ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"],
  },
  {
    name:           "Dr. Samina Javed",
    email:          "samina.javed@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Oncology",
    experience:     "12+ Years Experience",
    hospital:       "Nuclear Medicine Oncology Centre, Lahore",
    fee:            "Rs. 2500 - Rs. 4000",
    rating:         4.8,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&auto=format&fit=crop&face",
    availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"],
  },

  // ── Radiologists ───────────────────────────────────────────────────────────
  {
    name:           "Dr. Waseem Akram",
    email:          "waseem.akram@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Radiology",
    experience:     "11+ Years Experience",
    hospital:       "Aga Khan University Hospital, Karachi",
    fee:            "Rs. 1500 - Rs. 2500",
    rating:         4.7,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&face",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
  },
  {
    name:           "Dr. Lubna Ansari",
    email:          "lubna.ansari@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Radiology",
    experience:     "8+ Years Experience",
    hospital:       "Liaquat University Hospital, Hyderabad",
    fee:            "Rs. 1000 - Rs. 2000",
    rating:         4.6,
    badge:          "Active",
    image:          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&face",
    availableSlots: ["10:00 AM", "12:30 PM", "03:00 PM", "05:30 PM"],
  },

  // ── ENT ────────────────────────────────────────────────────────────────────
  {
    name:           "Dr. Asif Mehmood",
    email:          "asif.mehmood@mediconnect.pk",
    password:       "doctor123",
    specialty:      "ENT",
    experience:     "14+ Years Experience",
    hospital:       "Gulab Devi Hospital, Lahore",
    fee:            "Rs. 1000 - Rs. 1800",
    rating:         4.8,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&face",
    availableSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
  },
  {
    name:           "Dr. Rukhsana Parveen",
    email:          "rukhsana.parveen@mediconnect.pk",
    password:       "doctor123",
    specialty:      "ENT",
    experience:     "9+ Years Experience",
    hospital:       "Lady Reading Hospital, Peshawar",
    fee:            "Rs. 800 - Rs. 1500",
    rating:         4.5,
    badge:          "Active",
    image:          "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&auto=format&fit=crop&face",
    availableSlots: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"],
  },

  // ── Extra mix ──────────────────────────────────────────────────────────────
  {
    name:           "Dr. Omer Farooq",
    email:          "omer.farooq@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Cardiology",
    experience:     "17+ Years Experience",
    hospital:       "Chaudhry Pervaiz Elahi Institute of Cardiology, Multan",
    fee:            "Rs. 2000 - Rs. 3500",
    rating:         4.9,
    badge:          "Top Tier",
    image:          "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
  },
  {
    name:           "Dr. Shazia Mirza",
    email:          "shazia.mirza@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Dermatology",
    experience:     "10+ Years Experience",
    hospital:       "Combined Military Hospital, Lahore",
    fee:            "Rs. 1500 - Rs. 2500",
    rating:         4.7,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=400&auto=format&fit=crop&face",
    availableSlots: ["09:30 AM", "11:30 AM", "02:30 PM", "04:30 PM"],
  },
  {
    name:           "Dr. Rizwan Shah",
    email:          "rizwan.shah@mediconnect.pk",
    password:       "doctor123",
    specialty:      "General Physician",
    experience:     "8+ Years Experience",
    hospital:       "DHQ Hospital, Faisalabad",
    fee:            "Rs. 500 - Rs. 1000",
    rating:         4.5,
    badge:          "Active",
    image:          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop",
    availableSlots: ["08:30 AM", "10:30 AM", "12:30 PM", "02:30 PM"],
  },
  {
    name:           "Dr. Madiha Toor",
    email:          "madiha.toor@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Pediatrics",
    experience:     "11+ Years Experience",
    hospital:       "Abbas Institute of Medical Sciences, Muzaffarabad",
    fee:            "Rs. 700 - Rs. 1200",
    rating:         4.8,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&auto=format&fit=crop&face",
    availableSlots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"],
  },
  {
    name:           "Dr. Naveed Akhtar",
    email:          "naveed.akhtar@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Orthopedics",
    experience:     "15+ Years Experience",
    hospital:       "Nishtar Hospital, Multan",
    fee:            "Rs. 1500 - Rs. 2500",
    rating:         4.7,
    badge:          "Verified",
    image:          "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&auto=format&fit=crop",
    availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"],
  },
  {
    name:           "Dr. Saima Rashid",
    email:          "saima.rashid@mediconnect.pk",
    password:       "doctor123",
    specialty:      "Psychiatry",
    experience:     "13+ Years Experience",
    hospital:       "Pakistan Institute of Medical Sciences, Islamabad",
    fee:            "Rs. 2000 - Rs. 3000",
    rating:         4.9,
    badge:          "Top Tier",
    image:          "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&auto=format&fit=crop&face",
    availableSlots: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"],
  },
];

// ── Seed function ──────────────────────────────────────────────────────────────
const seedAll = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected\n");

    await Doctor.deleteMany({});
    console.log("Old doctors cleared");

    for (const doc of DUMMY_DOCTORS) {
      await Doctor.create(doc);
    }
    console.log(`${DUMMY_DOCTORS.length} Pakistani Doctors seeded!\n`);

    console.log("Doctor Login Credentials:");
    DUMMY_DOCTORS.forEach((d) =>
      console.log(`   ${d.name.padEnd(28)} → ${d.email} / ${d.password}`)
    );

    console.log("\nAll done! Restart your backend server.");
    process.exit(0);
  } catch (error) {
    console.error("Seeder Error:", error.message);
    process.exit(1);
  }
};

seedAll();