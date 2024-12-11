const CompanyData = require("./models/CompanyData");

const addCompany = async (req, res, next) => {
  try {
    // Extract the data from the request
    const formData = req.body;

    // Step 1: Save the companyInfo to the CompanyData table
    const companyInfoData = formData.companyInfo;
    const savedCompanyData = await new CompanyData(companyInfoData).save();

    // Step 2: Save the Company with a reference to CompanyData
    const companyData = {
      companyId: formData._id, // Use the provided _id as the companyId
      companyInfo: savedCompanyData._id, // Reference the CompanyData document
    };
    const savedCompany = await new Company(companyData).save();

    res.status(201).json({
      message: "Company and CompanyInfo added successfully",
      company: savedCompany,
    });
  } catch (error) {
    console.error("Error processing company data:", error);
    next(error);
  }
};

module.exports = { addCompany };
