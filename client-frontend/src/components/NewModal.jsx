import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

export const NewModal = ({ open,  children }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          width: "auto",
          height: "auto",
          maxWidth: "90%", // Prevents it from being too wide
          maxHeight: "90%", // Prevents it from being too tall
          overflow: "auto", // Adds scroll if the content overflows
          borderRadius: "8px",
        },
      }}
    >
      <DialogContent className="motion-preset-fade-sm">{children}</DialogContent>
    </Dialog>
  );
};
