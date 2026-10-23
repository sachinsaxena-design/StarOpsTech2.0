import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const FAQ = ({ data }) => {
  const [accordionData, setAccordionData] = useState(data);
  const toggleAccordion = (index) => {
    setAccordionData((prevData) =>
      prevData.map((item, i) => ({
        ...item,
        isOpen: i === index && !item.isOpen,
      }))
    );
  };

  const [animationParent] = useAutoAnimate();
  return (
    <div className="mt-10 border w-full rounded-lg">
      {accordionData.map((item, index) => (
        <div ref={animationParent} key={index} className="flex flex-col">
          <p
            onClick={() => toggleAccordion(index)}
            className="flex justify-start items-center gap-2 cursor-pointer text-base sm:text-xl p-2 font-light"
          >
            {item.isOpen ? (
              <img
                src="https://cdn.staropstech.com/starops/assets/extra-icons/minus.png"
                alt="minus-icon"
                className="h-5 aspect-square"
              />
            ) : (
              <img
                src="https://cdn.staropstech.com/starops/assets/extra-icons/plus.png"
                alt="plus-icon"
                className="h-5 aspect-square"
              />
            )}
            <span>{item.question}</span>
          </p>

          {item.isOpen && (
            <p className="text-base sm:text-lg border-t text-gray-500 px-2 py-4">
              {item.answer}
            </p>
          )}
          {index !== accordionData.length - 1 ? <hr /> : ""}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
