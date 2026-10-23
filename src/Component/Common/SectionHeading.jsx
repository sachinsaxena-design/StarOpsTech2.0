import React from "react";

const SectionHeading = ({ heading, description }) => {
  return (
    <>
      <h1 className="text-2xl md:text-4xl  font-medium text-center mb-2">
        {heading}
      </h1>
      <p className="text-base font-light leading-5 md:w-1/2  text-center ">
        {description}
      </p>
    </>
  );
};

export default SectionHeading;
