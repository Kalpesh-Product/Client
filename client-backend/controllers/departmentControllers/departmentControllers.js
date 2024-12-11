const Department = require("../../models/Departments");

const addDepartment = async (req, res, next) => {
  try {
    const { departmentId, name, companyId } = req.body;

    // Validate the company reference
    const company = await Company.findOne({ companyId });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Create the department (admin field will remain empty/null for now)
    const department = new Department({
      departmentId,
      name,
      admin: null, // No admin assigned yet
      company: company._id, // Reference to the Company document
    });

    const savedDepartment = await department.save();
    res.status(201).json({
      message: "Department added successfully",
      department: savedDepartment,
    });
  } catch (error) {
    console.error("Error adding department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const assignAdmin = async (req, res, next) => {
  try {
    const { departmentId, adminId } = req.body;

    // Validate the user reference
    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the department reference
    const department = await Department.findOne({ departmentId });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Update the department's admin field
    department.admin = admin._id;
    const updatedDepartment = await department.save();

    res.status(200).json({
      message: "Admin assigned successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    console.error("Error assigning admin:", error);
    next(error);
  }
};

module.exports = { addDepartment, assignAdmin };
