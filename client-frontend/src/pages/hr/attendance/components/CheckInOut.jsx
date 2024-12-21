import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

const CheckInOutData = () => {
  const [timeFilter, setTimeFilter] = useState('today');

  // Mock data for demonstration
  const mockData = {
    today: {
      lateCheckins: 5,
      earlyCheckouts: 3,
      lateCheckouts: 2,
    },
    month: {
      lateCheckins: 30,
      earlyCheckouts: 15,
      lateCheckouts: 12,
    },
    annual: {
      lateCheckins: 200,
      earlyCheckouts: 90,
      lateCheckouts: 70,
    },
  };

  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const { lateCheckins, earlyCheckouts, lateCheckouts } = mockData[timeFilter];

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

      {/* CheckInOutData Widgets */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Late Check-ins */}
        <Card className="shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-2">
              Late Check-ins
            </Typography>
            <Typography variant="h3" className="text-yellow-500">
              {lateCheckins}
            </Typography>
          </CardContent>
        </Card>

        {/* Early Checkouts */}
        <Card className="shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-2">
              Early Checkouts
            </Typography>
            <Typography variant="h3" className="text-red-500">
              {earlyCheckouts}
            </Typography>
          </CardContent>
        </Card>

        {/* Late Checkouts */}
        <Card className="shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-2">
              Late Checkouts
            </Typography>
            <Typography variant="h3" className="text-blue-500">
              {lateCheckouts}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckInOutData;
