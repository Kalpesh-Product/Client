import React, { useState, useEffect } from "react";
import { NewModal } from "../components/NewModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import ReactSelect from "react-select";
import TestSide from "../components/Sidetest";
import "../styles/CalenderModal.css";
import dayjs from "dayjs";
import { data } from "../utils/data";
import { toast } from "sonner";

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventColor, setEventColor] = useState("");
  const [userData, setUserData] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);
  const [eventFilter, setEventFilter] = useState([]);

  const names = extractNames(data);

  const [events, setEvents] = useState([
    {
      title: "New Year 2024",
      date: "2024-01-01",
      type: "holiday",
      backgroundColor: "green",
    },
    {
      title: "Republic Day",
      date: "2024-01-26",
      type: "holiday",
      backgroundColor: "green",
    },
    {
      title: "Strategy Sync",
      date: "2024-11-27",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
    {
      title: "Innovation Jam",
      date: "2024-12-01",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
    {
      title: "Team Bonding Event",
      date: "2024-11-10",
      type: "event",
      backgroundColor: "rebeccapurple",
    },
    {
      title: "Tech Conference",
      date: "2024-11-25",
      type: "event",
      backgroundColor: "rebeccapurple",
    },
    {
      title: "Eid Al-Adha (Bakri Eid)",
      date: "2024-06-17",
      type: "holiday",
      backgroundColor: "green",
    },
    {
      title: "Independance Day",
      date: "2024-08-15",
      type: "holiday",
      backgroundColor: "green",
    },
    {
      title: "Ganesh Chaturthi",
      date: "2024-09-07",
      type: "holiday",
      backgroundColor: "green",
    },
    {
      title: "Gandhi Jayanti",
      date: "2024-10-02",
      type: "holiday",
      backgroundColor: "green",
    },
    {
      title: "Diwali",
      date: "2024-10-31",
      type: "holiday",
      backgroundColor: "green",
    },
    {
      title: "Feast Of Saint Fransis Xavior",
      date: "2024-12-03",
      type: "holiday",
      backgroundColor: "green",
    },
    {
      title: "Goa Liberation Day",
      date: "2024-12-03",
      type: "holiday",
      backgroundColor: "green",
    },
    {
      title: "Christmas",
      date: "2024-12-25",
      type: "holiday",
      backgroundColor: "green",
    },
    {
      title: "Strategy Sync",
      date: "2024-11-27",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
    {
      title: "Innovation Jam",
      date: "2024-12-01",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
    {
      title: "Project Kickoff",
      date: "2024-12-05",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
    {
      title: "Feedback Loop",
      date: "2024-12-10",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
    {
      title: "Marketing Strategy Review",
      date: "2024-11-15",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
    {
      title: "Quarterly Sales Planning",
      date: "2024-11-20",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
    {
      title: "Employee Wellness Workshop",
      date: "2024-11-22",
      type: "event",
      backgroundColor: "rebeccapurple",
    },
    {
      title: "End of Month Wrap-up",
      date: "2024-11-30",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
    {
      title: "Deep Dive into Q1 Goals",
      date: "2024-11-18",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
    {
      title: "Product Launch Briefing",
      date: "2024-11-08",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
    {
      title: "Corporate Social Responsibility Planning",
      date: "2024-11-05",
      type: "event",
      backgroundColor: "rebeccapurple",
    },
    {
      title: "HR Policy Review",
      date: "2024-11-13",
      type: "meeting",
      backgroundColor: "#3454D1",
    },
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

  const handleDateClick = (args) => {
    const today = new Date();
    const clickedDate = new Date(args.date);

    // Reset time to start of the day for accurate comparison
    today.setHours(0, 0, 0, 0);
    clickedDate.setHours(0, 0, 0, 0);

    // Check if the clicked date is in the past
    if (clickedDate < today) {
      toast.error("You cannot select past dates!"); // Show toast for past dates
      return;
    }

    setSelectedDate(args.dateStr);
    setShowModal(true);
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
    setIsEditModal(true);
  };

  const handleSaveEvent = () => {
    if (newEvent.name && newEvent.type) {
      let color = "gray"; // Default color
      if (newEvent.type === "holiday") color = "green";
      if (newEvent.type === "meeting") color = "#3454D1";
      if (newEvent.type === "event") color = "rebeccapurple";

      setEvents([
        ...events,
        {
          title: newEvent.name,
          date: selectedDate,
          description: newEvent.description,
          time: newEvent.time,
          agenda: newEvent.Agenda,
          backgroundColor: color,
        },
      ]);
      setShowModal(false);
    } else {
      toast.error("Please provide a valid event name and type!");
    }
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

  return (
    <>
      <div class="flex ">
        <TestSide />
        <div class="flex-1 p-6 bg-gray-100">
          <div className="flex justify-between items-center">
            <h1 className=" font-bold text-4xl pb-5">Calendar</h1>
            <FormGroup row>
              {["holiday", "meeting", "event"].map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={eventFilter.includes(type)} // Check if the type is in the filter
                      onChange={(e) => {
                        const selectedType = e.target.value;
                        setEventFilter((prevFilter) =>
                          e.target.checked
                            ? [...prevFilter, selectedType]
                            : prevFilter.filter((t) => t !== selectedType)
                        );
                      }}
                      value={type} // Ensure the value matches the event type
                    />
                  }
                  label={type.charAt(0).toUpperCase() + type.slice(1)} // Capitalize the label
                />
              ))}
            </FormGroup>
          </div>

          <div className="relative w-full pt-2">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              dateClick={handleDateClick}
              weekends={true}
              eventClick={handleEventClick}
              headerToolbar={{
                left: "dayGridMonth,timeGridWeek,timeGridDay",
                center: "title",
                right: "today prev,next",
              }}
              events={filteredEvents} // Already filtered by type
              eventContent={(eventInfo) => (
                <div>
                  <b>{eventInfo.event.title}</b>
                </div>
              )}
              timeZone="local"
            />
          </div>
        </div>
      </div>
      {isEditModal && (
        <NewModal open={isEditModal} onClose={() => setIsEditModal(false)}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex align-middle justify-center flex-col gap-10 w-[600px]">
              <div className="flex justify-between items-center w-full mb-4">
                <Typography variant="h5" fontWeight="bold">
                  Edit Event
                </Typography>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setIsEditModal(false)}
                  className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md"
                >
                  <IoMdClose />
                </motion.button>
              </div>

              <TextField
                label="Event Title"
                value={selectedEvent?.title}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <TextField
                label="Description"
                value={selectedEvent?.description}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <TextField
                label="Date"
                type="date"
                value={selectedEvent?.date || ""}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />

              <Button
                className="w-full"
                onClick={handleSaveEvent}
                type="submit"
                variant="contained"
                color="primary"
              >
                Update Event
              </Button>
            </div>
          </LocalizationProvider>
        </NewModal>
      )}
      {showModal && (
        <NewModal open={showModal} onClose={() => setShowModal(false)}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                maxWidth: 600,
                padding: 2,
                bgcolor: "background.paper",
                borderRadius: 3,
              }}
              className="bg-white mx-auto"
            >
              <div className="flex justify-between items-center w-full mb-4">
                <Typography variant="h5" fontWeight="bold">
                  Add Event
                </Typography>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowModal(false)}
                  className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md"
                >
                  <IoMdClose />
                </motion.button>
              </div>

              <Grid container spacing={3}>
                {/* Event Title */}
                <Grid item xs={12}>
                  <TextField
                    label="Event Title"
                    value={newEvent.name || ""}
                    onChange={(e) =>
                      setnewEvent({ ...newEvent, name: e.target.value })
                    }
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                {/* Date and Time */}
                <Grid item xs={6}>
                  <DatePicker
                    label="Date"
                    value={dayjs(selectedDate)}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TimePicker
                    label="Time"
                    onChange={(newTime) =>
                      setnewEvent({ ...newEvent, time: newTime })
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>

                {/* React Select */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Select Participants
                  </Typography>
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
                </Grid>

                {/* Agenda */}
                <Grid item xs={12}>
                  <TextField
                    label="Agenda"
                    value={newEvent.Agenda}
                    onChange={(e) =>
                      setnewEvent({ ...newEvent, Agenda: e.target.value })
                    }
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                {/* Save and Cancel Buttons */}
                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Button
                    className="w-full"
                    onClick={handleSaveEvent}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Create Event
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </LocalizationProvider>
        </NewModal>
      )}
    </>
  );
};

export default Calender;
