import React, { useState } from "react";
import AgTable from "../../../components/AgTable";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { NewModal } from "../../../components/NewModal";
import FormStepper from "../../../components/FormStepper";
import WonoButton from "../../../components/Buttons/WonoButton";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import dayjs from "dayjs";
import { toast } from "sonner";
import axios from "axios";

const Events = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    start: null,
    end: null,
    description: "",
    type: "event",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (field, date) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleTimeChange = (field, time) => {
    setFormData({ ...formData, [field]: time });
  };

  const handleNextStep = (e, handleNext) => {
    e.preventDefault();
    handleNext();
  };

  const [allRows, setAllRows] = useState([
    {
      id: 1,
      Title: "Conference Meeting",
      Date: "2024-10-26",
      Agenda: "lorem bhbdhb",
    },
    // Additional rows omitted for brevity
  ]);

  const handleAddTicket = async (newTicket, formData) => {
    setAllRows((prevRows) => [newTicket, ...prevRows]);
    toast.success("Event is Added Successfully");
    setIsModalOpen(false);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events/create-event",
        formData
      );
      alert(response.data.message);
      toast.success("Added a new event to the database.");
    } catch (error) {
      console.log("Error Saving Event", error);
      toast.error("Event could not be saved");
    }
  };

  const steps = ["Add Events", "Verify Events"];

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "Title", headerName: "Event Title", width: 200 },
    { field: "Date", headerName: "Date", width: 100 },
    { field: "Agenda", headerName: "Agenda", width: 200 },
  ];

  const newTicket = {
    id: allRows.length + 1,
    Title: formData.title,
    Date: formData.start,
    Agenda: formData.description,
  };

  return (
    <>
      <div className="w-[72vw] md:w-full transition-all duration-200 ease-in-out p-0 rounded-md">
        <div className="flex gap-4 mb-4 justify-between">
          <div></div>
          <div className="flex">
            <div className="mb-2 flex justify-between">
              <button
                onClick={openModal}
                className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
              >
                + Add Events
              </button>
            </div>
          </div>
        </div>
        <AgTable data={allRows} columns={columns} />
        <NewModal open={isModalOpen} onClose={closeModal}>
          <FormStepper
            steps={steps}
            handleClose={closeModal}
            children={(activeStep, handleNext) => {
              if (activeStep === 0) {
                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="bg-white w-[31vw] rounded-lg relative overflow-y-auto max-h-[80vh]">
                      <Box
                        sx={{
                          maxWidth: 600,
                          paddingY: 3,
                          bgcolor: "background.paper",
                          borderRadius: 2,
                        }}
                        className="bg-white py-6 rounded-lg"
                      >
                        <div className="grid grid-cols-1 gap-4">
                          <TextField
                            label="Event Name"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            fullWidth
                          />
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                              label="Date"
                              value={formData.start}
                              onChange={(newValue) => handleDateChange("start", newValue)}
                              renderInput={(params) => <TextField {...params} className="w-full" />}
                            />
                            <TimePicker
                              label="Time"
                              value={formData.Time}
                              onChange={(newValue) => handleTimeChange("Time", newValue)}
                              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                            />
                          </LocalizationProvider>
                          <TextField
                            label="Agenda"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                          />
                        </div>
                      </Box>
                      <div className="sticky bottom-0 bg-white py-6 z-20 flex justify-center">
                        <button
                          className="wono-blue-dark text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                          onClick={(e) => handleNextStep(e, handleNext)}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </LocalizationProvider>
                );
              } else if (activeStep === 1) {
                return (
                  <div className="p-6">
                    <h1 className="text-2xl mb-4 py-3 font-semibold text-center">
                      Are the provided details correct ?
                    </h1>
                    <div className="flex justify-between py-2 border-b">
                      <h1 className="font-semibold">Event Title</h1>
                      <span>{formData.title}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <h1 className="font-semibold">Date</h1>
                      <span>{formData.start ? dayjs(formData.start).format("YYYY-MM-DD") : ""}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <h1 className="font-semibold">Agenda</h1>
                      <span>{formData.description}</span>
                    </div>
                    <div className="pt-8 pb-4">
                      <WonoButton
                        content={"Submit"}
                        onClick={() => handleAddTicket(newTicket, formData)}
                      />
                    </div>
                  </div>
                );
              }
            }}
          />
        </NewModal>
      </div>
    </>
  );
};

export default Events;
