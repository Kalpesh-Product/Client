import React,{useState} from 'react'
import {
    TextField,
    Button,
    Grid,
    MenuItem,
    Typography,
    Box,
    Avatar
  } from "@mui/material";
  import { motion } from "framer-motion";
  import { IoMdClose } from "react-icons/io";
  import { toast } from "sonner";

const AssignTaskForm = ({ title, handleClose }) => {

    const [formData, setFormData] = useState({
        taskName: "",
        date: "",
        avatar:null,
        priority: "",
        status:""
      });


      const priorityType = ["High","Low","Medium"];
      const statusTypes = ["Ongoing","Pending","Start","InProgress","Running late"];
      

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file); // For preview
          setFormData((prevData) => ({ ...prevData, avatar: imageUrl }));
        }
      };
    

  return (
    <div>
        <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        borderRadius: 2,
        fontFamily: "Popins-SemiBold",
      }}
    >
      <div className="flex justify-between align-middle mb-4">
        <Typography
          sx={{ fontFamily: "Popins-SemiBold" }}
          variant="h5"
          gutterBottom
        >
          {title}
        </Typography>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handleClose}
          className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md"
        >
          <IoMdClose />
        </motion.button>
      </div>
      <form >
        <div className="grid grid-cols-2 gap-4">
          {/* Asset Number */}
          <Grid item xs={12}>
            <TextField
              label="Task name"
              value={formData.taskName}
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          

          {/* Department Dropdown */}
          <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={2} my={2}>
        <Avatar
          src={formData.avatar}
          alt="Avatar Preview"
          sx={{ width: 50, height: 50 }}
        />
        <Button variant="contained" component="label">
          Upload Avatar
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />
        </Button>
      </Box>
          </Grid>

          {/* Asset Type Dropdown */}
          <Grid item xs={12}>
            <TextField
              label="Priority"
              name="priority"
              select
              fullWidth
              value={formData.priority}
              onChange={handleChange}
            >
              {priorityType.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Asset Name */}
          <Grid item xs={12}>
          <TextField
              label="Status"
              name="status"
              select
              fullWidth
              value={formData.status}
              onChange={handleChange}
            >
              {statusTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            
          </Grid>

          
          
        </div>
        {/* Submit Button */}
        <div className="mt-4">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </div>
      </form>
    </Box>
    </div>
  )
}

export default AssignTaskForm