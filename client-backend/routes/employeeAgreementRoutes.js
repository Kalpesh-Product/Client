const employmentAgreementController = require("../controllers/employeeAgreementControllers/employeeAgreementControllers");
const router = require("express").Router();

// ROUTES FOR LEAVE TYPES START
router.post(
  "/create-employment-agreement",
  employmentAgreementController.createEmploymentAgreement
);

// View All Employment Agreements
router.get(
  "/view-all-employment-agreements",
  employmentAgreementController.fetchAllEmploymentAgreements
);

// // Delete Leave type
// router.delete("/delete-leave-type/:id", leaveTypeController.deleteLeaveType);

// // Soft Delete Employment Agreement
router.put(
  "/soft-delete-employment-agreement/:id",
  employmentAgreementController.softDeleteEmploymentAgreement
);

// ROUTES FOR LEAVE TYPES END

module.exports = router;
