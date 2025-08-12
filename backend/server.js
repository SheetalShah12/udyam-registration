const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const verificationRoutes = require("./routes/verificationRoutes");
const panRoutes = require("./routes/panRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

// Submit form data and save
app.post("/submit", (req, res) => {
  const data = req.body;
  console.log("Data received:", data);

  const filePath = path.join(__dirname, "data.json");
  let existingData = [];

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath);
    existingData = JSON.parse(raw);
  }

  existingData.push(data);
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

  res.json({ success: true, message: "Data saved" });
});

// Use routes
app.use("/api", verificationRoutes);
app.use("/api", panRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
