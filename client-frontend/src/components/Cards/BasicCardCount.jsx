import React from "react";

const BasicCardCount = ({title, data}) => {
  return (
    <div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{data}</p>
      </div>
    </div>
  );
};

export default BasicCardCount;
