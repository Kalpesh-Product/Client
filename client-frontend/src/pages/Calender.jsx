import React, { useState, useEffect } from "react";
import { NewModal } from "../components/NewModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { IoMdClose } from "react-icons/io";
import FormStepper from "../components/FormStepper";
import { calendarEvents } from "../utils/calendarEvents";
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
  const [userData, setUserData] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [eventFilter, setEventFilter] = useState([
    "holiday",
    "meeting",
    "event",
  ]);

  const names = extractNames(data);

  const [events, setEvents] = useState(calendarEvents);
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
            <FormStepper
              steps={["Edit Event", "Preview & Submit"]}
              handleClose={() => setIsEditModal(false)}
            >
              {(activeStep, handleNext) => {
                switch (activeStep) {
                  case 0: // Form Step
                    return (
                      <div className="flex flex-col gap-2 w-[600px]">
                        <TextField
                          label="Event Title"
                          value={selectedEvent?.title}
                          onChange={(e) =>
                            setSelectedEvent({
                              ...selectedEvent,
                              title: e.target.value,
                            })
                          }
                          fullWidth
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          label="Description"
                          value={selectedEvent?.description}
                          onChange={(e) =>
                            setSelectedEvent({
                              ...selectedEvent,
                              description: e.target.value,
                            })
                          }
                          fullWidth
                          multiline
                          rows={3}
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                        <DatePicker
                          label="Date"
                          value={selectedEvent?.date || null}
                          onChange={(date) =>
                            setSelectedEvent({
                              ...selectedEvent,
                              date,
                            })
                          }
                          renderInput={(params) => (
                            <TextField {...params} fullWidth sx={{ mb: 2 }} />
                          )}
                        />
                        <Button
                          className="w-full"
                          onClick={handleNext}
                          variant="contained"
                          color="primary"
                        >
                          Next
                        </Button>
                      </div>
                    );
                  case 1: // Preview Step
                    return (
                      <div className="flex flex-col gap-4 w-[600px]">
                        <div>
                          <h3 className="text-xl font-semibold">
                            Preview Details
                          </h3>
                          <p>
                            <strong>Title:</strong>{" "}
                            {selectedEvent?.title || "N/A"}
                          </p>
                          <p>
                            <strong>Description:</strong>{" "}
                            {selectedEvent?.description || "N/A"}
                          </p>
                          <p>
                            <strong>Date:</strong>{" "}
                            {selectedEvent?.date
                              ? selectedEvent.date.format("DD MMM YYYY")
                              : "N/A"}
                          </p>
                        </div>
                        <div className="flex gap-2 w-full">
                          <Button
                            onClick={handleSaveEvent} // Final submission
                            variant="contained"
                            color="primary"
                            fullWidth
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    );
                  default:
                    return null;
                }
              }}
            </FormStepper>
          </LocalizationProvider>
        </NewModal>
      )}

      {showModal && (
        <NewModal open={showModal} onClose={() => setShowModal(false)}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormStepper
              steps={["Add Event Details", "Preview & Submit"]}
              handleClose={() => setShowModal(false)}
            >
              {(activeStep, handleNext) => {
                switch (activeStep) {
                  case 0: // Form Step
                    return (
                      <Box
                        sx={{
                          maxWidth: 600,
                          padding: 2,
                          bgcolor: "background.paper",
                          borderRadius: 3,
                        }}
                        className="bg-white mx-auto"
                      >
                        <Grid container spacing={3}>
                          {/* Event Title */}
                          <Grid item xs={12}>
                            <TextField
                              label="Event Title"
                              value={newEvent.name || ""}
                              onChange={(e) =>
                                setnewEvent({
                                  ...newEvent,
                                  name: e.target.value,
                                })
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
                              value={newEvent.time || null}
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
                              value={newEvent.Agenda || ""}
                              onChange={(e) =>
                                setnewEvent({
                                  ...newEvent,
                                  Agenda: e.target.value,
                                })
                              }
                              multiline
                              rows={2}
                              fullWidth
                              variant="outlined"
                            />
                          </Grid>

                          {/* Next Button */}
                          <Grid item xs={12} sx={{ mt: 3 }}>
                            <Button
                              fullWidth
                              className="w-full"
                              onClick={handleNext}
                              variant="contained"
                              color="primary"
                            >
                              Next
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    );

                  case 1: // Preview Step
                    return (
                      <Box
                        sx={{
                          maxWidth: 600,
                          padding: 2,
                          bgcolor: "background.paper",
                          borderRadius: 3,
                        }}
                        className="bg-white mx-auto"
                      >
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          Preview Event
                        </Typography>
                        <div>
                          <p>
                            <strong>Title:</strong> {newEvent.name || "N/A"}
                          </p>
                          <p>
                            <strong>Date:</strong>{" "}
                            {selectedDate
                              ? dayjs(selectedDate).format("DD MMM YYYY")
                              : "N/A"}
                          </p>
                          <p>
                            <strong>Time:</strong>{" "}
                            {newEvent.time
                              ? dayjs(newEvent.time).format("hh:mm A")
                              : "N/A"}
                          </p>
                          <p>
                            <strong>Participants:</strong>{" "}
                            {selectedNames.length
                              ? selectedNames.join(", ")
                              : "None selected"}
                          </p>
                          <p>
                            <strong>Agenda:</strong> {newEvent.Agenda || "N/A"}
                          </p>
                        </div>

                        <div className="flex gap-2 mt-4 w-full">
                          <Button
                            fullWidth
                            onClick={handleSaveEvent} // Final submission
                            variant="contained"
                            color="primary"
                          >
                            Submit
                          </Button>
                        </div>
                      </Box>
                    );

                  default:
                    return null;
                }
              }}
            </FormStepper>
          </LocalizationProvider>
        </NewModal>
      )}
    </>
  );
};

export default Calender;
