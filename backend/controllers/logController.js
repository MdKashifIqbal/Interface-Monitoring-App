const mongoose = require("mongoose");
const Log = require("../models/Log");

// Get all logs with optional filtering by interfaceId and date range, supports pagination for performance
const getAllLogs = async (req, res) => {
  try {
    const { interfaceId, startDate, endDate, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (interfaceId && mongoose.Types.ObjectId.isValid(interfaceId)) {
      filter.interfaceId = interfaceId;
    }
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    const logs = await Log.find(filter)
      .populate("interfaceId") // fetch interface name & key for UI
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalCount = await Log.countDocuments(filter);

    res.json({
      logs,
      totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new log entry
const addLog = async (req, res) => {
  try {
    const { interfaceId, status, message } = req.body;
    
    console.log(req.body)
    
    if (!mongoose.Types.ObjectId.isValid(interfaceId)) {
      return res.status(400).json({ message: "Invalid interfaceId" });
    }

    const newLog = new Log({
      interfaceId,
      status,
      message,
    });
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get summary counts with optional date filter - for dashboard metrics
const getLogSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const match = {};

    if (startDate && !isNaN(new Date(startDate))) {
      match.timestamp = match.timestamp || {};
      match.timestamp.$gte = new Date(startDate);
    }
    if (endDate && !isNaN(new Date(endDate))) {
      match.timestamp = match.timestamp || {};
      match.timestamp.$lte = new Date(endDate);
    }

    const pipeline = [];
    if (Object.keys(match).length > 0) {
      pipeline.push({ $match: match });
    }
    pipeline.push({ $group: { _id: "$status", count: { $sum: 1 } } });

    const summary = await Log.aggregate(pipeline);

    const result = { Success: 0, Failure: 0, Warning: 0 };
    summary.forEach(item => {
      if (item._id) {
        result[item._id] = item.count;
      }
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllLogs,
  addLog,
  getLogSummary,
};
