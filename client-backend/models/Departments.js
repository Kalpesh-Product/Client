const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  departmentId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyData",
  },
  designations: {
    type: [String], // Array of strings to hold multiple designations
    required: true,
    validate: {
      validator: function (v) {
        return v && v.length > 0; // Ensure at least one designation is provided
      },
      message: "At least one designation must be specified.",
    },
  },
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
