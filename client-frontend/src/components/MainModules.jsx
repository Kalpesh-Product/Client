import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  visitorCM,
  meetingRoomsCM,
  ticketRaisingCM,
  chatSaas,
  taskManagementHR,
  financialReportsFA,
} from "../assets/WONO_images/img/icon_service_color";

export default function MainModules({ closePopover }) {
  return (
    <article>
      <h2 className="text-center font-bold text-xl">Main modules</h2>
      <div
        className="grid grid-cols-3 gap-6 p-4 cursor-pointer"
        onClick={closePopover}
      >
        <Link to={"/hr"}>
          <div className="flex flex-col items-center">
            <img
              src={visitorCM}
              alt="Visitor Management"
              className="w-14 h-14 mb-2"
            />
            <span className="text-center text-sm font-medium">HR</span>
          </div>
        </Link>
        <Link to={"/meetings"}>
          <div className="flex flex-col items-center">
            <img
              src={meetingRoomsCM}
              alt="Meeting Rooms"
              className="w-14 h-14 mb-2"
            />
            <span className="text-center text-sm font-medium">Meetings</span>
          </div>
        </Link>
        <Link to={"/finance"}>
          <div className="flex flex-col items-center">
            <img
              src={financialReportsFA}
              alt="finance"
              className="w-14 h-14 mb-2"
            />
            <span className="text-center text-sm font-medium">Finance</span>
          </div>
        </Link>
        <Link to={"/tickets"}>
          <div className="flex flex-col items-center">
            <img
              src={ticketRaisingCM}
              alt="Ticket Raising"
              className="w-14 h-14 mb-2"
            />
            <span className="text-center text-sm font-medium">Tickets</span>
          </div>
        </Link>
        <Link to={"/chat"}>
          <div className="flex flex-col items-center">
            <img src={chatSaas} alt="Chat Saas" className="w-14 h-14 mb-2" />
            <span className="text-center text-sm font-medium">Chat</span>
          </div>
        </Link>
        <Link to={"/tasks"}>
          <div className="flex flex-col items-center">
            <img
              src={taskManagementHR}
              alt="Task Management"
              className="w-14 h-14 mb-2"
            />
            <span className="text-center text-sm font-medium">Tasks</span>
          </div>
        </Link>
      </div>
      <span className="w-full flex items-center justify-center">
        <Link
          className="text-blue-600 font-bold"
          onClick={closePopover}
          to={"/"}
        >
          All modules
        </Link>
      </span>
    </article>
  );
}
