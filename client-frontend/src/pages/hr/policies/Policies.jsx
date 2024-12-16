import React, { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PdfViewer from "../sops/PdfViewer";
import PdfViewer2 from "../sops/PdfViewer2";

import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { NewModal } from "../../../components/NewModal";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Policies = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [uploadProfileImage, setUploadProfileImage] = useState(false);
  return (
    <div>
      {/* <div>SOPs</div> */}
      <div>
        <div className="flex w-full bg-white p-4 rounded-lg">
          <div className="mb-2 flex justify-between   w-full">
            <div className="">
              <h1 className="text-3xl">&nbsp;</h1>
            </div>
            <div className="">
              <button
                // onClick={openModal}
                onClick={() => setUploadProfileImage(true)}
                className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
                + Add Policy
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <TabContext value={value} sx={{ backgroundColor: "red" }}>
            <Box
              sx={{
                borderBottom: 0,
                borderColor: "divider",
                width: "100%",
              }}>
              <TabList
                onChange={handleChange}
                aria-label="Departments"
                variant="fullWidth"
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  fontFamily: "Popins-Semibold",
                  padding: "0.5rem",
                }}>
                <Tab
                  label="SOP - Saturday Work From Home"
                  value="1"
                  sx={{
                    textTransform: "uppercase",
                    borderRight: "1px solid #e4e4e4",
                  }}
                />
                <Tab
                  label="Test PDF"
                  value="2"
                  sx={{
                    textTransform: "uppercase",
                    borderRight: "1px solid #e4e4e4",
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1" className="p-2">
              <div className="flex justify-center items-center ">
                <div className=" w-50 border border-black">
                  <PdfViewer />
                </div>
              </div>
            </TabPanel>

            <TabPanel value="2">
              {" "}
              <div className="flex justify-center items-center ">
                <div className=" w-50 border border-black">
                  <PdfViewer2 />
                </div>
              </div>
            </TabPanel>

            {/* <TabPanel value="3">3</TabPanel>

          <TabPanel value="4">4</TabPanel>

          <TabPanel value="5" className="" sx={{ padding: "0.5rem" }}>
            5
          </TabPanel>

          <TabPanel value="6">6</TabPanel> */}
          </TabContext>
        </div>
      </div>

      {/* Modal for Image Upload */}

      {uploadProfileImage && (
        <NewModal
          open={uploadProfileImage}
          onClose={() => setUploadProfileImage(false)}>
          <div className="bg-white p-6 rounded-lg w-80">
            <div className="flex justify-between pb-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Upload Policy</h3>
              </div>
              <div>
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setUploadProfileImage(false)}
                  className=" p-2 bg-white text-[red] border border-red-200 hover:border-red-400 text-2xl rounded-md mr-1">
                  <IoMdClose />
                </motion.button>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              // onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            />
            <button
              onClick={() => setUploadProfileImage(false)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Save
            </button>
          </div>
        </NewModal>
      )}
    </div>
  );
};

export default Policies;