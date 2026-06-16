import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "users.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify({ currentUser: null, users: [] }, null, 2),
  );
}

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
const writeData = (d) =>
  fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2));

const seedDefaultCEO = () => {
  const data = readData();
  data.users = data.users || [];
  if (!data.users.some((u) => u.role === "CEO")) {
    data.users.push({
      id: "user_ceo",
      username: "ceo",
      password: "ceo123",
      name: "CEO",
      age: 35,
      city: "Toshkent",
      gender: "Erkak",
      bio: "Administratsiya uchun maxsus hisob.",
      interests: ["Boshqaruv", "Strategiya"],
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
      isPremium: false,
      verified: true,
      role: "CEO",
    });
    writeData(data);
  }
};

seedDefaultCEO();

// Serve uploaded files
app.use("/uploads", express.static(UPLOAD_DIR));

// Multer for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});
const upload = multer({ storage });

app.get("/api/current", (req, res) => {
  const data = readData();
  res.json({ currentUser: data.currentUser });
});

app.get("/api/users", (req, res) => {
  const data = readData();
  res.json({ users: data.users || [] });
});

app.post("/api/users", (req, res) => {
  const data = readData();
  const id = `user_${Date.now()}`;
  const user = { id, role: "user", ...req.body };
  data.users = data.users || [];
  data.users.push(user);
  data.currentUser = user;
  writeData(data);
  res.json(user);
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  const user = (data.users || []).find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) {
    return res.status(401).json({ error: "Login yoki parol noto'g'ri." });
  }
  data.currentUser = user;
  writeData(data);
  res.json(user);
});

app.post("/api/logout", (req, res) => {
  const data = readData();
  data.currentUser = null;
  writeData(data);
  res.json({ success: true });
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const users = data.users || [];
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  users[idx] = { ...users[idx], ...req.body };
  data.users = users;
  if (data.currentUser && data.currentUser.id === id)
    data.currentUser = users[idx];
  writeData(data);
  res.json(users[idx]);
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const users = data.users || [];
  const filtered = users.filter((u) => u.id !== id);
  if (filtered.length === users.length)
    return res.status(404).json({ error: "User not found" });
  data.users = filtered;
  if (data.currentUser && data.currentUser.id === id) {
    data.currentUser = null;
  }
  writeData(data);
  res.json({ success: true });
});

app.post("/api/upload-avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
