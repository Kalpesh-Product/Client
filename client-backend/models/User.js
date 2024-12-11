const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  dob: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
  },
  phone: {
    type: String,
    required: true,
    match: /^[+]?[\d\s\-()]{7,20}$/,
    minlength: 7,
    maxlength: 20,
  },
  role: {
    type: String,
    default: "masterAdmin",
  },
  department: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
  designation: {
    type: String,
    required: true,
  },
  reportsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  kycDetails: {
    aadhaar: {
      type: String,
    },
    pan: {
      type: String,
    },
  },
  bankDetails: {
    bankName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    ifsc: {
      type: String,
    },
  },
  selectedServices: [
    {
      type: String,
    },
  ],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyData",
  },
  assignedAsset: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },
  ],
  assignedMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  refreshToken: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;