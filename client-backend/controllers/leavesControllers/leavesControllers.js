// const Leave = require("../../models/LeaveTest");
const Leave = require("../../models/Leaves");

const bcrypt = require("bcryptjs");
// POST - Raise a leave

const createLeave = async (req, res) => {
  try {
    // Get the sent in data off request body
    // const leaveIdFromRequestBody = req.body.leaveId;
    const takenByFromRequestBody = req.body.takenBy;
    const leaveTypeFromRequestBody = req.body.leaveType;

    // Create a leave with it (take the values from the request body / frontend and insert in the database)
    const ourCreatedLeave = await Leave.create({
      //   leaveId: leaveIdFromRequestBody,
      takenBy: takenByFromRequestBody,
      leaveType: leaveTypeFromRequestBody,

      // resolvedStatus: req.body.resolvedStatus ?? false,
    });

    // respond with the new leave (this will be our response in postman / developer tools)
    res.json({ leave: ourCreatedLeave });
  } catch (error) {
    console.log(error);
  }
};

// GET - Fetch all leaves
const fetchAllLeaves = async (req, res) => {
  //   try {
  //     // Find the leaves
  //     const listOfAllLeaves = await Leave.find();
  //     // Respond with them
  //     res.json({ leaves: listOfAllLeaves });
  //   } catch (error) {
  //     console.log(error);
  //     res.sendStatus(400);
  //   }
};

// TEST USER ROUTES END

module.exports = {
  createLeave,
  fetchAllLeaves,
};
