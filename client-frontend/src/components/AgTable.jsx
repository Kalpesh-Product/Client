import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Alpine theme CSS

const AgTable = ({data, columns, paginationPageSize}) => {
  const [gridApi, setGridApi] = useState(null);

  const handleGridReady = (params) => {
    setGridApi(params.api);
  };

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    flex: 1,
    autoHeight :'true',
    cellStyle:{display:'flex', justifyContent:'center', alignItems:'center'}
  };
  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ width: "100%" }}
      >
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={paginationPageSize}
          domLayout="autoHeight"
          onGridReady={handleGridReady}
          
          getRowStyle={() => ({
            padding: "0", // No extra padding in rows
            display: "flex",
            alignItems: "center",
          })}
          rowHeight={30} // Use fixed row height or adjust dynamically if needed
        />
      </div>
    </div>
  );
};

export default AgTable;
