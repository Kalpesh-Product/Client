const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { corsConfig } = require("./config/corsConfig");
const connectDb = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/auth/authRoutes");
const verifyJwt = require("./middlewares/verifyJwt");
const credentials = require("./middlewares/credentials");
const Company = require("./models/Company")
const CompanyData = require("./models/CompanyData")
const Department = require("./models/Departments")
const User = require("./models/User")
const Asset = require("./models/Assets")
const Room = require("./models/Rooms")
const Meeting = require("./models/Meetings")


const app = express();
const PORT = process.env.PORT || 5000;

connectDb(process.env.DB_URL);

app.use(credentials);
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  if (req.accepts("html")) {
    res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
  } else if (req.accepts("json")) {
    res.status(200).json({ message: "Welcome to the client API" });
  } else {
    res.type("text").status(200).send("Welcome to the client API");
  }
});
app.use("/api/auth", authRoutes);

app.post("/api/add-company", async (req, res) => {
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
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/add-department", async (req, res) => {
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
});
app.post("/api/add-user", async (req, res) => {
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
      company: company._id,        // Reference the company document
      password,                    // Store hashed password in real applications
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
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/api/add-asset", async (req, res) => {
  try {
    const {
      assetNumber,
      category,
      departmentName,
      brand,
      model,
      price,
      purchaseDate,
      invoice,
      vendor,
      warranty,
      location,
      status,
    } = req.body;

    // Validate and fetch the referenced department
    const department = await Department.findOne({ name: departmentName });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Create the asset
    const asset = new Asset({
      assetNumber,
      category,
      department: [department._id], // Reference to the department
      brand,
      model,
      price,
      purchaseDate,
      invoice,
      vendor,
      warranty,
      location,
      status,
    });

    const savedAsset = await asset.save();
    res.status(201).json({
      message: "Asset added successfully",
      asset: savedAsset,
    });
  } catch (error) {
    console.error("Error adding asset:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/api/assign-admin", async (req, res) => {
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
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/api/add-room", async (req, res) => {
  try {
    const { roomId, name, seats, description, status, image } = req.body;

    // Validate required fields
    if (!roomId || !name || !seats || !description || !status) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Create the room
    const room = new Room({
      roomId,
      name,
      seats,
      description,
      image: image || undefined, // Use default image if not provided
      status,
      assignedAssets: [], // Empty assignedAssets for now
    });

    const savedRoom = await room.save();
    res.status(201).json({
      message: "Room added successfully",
      room: savedRoom,
    });
  } catch (error) {
    console.error("Error adding room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/api/add-meeting", async (req, res) => {
  try {
    const {
      meetingId,
      bookedBy,
      startDate,
      endDate,
      startTime,
      endTime,
      roomId,
      status,
      participants,
      externalParticipants,
      addOnAssets,
    } = req.body;

    // Validate the user reference
    const user = await User.findById(bookedBy);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the room reference
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Create the meeting
    const meeting = new Meeting({
      meetingId,
      bookedBy: user._id,
      startDate,
      endDate,
      startTime,
      endTime,
      roomId: room._id,
      status,
      participants: participants || [], // Optional participants
      externalParticipants: externalParticipants || [], // Optional external participants
      addOnAssets: addOnAssets || [], // Optional assets
    });

    const savedMeeting = await meeting.save();
    res.status(201).json({
      message: "Meeting added successfully",
      meeting: savedMeeting,
    });
  } catch (error) {
    console.error("Error adding meeting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//protected routes
app.get("/protected", verifyJwt, (req, res) => {
  res.status(200).json({ message: "this is protected data" });
});

app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.status(404).json({ message: "404 Not found" });
  } else {
    res.type("text").status(404).send("404 Not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
});
