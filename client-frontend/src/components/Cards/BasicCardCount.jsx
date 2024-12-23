import React from "react";

const BasicCardCount = ({title, data, theme}) => {
  return (
    <div>
      <div className="p-4">
        <h3 className={`text-lg bg-${theme} font-semibold`}>{title}</h3>
        <p className="text-3xl font-bold">{data}</p>
      </div>
    </div>
  );
};

export default BasicCardCount;
