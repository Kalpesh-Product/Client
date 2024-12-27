// BasicTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const BasicTable = ({ data, columns, title }) => {
  return (
    <>
    <div className="pl-3 my-3">
      <h1>{title ? title : ""}</h1>
    </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Dynamically render column headers */}
              {columns.map((col, index) => (
                <TableCell sx={{ fontWeight: "bold" }} key={index}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render each row in data */}
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* Render each column cell for the current row */}
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>{row[col.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BasicTable;
