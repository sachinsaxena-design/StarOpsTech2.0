import React from "react";

const SimpleCard = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-start gap-3 p-4 border border-logo hover:shadow-xl hover:scale-105 duration-500 ease-in-out rounded-lg">
      <h1 className="text-lg  text-left w-full text-logo">{data.title}</h1>
      <p className="font-light text-justify">{data.description}</p>
    </div>
  );
};
export default SimpleCard;
