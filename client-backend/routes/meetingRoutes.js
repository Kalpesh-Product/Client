const router = require("express").Router();
const {
  addMeetings,
} = require("../controllers/meetingsControllers/meetingsControllers");
const {
  addRoom,
} = require("../controllers/meetingsControllers/roomsController");

router.post("/create-meeting", addMeetings);
router.post("/create-room", addRoom);

module.exports = router;
