import React, { useState, useEffect } from "react";
import { NewModal } from "../components/NewModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { api } from "../utils/axios";
import { queryClient } from "../index";
import FormStepper from "../components/FormStepper";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Button,
} from "@mui/material";
import TestSide from "../components/Sidetest";
import "../styles/CalenderModal.css";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useQuery, useMutation } from "@tanstack/react-query";
import UsersSelect from "../components/UsersSelect";

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    start: dayjs(),
    end: dayjs(),
    type: "event",
  });
  const [eventFilter, setEventFilter] = useState(["holiday", "event"]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const { data: eventsData } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const response = await api.get("/api/events/all-events");
        return response.data;
      } catch (error) {
        toast.error(error.message);
        return [];
      }
    },
  });

  const { mutate } = useMutation({
    mutationFn: async function () {
      try {
        await api.post("/api/events/create-event", {
          ...eventDetails,
          start: eventDetails.startDate.toISOString(),
          end: eventDetails.endDate.toISOString(),
        });
      } catch (error) {
        toast.error(error.message);
      }
    },
    onSuccess: function () {
      queryClient.invalidateQueries("events");
      toast.success("Event created successfully");

      setShowModal(false);
      setEventDetails({
        title: "",
        description: "",
        startDate: dayjs(),
        endDate: dayjs(),
        type: "event",
      });
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field, newValue) => {
    setEventDetails((prev) => ({ ...prev, [field]: newValue }));
  };

  useEffect(() => {
    if (eventFilter.length === 0) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        eventFilter.includes(event.extendedProps?.type.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [eventFilter, events]);

  const handleModalClose = () => {
    setShowModal(false);
    setEventDetails({
      title: "",
      description: "",
      startDate: dayjs(),
      endDate: dayjs(),
      type: "event",
    });
  };

  const handleEventClick = (info) => {
    const startDate = format(new Date(info.event.start), "do MMMM yyyy");
    const endDate = info.event.end
      ? format(new Date(info.event.end), "do MMMM yyyy")
      : startDate;

    setSelectedEvent({
      title: info.event.title,
      description: info.event.extendedProps.description,
      start: startDate,
      end: endDate,
      type: info.event.extendedProps.type,
    });
    setShowEventDetails(true);
  };

  useEffect(() => {
    if (eventsData) {
      setEvents(eventsData);
    }
  }, [eventsData]);

  return (
    <div className="flex md:w-full">
      
      <div className="flex-1 p-4 bg-white h-screen overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl pb-5">Calendar</h1>
          <FormGroup row>
            {["holiday", "event"].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={eventFilter.includes(type)}
                    onChange={(e) => {
                      const selectedType = e.target.value;
                      setEventFilter((prevFilter) =>
                        e.target.checked
                          ? [...prevFilter, selectedType]
                          : prevFilter.filter((t) => t !== selectedType)
                      );
                    }}
                    value={type}
                  />
                }
                label={type.charAt(0).toUpperCase() + type.slice(1)}
              />
            ))}
          </FormGroup>
        </div>

        <div className="relative w-full pt-2">
          <FullCalendar
            eventClick={handleEventClick}
            contentHeight={"auto"}
            displayEventTime={false}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            eventDisplay="block"
            weekends={true}
            headerToolbar={{
              left: "dayGridMonth,timeGridWeek,timeGridDay",
              center: "title",
              right: "today prev,next",
            }}
            dateClick={(info) => {
              const clickedDate = dayjs(info.date).startOf("day");
              setSelectedDate(info.dateStr);
              setShowModal(true);
              setEventDetails((prev) => ({
                ...prev,
                startDate: clickedDate,
                endDate: clickedDate,
              }));
            }}
            events={filteredEvents}
          />
        </div>

        {showModal && (
          <NewModal open={showModal} onClose={handleModalClose}>
            <div className="flex flex-col gap-4 w-[50vw] mx-auto">
              <FormStepper
                steps={["Event Details", "Confirmation"]}
                handleClose={handleModalClose}
              >
                {(activeStep, handleNext) => {
                  switch (activeStep) {
                    case 0:
                      return (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleNext();
                          }}
                          className="flex flex-col gap-4"
                        >
                          <TextField
                            label="Event Title"
                            name="title"
                            value={eventDetails.title}
                            onChange={handleChange}
                            fullWidth
                            required
                          />
                          <TextField
                            label="Description"
                            name="description"
                            value={eventDetails.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                            required
                          />
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Start Date"
                              value={eventDetails.startDate}
                              onChange={(newValue) =>
                                handleDateChange("startDate", newValue)
                              }
                              renderInput={(params) => (
                                <TextField {...params} fullWidth required />
                              )}
                            />
                            <DatePicker
                              label="End Date"
                              value={eventDetails.endDate}
                              onChange={(newValue) =>
                                handleDateChange("endDate", newValue)
                              }
                              renderInput={(params) => (
                                <TextField {...params} fullWidth required />
                              )}
                            />
                          </LocalizationProvider>
                          <UsersSelect />
                          <TextField
                            select
                            label="Event Type"
                            name="type"
                            value={eventDetails.type}
                            onChange={handleChange}
                            fullWidth
                            required
                          >
                            {[
                              { label: "Event", value: "event" },
                              { label: "Holiday", value: "holiday" },
                            ].map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Next
                          </Button>
                        </form>
                      );
                    case 1:
                      return (
                        <div className="flex flex-col gap-4">
                          <div>
                            <Typography variant="h6" fontWeight="bold">
                              Confirm Event Details
                            </Typography>
                          </div>
                          <p>
                            <strong>Title:</strong> {eventDetails.title}
                          </p>
                          <p>
                            <strong>Description:</strong>{" "}
                            {eventDetails.description}
                          </p>
                          <p>
                            <strong>Start Date:</strong>{" "}
                            {eventDetails.startDate.format("YYYY-MM-DD")}
                          </p>
                          <p>
                            <strong>End Date:</strong>{" "}
                            {eventDetails.endDate.format("YYYY-MM-DD")}
                          </p>
                          <p>
                            <strong>Type:</strong> {eventDetails.type}
                          </p>
                          <div className="flex justify-end">
                            <Button
                              fullWidth
                              type="button"
                              variant="contained"
                              color="primary"
                              onClick={() => mutate()}
                            >
                              Create Event
                            </Button>
                          </div>
                        </div>
                      );
                    default:
                      return null;
                  }
                }}
              </FormStepper>
            </div>
          </NewModal>
        )}
        {showEventDetails && selectedEvent && (
          <NewModal
            open={showEventDetails}
            onClose={() => setShowEventDetails(false)}
          >
            <div className="flex flex-col gap-4 w-[50vw] mx-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Event Details</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowEventDetails(false)}
                  className="p-2 bg-white text-red-500 border border-red-200 
                               hover:border-red-400 text-2xl rounded-md"
                >
                  <IoMdClose />
                </motion.button>
              </div>
              <p>
                <strong>Title:</strong> {selectedEvent.title}
              </p>
              <p>
                <strong>Description:</strong> {selectedEvent.description}
              </p>
              <p>
                <strong>Start Date:</strong> {selectedEvent.start}
              </p>
              <p>
                <strong>End Date:</strong> {selectedEvent.end}
              </p>
              <p>
                <strong>Type:</strong> {selectedEvent.type}
              </p>
            </div>
          </NewModal>
        )}
      </div>
    </div>
  );
};

export default Calender;
