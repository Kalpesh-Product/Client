const Company = require("../../models/Company");
const User = require("../../models/User");

const createUser = async (req, res, next) => {
  try {
    const {
      empId,
      name,
      email,
      role,
      departmentName,
      companyId,
      password,
      designation,
      phone,
    } = req.body;

    // Validate and fetch the referenced company
    const company = await Company.findOne({ companyId });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Validate and fetch the referenced department
    const department = await Department.findOne({ name: departmentName });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Create the user
    const user = new User({
      empId,
      name,
      email,
      role,
      department: [department._id], // Reference the department document
      company: company._id, // Reference the company document
      password, // Store hashed password in real applications
      designation,
      phone,
      assignedAsset: null,
      assignedMembers: null,
    });

    const savedUser = await user.save();
    res.status(201).json({
      message: "User added successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    next(error);
  }
};

module.exports = { createUser };
