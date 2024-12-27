const LeaveType = require("../../models/LeaveTypes");

const createLeaveType = async (req, res) => {
  try {
    // Get the sent in data off request body
    // const leaveIdFromRequestBody = req.body.leaveId;
    const leaveTypeFromRequestBody = req.body.leaveType;
    const noOfDaysFromRequestBody = req.body.noOfDays;

    // Create a leave with it (take the values from the request body / frontend and insert in the database)
    const ourCreatedLeaveType = await LeaveType.create({
      //   leaveId: leaveIdFromRequestBody,
      leaveType: leaveTypeFromRequestBody,
      noOfDays: noOfDaysFromRequestBody,

      // resolvedStatus: req.body.resolvedStatus ?? false,
    });

    // respond with the new leave (this will be our response in postman / developer tools)
    res.json({ leaveType: ourCreatedLeaveType });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createLeaveType,
};
