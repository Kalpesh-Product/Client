const employmentAgreementController = require("../controllers/employeeAgreementControllers/employeeAgreementControllers");
const router = require("express").Router();

// ROUTES FOR LEAVE TYPES START
router.post(
  "/create-employment-agreement",
  employmentAgreementController.createEmploymentAgreement
);

// View All Leave types
// router.get("/view-all-leave-types", leaveTypeController.fetchAllLeaveTypes);

// // Delete Leave type
// router.delete("/delete-leave-type/:id", leaveTypeController.deleteLeaveType);

// // Soft Delete Leave type
// router.put(
//   "/soft-delete-leave-type/:id",
//   leaveTypeController.softDeleteLeaveType
// );

// ROUTES FOR LEAVE TYPES END

module.exports = router;
