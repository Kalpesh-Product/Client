const router = require("express").Router();
const {
  addCompany,
} = require("../controllers/companyControllers/companyControllers");

router.post("/create-company", addCompany);

module.exports = router;
