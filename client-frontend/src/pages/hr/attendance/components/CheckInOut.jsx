import React, { useState } from 'react';
import BasicCardCount from '../../../../components/Cards/BasicCardCount';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

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
      <FormControl variant="outlined" size="small" className="w-56 mb-4 bg-white self-end">
        <Select
          labelId="time-filter-label"
          id="time-filter"
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
        <BasicCardCount
          title="Late Check-ins"
          data={lateCheckins}
          theme="white"
          dataStyling={"text-3xl font-bold"}
          subText="Number of late check-ins"
          titleSize="text-2xl"
        />

        {/* Early Checkouts */}
        <BasicCardCount
          title="Early Checkouts"
          data={earlyCheckouts}
          theme="white"
          dataStyling={"text-3xl font-bold"}
          subText="Number of early checkouts"
          titleSize="text-2xl"
        />

        {/* Late Checkouts */}
        <BasicCardCount
          title="Late Checkouts"
          data={lateCheckouts}
          theme="white"
          dataStyling={"text-3xl font-bold"}
          subText="Number of late checkouts"
          titleSize="text-2xl"
        />
      </div>
    </div>
  );
};

export default CheckInOutData;
