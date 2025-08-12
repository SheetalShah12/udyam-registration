// controllers/verificationController.js

exports.sendOtp = (req, res) => {
  const { aadhaar } = req.body;

  if (!aadhaar || !/^\d{12}$/.test(aadhaar)) {
    return res.status(400).json({ success: false, message: "Invalid Aadhaar number" });
  }

  // Simulate sending OTP
  console.log(`OTP sent to Aadhaar: ${aadhaar}`);

  res.json({ success: true, message: "OTP sent successfully" });
};

exports.verifyOtp = (req, res) => {
  const { aadhaar, otp } = req.body;

  if (!aadhaar || !/^\d{12}$/.test(aadhaar)) {
    return res.status(400).json({ success: false, message: "Invalid Aadhaar number" });
  }
  if (!otp || !/^\d{6}$/.test(otp)) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  // Simulate OTP verification
  console.log(`OTP verified for Aadhaar: ${aadhaar}`);

  res.json({ success: true, message: "OTP verified successfully" });
};
