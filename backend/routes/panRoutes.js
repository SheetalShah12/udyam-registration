// routes/panRoutes.js
const express = require("express");
const { verifyPan } = require("../controllers/panController");

const router = express.Router();

router.post("/verify-pan", verifyPan);

module.exports = router;
