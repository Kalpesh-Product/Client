import React, { useEffect, useState } from "react";

import AssignTaskForm from "../components/TaskManagement/AssignTaskForm";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { NewModal } from "../components/NewModal";
import { useLocation } from "react-router-dom";
import AgTable from "../components/AgTable";

const TasklistTable = () => {
  const location = useLocation();
  const { taskTitle } = location.state || {};
  const [modalType, SetModalType] = useState("");
  const [projectTitle, SetProjectTitle] = useState("");

  const [selectedValue, setSelectedValue] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "ticketTitle",
      headerName: "Tasks",
      width: 200,
      renderCell: (params) => (
        <div
          class="truncate overflow-hidden whitespace-nowrap"
          title={params.value}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "Assignes",
      headerName: "Assignes",
      width: 200,
      type: "singleSelect",
      valueOptions: [
        "shreya",
        "Aditi",
        "Pallavi",
        "Silva",
        "Saloni",
        "Jayesh",
        "Pratap",
        "Kamlesh",
        "vaibhav",
      ],
    },
    { field: "DueDate", headerName: "Due Date", width: 200 },
    {
      field: "priority",
      headerName: "Priority",
      width: 130,
      type: "singleSelect",
      valueOptions: ["High", "Medium", "Low"],
      cellRenderer: (params) => {
        const statusColors = {
          High: "text-red-600 bg-red-100",
          Medium: "text-blue-600 bg-blue-100",
          Low: "text-yellow-600 bg-yellow-100",
        };
        const statusClass = statusColors[params.value] || "";

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
          >
            {params.value}
          </span>
        );
      },
    },

    {
      field: "viewDetails",
      headerName: "Status",
      width: 150,
      cellRenderer: (params) => {
        const handleActionChange = (event) => {
          const selectedAction = event.target.value;

          const updatedData = params.api.getRowNode(params.node.id).data;
          updatedData.viewDetails = selectedAction;
          params.api.applyTransaction({ update: [updatedData] });

          setSelectedValue(selectedAction); // Update the selected value dynamically
          console.log("Selected Action:", selectedAction);
        };

        return (
          <FormControl size="small" sx={{ width: "100%" }}>
            <Select
              value={params.data.viewDetails || ""} // Always forces the dropdown to display the SVG
              onChange={handleActionChange}
              displayEmpty
              disableUnderline
              IconComponent={() => null} // Removes the dropdown arrow
              sx={{
                "& .MuiSelect-select": {
                  padding: "8px 16px",
                  borderRadius: "0.375rem", // Tailwind rounded
                  backgroundColor: "transparent",
                  border: "none", // Removes border
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& fieldset": {
                  border: "none", // Removes border in outlined variant
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Status
              </MenuItem>
              <MenuItem value="start">Start</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      cellRenderer: (params) => {
        const handleActionChange = (event) => {
          const selectedAction = event.target.value;
        };

        return (
          <FormControl size="small" sx={{ width: "100%" }}>
            <Select
              value="" // Always forces the dropdown to display the SVG
              onChange={handleActionChange}
              displayEmpty
              disableUnderline
              IconComponent={() => null} // Removes the dropdown arrow
              sx={{
                "& .MuiSelect-select": {
                  padding: "8px 16px",
                  borderRadius: "0.375rem", // Tailwind rounded
                  backgroundColor: "transparent",
                  border: "none", // Removes border
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& fieldset": {
                  border: "none", // Removes border in outlined variant
                },
              }}
            >
              <MenuItem value="" disabled>
                <svg
                  className="flex-none size-4 text-gray-600 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={12} cy={5} r={1} />
                  <circle cx={12} cy={19} r={1} />
                </svg>
              </MenuItem>
              <MenuItem
                value="view"
                onClick={() => handleOpenModal(params.row)}
              >
                View Details
              </MenuItem>
              <MenuItem value="edit">Edit</MenuItem>
              <MenuItem value="delete" onClick={handleEditModal}>
                Delete
              </MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
  ];

  const [allRows, setAllRows] = useState([
    {
      id: 1,
      ticketTitle: "Financial Forcasting And Budgeting",
      Assignes: "shreya",
      DueDate: "10th october 2024",
      priority: "High",
      department: "IT",
      requestDate: "2024-10-01",
    },
    {
      id: 2,
      ticketTitle: "Annual Co-orporate Conference and Networking Events",
      Assignes: "Aditi",
      DueDate: "12th october 2024",
      priority: "Medium",
      department: "HR",
      requestDate: "2024-10-03",
    },
    {
      id: 3,
      ticketTitle: "Website Redesign",
      Assignes: "Pallavi",
      DueDate: "15th october 2024",
      priority: "High",
      department: "Tech",
      requestDate: "2024-10-05",
    },
    {
      id: 4,
      ticketTitle: "Annual Co-orporate Conference and Networking Events",
      Assignes: "Silva",
      DueDate: "30th october 2024",
      priority: "Low",
      department: "Admin",
      requestDate: "2024-10-06",
    },
    {
      id: 5,
      ticketTitle: "Business Process Optimizations and Automations",
      Assignes: "Jayesh",
      DueDate: "2th November 2024",
      priority: "Medium",
      department: "HR",
      requestDate: "2024-10-07",
    },
    {
      id: 6,
      ticketTitle: "Data Privacy And GDPR Compliance initiative",
      Assignes: "Pratab",
      DueDate: "7th November 2024",
      priority: "High",
      department: "IT",
      requestDate: "2024-10-08",
    },
    {
      id: 7,
      ticketTitle: "Launch a New Digital Marketing Campaign",
      Assignes: "Kamlesh",
      DueDate: "9th November 2024",
      priority: "Low",
      department: "Tech",
      requestDate: "2024-10-09",
    },
    {
      id: 8,
      ticketTitle: "Office Supplies Request",
      Assignes: "Saloni, siya",
      DueDate: "10th November 2024",
      priority: "Low",
      department: "Admin",
      requestDate: "2024-10-10",
    },
    {
      id: 9,
      ticketTitle: "Data Privacy And GDPR Compliance Initiative",
      Assignes: "Divya",
      DueDate: "20th November 2024",
      priority: "Medium",
      department: "Event Management",
      requestDate: "2024-10-11",
    },
  ]);
  const paginationModel = { page: 0, pageSize: 5 };

  const [department, setDepartment] = React.useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [modalOpen, SetModalOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [selectedRow, SetselectedRow] = useState(null);

  const filteredRows =
    department === ""
      ? allRows // show all rows if no department is selected
      : allRows.filter((row) => row.department === department);

  const filteredTasks = filteredRows.filter((task) => {
    const matchesSearch = task.ticketTitle
      .toLowerCase()
      .includes(searchTerm?.toLowerCase());
    const matchesPriority = priorityFilter
      ? task.priority === priorityFilter
      : true;
    const matchesDepartment = departmentFilter
      ? task.department === departmentFilter
      : true;
    return matchesPriority && matchesSearch && matchesDepartment;
  });

  const handleOpenModal = (row) => {
    SetselectedRow(row);
    SetModalOpen(true);
  };

  const closeModal = () => SetModalOpen(false);

  const assignTaskbtnClick = (value, taskTitle) => {
    SetModalOpen(true);
    SetModalType(value);
    SetProjectTitle(taskTitle);
    console.log("Hello");
    console.log(taskTitle);
  };

  const handleEditModal = () => {
    SetModalOpen(true);
    SetModalType("Delete_Row");
    console.log(modalType);
  
  };
  return (
    <div className="flex min-h-screen">
      <div className="w-full p-6 motion-preset-blur-right-md  max-w-screen-xl mx-auto ">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl">{taskTitle}</h2>
          <button
            className="px-4 py-2 bg-[rgb(13,180,234)] text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => assignTaskbtnClick("task2", taskTitle)}
          >
            + Assign Task
          </button>
        </div>
        <div className="mt-5 overflow-auto w-full max-w-screen-xl mx-auto  motion-preset-blur-right-md">
          <AgTable
            data={filteredTasks} // Pass filtered rows
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#fff", // Optional, background for the header
                color: "black", // Text color
                fontWeight: "bold",
                // Make header bold
              },
              width: "75vw",
            }}
          />
        </div>
      </div>
      {modalOpen && (
        <NewModal open={modalOpen} onClose={closeModal}>
          <AssignTaskForm
            title="Add Task"
            handleClose={closeModal}
            rows={allRows}
            setAllRows={setAllRows}
            selectedRow={selectedRow}
            modalType={modalType}
            projectTitle={projectTitle}
          />
        </NewModal>
      )}
    </div>
  );
};

export default TasklistTable;
