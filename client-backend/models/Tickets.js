const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,

    default: "1",
  },
  raisedBy: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    type: String,
    required: true,
    default: "Allan",
  },
  selectedDepartment: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Department",
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  // assignedMember: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
  assignedMember: {
    type: String,
    default: "",
  },

  // ticketPriority: {
  //   type: String,
  //   default: "low",
  // },
  accepted: {
    acceptedStatus: {
      type: Boolean,
      default: false,
    },
    // acceptedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // acceptedDate: {
    //   type: Date,
    // },
    // acceptedTime: {
    //   type: String,
    //   match: /^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
    // },
  },
  // timeTaken: {
  //   type: String,
  // },
  escalation: {
    escalationToAdmin: {
      isEscalated: {
        type: Boolean,
        default: false,
      },
      escalationMessage: {
        type: String,
        default: "",
      },
    },
    // escalationToSuperAdmin: {
    //   isEscalated: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   escalationMessage: {
    //     type: String,
    //   },
    // },
    // escalationToMasterAdmin: {
    //   isEscalated: {
    //     type: Boolean,
    //     default: false,
    //   },
    //   escalationMessage: {
    //     type: String,
    //   },
    // },
    // escalationToDepartment: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Department",
    // },
  },
  // closingMessage: {
  //   type: String,
  //   required: true,
  // },
  // resolvedStatus: {
  //   type: Boolean,
  //   default: false,
  // },

  // edit: {
  //   reasonForEditing: {
  //     type: String,
  //   },
  //   edited: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },

  // delete: {
  //   reasonForDeleting: {
  //     type: String,
  //   },
  //   deleted: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;