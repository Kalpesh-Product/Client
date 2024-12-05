import React from 'react';

const Budget = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Budget Overview</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
            Add Budget
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Total Budget</p>
            <h2 className="text-2xl font-semibold text-gray-800">$0.00</h2>
          </div>
          <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Expenses</p>
            <h2 className="text-2xl font-semibold text-gray-800">$0.00</h2>
          </div>
          <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Remaining</p>
            <h2 className="text-2xl font-semibold text-gray-800">$0.00</h2>
          </div>
        </div>

        {/* Budget Table */}
        <div className="bg-gray-50 border rounded-lg shadow-sm">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-gray-600 font-semibold">Category</th>
                <th className="px-4 py-2 text-gray-600 font-semibold">Allocated</th>
                <th className="px-4 py-2 text-gray-600 font-semibold">Spent</th>
                <th className="px-4 py-2 text-gray-600 font-semibold">Remaining</th>
                <th className="px-4 py-2 text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3 text-gray-500">Category {index + 1}</td>
                  <td className="px-4 py-3 text-gray-700">$0.00</td>
                  <td className="px-4 py-3 text-gray-700">$0.00</td>
                  <td className="px-4 py-3 text-gray-700">$0.00</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-500 hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Placeholder Chart */}
        <div className="mt-8 bg-gray-50 p-6 border rounded-lg shadow-sm flex justify-center items-center">
          <p className="text-gray-400">Chart Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default Budget;
