import React from "react";
import { Link } from "react-router-dom";

const TestLink = () => {
  return (
    <>
      <ul className="bg-blue-500">
        <li>
          <Link to="/ticket-dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/add-ticket">Add Ticket</Link>
        </li>
        <li>
          <Link to="/view-tickets">View Tickets</Link>
        </li>
        <li>
          <Link to="/ticket-reports">Reports</Link>
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </>
  );
};

export default TestLink;
