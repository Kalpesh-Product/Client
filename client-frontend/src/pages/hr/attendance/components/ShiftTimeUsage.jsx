import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicCardCount from "../../../../components/Cards/BasicCardCount";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ShiftTimeUsage = () => {
  const [timeFilter, setTimeFilter] = useState("today");
  const navigate = useNavigate();

  // Mock data for demonstration
  const mockData = {
    today: {
      averageHours: 6,
      averageBreakTime: "30 mins",
      averageAttendance: "85%",
    },
    month: {
      averageHours: 7.5,
      averageBreakTime: "45 mins",
      averageAttendance: "90%",
    },
    annual: {
      averageHours: 8,
      averageBreakTime: "1 hr",
      averageAttendance: "88%",
    },
  };

  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const { averageHours, averageBreakTime, averageAttendance } =
    mockData[timeFilter];

  return (
    <div className="p-4 flex flex-col gap-2">
      {/* Dropdown Filter */}
      <FormControl size="small" className="w-56 mb-4 bg-white self-end">
        <Select
          labelId="time-filter-label"
          id="time-filter"
          value={timeFilter}
          onChange={handleFilterChange}
          displayEmpty
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
          <MenuItem value="annual">Annual</MenuItem>
        </Select>
      </FormControl>

      {/* ShiftTimeUsage Widgets */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 cursor-pointer">
        {/* Average Hours */}
        <BasicCardCount
          title="Average Hours"
          data={averageHours}
          theme="white"
          dataStyling={"text-3xl font-bold"}
          subText="Hours worked on average"
          onClick={() => navigate("/hr/attendance/details/average-hours")}
        />

        {/* Average Break Time */}
        <BasicCardCount
          title="Average Break Time"
          data={averageBreakTime}
          theme="white"
          subText="Break time on average"
          dataStyling={"text-3xl font-bold"}
          onClick={() => navigate("/hr/attendance/details/average-break-time")}
        />

        {/* Average Attendance */}
        <BasicCardCount
          title="Average Attendance"
          data={averageAttendance}
          theme="white"
          dataStyling={"text-3xl font-bold"}
          subText="Attendance percentage"
          onClick={() => navigate("/hr/attendance/details/average-attendance")}
        />
      </div>
    </div>
  );
};

export default ShiftTimeUsage;
