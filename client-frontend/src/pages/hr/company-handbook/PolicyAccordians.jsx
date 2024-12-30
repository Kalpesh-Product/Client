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

const PolicyAccordians = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    const responseFromBackend = await axios.get(
      "/api/policies/view-all-policies"
    );
    const policies = responseFromBackend.data.policies;
    setPolicies(policies);
  };

  const groupedData = policies.reduce((acc, policy) => {
    const { policyDepartment, policyName, createdAt, _id } = policy;

    if (!acc[policyDepartment]) {
      acc[policyDepartment] = {
        department: policyDepartment,
        policies: [],
      };
    }

    acc[policyDepartment].policies.push({
      name: policyName,
      dateAdded: new Date(createdAt).toLocaleDateString(),
      _id, // Include _id for View Details
    });

    return acc;
  }, {});

  const tableData = Object.values(groupedData);

  // Function to handle View Details button click
  const handleViewDetails = (id) => {
    console.log(`Policy ID: ${id}`);
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
          <TableCell align="right">{department.policies.length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table
                size="medium"
                aria-label="policies"
                sx={{ margin: "10px 0", padding: "10px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ padding: "8px" }}>Policy Name</TableCell>
                    <TableCell sx={{ padding: "8px" }}>Date Added</TableCell>
                    <TableCell align="right" sx={{ padding: "8px" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {department.policies.map((policy) => (
                    <TableRow key={policy._id}>
                      <TableCell sx={{ padding: "8px" }}>
                        {policy.name}
                      </TableCell>
                      <TableCell sx={{ padding: "8px" }}>
                        {policy.dateAdded}
                      </TableCell>
                      <TableCell align="right" sx={{ padding: "8px" }}>
                        <button
                          className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner"
                          // onClick={() => handleViewDetails(policy._id)}
                          onClick={() =>
                            navigate("/hr/company-handbook/policy-details")
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
        Policy Table
      </Typography>
      <TableContainer
        component={Paper}
        className="p-4 bg-gray-100 w-[80vw] md:w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Department</TableCell>
              <TableCell align="right">Total Policies</TableCell>
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

export default PolicyAccordians;
