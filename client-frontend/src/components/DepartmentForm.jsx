import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { closeModal } from "../redux/features/modalSlice";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";

export default function DepartmentForm({formTitle}) {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState({
    name: "",
    description: "",
  });

  const { mutate } = useMutation({
    mutationFn: async function (data) {
      const response = await axios.post(
        "http://localhost:5000/departments/create-department",
        data
      );

      return response.data;
    },
    onSuccess: function () {
      dispatch(closeModal());
      toast.success("Successfully created Department");
    },
    onError: function (err) {
      toast.error(err.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(department);
    console.log("Department Details:", department);
    // Submit form logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-0 w-full max-w-md sm:max-w-lg mx-auto bg-white rounded"
    >
      <div className="flex justify-between mb-5">
      <h1 className="text-xl text-center my-2 font-bold w-full">{formTitle}</h1>
      <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => dispatch(closeModal())}
            className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md"
          >
            <IoMdClose />
          </motion.button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 sm:w-[450px] w-[300px]">
        <div className="col-span-1 sm:col-span-2 w-full">
          <TextField
            label="Department Name"
            name="name"
            value={department.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="w-full"
          />
        </div>

        <div className="col-span-1 sm:col-span-2 w-full">
          <TextField
            label="Description"
            name="description"
            value={department.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            className="w-full"
          />
        </div>

        <div className="col-span-1 sm:col-span-2 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="w-full py-2 px-4 wono-blue-dark hover:bg-[#3cbce7] text-white rounded mt-4"
          >
            Submit
          </motion.button>
         
        </div>
      </div>
    </form>
  );
}
