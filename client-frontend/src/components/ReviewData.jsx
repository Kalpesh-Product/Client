import React from "react";
import WonoButton from "./Buttons/WonoButton";

const ReviewData = ({formData, handleSubmit}) => {
  const renderNestedObject = (obj, parentKey) => {
    return Object.entries(obj).map(([key, value]) => {
      const formattedKey = `${parentKey} ${key}`
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      return (
        <div
          key={`${parentKey}-${key}`}
          className="flex justify-between py-2 border-b"
        >
          <h1 className="font-semibold">{formattedKey}</h1>
          <span>{value ? value.toString() : "N/A"}</span>
        </div>
      );
    });
  };

  return (
    <>
      <h1 className="text-2xl mb-4 font-semibold text-center">
        Are the provided details correct?
      </h1>
      <div className=" h-[40vh] overflow-auto">
        <div className="grid grid-cols-2 gap-7">
          {Object.entries(formData)
            .reduce(
              (columns, [key, value], index) => {
                // Handle nested objects
                if (
                  typeof value === "object" &&
                  value !== null &&
                  !Array.isArray(value)
                ) {
                  const nestedElements = renderNestedObject(value, key);
                  columns[index % 2].push(...nestedElements);
                } else {
                  // Render simple values
                  const formattedKey = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());

                  columns[index % 2].push(
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b"
                    >
                      <h1 className="font-semibold">{formattedKey}</h1>
                      <span>{value ? value.toString() : "N/A"}</span>
                    </div>
                  );
                }
                return columns;
              },
              [[], []] // Initial columns: two empty arrays
            )
            .map((column, colIndex) => (
              <div key={colIndex}>{column}</div>
            ))}
        </div>

        <WonoButton content={"Submit"} onClick={handleSubmit} />
      </div>
    </>
  );
};

export default ReviewData;
