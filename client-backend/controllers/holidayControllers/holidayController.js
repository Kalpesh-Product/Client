const  Holiday  = require('../../models/Holiday');



const holidayConfig = async (req, res) => {
    const { holiday, date } = req.body;
  
    try {
      const newHoliday = new Holiday({ holiday});
      await newHoliday.save();
      res.status(201).json({ message: "Holiday saved successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save holiday" });
    }
  }

  module.exports = { holidayConfig };