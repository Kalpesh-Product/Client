const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
            
 
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
 
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: {
    type: String,
    required: true,
  },
  assignedDate: {
    type: Date,
    required: true,
  },
//   assignedTime: {
//     type: String,
//     required: true,
//     match: /^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
//   },
  status: {
    type: String,
    required: true,
  },
  deadLineDate: {
    type: Date,
    required: true,
  },
//   deadLineTime: {
//     type: String,
//     required: true,
//     match: /^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
//   },
  extension: {
    isExtended: {
      type: Boolean,
    },
    extendedDate: {
      type: Date,
    },
    extendedTime: {
      type: String,
      match: /^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
    },
    reason: {
      type: String,
    },
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
