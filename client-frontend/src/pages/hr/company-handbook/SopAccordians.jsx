import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SopAccordians = () => {
  const navigate = useNavigate();
  const [sops, setSops] = useState([]);

  useEffect(() => {
    fetchSops();
  }, []);

  const fetchSops = async () => {
    const responseFromBackend = await axios.get("/api/sops/view-all-sops");
    const sops = responseFromBackend.data.sops;
    setSops(sops);
  };

  const groupedData = sops.reduce((acc, sop) => {
    const { sopDepartment, sopName, createdAt, _id } = sop;

    if (!acc[sopDepartment]) {
      acc[sopDepartment] = {
        department: sopDepartment,
        sops: [],
      };
    }

    acc[sopDepartment].sops.push({
      name: sopName,
      dateAdded: new Date(createdAt).toLocaleDateString(),
      _id, // Include _id for View Details
    });

    return acc;
  }, {});

  const tableData = Object.values(groupedData);

  // Function to handle View Details button click
  const handleViewDetails = (id) => {
    console.log(`SOP ID: ${id}`);
  };

  const Row = ({ department }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {department.department}
          </TableCell>
          <TableCell align="right">{department.sops.length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table
                size="medium"
                aria-label="sops"
                sx={{ margin: "10px 0", padding: "10px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ padding: "8px" }}>SOP Name</TableCell>
                    <TableCell sx={{ padding: "8px" }}>Date Added</TableCell>
                    <TableCell align="right" sx={{ padding: "8px" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {department.sops.map((sop) => (
                    <TableRow key={sop._id}>
                      <TableCell sx={{ padding: "8px" }}>{sop.name}</TableCell>
                      <TableCell sx={{ padding: "8px" }}>
                        {sop.dateAdded}
                      </TableCell>
                      <TableCell align="right" sx={{ padding: "8px" }}>
                        <button
                          className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
                          // onClick={() => handleViewDetails(sop._id)}>
                          onClick={() =>
                            navigate("/hr/company-handbook/sop-details")
                          }>
                          View Details
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <main className="p-4">
      <Typography variant="h4" component="h2" className="mt-4 mb-2">
        SOP Table
      </Typography>
      <TableContainer
        component={Paper}
        className="p-4 bg-gray-100 w-[80vw] md:w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Department</TableCell>
              <TableCell align="right">Total SOPs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((department) => (
              <Row key={department.department} department={department} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};

export default SopAccordians;
