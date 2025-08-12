// controllers/panController.js

// Simulate PAN verification
exports.verifyPan = (req, res) => {
  const { pan } = req.body;

  // PAN format check (e.g., ABCDE1234F)
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!pan || !panRegex.test(pan)) {
    return res.status(400).json({ success: false, message: "Invalid PAN format" });
  }

  // Simulate verification (in reality, call govt API)
  console.log(`PAN ${pan} verified successfully`);

  res.json({ success: true, message: "PAN verified successfully" });
};
