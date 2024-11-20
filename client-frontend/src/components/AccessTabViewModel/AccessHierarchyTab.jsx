import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/features/modalSlice";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { MdOutlineExpandMore } from "react-icons/md";

const AccessHierarchyTab = () => {
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState({});
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  const modules = {
    HR: [
      "Attendance",
      "Leave Management",
      "Payroll",
      "Payslips",
      "Leaves",
      "Holidays",
      "SOPs",
      "Policies",
      "Task Management",
      "Performance",
      "Appraisals",
      "Templates",
      "e-Signs",
    ],
    Sales: [
      "Automated SEO",
      "Personalized SEMs",
      "Ad Networks",
      "Lead Generation",
      "Social Media",
      "Email Marketing",
      "Whatssapp Integration",
      "Live chats",
      "Refferals",
      "Blogs",
      "Vlogs",
    ],
    Finance: [
      "Invoices",
      "Cashflow",
      "Projections",
      "Budgets",
      "Working Capital",
      "Financial Reports",
      "Collections",
      "Notifications",
      "FollowUps",
      "Taxes",
      "Compliances",
      "Analytics",
    ],
    Marketing: [
      "Campaigns",
      "Analytics",
      "Social Media",
      "Email Marketing",
      "SMS Marketing",
      "Whatssapp Integration",
      "Live chat",
      "Refferals",
      "Blogs",
      "Vlogs",
    ],
    Frontend: [
      "Website",
      "Booking",
      "Mobile Site",
      "IOS App",
      "Android App",
      "Payment Gateway",
      "Customer Profile",
      "Notifications",
      "Chat",
      "Tickets",
      "Events",
      "Customer Service",
    ],
    "Finance & Accounting": [
      "Invoicing",
      "Cashflow",
      "Projections",
      "Budgets",
      "Working Capital",
      "Financial Reports",
      "Collections",
      "Notifications",
      "Follow Ups",
      "Taxes",
      "Compliances",
      "Analytics",
    ],
    "Customer Management Services": [
      "Ticket Raising",
      "Complaint Logs",
      "Meeting Rooms",
      "Cafe Orders",
      "Visitors",
      "Announcements",
      "Feedback",
      "Customer Ratings",
      "Customer Service",
      "Auto Responses",
      "Reports",
      "Analytics",
    ],
    "Reports and Analytics": [
      "Company Dashboard",
      "Company Trends",
      "Bussiness Trends",
      "Vendor Payouts",
      "Cashflow",
      "Key Notifications",
      "Full Data analysis",
      "Customer Reports",
      "Employee Reports",
      "Milesstone Reports",
      "Taxes Reports",
      "Customised Reports",
    ],
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  useEffect(() => {
    const initializeCheckedItems = () => {
      const initialState = {};

      for (const module in modules) {
        if (userData?.role === "Master Admin") {
          // Select all for Master Admin
          initialState[module] = {
            all: true,
            submodules: Object.fromEntries(
              modules[module].map((sub) => [sub, true])
            ),
          };
        } else if (userData?.role === "Super Admin") {
          // Select only Finance and Sales for Super Admin
          const isSelectedModule = module === "Finance" || module === "Sales";
          initialState[module] = {
            all: isSelectedModule,
            submodules: Object.fromEntries(
              modules[module].map((sub) => [sub, isSelectedModule])
            ),
          };
        } else {
          // Default: nothing selected
          initialState[module] = {
            all: false,
            submodules: Object.fromEntries(
              modules[module].map((sub) => [sub, false])
            ),
          };
        }
      }

      setCheckedItems(initialState);
    };

    if (userData) {
      initializeCheckedItems();
    }
  }, [userData]); // Run when userData changes

  const handleCheckboxChange = (module, submodule = null) => {
    setCheckedItems((prevState) => {
      const newState = { ...prevState };

      if (submodule) {
        // Update the specific submodule
        newState[module].submodules[submodule] =
          !newState[module].submodules[submodule];

        // Check if all submodules are now checked
        const allChecked = Object.values(newState[module].submodules).every(
          (isChecked) => isChecked
        );

        newState[module].all = allChecked;
      } else {
        // Update all submodules when "All" is toggled
        const allSelected = !newState[module].all;
        newState[module].all = allSelected;
        newState[module].submodules = Object.fromEntries(
          modules[module].map((sub) => [sub, allSelected])
        );
      }

      return newState;
    });
  };

  const handleSaveAccess = () => {
    dispatch(closeModal());
    toast.success("Access updated successfully");
  };

  const isAccessPage = location.pathname === "/access";

  return (
    <div className="mb-4">
      <>
        {Object.keys(modules).map((module) => (
          <Accordion key={module}>
            <AccordionSummary
              expandIcon={<MdOutlineExpandMore />}
              aria-controls={`${module}-content`}
              id={`${module}-header`}
            >
              <Typography>{module}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {/* All Checkbox */}
                <label className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    checked={checkedItems[module]?.all || false}
                    onChange={() => handleCheckboxChange(module)}
                    disabled={!isAccessPage} // Disable if not on access page
                  />
                  <Typography>Select All</Typography>
                </label>

                {/* Submodules Grid */}
                <Grid container spacing={2}>
                  {modules[module].map((submodule) => (
                    <Grid item xs={6} sm={4} md={3} key={submodule}>
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={
                            checkedItems[module]?.submodules[submodule] || false
                          }
                          onChange={() =>
                            handleCheckboxChange(module, submodule)
                          }
                          disabled={!isAccessPage} // Disable if not on access page
                        />
                        <Typography>{submodule}</Typography>
                      </label>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
        {isAccessPage && (
          <div className="flex items-center justify-center mt-8">
            <Button
              variant="contained"
              className="wono-blue-dark w-full"
              onClick={handleSaveAccess}
            >
              Save
            </Button>
          </div>
        )}
      </>
    </div>
  );
};

export default AccessHierarchyTab;
