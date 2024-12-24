import React, { useState } from "react";
import BasicCardCount from "../../../../components/Cards/BasicCardCount";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const EmployeeAttendanceSummary = () => {
  const [timeFilter, setTimeFilter] = useState("today");
  const navigate = useNavigate();

  // Mock data for demonstration
  const mockData = {
    today: {
      present: 35,
      absent: 5,
      averageCheckin: 90,
    },
    month: {
      present: 150,
      absent: 20,
      averageCheckin: 92,
    },
    annual: {
      present: 400,
      absent: 200,
      averageCheckin: 88,
    },
  };

  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const { present, absent, averageCheckin } = mockData[timeFilter];

  return (
    <div className="p-4 flex flex-col gap-2">
      {/* Dropdown Filter */}
      <FormControl
        size="small"
        className="w-56 mb-4 bg-white self-end"
      >
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

      {/* Dashboard Widgets */}
      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-3 cursor-pointer"
        onClick={() => navigate("/hr/attandence/shift-time-usage")}
      >
        {/* Employees Present */}
        <BasicCardCount
          title="Employees Present"
          data={present}
          theme="white"
          subText="Total present today"
          onClick={() => navigate("/hr/attendance/details/present")}
        />

        {/* Employees Absent */}
        <BasicCardCount
          title="Employees Absent"
          data={absent}
          theme="white"
          subText="Total absent today"
          onClick={() => navigate("/hr/attendance/details/absent")}
        />

        {/* Average Check-in Accuracy */}
        <BasicCardCount
          title="Average Check-in Accuracy"
          data={`${averageCheckin}%`}
          theme="white"
          onClick={() => navigate("/hr/attendance/details/checkin-accuracy")}
        />
      </div>
    </div>
  );
};

export default EmployeeAttendanceSummary;
