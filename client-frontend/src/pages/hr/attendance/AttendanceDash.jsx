import React from "react";
import ClockInOut from "./components/ClockInOut";
import MonthlyDetailsWidget from "./components/MonthlyDetails";
import AttendanceRateWidget from "./components/AttendanceRate";
import EmployeeAttendance from "./components/EmployeeAttendance";
import ShiftScheduleWidget from "./components/ShiftScheduleWidget ";
import MonthlyAttendanceOverviewWidget from "./components/MonthlyAttendanceOverviewWidget ";
import EmployeeAttandanceSummary from "./components/EmployeeAttandanceSummary";
import CheckInOutData from "./components/CheckInOut";
import ShiftTimeUseage from "./components/ShiftTimeUsage";

const AttendanceDash = () => {
  // Dummy Monthly Details Data
  const monthlyDetails = {
    totalHours: 160, // Example: 160 hours worked this month
    lateCheckIns: 5, // Example: 5 late check-ins this month
    avgBreakTime: 30, // Example: 30 minutes average break time
  };

  const monthlyOverview = {
    totalDays: 30,
    daysPresent: 28,
    attendanceRate: 95,
  };

  // Mock Data for the widget
  const employeeData = {
    summary: {
      onTime: 15,
      late: 5,
      absent: 2,
    },
    employees: [
      {
        name: "Alice Johnson",
        status: "On Time",
        checkIn: "9:00 AM",
        checkOut: "5:00 PM",
      },
      {
        name: "Bob Smith",
        status: "Late",
        checkIn: "9:15 AM",
        checkOut: "5:00 PM",
      },
      { name: "Charlie Brown", status: "Absent", checkIn: "-", checkOut: "-" },
      {
        name: "David Lee",
        status: "On Time",
        checkIn: "9:00 AM",
        checkOut: "5:00 PM",
      },
    ],
  };

  // Mock Shift Schedule Data
  const shiftSchedule = {
    Monday: {
      shift: "9:00 AM - 5:00 PM",
      employees: ["Alice Johnson", "Bob Smith", "Charlie Brown"],
    },
    Tuesday: {
      shift: "10:00 AM - 6:00 PM",
      employees: ["David Lee", "Emma Davis", "Fiona Clarke"],
    },
    Wednesday: {
      shift: "11:00 AM - 7:00 PM",
      employees: ["George Wilson", "Helen Carter", "Ian Thomas"],
    },
    Thursday: {
      shift: "9:00 AM - 5:00 PM",
      employees: ["Jack Miller", "Katherine Taylor", "Liam Harris"],
    },
    Friday: {
      shift: "10:00 AM - 6:00 PM",
      employees: ["Mia Brown", "Noah Anderson", "Olivia Johnson"],
    },
    Saturday: {
      shift: "10:00 AM - 6:00 PM",
      employees: ["Mia Brown", "Noah Anderson", "Olivia Johnson"],
    },
  };

  return (
    <div className="py-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Attendance Dashboard
        </h1>
        <ClockInOut />
        <EmployeeAttandanceSummary />
        <CheckInOutData />
        <ShiftTimeUseage />
      </div>
    </div>
  );
};

export default AttendanceDash;
