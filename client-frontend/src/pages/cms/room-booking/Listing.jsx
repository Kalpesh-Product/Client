import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useEffect } from "react";
import { rooms } from "../../../utils/Rooms";
import BookingForm from "./components/BookingForm";
import BookingDetails from "./components/BookingDetails";
import { format, addMinutes } from "date-fns";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { NewModal } from "../../../components/NewModal";

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
      backgroundColor: "#008000",
      status: "done",
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
      backgroundColor: "#3454D1",
      status: "new",
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
      backgroundColor: "#FFA500",
      status: "ongoing",
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
      backgroundColor: "#E71D36",
      status: "cancelled",
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
      backgroundColor: "#3454D1",
      status: "new",
      extendedProps: {
        agenda: "Announcing updates to HR policies",
        participants: "Farzeen, Urjita Sangodkar, Faizan",
        room: "Hawai",
      },
    },
    {
      id: "e7b6c8d4-88c4-4b53-ae9e-4b3d948392f1",
      title: "Marketing Brainstorming Session",
      start: "2024-11-12T09:00",
      end: "2024-11-12T10:30",
      backgroundColor: "#008000",
      status: "done",
      extendedProps: {
        agenda: "Generating ideas for the new marketing campaign",
        participants: "Kashif Shaikh, Hema Natalkar",
        room: "Madrid",
      },
    },
    {
      id: "f5c891d5-234b-4e9a-a746-09c4a1d76d53",
      title: "Team Lunch Discussion",
      start: "2024-11-20T12:00",
      end: "2024-11-20T13:00",
      backgroundColor: "#3454D1",
      status: "new",
      extendedProps: {
        agenda: "Team bonding and project status update",
        participants: "Abrar Shaikh, Faizan, Siddhi Vernekar",
        room: "Vatican",
      },
    },
    {
      id: "4a70d1e3-3f46-4728-b85f-75c3a3e4d2c8",
      title: "Year-End Budget Planning",
      start: "2024-11-29T11:30",
      end: "2024-11-29T13:00",
      backgroundColor: "#3454D1",
      status: "new",
      extendedProps: {
        agenda: "Discussing and finalizing the year-end budget",
        participants: "Allan Silveira, Kalpesh Naik, Narshiva Naik",
        room: "Sydney",
      },
    },
    {
      id: "afe5b12e-5bc7-4e14-a5b6-31cfa8b67a1d",
      title: "Product Demo to Clients",
      start: "2024-11-25T14:00",
      end: "2024-11-25T15:30",
      backgroundColor: "#FFA500",
      status: "ongoing",
      extendedProps: {
        agenda: "Presenting the new product features to clients",
        participants: "Kalpesh Naik, Abrar Shaikh",
        room: "Arambol",
      },
    },
    {
      id: "f92a3c51-32f5-4b2b-89f1-36b0cfae3f68",
      title: "Leadership Quarterly Review",
      start: "2024-11-28T10:00",
      end: "2024-11-28T12:00",
      backgroundColor: "#E71D36",
      status: "cancelled",
      extendedProps: {
        agenda: "High-level strategic planning and review",
        participants: "Faizan, Jill, Siddhi Vernekar",
        room: "Colosseum",
      },
    },
  ]);
  const [roomList, setRoomList] = useState(rooms);
  const [newMeeting, setNewMeeting] = useState({
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
    <section className="h-screen overflow-y-auto top-0 p-6">
      <h1 className="font-bold text-4xl mt-4 mb-3 ml-2">Booking Calendar</h1>
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
          events={events.map((event) => ({
            ...event,
            backgroundColor:
              event.status === "cancelled" ? "#E71D36" : event.backgroundColor,
          }))} // Apply red color for cancelled events
          timeZone="local"
        />
      </div>

      {/* Booking Modal */}
      {openBookingModal && (
        <NewModal
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
