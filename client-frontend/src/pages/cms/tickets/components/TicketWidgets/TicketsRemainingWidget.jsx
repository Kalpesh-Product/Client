import React from "react";

export const TicketsRemainingWidget = ({
  totalStock,
  remainingStock,
  assetType,
}) => {
  // Calculate the percentage of remaining stock
  const percentageRemaining = (remainingStock / totalStock) * 100;

  // Determine color based on the remaining stock
  let progressColor = "bg-green-500"; // Default color: Green (high stock)
  if (percentageRemaining <= 50 && percentageRemaining > 20) {
    progressColor = "bg-yellow-500"; // Moderate stock
  } else if (percentageRemaining <= 20) {
    progressColor = "bg-red-500"; // Low stock
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 my-4 w-full cursor-pointer hover:bg-slate-100 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          {/* Asset Icon */}
          <h2 className="text-lg font-semibold text-gray-800">
            {assetType} Remaining
          </h2>
        </div>
        <div className="text-xl font-bold text-gray-800">
          {remainingStock}/{totalStock}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative pt-1 ">
        <div className="flex mb-2 items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            {assetType} Remaining
          </span>
          <span className="text-sm font-medium text-gray-500">
            {Math.round(percentageRemaining)}%
          </span>
        </div>
        <div className="flex mb-2">
          <div className="w-full bg-gray-200 h-2.5 rounded-full">
            <div
              className={`h-2.5 rounded-full ${progressColor}`}
              style={{ width: `${percentageRemaining}%` }}></div>
          </div>
        </div>
      </div>

      {/* Tooltip/Status text */}
      {/* <div className="text-center mt-4">
        {percentageRemaining <= 20 ? (
          <p className="text-red-500 font-medium">Warning: Stock is low!</p>
        ) : percentageRemaining <= 50 ? (
          <p className="text-yellow-500 font-medium">
            Moderate Stock: Order soon!
          </p>
        ) : (
          <p className="text-green-500 font-medium">
            Sufficient Stock Available
          </p>
        )}
      </div> */}
    </div>
  );
};
