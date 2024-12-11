const Room = require("../../models/Rooms");

const addRoom = async (req, res, next) => {
  try {
    const { roomId, name, seats, description, status, image } = req.body;

    // Validate required fields
    if (!roomId || !name || !seats || !description || !status) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Create the room
    const room = new Room({
      roomId,
      name,
      seats,
      description,
      image: image || undefined, // Use default image if not provided
      status,
      assignedAssets: [], // Empty assignedAssets for now
    });

    const savedRoom = await room.save();
    res.status(201).json({
      message: "Room added successfully",
      room: savedRoom,
    });
  } catch (error) {
    console.error("Error adding room:", error);
    next(error);
  }
};

module.exports = { addRoom };
