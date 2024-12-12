const upload = require("../config/multerConfig");

const router = require("express").Router();
const {
  addMeetings,
} = require("../controllers/meetingsControllers/meetingsControllers");
const {
  addRoom,
  getRooms,
} = require("../controllers/meetingsControllers/roomsController");

router.post("/create-meeting", addMeetings);
router.post("/create-room", upload.single("room"), addRoom);
router.get("/get-rooms", getRooms);

module.exports = router;
