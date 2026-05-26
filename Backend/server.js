const express   = require("express");
const cors      = require("cors");
const dotenv    = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ── CORS — allow all Vercel + localhost origins ───────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL, // your Vercel URL from .env
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, curl)
      if (!origin) return callback(null, true);

      // Allow if origin is in our list OR is a Vercel preview URL
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app");

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn("CORS blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// Body parser — 5mb for base64 images
app.use(express.json({ limit: "5mb" }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth",         require("./routes/auth.routes"));
app.use("/api/doctors",      require("./routes/doctor.routes"));
app.use("/api/appointments", require("./routes/appointment.routes"));
app.use("/api/admin",        require("./routes/admin.routes"));
app.use("/api/contact",      require("./routes/Contact.routes"));
app.use("/api/password",     require("./routes/password.routes"));

// Health check
app.get("/", (req, res) =>
  res.json({ message: "✅ MediConnect API is running", env: process.env.NODE_ENV })
);

// 404
app.use((req, res) =>
  res.status(404).json({ message: "Route not found" })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
