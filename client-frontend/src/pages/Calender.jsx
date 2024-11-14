import React, { useState } from 'react'
import Modal from "../components/Modal"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction'
import { closeModal } from "../redux/features/modalSlice";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { color, motion } from "framer-motion";

import TestSide from "../components/Sidetest";
import "../styles/CalenderModal.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { SketchPicker } from "react-color"


const Calender = () => {
  // const open = useSelector((state) => state.modal.open);
  const dispatch = useDispatch();
    const [selectedDate,setSelectedDate] = useState(null);
    const [showModal,setShowModal] = useState(false);
    const [value, setValue] = useState(dayjs());
    const [eventColor,setEventColor] = useState('#3788d8');
    

    const [events,setEvents] = useState([
      { title: 'New Year 2024', date: '2024-01-01' },
    { title: 'Republic Day', date: '2024-01-26' },
    { title: 'Good Friday', date: '2024-03-29' },
    { title: 'Gudi Padva',date:'2024-04-09'},
    { title: 'Eid Al-Fitr (Ramadan)', date: '2024-01-26' },
    { title: 'Labor Day', date: '2024-05-01' },
    { title: 'Eid Al-Adha (Bakri Eid)', date: '2024-06-17' },
    { title: 'Independance Day', date: '2024-08-15' },
    { title: 'Ganesh Chaturthi', date: '2024-09-07' },
    { title: 'Gandhi Jayanti', date: '2024-10-02' },
    { title: 'Diwali', date: '2024-10-31' },
    { title: 'Feast Of Saint Fransis Xavior', date: '2024-12-03', backgroundColor: '#FFC300'},
    { title: 'Goa Liberation Day', date: '2024-12-03'},
    { title: 'Christmas', date: '2024-12-25' }

    ])
    
    const [newEvent,setnewEvent] = useState({name:"",time:"",endTime:"",Agenda:"",color:""});

    const get30DayRange = (date) => {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const end = new Date(date.getFullYear(), date.getMonth(), Math.min(30, daysInMonth));
        return { start, end };
      };

      const handleDateClick = (args)=>{
        setSelectedDate(args.dateStr);
        setShowModal(true);
        console.log("Date is selected");


      }

      const handleSaveEvent = () => {
        if (newEvent.name)
        {
          setEvents([
            ...events,
            {
              title :newEvent.name,
              date : selectedDate,
              backgroundColor: newEvent.color,
            }
          ])
        }
        setShowModal(false);
      }

      const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A1FF33', '#FF8C00', '#800080', '#FFC0CB', '#FFD700'
      ];

  return (
    <>
    <div class="flex ">
    <TestSide/>
    <div class="flex-1 p-6 bg-gray-100">
    <FullCalendar
    plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin]}
    initialView='dayGridMonth'
    weekends={true}
    events={events}
    
  visibleRange={(currentDate) => {
    return get30DayRange(currentDate); // Restrict to 30 days
  }}
    headerToolbar = {{
        start:"today prev, next",
        center:"title",
        end:"dayGridMonth,timeGridWeek,timeGridDay",

    }}
    height={"90vh"}
    dateClick={handleDateClick}
    />
    </div>
    </div>
    {showModal && (
      

      <Modal open={showModal} onClose={() => dispatch(closeModal())}>
          <h1  className='text-xl text-center my-2 font-bold'>Add Events</h1>
          <Box
      sx={{
        maxWidth: 600,
        padding: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
      }}
      className="bg-white p-6 rounded-lg shadow-md mx-auto"
    >
      {/* Personal Information */}
      <h2 className="text-lg font-semibold mb-4">Add Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name, Mobile, Email, DOB fields */}
        <TextField
          label="Event Name"
          value={newEvent.name}
          onChange={(e)=> setnewEvent({ ...newEvent, name: e.target.value })}
          fullWidth
        />
        <div className="relative w-full">
        <label
        htmlFor="time-input"
        className={`absolute top-2 left-2 text-gray-500 transition-all 
        ${newEvent.time ? "text-xs -top-2.5" : "text-base top-4"}`}
      >
        Time
      </label>
      {/* Input Field */}
      <input
        type="time"
        id="time-input"
        value={newEvent.time}
        onChange={(e) => setnewEvent({ ...newEvent, time: e.target.value })}
        className="w-full py-3.5 px-2 text-gray-900 bg-transparent border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 peer"
      />
        {/* <input type='time'
        value={newEvent.time}
        onChange={(e)=> setnewEvent({ ...newEvent, time: e.target.value })}
        >
        </input> */}
        </div>

        <TextField
        label="Agenda"
  style={{textAlign: 'left'}}
  value={newEvent.Agenda}
  onChange={(e)=> setnewEvent({ ...newEvent, Agenda: e.target.value })}
  hintText="Message Field"
  floatingLabelText="MultiLine and FloatingLabel"
  multiline
  rows={2}
/>
{/* <SketchPicker
          color={newEvent.color}
          onChange={(color) => setnewEvent({ ...newEvent, color: color.hex })}
        /> */}

        
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      {/* <TimePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(params) => <TextField {...params}
        PopperProps={{
          className: 'custom-popper-class',
        }} />}
      /> */}
      {/* <TimePicker label="Basic time picker" showToolbar={true} */}
  
  {/* value={value}
  /> */}
    {/* </LocalizationProvider> */}
    <div>
          <label>Select Event Color: </label>
          <div className="color-picker-dropdown">
            <select
              value={newEvent.color}
              onChange={(e) => setnewEvent({ ...newEvent, color: e.target.value })}
            >
              {colors.map((color, index) => (
                <option key={index} value={color} style={{ backgroundColor: color }}>
                  
                </option>
              ))}
            </select>
            <div
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: newEvent.color,
              borderRadius: '50%',
              border: '1px solid #ccc',
            }}
            title="Selected Color"
          ></div>
          </div>
        </div>
        
        
       
       
        
        
      </div>

      {/* Role & Department fields */}
      
   
      <div className="col-span-2 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4"
          onClick={handleSaveEvent}
        >
          Save
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="w-full py-2 px-4 bg-red-600 text-white rounded mt-4"
          onClick={()=>setShowModal(false)}
        >
          Cancel
        </motion.button>
      </div>
    </Box>
        </Modal>

//       <div className="modal">
//           <div className="modal-content">
//             <h3 className='modal-heading'>Add Event</h3>
//             <div className='Fields-container'>
                
//             <label style={{ display: "block", marginRight: "8px" }}>

//               Event Name:
//               </label>
//               <input
//                 type="text"
                
//                 value={newEvent.name}
//                 onChange={(e) =>
//                   setnewEvent({ ...newEvent, name: e.target.value })
//                 }
//               />
//               <label>

// Start Time (hours):
// </label>
// <input
//   type="Time"
//   min="1"
//   value={newEvent}
//   onChange={(e) =>
//     setnewEvent({ ...newEvent, time: e.target.value })
//   }
// />
              
//             <label>

//               Time Duration (hours):
//               </label>
//               <input
//                 type="number"
//                 min="1"
//                 value={newEvent.time}
//                 onChange={(e) =>
//                   setnewEvent({ ...newEvent, time: e.target.value })
//                 }
//               />
            
//             </div>
//             <div className='btns'>
//             <button className='btn save' onClick={handleSaveEvent} >Save</button>
//             <button  className='btn close' onClick={() => setShowModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
      )}
    </>
  )
}

export default Calender