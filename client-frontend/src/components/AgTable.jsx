import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AgTable = React.memo(({ 
  data, 
  columns, 
  paginationPageSize, 
  frameworkComponents 
}) => {
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
    },
  };

  return (
    <div
      className="ag-theme-alpine border-none"
      style={{ width: "100%", fontFamily: "Popins-Regular", height: "100%" }}
    >
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={paginationPageSize}
        domLayout="autoHeight"
        cellRender
        rowHeight={50} // Adjust row height if needed
      />
    </div>
  );
});

export default AgTable;
