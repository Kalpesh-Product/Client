import React,{useState} from 'react'

const MontlyTasks = () => {
  const [rows, setRows] = useState([{ id: Date.now(), textDecoration: "" }]);
  
    // Add a new row
    const addRow = () => {
      setRows([...rows, { id: Date.now(), textDecoration: "" }]);
    };
  
    // Close a row (strike through)
    const closeRow = (id) => {
      setRows(
        rows.map((row) =>
          row.id === id ? { ...row, textDecoration: "line-through" } : row
        )
      );
    };
  
    // Delete a row
    const deleteRow = (id) => {
      setRows(rows.filter((row) => row.id !== id));
    };
  return (
    <div className=" min-h-screen  ">
    <div className="w-90 mx-10 p-4 bg-white shadow-md fixed left-0 right-0">
      
      
        {rows.map((row) => (
          <div key={row.id} className="flex justify-between gap-10">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              style={{ textDecoration: row.textDecoration }}
              disabled={row.textDecoration === "line-through"}
            />
            <input
              type="text"
              placeholder="Enter text"
              className="border border-gray-300 rounded-md p-2 flex-1"
              style={{ textDecoration: row.textDecoration }}
              disabled={row.textDecoration === "line-through"}
            />
            <button
              type="button"
              className="text-white bg-gray-400 px-2 py-1 rounded"
              onClick={() => closeRow(row.id)}
            >
              Close
            </button>
            <button
              type="button"
              className="text-white bg-red-500 px-2 py-1 rounded"
              onClick={() => deleteRow(row.id)}
            >
              Delete
            </button>
          </div>
        ))}
      

      <button
        onClick={addRow}
        className="mt-4  w-50-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add More
      </button>
    </div>
  </div>
  )
}

export default MontlyTasks