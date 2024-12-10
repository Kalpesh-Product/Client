const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyId: {
    type: String,
    required: true,
    unique: true,
  },
  companyInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyData",
  },
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;

