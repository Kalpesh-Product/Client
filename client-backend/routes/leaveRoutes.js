const leaveController = require("../controllers/leavesControllers/leavesControllers");
const leaveTypeController = require("../controllers/leavesControllers/leaveTypesControllers");
const router = require("express").Router();

// ROUTES FOR LEAVES START

// Create a new leave
router.post("/create-leave", leaveController.createLeave);

// View All Leaves
router.get("/view-all-leaves", leaveController.fetchAllLeaves);

// ROUTES FOR LEAVES END

// ROUTES FOR LEAVE TYPES START
router.post("/create-leave-type", leaveTypeController.createLeaveType);

// ROUTES FOR LEAVE TYPES END

module.exports = router;
