import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "../../../components/Modal";
import { useState, useEffect } from "react";
import { rooms } from "../../../utils/Rooms";
import BookingForm from "./components/BookingForm";
import BookingDetails from "./components/BookingDetails";
import { format, addMinutes } from "date-fns";
import { v4 as uuid } from "uuid";

export default function Listing() {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [openEventDetailsModal, setOpenEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // For event details modal
  const [currentTime, setCurrentTime] = useState("");
  const [timePlus30, setTimePlus30] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [credit, setCredit] = useState(500);
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
    const filteredEvents = events.filter((event) => event.id !== eventId);
    setEvents([...filteredEvents]);
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
    };

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
              start: `${updatedMeeting.date}T${updatedMeeting.startTime}`,
              end: `${updatedMeeting.date}T${updatedMeeting.endTime}`,
              extendedProps: {
                room: updatedMeeting.room,
                participants: updatedMeeting.participants,
                agenda: updatedMeeting.agenda,
              },
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
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDisplay="block"
        events={events}
        timeZone="local" // Use local timezone
      />

      {/* Booking Modal */}
      {openBookingModal && (
        <Modal
          open={openBookingModal}
          onClose={() => setOpenBookingModal(false)}
        >
          <h1 className="text-2xl font-bold ml-4">Create Booking</h1>
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
          <BookingDetails
            selectedEvent={selectedEvent}
            handleUpdate={handleUpdate}
            handleCancel={handleCancel}
          />
        </Modal>
      )}
    </section>
  );
}
