const CompanyData = require("../../models/CompanyData");
const Department = require("../../models/Departments");
const User = require("../../models/User");

const mongoose = require("mongoose");

const createUser = async (req, res, next) => {
  try {
    const {
      empId,
      name,
      email,
      role = "masterAdmin", // Default role if not provided
      department,
      companyId,
      designation,
      phone,
      address = {}, // Default empty object for address
      kycDetails = {}, // Default empty object for KYC details
      bankDetails = {}, // Default empty object for bank details
      selectedServices = [], // Default empty array for services
    } = req.body;

    console.log(req.body);

    // Validate the company
    const company = await CompanyData.findOne({ companyId });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Validate the department
    if (!department) {
      return res.status(400).json({ message: "Department is required" });
    }

    // Ensure department is always an array
    const departmentArray = Array.isArray(department) ? department : [department];

    // Validate each department ID
    const departmentIds = await Promise.all(
      departmentArray.map(async (depId) => {
        if (!mongoose.Types.ObjectId.isValid(depId)) {
          throw new Error(`Invalid department ID: ${depId}`);
        }
        const foundDepartment = await Department.findById(depId);
        if (!foundDepartment) {
          throw new Error(`Department not found for ID: ${depId}`);
        }
        return foundDepartment._id;
      })
    );

    // Generate default password and hash it
    const defaultPassword = "123";
    // const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Create the user
    const user = new User({
      empId,
      name,
      email,
      role,
      department: departmentIds, // Reference the department documents
      company: company._id, // Reference the company document
      password: defaultPassword, // Store hashed password
      designation,
      phone,
      address,
      kycDetails,
      bankDetails,
      selectedServices,
      assignedAsset: [], // Default to empty array
      assignedMembers: [], // Default to empty array
    });

    // Save the user
    const savedUser = await user.save();

    res.status(201).json({
      message: "User added successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error adding user:", error.message);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createUser };
