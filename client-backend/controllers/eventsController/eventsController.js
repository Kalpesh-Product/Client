const Event = require("../../models/Events");

const createEvent = async (req, res, next) => {
  try {
    const { title, type, description, start, end } = req.body;
    const newEvent = new Event({
      title,
      type,
      description,
      start,
      end,
    });

    if (!title || !type || !description || !start || !end) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await newEvent.save();
    res.status(201).json({ event });
  } catch (error) {
    next(error);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    // Fetch all events from the database
    const events = await Event.find();

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    const transformedEvents = events.map((event) => {
      return {
        id: event._id,
        title: event.title,
        start: event.start,
        end: event.end,
        description: event.description,
        backgroundColor: event.type === "holiday" ? "green" : "#5E5F9C",
        extendedProps: {
          type: event.type,
        },
      };
    });

    res.status(200).json(transformedEvents);
  } catch (error) {
    next(error);
  }
};

module.exports = { createEvent, getAllEvents };
