const Meeting = require("../../models/Meetings");

const addMeetings = async (req, res, next) => {
  try {
    const {
      meetingId,
      bookedBy,
      startDate,
      endDate,
      startTime,
      endTime,
      roomId,
      status,
      participants,
      externalParticipants,
      addOnAssets,
    } = req.body;

    // Validate the user reference
    const user = await User.findById(bookedBy);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the room reference
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Create the meeting
    const meeting = new Meeting({
      meetingId,
      bookedBy: user._id,
      startDate,
      endDate,
      startTime,
      endTime,
      roomId: room._id,
      status,
      participants: participants || [], // Optional participants
      externalParticipants: externalParticipants || [], // Optional external participants
      addOnAssets: addOnAssets || [], // Optional assets
    });

    const savedMeeting = await meeting.save();
    res.status(201).json({
      message: "Meeting added successfully",
      meeting: savedMeeting,
    });
  } catch (error) {
    console.error("Error adding meeting:", error);
    next(error)
  }
};

module.exports = { addMeetings };
