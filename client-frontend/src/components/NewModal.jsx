import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

export const NewModal = ({ open,  children, styles }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          width: "100%",
          height: "100%",
          maxWidth: "90%", // Prevents it from being too wide
          maxHeight: "90%", // Prevents it from being too tall
          overflow: "auto", // Adds scroll if the content overflows
          borderRadius: "8px",
        },
      }}
    >
      <DialogContent style={styles}  className="motion-preset-fade-sm">
        {children}
      </DialogContent>
    </Dialog>
  );
};
