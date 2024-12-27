const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    leaveId: {
      type: String,
      default: "L-001",
    },
    takenBy: {
      type: String,
      required: true,
      default: "Allan",
    },

    leaveType: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Enable timestamps
  }
);

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
