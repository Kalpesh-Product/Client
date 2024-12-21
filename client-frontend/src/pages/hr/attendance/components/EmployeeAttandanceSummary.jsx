import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const EmployeeAttandanceSummary = () => {
  const [timeFilter, setTimeFilter] = useState("today");

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

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Employees Present */}
        <Card className="shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-2">
              Employees Present
            </Typography>
            <Typography variant="h3" className="text-green-500">
              {present}
            </Typography>
          </CardContent>
        </Card>

        {/* Employees Absent */}
        <Card className="shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-2">
              Employees Absent
            </Typography>
            <Typography variant="h3" className="text-red-500">
              {absent}
            </Typography>
          </CardContent>
        </Card>

        {/* Average Check-in Accuracy */}
        <Card className="shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-2">
              Average Check-in Accuracy
            </Typography>
            <Typography variant="h3" className="text-blue-500">
              {averageCheckin}%
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeAttandanceSummary;
