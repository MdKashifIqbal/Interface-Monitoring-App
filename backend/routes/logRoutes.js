// routes/logRoutes.js

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const {
  getAllLogs,
  addLog,
  getLogSummary,
} = require("../controllers/logController");

router.get("/", getAllLogs);
router.post("/", auth, authorize("admin"), addLog);
router.get("/summary", getLogSummary); // New route

module.exports = router;
