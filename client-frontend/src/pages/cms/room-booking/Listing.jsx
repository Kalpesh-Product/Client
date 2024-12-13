import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useEffect } from "react";
import BookingForm from "./components/BookingForm";
import BookingDetails from "./components/BookingDetails";
import { format, addMinutes } from "date-fns";
import { toast } from "sonner";
import { NewModal } from "../../../components/NewModal";
import { Checkbox, FormControlLabel } from "@mui/material";
import { v4 as uuid } from "uuid";
import { roomBookings } from "../../../utils/roomBookings";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Listing() {
  const { data: roomList } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:5000/api/meetings/get-rooms"
      );
      return response.data.data; // Assuming the "data" field contains the rooms array
    },
  });
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [openEventDetailsModal, setOpenEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // For event details modal
  const [currentDate, setCurrentDate] = useState("");
  const [filters, setFilters] = useState({
    active: true,
    new: true,
    ongoing: true,
    done: true,
    cancelled: true,
  });

  const [events, setEvents] = useState(roomBookings);
  const [newMeeting, setNewMeeting] = useState({
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    internal: "BIZNest",
    room: "",
    participants: "",
    subject: "",
    agenda: "",
    backgroundColor: "",
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleDateClick = (e) => {
    const now = new Date();
    const formattedTime = format(now, "HH:mm");
    const timePlus30 = format(addMinutes(now, 30), "HH:mm");

    setCurrentDate(e.dateStr);

    setNewMeeting((prev) => ({
      ...prev,
      startDate: e.dateStr,
      endDate: e.dateStr, // Default to the same day initially
      startTime: formattedTime,
      endTime: timePlus30,
    }));

    setOpenBookingModal(true);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    console.log(clickInfo.event);
    setOpenEventDetailsModal(true);
  };

  const handleCancel = (eventId) => {
    console.log(eventId);
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, status: "cancelled", backgroundColor: "#E71D36" }
          : event
      )
    );
    setOpenEventDetailsModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const localStart = `${newMeeting.startDate}T${newMeeting.startTime}`;
    const localEnd = `${newMeeting.endDate}T${newMeeting.endTime}`;

    const newEvent = {
      id: uuid(),
      title: newMeeting.subject || "No Subject",
      start: localStart,
      end: localEnd,
      extendedProps: {
        room: newMeeting.room,
        participants: newMeeting.participants,
        agenda: newMeeting.agenda,
      },
      backgroundColor: "#5E5F9C",
      status: "active", // Default status
    };

    toast.success("Booking completed successfully");
    setEvents((prev) => [...prev, newEvent]);
    setOpenBookingModal(false);
  };

  const handleUpdate = (eventId, updatedMeeting) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              title: updatedMeeting.subject,
              start: event.start, // Preserve existing start time
              end: event.end, // Preserve existing end time
              extendedProps: {
                ...event.extendedProps, // Merge extendedProps
                ...updatedMeeting,
              },
            }
          : event
      )
    );
    setOpenEventDetailsModal(false); // Close modal
  };

  // **Handle Extend Time Function**
  const handleExtendTime = (eventId, extendedTime) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              start: `${extendedTime.startDate}T${extendedTime.startTime}`,
              end: `${extendedTime.endDate}T${extendedTime.endTime}`,
            }
          : event
      )
    );
    setOpenEventDetailsModal(false); // Close modal
  };

  useEffect(() => {
    const authenticatedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(authenticatedUser));
  }, []);

  return (
    <section className="h-screen overflow-y-auto top-0 p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl mb-2">Booking Calendar</h1>
        <div className="flex gap-4 mb-4">
          {Object.keys(filters).map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  checked={filters[status]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [status]: e.target.checked,
                    }))
                  }
                  color="primary"
                />
              }
              label={status.charAt(0).toUpperCase() + status.slice(1)}
            />
          ))}
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <FullCalendar
          displayEventTime={false}
          displayEventEnd={false}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={(e) => {
            const selectedDate = new Date(e.date);
            const today = new Date();

            // Prevent interaction with past dates
            if (selectedDate < today.setHours(0, 0, 0, 0)) {
              toast.error("Past dates cannot be selected.");
              return;
            }

            handleDateClick(e);
          }}
          weekends={true}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "dayGridMonth,timeGridWeek,timeGridDay",
            center: "title",
            right: "today prev,next",
          }}
          dayCellClassNames={(arg) => {
            const date = new Date(arg.date);
            const today = new Date();

            // Add a custom class to past dates
            if (date < today.setHours(0, 0, 0, 0)) {
              return "disabled-date";
            }
            return "";
          }}
          eventDisplay="block"
          events={events
            .filter((event) => filters[event.status])
            .map((event) => ({
              ...event,
              backgroundColor:
                event.status === "cancelled"
                  ? "#E71D36"
                  : event.backgroundColor,
            }))}
        />
      </div>

      {/* Booking Modal */}
      {openBookingModal && (
        <NewModal
          open={openBookingModal}
          onClose={() => setOpenBookingModal(false)}
        >
          <BookingForm
            handleClose={() => setOpenBookingModal(false)}
            newMeeting={newMeeting}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            currentDate={currentDate}
            loggedInUser={loggedInUser}
            roomList={roomList}
          />
        </NewModal>
      )}

      {/* Event Details Modal */}
      {openEventDetailsModal && selectedEvent && (
        <NewModal
          open={openEventDetailsModal}
          onClose={() => setOpenEventDetailsModal(false)}
        >
          <BookingDetails
            handleModalClose={() => setOpenEventDetailsModal(false)}
            selectedEvent={selectedEvent}
            handleUpdate={handleUpdate}
            handleExtendTime={handleExtendTime}
            handleCancel={handleCancel}
          />
        </NewModal>
      )}
    </section>
  );
}
