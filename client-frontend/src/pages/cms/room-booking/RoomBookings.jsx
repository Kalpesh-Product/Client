import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TestSide from "../../../components/Sidetest";
import { WidgetSection } from "../../Dashboard";
import useAuth from "../../../hooks/useAuth";
import RoomBookingDash from "./RoomBookingDash";
import Listing from "./Listing";
import AddRooms from "./AddRooms";
import BookingReports from "./BookingReports";

const RoomBookings = () => {
  const { auth: authUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen  flex-1 w-full">
      <div>
        
      </div>
      <div className="w-full h-screen overflow-auto">
        {location.pathname === "/meetings" ? (
          <div className="w-full">
            <RoomBookingDash />
          </div>
        ) : location.pathname === "/meetings/booking" ? (
            <Listing />
        ) : location.pathname === "/meetings/add-room" ? (
            <AddRooms />
        ) : location.pathname === "/meetings/reports" ? (
            <BookingReports />
        ) : (
          <>
            <h1>Coming Soon</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default RoomBookings;
