const router = require("express").Router();
const {
  createUser,
} = require("../controllers/userControllers/userControllers");

router.post("/create-user", createUser);

module.exports = router;
