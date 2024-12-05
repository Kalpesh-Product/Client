import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useEffect } from "react";
import { rooms as roomList } from "../../../utils/Rooms";
import BookingForm from "./components/BookingForm";
import BookingDetails from "./components/BookingDetails";
import { format, addMinutes } from "date-fns";
import { toast } from "sonner";
import { NewModal } from "../../../components/NewModal";
import { Checkbox, FormControlLabel } from "@mui/material";
import { v4 as uuid } from "uuid";
import { roomBookings } from "../../../utils/roomBookings";

export default function Listing() {
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
    start: null, // Combined start datetime
    end: null, // Combined end datetime
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
    const startDateTime = new Date(e.dateStr + "T" + format(now, "HH:mm"));
    const endDateTime = addMinutes(startDateTime, 30);

    setNewMeeting((prev) => ({
      ...prev,
      start: startDateTime,
      end: endDateTime,
    }));

    setOpenBookingModal(true);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setOpenEventDetailsModal(true);
  };

  const handleCancel = (eventId) => {
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
      [name]: value, // Directly update start or end
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: uuid(),
      title: newMeeting.subject || "No Subject",
      start: newMeeting.start.toISOString(), // Ensure ISO format
      end: newMeeting.end.toISOString(),
      extendedProps: {
        room: newMeeting.room,
        participants: newMeeting.participants,
        agenda: newMeeting.agenda,
      },
      backgroundColor: "#5E5F9C",
      status: "active",
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
              start: updatedMeeting.start.toISOString(),
              end: updatedMeeting.end.toISOString(),
              extendedProps: {
                ...event.extendedProps,
                ...updatedMeeting,
              },
            }
          : event
      )
    );
    setOpenEventDetailsModal(false);
  };

  // **Handle Extend Time Function**
  const handleExtendTime = (eventId, extendedTime) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              start: `${extendedTime.date}T${extendedTime.startTime}`,
              end: `${extendedTime.date}T${extendedTime.endTime}`,
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
              start: event.start, // ISO datetime string
              end: event.end, // ISO datetime string
              backgroundColor:
                event.status === "cancelled"
                  ? "#E71D36"
                  : event.backgroundColor,
            }))}
          // Apply red color for cancelled events
          timeZone="local"
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
