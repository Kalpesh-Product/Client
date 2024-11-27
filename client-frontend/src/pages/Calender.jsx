import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import ReactSelect from "react-select";
import TestSide from "../components/Sidetest";
import "../styles/CalenderModal.css";
import dayjs from "dayjs";
import { data } from "../utils/data";
import { toast } from "sonner"; // Import sonner toast
import { isBefore, parseISO } from "date-fns"; // Import date-fns functions

const customStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
};

const extractNames = (data) => {
  const names = [];
  data.forEach((item) => {
    names.push(item.name);
    if (item.reports && item.reports.length > 0) {
      names.push(...extractNames(item.reports));
    }
  });
  return names;
};

const Calender = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState(dayjs());
  const [eventColor, setEventColor] = useState("");
  const [userData, setUserData] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);
  const [eventFilter, setEventFilter] = useState([]);

  const names = extractNames(data);

  const dayCellClassNames = (dateInfo) => {
    const today = new Date();
    const cellDate = new Date(dateInfo.date);
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    // Add custom class for past dates and today
    if (cellDate < today) return "fc-disabled-date";
    if (cellDate.toDateString() === today.toDateString()) return "fc-today";

    // Return empty for future dates
    return "";
  };

  const [events, setEvents] = useState([
    { title: "New Year 2024", date: "2024-01-01", type: "holiday" },
    { title: "Republic Day", date: "2024-01-26", type: "holiday" },
    { title: "Good Friday", date: "2024-03-29", type: "holiday" },
    { title: "Gudi Padva", date: "2024-04-09", type: "holiday" },
    { title: "Eid Al-Fitr (Ramadan)", date: "2024-01-26", type: "holiday" },
    { title: "Labor Day", date: "2024-05-01", type: "holiday" },
    { title: "Eid Al-Adha (Bakri Eid)", date: "2024-06-17", type: "holiday" },
    { title: "Independance Day", date: "2024-08-15", type: "holiday" },
    { title: "Ganesh Chaturthi", date: "2024-09-07", type: "holiday" },
    { title: "Gandhi Jayanti", date: "2024-10-02", type: "holiday" },
    { title: "Diwali", date: "2024-10-31", type: "holiday" },
    {
      title: "Feast Of Saint Fransis Xavior",
      date: "2024-12-03",
      backgroundColor: "#FFC300",
      type: "holiday",
    },
    { title: "Goa Liberation Day", date: "2024-12-03" },
    { title: "Christmas", date: "2024-12-25" },
    { title: "Strategy Sync", date: "2024-11-27", type: "meeting" },
    { title: "Innovation Jam", date: "2024-12-01", type: "meeting" },
    { title: "Project Kickoff", date: "2024-12-05", type: "meeting" },
    { title: "Feedback Loop", date: "2024-12-10", type: "meeting" },
  ]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  useEffect(() => {
    if (eventFilter.length === 0) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        eventFilter.includes(event.type)
      );
      setFilteredEvents(filtered);
    }
  }, [eventFilter, events]);

  const [newEvent, setnewEvent] = useState({
    name: "",
    description: "",
    time: "",
    endTime: "",
    Agenda: "",
    color: "",
  });

  const get30DayRange = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const end = new Date(
      date.getFullYear(),
      date.getMonth(),
      Math.min(30, daysInMonth)
    );
    return { start, end };
  };

  const handleDateClick = (args) => {
    const today = new Date();
    const clickedDate = new Date(args.date);

    // Use date-fns to check if the clicked date is in the past
    if (isBefore(clickedDate, today)) {
      toast.error("You cannot select past dates!"); // Show toast for past dates
      return; // Do nothing
    }

    setSelectedDate(args.dateStr);
    setShowModal(true);
    console.log("Date is selected");
  };

  const handleEventClick = (e) => {
    const event = e.event;

    // Allow clicking on events regardless of the date
    setSelectedEvent({
      title: event.title,
      start: event.startStr,
      end: event.endStr || null,
      description: event.extendedProps.description,
      agenda: event.extendedProps.agenda,
      color: event.backgroundColor || "default",
    });
    setShowModal(true);
    setIsEditModal(true);
  };

  const handleSaveEvent = () => {
    if (newEvent.name) {
      setEvents([
        ...events,
        {
          title: newEvent.name,
          date: selectedDate,
          description: newEvent.description,
          time: newEvent.time,
          agenda: newEvent.Agenda,
          backgroundColor: eventColor,
        },
      ]);
    }
    setShowModal(false);
  };

  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A1FF33",
    "#FF8C00",
    "#800080",
    "#FFC0CB",
    "#FFD700",
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData(storedUser); // Populate user data
    }
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectColor = (color) => {
    setEventColor(color);
    setIsOpen(false);
  };
  const removeChip = (name) => {
    setSelectedNames(selectedNames.filter((selected) => selected !== name));
  };

  return (
    <>
      <div class="flex ">
        <TestSide />
        <div class="flex-1 p-6 bg-gray-100">
          <div className="flex justify-between items-center">
            <h1 className=" font-bold text-4xl pb-5">Calendar</h1>
            <FormGroup row>
              {["holiday", "meeting"].map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={eventFilter.includes(type)} // Check if the type is in the filter
                      onChange={(e) => {
                        const selectedType = e.target.value;
                        setEventFilter((prevFilter) =>
                          prevFilter.includes(selectedType)
                            ? prevFilter.filter((type) => type !== selectedType)
                            : [...prevFilter, selectedType]
                        );
                      }}
                      value={type}
                    />
                  }
                  label={type}
                />
              ))}
            </FormGroup>
          </div>

          <div className="relative w-full pt-2">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              dateClick={(e) => {
                const selectedDate = new Date(e.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset time for comparison

                // Prevent interaction with past dates
                if (selectedDate < today) {
                  toast.error("Past dates cannot be selected.");
                  return;
                }

                handleDateClick(e); // Proceed with logic for valid dates
              }}
              weekends={true}
              eventClick={handleEventClick} // Allow event clicks on all dates
              headerToolbar={{
                left: "dayGridMonth,timeGridWeek,timeGridDay",
                center: "title",
                right: "today prev,next",
              }}
              dayCellClassNames={(arg) => {
                const date = new Date(arg.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset time for comparison

                // Add a custom class to past dates
                if (date < today) {
                  return "disabled-date";
                }
                return "";
              }}
              eventDisplay="block"
              events={events.map((event) => ({
                ...event,
                backgroundColor:
                  event.status === "cancelled"
                    ? "#FF0000"
                    : event.backgroundColor,
              }))}
              timeZone="local"
            />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          {selectedEvent && isEditModal ? (
            <>
              <div className="flex align-middle justify-center flex-col gap-10">
                <TextField
                  label="Event And Title"
                  value={selectedEvent?.title}
                  fullWidth
                />
                <div className="container">
                  <div className="flex-row justify-evenly gap-10">
                    <TextField
                      label="Description"
                      value={selectedEvent?.description}
                      fullWidth
                      multiline
                      rows={1}
                    />
                  </div>
                </div>
                <div className="relative w-full">
                  <label
                    htmlFor="time-input"
                    className="absolute left-2 transition-all bg-white px-1 pointer-events-none 
         text-xs -top-2 text-blue-300 " //text-base top-4
                  >
                    Date
                  </label>

                  {/* Input Field */}
                  <input
                    type="text"
                    id="text"
                    value={selectedEvent?.date}
                    className="w-full py-2 px-2 text-gray-900 bg-transparent border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 peer"
                  />
                </div>
              </div>
              <div className="col-span-2 flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4"
                  onClick={handleSaveEvent}
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full py-2 px-4 bg-red-600 text-white rounded mt-4"
                  onClick={() => {
                    setShowModal(false);
                    setIsEditModal(false);
                  }}
                >
                  Cancel
                </motion.button>
              </div>
            </>
          ) : (
            <div>
              <h1 className="text-xl text-center my-2 font-bold">Add Events</h1>
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
                <div className="grid grid-cols-1  gap-4">
                  {/* Name, Mobile, Email, DOB fields */}
                  <div className="grid grid-cols-1 gap-4">
                    <TextField
                      label="Event And Title"
                      value={newEvent.name}
                      onChange={(e) =>
                        setnewEvent({ ...newEvent, name: e.target.value })
                      }
                      fullWidth
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* <label className="text-gray-700 text-sm">{selectedDate}</label> */}
                    <div className="relative w-full">
                      <label
                        htmlFor="time-input"
                        className="absolute left-2 transition-all bg-white px-1 pointer-events-none 
                        text-xs -top-2 text-blue-300 " //text-base top-4
                      >
                        Date
                      </label>

                      {/* Input Field */}
                      <input
                        type="text"
                        id="text"
                        value={selectedDate}
                        className="w-full py-2 px-2 text-gray-900 bg-transparent border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 peer"
                      />
                    </div>

                    <div className="relative w-full">
                      <label
                        htmlFor="time-input"
                        className="absolute left-2 transition-all bg-white px-1 pointer-events-none 
                    text-xs -top-2 text-blue-300" //text-base top-4
                      >
                        Time
                      </label>

                      {/* Input Field */}
                      <input
                        type="time"
                        id="time-input"
                        value={newEvent.time}
                        onChange={(e) =>
                          setnewEvent({ ...newEvent, time: e.target.value })
                        }
                        className="w-full py-2 px-2 text-gray-900 bg-transparent border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 peer"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="relative w-full">
                      <label
                        htmlFor="name-select"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Select Names
                      </label>
                      <ReactSelect
                        id="name-select"
                        options={names.map((name) => ({
                          value: name,
                          label: name,
                        }))}
                        isMulti
                        styles={customStyles}
                        value={selectedNames.map((name) => ({
                          value: name,
                          label: name,
                        }))}
                        onChange={(selectedOptions) =>
                          setSelectedNames(
                            selectedOptions.map((option) => option.value)
                          )
                        }
                        placeholder="Select names..."
                      />
                    </div>
                  </div>

                  <TextField
                    label="Agenda"
                    style={{ textAlign: "left", width: "100%" }}
                    value={newEvent.Agenda}
                    onChange={(e) =>
                      setnewEvent({ ...newEvent, Agenda: e.target.value })
                    }
                    hintText="Message Field"
                    floatingLabelText="MultiLine and FloatingLabel"
                    multiline
                    fullWidth
                    rows={2}
                  />

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <label>{userData?.name}</label>

                    <div style={{ position: "relative", width: "200px" }}>
                      <div
                        onClick={toggleDropdown}
                        style={{
                          border: "1px solid #ccc",
                          padding: "10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          backgroundColor: eventColor || "#fff",
                        }}
                      >
                        {"Select a color "}
                      </div>
                      {isOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            border: "1px solid #ccc",
                            background: "#fff",
                            borderRadius: "5px",
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "10px",
                            padding: "10px",
                            zIndex: 10,
                          }}
                        >
                          {colors.map((color, index) => (
                            <div
                              key={index}
                              onClick={() => selectColor(color)}
                              style={{
                                backgroundColor: color,
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                cursor: "pointer",
                                border: "1px solid #ccc",
                              }}
                            />
                          ))}
                        </div>
                      )}
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
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </motion.button>
                </div>
              </Box>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default Calender;
