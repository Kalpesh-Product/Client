const mongoose = require("mongoose");

const ticketTestSchema = new mongoose.Schema({
  raisedBy: {
    type: String,
    required: true,
  },
  ticketMessage: {
    type: String,
    required: true,
  },
});

const TicketTest = mongoose.model("TicketTest", ticketTestSchema);
module.exports = TicketTest;
