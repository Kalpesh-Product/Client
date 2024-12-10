const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
  raisedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  selectedDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  assignedMember: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  ticketPriority: {
    type: String,
    default: "low",
  },
  accepted: {
    acceptedStatus: {
      type: Boolean,
      defalut: false,
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    acceptedDate: {
      type: Date,
    },
    acceptedTime: {
      type: String,
      match: /^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
    },
  },
  timeTaken: {
    type: String,
  },
  escalation: {
    escalationToAdmin: {
      isEscalated: {
        type: Boolean,
        default: false,
      },
      escalationMessage: {
        type: String,
      },
    },
    escalationToSuperAdmin: {
      isEscalated: {
        type: Boolean,
        default: false,
      },
      escalationMessage: {
        type: String,
      },
    },
    escalationToMasterAdmin: {
      isEscalated: {
        type: Boolean,
        default: false,
      },
      escalationMessage: {
        type: String,
      },
    },
    escalationToDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  closingMessage: {
    type: String,
    required: true,
  },
  resolvedStatus: {
    type: Boolean,
    default: false,
  },
  edit: {
    reasonForEditing: {
      type: String,
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  delete: {
    reasonForDeleting: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
