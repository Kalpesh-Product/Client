import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

const FormStepper = ({ steps, children, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          {activeStep > 0 && ( // Render the Back button only if not on the first step
            <button
              onClick={handleBack}
              className="p-3 wono-blue-dark rounded-md text-white flex items-center gap-2">
              <IoMdArrowRoundBack />
              Back
            </button>
          )}
        </div>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ width: "100%" }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={handleClose}
            className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md">
            <IoMdClose />
          </motion.button>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        {children(activeStep, handleNext)}
      </div>
    </div>
  );
};

export default FormStepper;
