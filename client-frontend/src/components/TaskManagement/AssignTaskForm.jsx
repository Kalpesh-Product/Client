import React,{useState} from 'react'
import {
    TextField,
    Button,
    Grid,
    MenuItem,
    Typography,
    Box,
    Avatar,
    Autocomplete
  } from "@mui/material";
  import { motion } from "framer-motion";
  import { IoMdClose } from "react-icons/io";
  import { toast } from "sonner";
  import {data} from "../../utils/data"
  import { useLocation,useNavigate } from 'react-router-dom';

  const extractNames = (data) => {
    const names = [];
    data.forEach((item) => {
      names.push(item.name);;
      if (item.reports && item.reports.length > 0) {
        names.push(...extractNames(item.reports));
      }
    });
    return names;
  };

  

const AssignTaskForm = ({ title, handleClose ,rows, setAllRows,selectedRow,modalType}) => {

  
  const [selectedOptions, setSelectedOptions] = useState([]);

    const [formData, setFormData] = useState({
        taskName: "",
        date: "",
        priority: "",
        status:""
      });

  
    const [membersData, setMembersData] = useState({
      Name:"",
      Email:"",
      Role:"",
      Task:"",
      Projects:""
    });

    const [projectData, setProjectData] = useState({
      Department:"",
      Title:"",
      Description:""
    });

    

      const priorityType = ["High","Low","Medium"];
      const statusTypes = ["Ongoing","Pending","Start","InProgress","Running late"];

      const location = useLocation();
      const navigate = useNavigate();

      const names = extractNames(data);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const hadndleEmployeeChange = (e) =>{
        const { name, value } = e.target;
        setMembersData((prevData) => ({
          ...prevData,
          [name]: value,
        }));

      }

      const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file); // For preview
          setFormData((prevData) => ({ ...prevData, avatar: imageUrl }));
        }
      };

      const handleSubmit = (e)=>{
        e.preventDefault();

        if (location.pathname === "/tasks")
        {

        const newTask = {
          id: rows.length + 1,
          ticketTitle: formData.taskName,
          Assignes: selectedOptions.join(", "), // Join multiple selections
          DueDate: "TBD", // Update with a proper value if needed
          priority: formData.priority,
          department: "TBD", // Update with a proper value if needed
          requestDate: new Date().toISOString().split("T")[0],
        };

        setAllRows([...rows, newTask]);

        toast('Task Added successfully');
      }else if(location.pathname === "/teams"){
        const newTeamsMembers = {
          id:rows.length + 1,
          Name: membersData.Name,
          Email:membersData.Email,
          Role: membersData.Role,
          Tasks:membersData.Task,
          Projects:membersData.Projects
        }

        setAllRows([...rows,newTeamsMembers]);

        toast('Members Added successfully');

      }

        handleClose();
      }

      const navigateProject = ()=>{
        navigate('/tasklist',)


      }

    

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
      <form  onSubmit={handleSubmit}>
        {location.pathname === "/teams" ? (<>
          <div className="grid grid-cols-1 gap-4">
          {/* Asset Number */}
          <Grid item xs={12}>
            <TextField
              name='Name'
              label="Employee name"
              value={membersData.Name
              }
              fullWidth
              onChange={hadndleEmployeeChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='Email'
              label="Employee Email"
              value={membersData.Email
              }
              fullWidth
              onChange={hadndleEmployeeChange}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
              label="tasks"
              name="Task"
              select
              fullWidth
              value={membersData.Task}
              onChange={hadndleEmployeeChange}
            >
              {statusTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            
          </Grid>

          </div>

        </>): modalType === "Add Task" ? 
        (<>
        <div className="grid grid-cols-1 gap-4">
          {/* Asset Number */}
          <Grid item xs={12}>
            <TextField
              name='taskName'
              label="Task name"
              value={formData.taskName}
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          

          {/* Department Dropdown */}
          <Grid item xs={12}>
          <Autocomplete
      multiple
      options={names}
      value={selectedOptions}

      onChange={(event, newValue) => setSelectedOptions(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select Multiple Options"
          placeholder="Choose..."
        />
      )}
      />
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


        </>):modalType === "Add Project" ? (
          <>
          <div className="grid grid-cols-1 gap-4">
          {/* Asset Number */}
          <Grid item xs={12}>
            <TextField
              name='taskName'
              label="Project Name"
              value={formData.taskName}
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          

          {/* Department Dropdown */}
          <Grid item xs={12}>
          <Autocomplete
      multiple
      options={names}
      value={selectedOptions}

      onChange={(event, newValue) => setSelectedOptions(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select Multiple Options"
          placeholder="Choose..."
        />
      )}
      />
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


          </>
        ):

        location.pathname === "/teams" ? (
          <>
          <div className="grid grid-cols-1 gap-4">
          {/* Asset Number */}
          <Grid item xs={12}>
            <TextField
              name='Name'
              label="Employee name"
              value={membersData.Name
              }
              fullWidth
              onChange={hadndleEmployeeChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='Email'
              label="Employee Email"
              value={membersData.Email
              }
              fullWidth
              onChange={hadndleEmployeeChange}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
              label="tasks"
              name="Task"
              select
              fullWidth
              value={membersData.Task}
              onChange={hadndleEmployeeChange}
            >
              {statusTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            
          </Grid>

          </div>


        </>):
        (<>
         <h2>Row Details</h2>
        {selectedRow && (
          <div>
            <p><strong>ID:</strong> {selectedRow.id}</p>
            <p><strong>Task:</strong> {selectedRow.ticketTitle}</p>
            <p><strong>Assignee:</strong> {selectedRow.Assignes}</p>
            <p><strong>Due Date:</strong> {selectedRow.DueDate}</p>
            <p><strong>Priority:</strong> {selectedRow.priority}</p>
            <p><strong>Department:</strong> {selectedRow.department}</p>
          </div>
        )}
        </>) 
        }
        
        {/* Submit Button */}
        <div className="mt-4">
          {selectedRow && (
            <>
            <Button onClick={navigateProject} variant="contained" color="primary" fullWidth >
            view
          </Button>
            </>
          )}
          {
            !selectedRow && (
              <Button type="submit" variant="contained" color="primary" fullWidth >
            Submit
          </Button>
            )
          }
          
        </div>
      </form>
    </Box>
    </div>
  )
}

export default AssignTaskForm