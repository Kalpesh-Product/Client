import { useState } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import { MdDelete } from "react-icons/md";

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Room Booking Confirmed",
    message:
      "Your room booking for 'Arambol' has been successfully scheduled. Access will be granted starting at 01:30 PM. Thank you for using our service!",
    time: "01:30 PM",
    date: "Today",
  },
  {
    id: 2,
    type: "info",
    title: "New Chat Message Received",
    message:
      "New message from Kalpesh Naik",
    time: "10:37 AM",
    date: "Today",
  },
  {
    id: 3,
    type: "error",
    title: "Support Ticket Submission Failed",
    message:
      "There was an issue submitting your support ticket. Please verify your input details and try again. Contact support if the issue persists.",
    time: "04:10 AM",
    date: "Today",
  },
  {
    id: 4,
    type: "warning",
    title: "Pending Room Booking Expiry",
    message:
      "Your room booking for 'Baga' is set to expire in 3 days. Please confirm if you need to extend or modify the booking.",
    time: "Yesterday",
    date: "Yesterday",
  },
];

const NotificationsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filterNotifications = (date) => {
    return notifications.filter((notification) => notification.date === date);
  };

  const tabs = [
    { label: "Today", date: "Today" },
    { label: "Past", date: "Yesterday" },
  ];

  return (
    <main className="w-full h-full py-4">
      <h1 className="text-2xl font-bold mb-6">All Notifications</h1>
      <Box className="bg-white p-4 rounded-md shadow">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
        <Box className="mt-4">
          {filterNotifications(tabs[selectedTab].date).length > 0 ? (
            filterNotifications(tabs[selectedTab].date).map((notification) => (
              <Box
                key={notification.id}
                className="p-4 rounded-lg shadow-md mb-4 bg-gray-50 border border-gray-200"
              >
                <Box className="flex justify-between items-center">
                  <p className="font-medium text-lg">{notification.title}</p>
                  <span className="text-sm text-gray-600">
                    {notification.time}
                  </span>
                </Box>
                <p className="text-gray-700 mt-1">{notification.message}</p>
                <Box className="flex justify-end mt-2 gap-1">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className="mr-2"
                  >
                    Acknowledge
                  </Button>
                  <Button variant="contained" color="error" size="small">
                    <MdDelete size={20} />
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <p className="text-gray-600">
              No notifications for {tabs[selectedTab].label.toLowerCase()}.
            </p>
          )}
        </Box>
      </Box>
    </main>
  );
};

export default NotificationsPage;
