import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const ShiftTimeUseage = () => {
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
      <FormControl variant="outlined" size="small" className="w-48 mb-4 bg-white">
        <InputLabel id="time-filter-label">Filter</InputLabel>
        <Select
          labelId="time-filter-label"
          id="time-filter"
          label="Filter"
          value={timeFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
          <MenuItem value="annual">Annual</MenuItem>
        </Select>
      </FormControl>

      {/* ShiftTimeUseage Widgets */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 cursor-pointer" onClick={() => navigate("/hr/attandence/shift-time-usage")}>
        {/* Average Hours */}
        <Card className="shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-2">
              Average Hours
            </Typography>
            <Typography variant="h3" className="text-green-500">
              {averageHours}
            </Typography>
          </CardContent>
        </Card>

        {/* Average Break Time */}
        <Card className="shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-2">
              Average Break Time
            </Typography>
            <Typography variant="h3" className="text-orange-500">
              {averageBreakTime}
            </Typography>
          </CardContent>
        </Card>

        {/* Average Attendance */}
        <Card className="shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-2">
              Average Attendance
            </Typography>
            <Typography variant="h3" className="text-blue-500">
              {averageAttendance}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShiftTimeUseage;
