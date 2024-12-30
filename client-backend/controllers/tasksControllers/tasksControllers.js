const Project = require('../../models/Projects');

const createProject = async (req, res, next) => {
    try {
      const { title, type, description, start, end, participants } = req.body;
  
      const startDate = new Date(start);
      const endDate = new Date(end);
  
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }
      
  
      const validParticipants = Array.isArray(participants) ? participants : [];
  
      
      const newProject = new Project({
          title,
          type,
          description,
          start: startDate,
          end: endDate,
          participants: validParticipants,
        });
       
  
      if (!title || !type || !description || !start || !end) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const event = await newProject.save();
      res.status(201).json({ event });
    } catch (error) {
      next(error);
    }
  };

  module.exports = { createProject };