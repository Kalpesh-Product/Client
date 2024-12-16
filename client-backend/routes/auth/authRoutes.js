const router = require("express").Router();
const {
  // login,
  logOut,
  createUser,
} = require("../../controllers/authControllers/userAuthController");
const {
  login,
} = require("../../controllers/authControllers/testLogin");

const refreshTokenController = require("../../controllers/authControllers/refreshTokenController");

router.post("/login", login);
router.get("/logout", logOut);
router.get("/refresh", refreshTokenController);
router.post("/create-user", createUser);

module.exports = router;
