const router = require("express").Router();
const {
  getAllEvents,
  createEvent,
} = require("../controllers/eventsController/eventsController");

router.post("/create-event", createEvent);
router.get("/all-events", getAllEvents);

module.exports = router;
