import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const UserCard = ({ user }) => {
  return (
    <>
    <Card sx={{ maxWidth: 400, margin: "1rem", padding: "1rem" }}>
      <CardContent>
        {/* Name and Role */}
        <Typography variant="h5" component="div" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Role: {user.role?.roleTitle || "N/A"}
        </Typography>

        {/* Department */}
        <Box mt={2}>
          <Typography variant="subtitle2">
            <strong>Department:</strong>{" "}
            {user.department.map((dept) => dept.name).join(", ") || "N/A"}
          </Typography>
        </Box>

        {/* Contact Details */}
        <Box mt={2}>
          <Typography variant="subtitle2">
            <strong>Email:</strong> {user.email || "N/A"}
          </Typography>
          <Typography variant="subtitle2">
            <strong>Phone:</strong> {user.phone || "N/A"}
          </Typography>
        </Box>

        {/* Reporting Manager */}
        <Box mt={2}>
          <Typography variant="subtitle2">
            <strong>Reports To:</strong>{" "}
            {user.reportsTo
              ? `${user.reportsTo.name} (${user.reportsTo.email})`
              : "N/A"}
          </Typography>
        </Box>

        {/* Work Details */}
        <Box mt={2}>
          <Typography variant="subtitle2">
            <strong>Work Location:</strong> {user.workLocation || "N/A"}
          </Typography>
          <Typography variant="subtitle2">
            <strong>Start Date:</strong>{" "}
            {new Date(user.startDate).toLocaleDateString() || "N/A"}
          </Typography>
          <Typography variant="subtitle2">
            <strong>Employee Type:</strong> {user.employeeType || "N/A"}
          </Typography>
          <Typography variant="subtitle2">
            <strong>Shift:</strong> {user.shift || "N/A"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
    </>
  );
};

export default UserCard;
