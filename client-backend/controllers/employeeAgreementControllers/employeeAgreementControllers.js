const EmploymentAgreement = require("../../models/EmploymentAgreements");

const createEmploymentAgreement = async (req, res) => {
  try {
    // Get the sent in data off request body
    // const leaveIdFromRequestBody = req.body.leaveId;
    const employeeFromRequestBody = req.body.employee;
    // const noOfDaysFromRequestBody = req.body.noOfDays;

    // Create a leave with it (take the values from the request body / frontend and insert in the database)
    const ourCreatedEmploymentAgreement = await EmploymentAgreement.create({
      //   leaveId: leaveIdFromRequestBody,
      employee: employeeFromRequestBody,
      //   noOfDays: noOfDaysFromRequestBody,

      // resolvedStatus: req.body.resolvedStatus ?? false,
    });

    // respond with the new leave (this will be our response in postman / developer tools)
    res.json({ employmentAgreement: ourCreatedEmploymentAgreement });
  } catch (error) {
    console.log(error);
  }
};

// GET - Fetch all leave types
const fetchAllEmploymentAgreements = async (req, res) => {
  try {
    // Find the leaves
    const listOfAllEmploymentAgreements = await EmploymentAgreement.find();
    // Respond with them
    res.json({ employmentAgreements: listOfAllEmploymentAgreements });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// DELETE - delete leave type

// const deleteEmploymentAgreement = async (req, res) => {
//   try {
//     // get id off the url
//     const employmentAgreementIdFromTheUrl = req.params.id;

//     // Delete the record
//     await EmploymentAgreement.deleteOne({
//       _id: employmentAgreementIdFromTheUrl,
//     });

//     // Respond with a message (eg: leave deleted)
//     res.json({ success: "Leave Deleted" });
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(400);
//   }
// };

// PUT - soft delete leave type

const softDeleteEmploymentAgreement = async (req, res) => {
  try {
    // Get the id off the url
    const employmentAgreementIdFromTheUrl = req.params.id;

    // Get the data off the req body
    // const assignedMemberFromRequestBody = req.body.assignedMember;
    // const descriptionFromRequestBody = req.body.description;

    // Find and update the record
    await EmploymentAgreement.findOneAndUpdate(
      { _id: employmentAgreementIdFromTheUrl },
      {
        // assignedMember: assignedMemberFromRequestBody,
        // description: descriptionFromRequestBody,
        // "accepted.acceptedStatus": true,
        deletedStatus: true,
      },
      { new: true } // Returns the updated document
    );

    //   Find updated leave (using it's id)
    const updatedEmploymentAgreement = await EmploymentAgreement.findById(
      employmentAgreementIdFromTheUrl
    );

    // Respond with the updated leave (after finding it)
    res.json({ employmentAgreement: updatedEmploymentAgreement });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
module.exports = {
  createEmploymentAgreement,
  fetchAllEmploymentAgreements,
  // deleteEmploymentAgreement,
  softDeleteEmploymentAgreement,
};
