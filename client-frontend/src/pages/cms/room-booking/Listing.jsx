import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "../../../components/Modal";
import { useState } from "react";
import getCurrentTimePlus30Minutes from "../../../utils/plusHalfAnHour";

export default function Listing() {
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [timePlus30, setTimePlus30] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const handleDateClick = (e) => {
    const now = new Date();

    // Format the current time in local timezone
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    });

    // Update states
    setCurrentTime(formattedTime);
    setTimePlus30(getCurrentTimePlus30Minutes(now));
    setCurrentDate(e.dateStr);

    setOpen(true);
  };

  return (
    <section className="h-screen overflow-y-auto top-0">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <h1 className="text-2xl font-bold">Create Booking</h1>
          <form className="space-y-4">
            {/* Start Time */}
            <div>
              <label htmlFor="start-time" className="block text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                id="start-time"
                value={currentTime}
                readOnly
                className="w-full py-2 px-2 text-gray-900 bg-transparent border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/* End Time */}
            <div>
              <label htmlFor="end-time" className="block text-gray-700">
                End Time
              </label>
              <input
                type="time"
                id="end-time"
                value={timePlus30}
                readOnly
                className="w-full py-2 px-2 text-gray-900 bg-transparent border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date-input" className="block text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date-input"
                value={currentDate}
                readOnly
                className="w-full py-2 px-2 text-gray-900 bg-transparent border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}
