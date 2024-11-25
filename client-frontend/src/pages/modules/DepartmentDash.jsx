import React, { useEffect, useState } from "react";
import ModuleSidebar from "../../components/ModuleSidebar";
import { useLocation, useParams } from "react-router-dom";
import TestSide from "../../components/Sidetest";
import {
  ActiveTickets,
  CriticalAlerts,
  PendingTasks,
  ResolvedIssues,
  ServerUptime,
} from "../../Widgets/TechWidgets";
import DoughnutChart from "../../Widgets/DoughnutGraph";
import { WidgetSection } from "../Dashboard";
import {
  AttendanceRate,
  EmployeeCount,
  LeaveRequests,
  NewHires,
  PayrollSummary,
} from "../../Widgets/HR/WidgetsHR";
import RevenueVsExpensesWidget from "../../Widgets/RevenueVsExpensesWidget";
import ProgressDoughnutWidget from "../../Widgets/ProgressDoughnutWidget";
import BarGraphWidget from "../../Widgets/BarGraphWidget";
import {
  RecurringClients,
  SalesByMonthGraph,
  SalesDistributionGraph,
  SalesProgress,
  SalesTarget,
  SalesTrendGraph,
} from "../../Widgets/SalesWidgets";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import {
  NetworkIssuesResolved,
  PCFixes,
  PCFixesLineGraph,
  PCFixesPending,
  PCFixesProgress,
  WiFiConfiguration,
  WiFiTraffic,
} from "../../Widgets/ITWidgets";
import {
  AssetAllocationWidget,
  AssetsAssigned,
  AssetsCount,
  AssetsInRepair,
  MaintenanceRequests,
  NewAssetsAdded,
  QuantityRemainingWidget,
} from "../../Widgets/CMS/customerServiceWidgets";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../redux/features/modalSlice";
import AddAssetForm from "../cms/asset/AddAssetForm";
import { NewModal } from "../../components/NewModal";
import ViewAssets from "../cms/asset/ViewAssets";
import AssetsData from "../cms/asset/AssetsData";
import ViewTickets from "../cms/tickets/ViewTickets";
import TicketWidget from "../cms/tickets/components/TicketWidget";
import TicketWidget2 from "../cms/tickets/components/TicketWidget2";
import TicketWidget3 from "../cms/tickets/components/TicketWidget3";
import TicketWidget4 from "../cms/tickets/components/TicketWidget4";
import MyTicketsTable from "../../components/Submodules/ticket/MyTicketsTable";
import TicketMembers from "../cms/tickets/TicketMembers";
import TicketReports from "../cms/tickets/TicketReports";
import AddTicketForm from "../cms/tickets/components/AddTicketForm";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { color, motion } from "framer-motion";
import ManageAsset from "../cms/asset/ManageAsset";
import Listing from "../cms/room-booking/Listing";
import Task from "../Task";
import TodaysTickets from "../cms/tickets/components/TodaysTickets";
import MyTicketsPage from "./../cms/tickets/MyTicketsPage";
import { toast } from "sonner";
import AssetReports from "../cms/asset/AssetReports";
import RoomBookingDash from "../cms/room-booking/RoomBookingDash";
import BookingReports from "../cms/room-booking/BookingReports";
import AddRooms from "../cms/room-booking/AddRooms";

import Teams from "../Teams";
import Tasklist from "../Tasklist";
import TasklistTable from "../TasklistTable";

