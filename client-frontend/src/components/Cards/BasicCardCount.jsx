import React from "react";

const BasicCardCount = ({
  title,
  data,
  theme,
  subText,
  titleSize,
  onClick,
  dataStyling,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-md shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer bg-${theme}`}
    >
      <div className="p-6 flex flex-col items-center">
        <div className="mb-4">
          <p
            className={
              dataStyling
                ? dataStyling
                : "text-5xl font-extrabold text-gray-800"
            }
          >
            {data}
          </p>
        </div>
        <div className="text-center">
          <h1
            className={`font-semibold ${
              titleSize ? titleSize : "text-2xl"
            } text-gray-700`}
          >
            {title}
          </h1>
          {subText && <h2 className="text-sm text-gray-500 mt-2">{subText}</h2>}
        </div>
      </div>
    </div>
  );
};

export default BasicCardCount;
