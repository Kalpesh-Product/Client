import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"; // Fix this typo
import Modal from "../../../components/Modal";
import { useState, useEffect } from "react";
import { rooms } from "../../../utils/Rooms";
import BookingForm from "./components/BookingForm";
import BookingDetails from "./components/BookingDetails";
import { format, addMinutes } from "date-fns";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

export default function Listing() {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [openEventDetailsModal, setOpenEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // For event details modal
  const [currentTime, setCurrentTime] = useState("");
  const [timePlus30, setTimePlus30] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [events, setEvents] = useState([]);
  const [roomList, setRoomList] = useState(rooms);
  const [newMeeting, setNewMeeting] = useState({
    startTime: "",
    endTime: "",
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

    const formattedTime = format(now, "HH:mm"); // 24-hour format
    const timePlus30 = format(addMinutes(now, 30), "HH:mm");

    setCurrentTime(formattedTime);
    setTimePlus30(timePlus30);
    setCurrentDate(e.dateStr);

    setNewMeeting((prev) => ({
      ...prev,
      startTime: formattedTime,
      endTime: timePlus30,
      date: e.dateStr,
    }));

    setOpenBookingModal(true);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event); // Get event details
    setOpenEventDetailsModal(true); // Open event details modal
  };

  const handleCancel = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, status: "cancelled", backgroundColor: "#FF0000" }
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

    const localStart = `${newMeeting.date}T${newMeeting.startTime}`;
    const localEnd = `${newMeeting.date}T${newMeeting.endTime}`;

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
    <section className="h-screen overflow-y-auto top-0">
      <h1 className="font-bold text-3xl mt-4 mb-3">Booking Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        weekends={true}
        eventClick={handleEventClick}
        headerToolbar={{
          start: "today prev,next", // Controls the 'today' and navigation buttons
          center: "title", // Centered title of the calendar
          end: "dayGridMonth,timeGridWeek,timeGridDay", // Adds Month, Week, and Day view buttons
        }}
        eventDisplay="block"
        events={events.map((event) => ({
          ...event,
          backgroundColor:
            event.status === "cancelled" ? "#FF0000" : event.backgroundColor,
        }))} // Apply red color for cancelled events
        timeZone="local"
      />

      {/* Booking Modal */}
      {openBookingModal && (
        <Modal
          open={openBookingModal}
          onClose={() => setOpenBookingModal(false)}
        >
          <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold ml-4">Create Booking</h1>
            <button
              onClick={() => setOpenBookingModal(false)}
              className="px-4 py-2 text-red-500 border-2 border-red-500 font-bold rounded-md"
            >
              X
            </button>
          </div>
          <BookingForm
            newMeeting={newMeeting}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            currentDate={currentDate}
            loggedInUser={loggedInUser}
            roomList={roomList}
          />
        </Modal>
      )}

      {/* Event Details Modal */}
      {openEventDetailsModal && selectedEvent && (
        <Modal
          open={openEventDetailsModal}
          onClose={() => setOpenEventDetailsModal(false)}
        >
          <div className="flex w-full justify-end items-center">
            <button
              onClick={() => setOpenEventDetailsModal(false)}
              className="px-4 py-2 text-red-500 border-2 border-red-500 font-bold rounded-md"
            >
              X
            </button>
          </div>
          <BookingDetails
            selectedEvent={selectedEvent}
            handleUpdate={handleUpdate}
            handleExtendTime={handleExtendTime}
            handleCancel={handleCancel}
          />
        </Modal>
      )}
    </section>
  );
}