const DepartmentDash = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const location = useLocation();
  const departmentName = location.state?.departmentName;
  const { department } = useParams();
  const [value, setValue] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenTicket = () => setOpenTicket(true);
  const handleCloseTicket = () => setOpenTicket(false);

  const handleTwo = () => {
    setOpenTicket(false);
    toast.success("Added New Ticket");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const products = [
    {
      id: 1,
      name: "Theme 1",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Theme 2",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Theme 3",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Theme 4",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Theme 5",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Theme 6",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      name: "Theme 7",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      name: "Theme 8",
      price: "Free",
      image: "https://via.placeholder.com/150",
    },
  ];

  const techWidgetsData = {
    activeTickets: 8,
    pendingTasks: 5,
    resolvedIssues: 20,
    serverUptime: "99.8%",
    criticalAlerts: 2,
  };
  const HrWidgetsData = {
    employeeCount: 150,
    leaveRequests: 12,
    payrollAmount: "$200,000",
    attendanceRate: "96%",
    newHires: 3,
  };
  // Random Data for Sales Widgets
  const salesWidgetsData = {
    recurringClients: 120,
    salesProgress: 75,
    salesTarget: 50000, // Example target value in dollars
  };

  const salesWidgets = [
    {
      heading: "Overview",
      widgets: [
        <RecurringClients count={salesWidgetsData.recurringClients} />,
        <SalesProgress progress={salesWidgetsData.salesProgress} />,
        <SalesTarget target={salesWidgetsData.salesTarget} />,
      ],
    },
    {
      heading: "Graphs",
      widgets: [
        <SalesByMonthGraph />,
        <SalesDistributionGraph />,
        <SalesTrendGraph />,
      ],
    },
  ];

  const techWidgets = [
    {
      heading: "Website Data",
      widgets: [
        <ActiveTickets count={techWidgetsData.activeTickets} />,
        <PendingTasks count={techWidgetsData.pendingTasks} />,
        <ResolvedIssues count={techWidgetsData.resolvedIssues} />,
      ],
    },
    {
      heading: "Personal Milestones",
      widgets: [
        <ResolvedIssues count={techWidgetsData.resolvedIssues} />,
        <ServerUptime uptime={techWidgetsData.serverUptime} />,
      ],
    },
    {
      heading: "Requirements",
      widgets: [
        <CriticalAlerts count={techWidgetsData.criticalAlerts} />,
        <DoughnutChart />,
      ],
    },
  ];

  const hrWidgets = [
    {
      heading: "Employee Overview",
      widgets: [
        <EmployeeCount count={HrWidgetsData.employeeCount} />,
        <LeaveRequests count={HrWidgetsData.leaveRequests} />,
        <NewHires count={HrWidgetsData.newHires} />,
      ],
    },
    {
      heading: "Payroll and Attendance",
      widgets: [
        <PayrollSummary amount={HrWidgetsData.payrollAmount} />,
        <AttendanceRate rate={HrWidgetsData.attendanceRate} />,
      ],
    },
  ];

  const financeWidgets = [
    <RevenueVsExpensesWidget />,
    <ProgressDoughnutWidget />,
    <BarGraphWidget />,
    // <BarGraphWidget />,
  ];

  const itWidgetsData = {
    pcFixes: 120, // Number of PCs fixed
    pcFixesProgress: 75, // Progress of PC fixes (percentage)
    pcFixesPending: 25, // Pending PC repairs (number of pending repairs)
    wifiConfig: 35, // Number of WiFi configurations
    wifiTraffic: 150, // Total WiFi traffic in GB
    networkIssues: 45, // Number of network issues resolved
  };

  const itWidgets = [
    {
      heading: "PC Maintenance",
      widgets: [
        <PCFixes count={itWidgetsData.pcFixes} />,
        <PCFixesProgress progress={itWidgetsData.pcFixesProgress} />,
        <PCFixesPending pendingCount={itWidgetsData.pcFixesPending} />,
      ],
    },
    {
      heading: "WiFi & Network",
      widgets: [
        <WiFiConfiguration count={itWidgetsData.wifiConfig} />,
        <WiFiTraffic traffic={itWidgetsData.wifiTraffic} />,
        <NetworkIssuesResolved count={itWidgetsData.networkIssues} />,
      ],
    },
    {
      heading: "Overview",
      widgets: [<PCFixesLineGraph />, <DoughnutChart />],
    },
  ];

  const customerServiceWidgetsData = {
    totalAssets: 200,
    pendingMaintenance: 15,
    assignedAssets: 120,
    assetsInRepair: 5,
    newAssetsAdded: 10,
  };

  const customerServiceWidgetsTicketData = {
    totalAssets: 200,
    pendingMaintenance: 15,
    assignedAssets: 120,
    assetsInRepair: 5,
    newAssetsAdded: 10,
  };

  const customerServiceWidgets = [
    {
      heading: "Asset Management",
      subModule: "asset",
      widgets: [
        <AssetsCount route={'/customer/asset/manage'} count={customerServiceWidgetsData.totalAssets}  />,
        <MaintenanceRequests
          requests={customerServiceWidgetsData.pendingMaintenance}
        />,
        <AssetsAssigned assigned={customerServiceWidgetsData.assignedAssets} />,
        <AssetsInRepair count={customerServiceWidgetsData.assetsInRepair} />,
      ],
    },
    {
      heading: "Ticket Management",
      subModule: "ticket",
      widgets: [
        <TicketWidget />,
        <TicketWidget2 />,
        <TicketWidget3 />,
        <TicketWidget4 />,
        // <AssetsCount count={customerServiceWidgetsData.totalAssets} />,
        // <MaintenanceRequests
        //   requests={customerServiceWidgetsData.pendingMaintenance}
        // />,
        // <AssetsAssigned assigned={customerServiceWidgetsData.assignedAssets} />,
        // <AssetsInRepair count={customerServiceWidgetsData.assetsInRepair} />,
        // <NewAssetsAdded added={customerServiceWidgetsData.newAssetsAdded} />,
      ],
    },
  ];

  const [isAvailable, setIsAvailable] = useState(true);

  const toggleStatus = () => {
    setIsAvailable((prevState) => !prevState);
  };

  return (
    <div className="flex">
      <TestSide />
      <ModuleSidebar />

      <div className="w-full h-[90vh] overflow-y-auto bg-gray-100">
        {/* Frontend submodules */}
        {location.pathname.startsWith("/frontend") && (
          <>
            {location.pathname === "/frontend" ||
            location.pathname === "/frontend/dashboard" ? (
              <div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h1 className="text-3xl font-bold mb-4">
                    Frontend Dashboard
                  </h1>
                  {techWidgets.map((section, index) => (
                    <WidgetSection
                      key={index}
                      heading={section.heading}
                      widgets={section.widgets}
                    />
                  ))}
                </div>
              </div>
            ) : location.pathname === "/frontend/updates" ? (
              <div className="p-6">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="tabs example"
                  variant="fullWidth"
                  indicatorColor="#0db4ea"
                  sx={{
                    border: "2px solid #ccc", // Add a border
                    borderRadius: "4px", // Optional: add rounded corners
                    "& .MuiTab-root": {
                      borderRight: "1px solid #ccc", // Add border between tabs
                    },
                    "& .MuiTab-root:last-of-type": {
                      borderRight: "none", // Remove border for the last tab
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#0db4ea", // Custom indicator color
                    },
                  }}>
                  <Tab label="Home" />
                  <Tab label="About" />
                  <Tab label="Gallery" />
                  <Tab label="Contact" />
                </Tabs>

                <Box sx={{ padding: 2 }}>
                  {value === 0 && (
                    <Typography variant="h6" gutterBottom>
                      Home
                    </Typography>
                  )}
                  {value === 1 && (
                    <Typography variant="h6" gutterBottom>
                      About
                    </Typography>
                  )}
                  {value === 2 && (
                    <Typography variant="h6" gutterBottom>
                      Gallery
                    </Typography>
                  )}
                  {value === 3 && (
                    <Typography variant="h6" gutterBottom>
                      Contact
                    </Typography>
                  )}
                </Box>

                <Box sx={{ padding: 2 }}>
                  {/* Modern Content Examples */}
                  {value === 0 && (
                    <Typography variant="body1">
                      <p>Edit home section of the website here</p>
                    </Typography>
                  )}
                  {value === 1 && (
                    <Typography variant="body1">
                      <p>Edit about section of the website here</p>
                    </Typography>
                  )}
                  {value === 2 && (
                    <Typography variant="body1">
                      <p>Edit Gallery section of the website here</p>
                    </Typography>
                  )}
                  {value === 3 && (
                    <Typography variant="body1">
                      <p>Edit Contact section of the website here</p>
                    </Typography>
                  )}
                </Box>
              </div>
            ) : location.pathname === "/frontend/themes" ? (
              <div className="p-6 w-full">
                <h2 className="text-2xl font-bold mb-6">Themes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-gray-500">{product.price}</p>
                        <button className="mt-4 w-full wono-blue-dark text-white py-2 rounded-lg hover:bg-blue-600 transition">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6">Doesn't exist</div>
            )}
          </>
        )}
        {}

        {/* HR submodules */}
        {location.pathname.startsWith("/hr") && (
          <>
            {(location.pathname === "/hr" ||
              location.pathname === "/hr/dashboard") && (
              <div className="bg-gray-100 p-4 rounded-lg  mt-4">
                {hrWidgets.map((section, index) => (
                  <WidgetSection
                    key={index}
                    heading={section.heading}
                    widgets={section.widgets}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Finance submodules */}
        {location.pathname.startsWith("/finance") && (
          <>
            {(location.pathname === "/finance" ||
              location.pathname === "/finance/dashboard") && (
              <div className="bg-gray-100 p-4 rounded-lg  mt-4">
                <WidgetSection heading="Finance" widgets={financeWidgets} />
              </div>
            )}
          </>
        )}
        {/* Sales submodules */}
        {location.pathname.startsWith("/sales") && (
          <>
            {(location.pathname === "/sales" ||
              location.pathname === "/sales/dashboard") && (
              <div className="bg-gray-100 p-4 rounded-lg  mt-4">
                {salesWidgets.map((section, index) => (
                  <WidgetSection
                    key={index}
                    heading={section.heading}
                    widgets={section.widgets}
                  />
                ))}
              </div>
            )}
          </>
        )}
        {/* IT submodules */}
        {location.pathname.startsWith("/customer") && (
          <>
            {location.pathname === "/customer" ||
            location.pathname === "/customer/dashboard" ? (
              <div className="bg-gray-100 p-4 rounded-lg  mt-4 ">
                {itWidgets.map((section, index) => (
                  <WidgetSection
                    key={index}
                    heading={section.heading}
                    widgets={section.widgets}
                  />
                ))}
              </div>
            ) : location.pathname === "/customer/kpi" ? (
              <>
                <div className="bg-gray-100 p-4 rounded-lg  mt-4 h-[90vh] overflow-y-auto">
                  <div className="mb-8 flex justify-between">
                    <h1 className="text-3xl font-semibold">Key insights</h1>
                  </div>
                  {customerServiceWidgets
                    .filter((section) => section.subModule === "asset")
                    .map((section, index) => (
                      <WidgetSection
                        key={index}
                        heading={section.heading}
                        widgets={section.widgets}
                      />
                    ))}
                  <div className="flex w-full flex-1 flex-grow gap-x-4">
                    <QuantityRemainingWidget
                      totalStock={100}
                      remainingStock={30}
                      assetType="Laptops"
                    />

                    <QuantityRemainingWidget
                      totalStock={100}
                      remainingStock={10}
                      assetType="Mobiles"
                    />
                  </div>

                  <AssetAllocationWidget />
                </div>
              </>
            ) : location.pathname === "/customer/asset/view" ? (
              <>
                <ViewAssets />
              </>
            ) : location.pathname === "/customer/asset/reports" ? (
              <>
                <AssetReports />
              </>
            ) : location.pathname === "/customer/asset/manage" ? (
              <>
                <ManageAsset />
              </>
            ) : location.pathname === "/customer/asset/details" ? (
              <>
                <AssetsData />
              </>
            ) : location.pathname === "/customer/tickets" ? (
              <>
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                  <div className="mb-8 flex justify-between">
                    <h1 className="text-3xl  font-bold">Key Insights</h1>
                    {/* <div className=" flex gap-4">
                

                      {user.role === "Employee" && user.department === "IT" && (
                        <div>
                          <span className="text-2xl">Status: </span>
                          <button
                            onClick={toggleStatus}
                            className={`px-6 py-2 rounded-lg text-white transition-shadow shadow-md hover:shadow-lg active:shadow-inner ${
                              isAvailable
                                ? "bg-green-400 hover:bg-green-300"
                                : "bg-red-400 hover:bg-red-300"
                            }`}>
                            {isAvailable ? "Available" : "Unavailable"}
                          </button>
                        </div>
                      )}
                 

                      <button
                        onClick={handleOpenTicket}
                        className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
                        Raise Ticket
                      </button>
                    </div> */}
                  </div>
                  {customerServiceWidgets
                    .filter((section) => section.subModule === "ticket")
                    .map((section, index) => (
                      <WidgetSection
                        key={index}
                        heading={section.heading}
                        widgets={section.widgets}
                      />
                    ))}

                  <div className="flex w-full flex-1 flex-grow gap-x-4">
                    <QuantityRemainingWidget
                      totalStock={100}
                      remainingStock={30}
                      assetType="Tickets"
                    />

                    <QuantityRemainingWidget
                      totalStock={100}
                      remainingStock={10}
                      assetType="Available Members"
                    />
                  </div>

                  {/* <AssetAllocationWidget /> */}

                  <div className=" py-10">
                    {/* <p>Today's tickets Table Component</p> */}
                    <TodaysTickets />
                  </div>
                  {/* <p>x</p> */}
                </div>
              </>
            ) : location.pathname === "/customer/tickets/my-tickets" ? (
              <>
                <MyTicketsPage />
              </>
            ) : location.pathname === "/customer/tickets/view-tickets" ? (
              <>
                <ViewTickets />
              </>
            ) : location.pathname === "/customer/tickets/members" ? (
              <>
                <TicketMembers />
              </>
            ) : location.pathname === "/customer/tickets/ticket-reports" ? (
              <>
                <TicketReports />
              </>
            ) : location.pathname === "/customer/meetings" ? (
              <>
                <RoomBookingDash />
              </>
            ) : location.pathname === "/customer/meetings/booking" ? (
              <>
                <Listing />
              </>
            ) : location.pathname === "/customer/meetings/add-room" ? (
              <>
                <AddRooms />
              </>
            ) : location.pathname === "/customer/meetings/reports" ? (
              <>
                <BookingReports />
              </>
            ) : (
              <></>
            )}
          </>
        )}
        {location.pathname === "/tasks" ? (
          <Task />
        ) : location.pathname === "/tasks/teams" ? (
          <>
            <Teams />
          </>
        ) : location.pathname === "/tasks/tasklist" ? (
          <>
            <Tasklist />
          </>
        ) : location.pathname === "/tasks/tasklisttable" ? (
          <>
            <TasklistTable />
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        <NewModal open={open} onClose={handleClose}>
          <div className="motion-preset-expand">
            <AddAssetForm title={"Add Asset"} handleClose={handleClose} />
          </div>
        </NewModal>
      </div>
      <div>
        {/* <Button onClick={handleOpenTicket}>Open modal</Button> */}
        <Modal
          open={openTicket}
          onClose={handleCloseTicket}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          {/* <Box sx={style}> */}
          <Box sx={style}>
            <AddTicketForm />
            <div className="col-span-2 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded mt-4"
                // onClick={handleCloseTicket}
                onClick={handleTwo}
                // onClick={() => navigate("/customer/tickets")}
              >
                Save
              </motion.button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default DepartmentDash;
