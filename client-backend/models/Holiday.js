const mongoose = require("mongoose");

const HolidaySchema = new mongoose.Schema({
  // holidayId: {
  //   type: String,
  //   unique: true,
    
  // },
  holidayName: {
    type: String,
    required: true,
  }
  // date: {
  //   type: Date,
    
  // },
  
});

const Holiday = mongoose.model("Holiday", HolidaySchema);
module.exports = Holiday;