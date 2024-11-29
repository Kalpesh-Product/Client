import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AgTable = React.memo(
  ({ data, columns, paginationPageSize, highlightFirstRow }) => {
    const defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      flex: 1,
      autoHeight: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "px", // Add padding for spacing
      },
    };

    // Define the row style conditionally
    const getRowStyle = (params) => {
      if (highlightFirstRow && params.node.rowIndex === 0) {
        // return { backgroundColor: "grey" };
        return { backgroundColor: "#f5f5f5", color: "#b0b0b0" };
      }
      return null;
    };

    return (
      <div
        className="ag-theme-alpine border-none"
        style={{ width: "100%", fontFamily: "Popins-Regular" }}
      >
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={paginationPageSize}
          domLayout="autoHeight"
          rowHeight={50} // Increased row height for better spacing
          getRowStyle={getRowStyle}
        />
      </div>
    );
  }
);

export default AgTable;
