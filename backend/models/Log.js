const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  interfaceId: {
    type: Schema.Types.ObjectId,
    ref: "Interface",
    required: true,
  }, // Reference to Interface
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Success", "Failure", "Warning"],
    required: true,
  },
  message: { type: String },
});

module.exports = mongoose.model("Log", LogSchema);
