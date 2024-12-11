const router = require("express").Router();
const {
  addDepartment,
  assignAdmin,
} = require("../controllers/departmentControllers/departmentControllers");

router.post("/add-department", addDepartment);
router.patch("/assign-admin", assignAdmin);
module.exports = router;
