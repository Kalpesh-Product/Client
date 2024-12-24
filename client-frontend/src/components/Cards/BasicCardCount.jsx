import React from "react";

const BasicCardCount = ({
  title,
  data,
  theme,
  subText,
  titleSize,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={`bg-${theme} rounded-md`}>
      <div className="p-4 flex justify-between">
        <div>
          <p className="text-5xl font-bold">{data}</p>
        </div>
        <div className={`bg-${theme} text-center flex flex-col`}>
          <h1 className={` font-semibold ${titleSize ? titleSize : "text-xl"}`}>
            {title}
          </h1>
          <h2 className="text-sm">{subText}</h2>
        </div>
      </div>
    </div>
  );
};

export default BasicCardCount;
