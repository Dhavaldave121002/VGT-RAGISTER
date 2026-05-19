import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import cors from 'cors';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'db.json');

// Security Headers & Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
      connectSrc: ["'self'"]
    }
  }
}));
app.use(cors());
app.use(express.json());

// In production, serve the built react bundle
app.use(express.static(path.join(__dirname, 'dist')));

// Standard Meeting Time Slots (Hourly from 9 AM to 5 PM)
const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

// Helper to read and write database securely
async function readDB() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    const defaultDB = {
      registrations: [],
      config: {
        adminUsername: "admin",
        adminPassword: "SecureAdmin2026!" // Default secure password
      }
    };
    await writeDB(defaultDB);
    return defaultDB;
  }
}

async function writeDB(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// 1. Get available slots for a given date
app.get('/api/available-slots', async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: "Date is required (Format: YYYY-MM-DD)" });
  }

  try {
    const db = await readDB();
    const bookedSlots = db.registrations
      .filter(r => r.meetingDate === date && r.status !== 'cancelled')
      .map(r => r.meetingTime);

    const slotsInfo = TIME_SLOTS.map(slot => ({
      time: slot,
      available: !bookedSlots.includes(slot)
    }));

    res.json({ date, slots: slotsInfo });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});

// 2. Client registration and slot scheduling (atomic check)
app.post('/api/register', async (req, res) => {
  const { name, email, phone, company, service, meetingDate, meetingTime, description } = req.body;

  if (!name || !email || !phone || !service || !meetingDate || !meetingTime) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address format" });
  }

  const allowedServices = [
    "Website Development",
    "Mobile App Development",
    "Social Media Marketing",
    "Odoo Customization and Implementation Service",
    "Product Listing",
    "Verifyboost Marketing",
    "Google Ads and Management Service"
  ];

  if (!allowedServices.includes(service)) {
    return res.status(400).json({ error: "Selected service is invalid" });
  }

  if (!TIME_SLOTS.includes(meetingTime)) {
    return res.status(400).json({ error: "Invalid meeting time slot selection" });
  }

  try {
    const db = await readDB();

    // Check if slot is already taken (strict double booking prevention)
    const isConflict = db.registrations.some(
      r => r.meetingDate === meetingDate && r.meetingTime === meetingTime && r.status !== 'cancelled'
    );

    if (isConflict) {
      return res.status(409).json({ 
        error: "This slot has just been booked by another client. Please select another slot." 
      });
    }

    const newRegistration = {
      id: "REG_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company ? company.trim() : "",
      service,
      meetingDate,
      meetingTime,
      description: description ? description.trim() : "",
      status: "scheduled",
      createdAt: new Date().toISOString()
    };

    db.registrations.push(newRegistration);
    await writeDB(db);

    res.status(201).json({
      message: "Registration and meeting scheduled successfully!",
      data: newRegistration
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error during registration" });
  }
});

// 3. Admin Login API
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = await readDB();
    if (username === db.config.adminUsername && password === db.config.adminPassword) {
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      return res.json({ success: true, token });
    }
    res.status(401).json({ error: "Invalid username or password" });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

// Admin Authorization Middleware
async function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [username, timestamp] = decoded.split(':');
    
    const db = await readDB();
    if (username === db.config.adminUsername && (Date.now() - parseInt(timestamp)) < 2 * 60 * 60 * 1000) {
      req.adminUser = username;
      return next();
    }
    res.status(401).json({ error: "Session expired or invalid" });
  } catch (e) {
    res.status(401).json({ error: "Invalid session token" });
  }
}

// 4. Get all registrations (Admin only)
app.get('/api/admin/registrations', adminAuth, async (req, res) => {
  try {
    const db = await readDB();
    const sorted = [...db.registrations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ registrations: sorted });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

// 5. Update booking status or reschedule (Admin only)
app.post('/api/admin/registrations/:id/action', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { action, meetingDate, meetingTime } = req.body;

  try {
    const db = await readDB();
    const index = db.registrations.findIndex(r => r.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Registration not found" });
    }

    const reg = db.registrations[index];

    if (action === 'cancel') {
      reg.status = 'cancelled';
    } else if (action === 'complete') {
      reg.status = 'completed';
    } else if (action === 'reschedule') {
      if (!meetingDate || !meetingTime) {
        return res.status(400).json({ error: "Rescheduling requires a date and time slot" });
      }

      // Check conflict
      const isConflict = db.registrations.some(
        r => r.id !== id && r.meetingDate === meetingDate && r.meetingTime === meetingTime && r.status !== 'cancelled'
      );

      if (isConflict) {
        return res.status(409).json({ error: "This slot is already booked. Reschedule failed." });
      }

      reg.meetingDate = meetingDate;
      reg.meetingTime = meetingTime;
      reg.status = 'scheduled';
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    await writeDB(db);
    res.json({ message: "Registration updated successfully!", data: reg });
  } catch (error) {
    res.status(500).json({ error: "Failed to update registration" });
  }
});

// 6. Get Admin Statistics (Admin only)
app.get('/api/admin/stats', adminAuth, async (req, res) => {
  try {
    const db = await readDB();
    
    const total = db.registrations.length;
    const active = db.registrations.filter(r => r.status === 'scheduled').length;
    const completed = db.registrations.filter(r => r.status === 'completed').length;
    const cancelled = db.registrations.filter(r => r.status === 'cancelled').length;

    const serviceBreakdown = {};
    db.registrations.forEach(r => {
      serviceBreakdown[r.service] = (serviceBreakdown[r.service] || 0) + 1;
    });

    res.json({
      total,
      active,
      completed,
      cancelled,
      serviceBreakdown
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve statistics" });
  }
});

// For production static React app serving
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
