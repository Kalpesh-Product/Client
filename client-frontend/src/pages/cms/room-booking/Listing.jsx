import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"; 
import Modal from "../../../components/Modal";
import { useState, useEffect } from "react";
import { rooms } from "../../../utils/Rooms";
import BookingForm from "./components/BookingForm";
import BookingDetails from "./components/BookingDetails";
import { format, addMinutes } from "date-fns";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

export default function Listing() {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [openEventDetailsModal, setOpenEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // For event details modal
  const [currentTime, setCurrentTime] = useState("");
  const [timePlus30, setTimePlus30] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [events, setEvents] = useState([
    {
      id: "2a07c1a4-27f5-4f81-8af7-4c8ec2a35d7b",
      title: "Innovation Strategy Discussion",
      start: "2024-11-10T10:00",
      end: "2024-11-10T11:30",
      backgroundColor: "#FF5733",
      status: "active",
      extendedProps: {
        agenda: "Discussing ideas for upcoming product launches",
        participants: "Abrar Shaikh, Kashif Shaikh, Farzeen",
        room: "San Francisco",
      },
    },
    {
      id: "d5f8ecab-45f1-47a5-bd62-4d1b93890861",
      title: "Tech Sprint Planning",
      start: "2024-11-15T14:00",
      end: "2024-11-15T15:00",
      backgroundColor: "#33C1FF",
      status: "scheduled",
      extendedProps: {
        agenda: "Finalizing the next sprint tasks",
        participants: "Kalpesh Naik, Allan Silveira, Aiwinraj KS",
        room: "Baga",
      },
    },
    {
      id: "4973c51e-46b8-4f8f-8c52-8891a741cd6f",
      title: "Finance Quarterly Review",
      start: "2024-11-22T11:00",
      end: "2024-11-22T12:30",
      backgroundColor: "#5E9C5F",
      status: "active",
      extendedProps: {
        agenda: "Reviewing quarterly financial reports",
        participants: "Narshiva Naik, Hema Natalkar, Siddhi Vernekar",
        room: "Zurich",
      },
    },
    {
      id: "79f5c23e-72df-45c4-8d51-bf3d10a3d5f2",
      title: "Maintenance Equipment Training",
      start: "2024-11-18T13:00",
      end: "2024-11-18T14:30",
      backgroundColor: "#FFC300",
      status: "pending",
      extendedProps: {
        agenda: "Training on the new maintenance equipment",
        participants: "Amol Kakade, Jill",
        room: "Miami",
      },
    },
    {
      id: "1e3d8f1b-0ed6-4e5e-9cc4-8f1c5a7b8f39",
      title: "HR Policy Announcement",
      start: "2024-11-27T15:00",
      end: "2024-11-27T16:00",
      backgroundColor: "#9C5E7F",
      status: "scheduled",
      extendedProps: {
        agenda: "Announcing updates to HR policies",
        participants: "Farzeen, Urjita Sangodkar, Faizan",
        room: "Hawai",
      },
    },
  ]);
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
      <h1 className="font-bold text-4xl mt-4 mb-3 ml-2">Booking Calendar</h1>
      <div className="w-full overflow-x-auto">
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
      </div>

      {/* Booking Modal */}
      {openBookingModal && (
        <Modal
          open={openBookingModal}
          onClose={() => setOpenBookingModal(false)}
        >
          <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold ml-4">Create Booking</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setOpenBookingModal(false)}
              className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md"
            >
              <IoMdClose />
            </motion.button>
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
          <BookingDetails
            handleModalClose={() => setOpenEventDetailsModal(false)}
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
