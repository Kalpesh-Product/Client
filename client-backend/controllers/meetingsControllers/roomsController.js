const Room = require("../../models/Rooms");
const idGenerator = require("../../utils/idGenerator");
const sharp = require("sharp");
const { handleFileUpload } = require("../../config/cloudinaryConfig");

const addRoom = async (req, res, next) => {
  try {
    const { name, seats, description } = req.body;

    // Validate required fields
    if (!name || !seats || !description) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Generate a unique room ID
    const roomId = idGenerator("R");

    // Initialize variable for image ID
    let imageId;

    // If a file is uploaded, process and upload it
    let imageUrl; // Leave this undefined by default
    if (req.file) {
      const file = req.file;

      // Resize the image using sharp
      const buffer = await sharp(file.buffer)
        .resize(800, 800, { fit: "cover" }) // Resize to 800x800 while maintaining aspect ratio
        .webp({ quality: 80 }) // Convert to WEBP with quality 80
        .toBuffer();

      // Convert buffer to data URI
      const base64Image = `data:image/webp;base64,${buffer.toString("base64")}`;

      // Upload the image to Cloudinary using handleFileUpload
      const uploadResult = await handleFileUpload(base64Image, "rooms");

      // Store the image URL and ID
      imageId = uploadResult.public_id;
      imageUrl = uploadResult.secure_url; // Only set if a file is uploaded
    }

    // Create the room object
    const room = new Room({
      roomId,
      name,
      seats,
      description,
      assignedAssets: [],
      image: {
        id: imageId, // Will remain undefined if no file is uploaded
        url: imageUrl, // MongoDB schema default will be used if undefined
      },
    });

    // Save the room to the database
    const savedRoom = await room.save();

    // Send success response
    res.status(201).json({
      message: "Room added successfully",
      room: savedRoom,
    });
  } catch (error) {
    console.error("Error adding room:", error);
    next(error);
  }
};

const getRooms = async (req, res) => {
  try {
    // Fetch all rooms, including the assigned assets data
    const rooms = await Room.find().populate("assignedAssets");

    // Send the response with the fetched rooms
    res.status(200).json({
      success: true,
      message: "Rooms fetched successfully",
      data: rooms,
    });
  } catch (error) {
    // Handle errors and send the appropriate response
    res.status(500).json({
      success: false,
      message: "Error fetching rooms",
      error: error.message,
    });
  }
};

module.exports = { addRoom, getRooms };
