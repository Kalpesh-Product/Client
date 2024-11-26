import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AgTable = ({ data, columns, paginationPageSize }) => {
  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    flex: 1,
    autoHeight: true,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px", // Add padding for spacing
    },
  };

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={paginationPageSize}
        domLayout="autoHeight"
        rowHeight={50} // Increased row height for better spacing
      />
    </div>
  );
};

export default AgTable;
