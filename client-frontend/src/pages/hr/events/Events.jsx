import React, { useState } from "react";
import AgTable from "../../../components/AgTable";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
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

const Events = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    Title: "",
    Date: dayjs(),
    Time: null,
    Participants: "",
    Agenda: "",
  });

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleDateChange = (field, Date) => {
    setFormData((prev) => ({ ...prev, [field]: Date }));
  };

  const handleTimeChange = (field, Time) => {
    setFormData({ ...formData, [field]: Time });
  };

  const handleNextStep = (e, handleNext) => {
    e.preventDefault();
    handleNext();
    // const formattedData = {
    //   ...formData,
    //   Date: formData.Date ? format(formData.Date, "yyyy-MM-dd") : "",
    //   Time: formData.Time ? format(formData.Time, "HH:mm") : "",
    // };
  };

  const handleAddTicket = () => {
    toast.success("Event is Added Successfully");
    setIsModalOpen(false);
  };

  const steps = ["Add Events", "Verify Events"];

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "Title", headerName: "Event Title", width: 200 },
    { field: "Date", headerName: "Date", width: 100 },
    { field: "Time", headerName: "Time", width: 200 },
    { field: "Participants", headerName: "Participants", width: 100 },
    { field: "Agenda", headerName: "Agenda", width: 200 },
  ];

  const allRows = [
    {
      id: 1,
      Title: "Conference Meeting",
      Date: "2024-10-26",
      Time: "2:00:00",
      Participants: "Anushri Shreya",
      Agenda: "lorem bhbdhb",
    },
    {
      id: 2,
      Title: "Conference Meeting",
      Date: "2024-10-26",
      Time: "2:00:00",
      Participants: "Anushri Shreya",
      Agenda: "lorem bhbdhb",
    },
    {
      id: 3,
      Title: "Conference Meeting",
      Date: "2024-10-26",
      Time: "2:00:00",
      Participants: "Anushri Shreya",
      Agenda: "lorem bhbdhb",
    },
    {
      id: 4,
      Title: "Conference Meeting",
      Date: "2024-10-26",
      Time: "2:00:00",
      Participants: "Anushri Shreya",
      Agenda: "lorem bhbdhb",
    },
    {
      id: 5,
      Title: "Conference Meeting",
      Date: "2024-10-26",
      Time: "2:00:00",
      Participants: "Anushri Shreya",
      Agenda: "lorem bhbdhb",
    },
    {
      id: 6,
      Title: "Conference Meeting",
      Date: "2024-10-26",
      Time: "2:00:00",
      Participants: "Anushri Shreya",
      Agenda: "lorem bhbdhb",
    },
    {
      id: 7,
      Title: "Conference Meeting",
      Date: "2024-10-26",
      Time: "2:00:00",
      Participants: "Anushri Shreya",
      Agenda: "lorem bhbdhb",
    },
    {
      id: 8,
      Title: "Conference Meeting",
      Date: "2024-10-26",
      Time: "2:00:00",
      Participants: "Anushri Shreya",
      Agenda: "lorem bhbdhb",
    },
    {
      id: 9,
      Title: "Conference Meeting",
      Date: "2024-10-26",
      Time: "2:00:00",
      Participants: "Anushri Shreya",
      Agenda: "lorem bhbdhb",
    },
    {
      id: 10,
      Title: "Conference Meeting",
      Date: "2024-10-26",
      Time: "2:00:00",
      Participants: "Anushri Shreya",
      Agenda: "lorem bhbdhb",
    },
  ];
  return (
    <>
      <div className="w-[72vw] md:w-full transition-all duration-200 ease-in-out bg-white p-2 rounded-md">
        <div className="flex gap-4 mb-4 justify-between">
          <div></div>
          <div className="flex">
            <div className="mb-2 flex justify-between">
              <h1 className="text-3xl"></h1>
              <button
                onClick={openModal}
                className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
              >
                + Add Events
              </button>
            </div>
          </div>
        </div>
        <AgTable
          data={allRows}
          // Use the state here
          columns={columns}
          // Bind the state here
        />
        <NewModal open={isModalOpen} onClose={closeModal}>
          <>
            <FormStepper
              steps={steps}
              handleClose={closeModal}
              children={(activeStep, handleNext) => {
                if (activeStep === 0) {
                  return (
                    <>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="bg-white  w-[31vw] rounded-lg z-10 relative overflow-y-auto max-h-[80vh]">
                          {/* Modal Content */}

                          {/* Modal Header */}

                          {/* Modal Body START */}
                          <div className=" w-full">
                            {/* <div>AddT icket Form</div> */}
                            <div className="">
                              <div className=" mx-auto">
                                {/* <h1 className="text-xl text-center my-2 font-bold">
                    Add Ticket
                  </h1> */}

                                <Box
                                  sx={{
                                    maxWidth: 600,
                                    paddingY: 3,
                                    bgcolor: "background.paper",
                                    borderRadius: 2,
                                  }}
                                  // className="bg-white p-6 rounded-lg shadow-md mx-auto">
                                  className="bg-white py-6 rounded-lg"
                                >
                                  {/* Personal Information */}
                                  {/* <h2 className="text-lg font-semibold mb-4">Add Ticket</h2> */}
                                  <div className="grid grid-cols-1 gap-4">
                                    {/* Name, Mobile, Email, DOB fields */}

                                    <div className="grid grid-cols-1 gap-4">
                                      <TextField
                                        label="Event Name"
                                        value={formData.Title}
                                        onChange={handleChange("Title")}
                                        fullWidth
                                      />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                      <FormControl fullWidth>
                                        {/* <InputLabel id="suggestion-select-label">
                                      Ticket Title
                                    </InputLabel> */}
                                        {/* <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      > */}
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DesktopDatePicker
                                            label="Date"
                                            // value={
                                            //   formData.Date ? dayjs(formData.Date) : null
                                            // }
                                            value={formData.Date}
                                            sx={{ width: "100%" }}
                                            // inputFormat="MM/DD/YYYY"
                                            // onChange={(newValue) => {
                                            //   if (newValue) {
                                            //     const isoDate = dayjs(newValue).toISOString();
                                            //     handleDateChange(isoDate); // Update with ISO format
                                            //   }
                                            // }}
                                            onChange={(newValue) => {
                                              handleDateChange(
                                                "Date",
                                                newValue
                                              );
                                            }}
                                            // Convert string to Dayjs
                                            // onChange={(newDate) => {
                                            //   if (newDate) {
                                            //     const formattedDate = newDate.format("YYYY-MM-DD"); // Format date
                                            //      // Store as string
                                            //   }
                                            // }}
                                            // format="DD/MM/YYYY" // Display format in the DatePicker
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                className="w-full"
                                              />
                                            )}
                                          />

                                          {/* <DesktopDatePicker
                                                              label="Start Date"
                                                              inputFormat="MM/DD/YYYY"
                                                              value={
                                                                formData.startDate ? dayjs(formData.startDate) : null
                                                              }
                                                              onChange={(newValue) => {
                                                                if (newValue) {
                                                                  const isoDate = dayjs(newValue).toISOString();
                                                                  handleChange("startDate", isoDate); // Update with ISO format
                                                                }
                                                              }}
                                                              renderInput={(params) => (
                                                                <TextField {...params} fullWidth required />
                                                              )}
                                                            /> */}

                                          <br></br>
                                          <TimePicker
                                            label="Time"
                                            value={formData.Time}
                                            // onChange={handleTimeChange}
                                            onChange={(newValue) => {
                                              handleTimeChange(
                                                "Time",
                                                newValue
                                              );
                                            }}
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                fullWidth
                                                margin="normal"
                                              />
                                            )}
                                          />
                                        </LocalizationProvider>

                                        {/* </LocalizationProvider> */}
                                        <TextField
                                          label="Agenda"
                                          variant="outlined"
                                          fullWidth
                                          margin="normal"
                                          multiline
                                          rows={4}
                                          value={formData.Agenda}
                                          onChange={handleChange("Agenda")}
                                        />
                                      </FormControl>
                                    </div>
                                  </div>
                                </Box>
                              </div>
                            </div>
                          </div>
                          {/* Modal Body END */}

                          {/* Modal Footer */}

                          <div className="sticky bottom-0 bg-white py-6 z-20 flex justify-center">
                            <div className="flex justify-center items-center w-full">
                              <button
                                className="wono-blue-dark text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                                onClick={(e) => handleNextStep(e, handleNext)}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                          {/* Close button */}
                        </div>
                      </LocalizationProvider>
                    </>
                  );
                } else if (activeStep === 1) {
                  return (
                    <>
                      <div className="p-6">
                        <h1 className="text-2xl mb-4 py-3 font-semibold text-center">
                          Are the provided details correct ?
                        </h1>
                        <div>
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Event Title</h1>
                            <span>{formData.Title}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Date</h1>
                            <span>{formData.Date.format("YYYY-MM-DD")}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Time</h1>
                            <span>
                              {formData.Time
                                ? formData.Time.format("HH:mm") // Using dayjs for formatting
                                : "No time selected"}
                            </span>
                          </div>
                        </div>
                        {/* <div>
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Participants</h1>
                            <span>{formData.Participants}</span>
                          </div>
                        </div> */}
                        <div>
                          <div className="flex justify-between py-2 border-b">
                            <h1 className="font-semibold">Agenda</h1>
                            <span>{formData.Agenda}</span>
                          </div>
                        </div>

                        <div className="pt-8 pb-4">
                          {/* <p>details</p> */}

                          <WonoButton
                            content={"Submit"}
                            onClick={handleAddTicket}
                          />
                        </div>
                      </div>
                    </>
                  );
                }
              }}
            />
          </>
        </NewModal>
      </div>
    </>
  );
};

export default Events;
