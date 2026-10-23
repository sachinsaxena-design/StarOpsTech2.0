import React, { useEffect, useState } from "react";

const Review = () => {
  const [reviewData, setReviewData] = useState([
    {
      key: 1,
      name: "CA Nitin Rajpal",
      review:
        "StarOps impressively exceeded expectations, delivering a modern, user-friendly financial services website. I highly recommend their outstanding work and commitment to client satisfaction.",
      profile: "https://cdn.staropstech.com/clients/ReviewImages/nitin.png",
    },
    {
      key: 2,
      name: "Ashok Kumar Shukla",
      review:
        "StarOps went above and beyond, creating a user-friendly financial services website that perfectly aligns with our vision. Highly recommended for their exceptional work and client commitment.",
      profile: "https://cdn.staropstech.com/clients/ReviewImages/ashok.jpeg",
    },
    // {
    //   key: 3,
    //   name: "Mytaxaa",
    //   review:
    //     "StarOps exceeded expectations, delivering a modern, user-friendly financial services website. Highly recommend their outstanding work and commitment to client satisfaction.",
    //   profile: "https://cdn.staropstech.com/clients/ReviewImages/mytaxaa.jpg",
    // },
    // {
    //   key: 3,
    //   name: "Ashok Kumar Shukla",
    //   review:
    //     "StarOps went above and beyond, creating a user-friendly financial services website that perfectly aligns with our vision. Highly recommended for their exceptional work and client commitment.",
    //   profile: "https://cdn.staropstech.com/clients/ReviewImages/ashok.jpeg",
    // },
    {
      key: 3,
      name: "Mytaxaa",
      review:
        "StarOps exceeded expectations, delivering a modern, user-friendly financial services website. Highly recommend their outstanding work and commitment to client satisfaction.",
      profile: "https://cdn.staropstech.com/clients/ReviewImages/mytaxaa.jpg",
    },
    {
      key: 4,
      name: "Six30labs",
      review:
        "StarOps delivered exceptional service in developing our financial services website. Their professionalism and attention to detail resulted in a modern, user-friendly site that exceeded our expectations.",
      profile:
        "https://cdn.staropstech.com/clients/ReviewImages/bkp-six30labs.png",
    },
    {
      key: 5,
      name: "ContactVerse",
      review:
        "StarOps delivered exceptional service in developing our ContactVerse platform. Their professionalism and attention to detail resulted in a modern, user-friendly solution that exceeded our expectations.",
      profile:  
        "https://cdn.staropstech.com/clients/ReviewImages/ContactVerse.png",
        style:'object-contain bg-purple-600'
      },
    {
      key: 6,
      name: "CxPoint",
      review:
        "StarOps delivered an outstanding CXPoint platform with a seamless user experience and modern design. Their technical expertise, attention to detail, and commitment to quality resulted in a solution that exceeded our expectations.",
        profile:
        "https://cdn.staropstech.com/clients/ReviewImages/cxpoint.png",
        style:'pt-[12px] pl-[10px] bg-white'
      },
    {
      key: 7,
      name: "Arcaptor Technologies Private Limited",
      review:
      "StarOps delivered an outstanding solution for Arcaptor Technologies Private Limited. Their technical expertise, professionalism, and attention to detail resulted in a reliable, scalable platform that perfectly aligned with our business needs.",
      profile:
      "https://cdn.staropstech.com/clients/ReviewImages/Arcaptor.jpg",
      style:'bg-white '
    }
    // {
    //   key: 5,
    //   name: "Magath",
    //   review:
    //     "StarOps delivered exceptional service in developing our financial services website. Their professionalism and attention to detail resulted in a modern, user-friendly site that exceeded our expectations.",
    //   profile: "https://cdn.staropstech.com/clients/ReviewImages/magath.jpg",
    // },
  ]);

  const rotateArray = () => {
    const newArray = [...reviewData];
    const firstElement = newArray.shift();
    newArray.push(firstElement);
    setReviewData(newArray);
  };

  const rotateArrayOnClick = (id) => {
    const newArray = [...reviewData];
    const indexValue = newArray[id];
    newArray.splice(id, 1);
    newArray.push(indexValue);
    setReviewData(newArray);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // rotateArray();
      
    }, 6000);
    return () => clearInterval(intervalId);
  }, [reviewData]);

  return (
    <>
      <div className="grid grid-cols-4 min-h-[35vh] p-3 sm:p-0 sm:min-h-[440px] md:min-h-[400px] container mx-auto relative ">
        <div className="relative h-44 sm:h-auto">
          <img
            onClick={() => rotateArrayOnClick(0)}
            className={`absolute bottom-0 right-0 mb-20 h-12 aspect-square rounded-full shadow-md shadow-gray-300-300 ${reviewData[0]?.style||''}`}
            src={reviewData[0].profile}
            alt=""
          />
        </div>
        <div className="relative h-64 sm:h-auto col-span-2 row-span-2 flex items-center justify-center">
          <div className="absolute animate-bubble z-0 h-36 sm:h-52 aspect-square rounded-full flex items-center justify-center bg-blue-100 shadow-lg shadow-blue-100"></div>
          <div className="absolute animate-bubble  delay-300 z-[1] h-28 sm:h-44 aspect-square rounded-full flex items-center justify-center bg-blue-200 shadow-lg shadow-blue-200"></div>
          <div className="bg-indigo-400 z-[2] h-20 sm:h-36 aspect-square rounded-full flex items-center justify-center relative group">
            <img
              className={`h-full aspect-square rounded-full ${reviewData[4]?.style || ""} `}
              src={reviewData[4].profile}
              onClick={() => rotateArrayOnClick(4)}
              alt=""
            />
            <div className="absolute z-0 hidden group-hover:block sm:block top-0 -m-1 -mx-2 translate-y-28 sm:translate-y-40 h-4 border aspect-square bg-white  transform rotate-45 origin-bottom-right shadow-lg"></div>
            <div className="absolute z-0  hidden  group-hover:block sm:block top-0 transform translate-y-28 sm:translate-y-40 w-[90vw] bg-white sm:w-[35vw] border rounded-lg p-2 sm:p-4 shadow-lg">
              <p className="text-sm sm:text-base "> {reviewData[4].review}</p>
              <p className="text-sm sm:text-base capitalize font-bold">
                {reviewData[4].name}
              </p>
            </div>
          </div>
        </div>
        <div className="relative h-44 sm:h-auto">
          <img
            className={`absolute bottom-0 -mt-2 left-0 mb-20 h-12  aspect-square  rounded-full shadow-lg shadow-gray-300-300 ${reviewData[1].style||''}`}
            src={reviewData[1].profile}
            onClick={() => rotateArrayOnClick(1)}
            alt=""
          />
        </div>
        <div className="relative h-36 sm:h-auto">
          <img
            className={`absolute sm:bottom-0 top-0 sm:top-auto right-2 sm:right-6 mb-20 h-16  aspect-square  rounded-full shadow-lg shadow-gray-300-300 ${reviewData[2].style||''}`}
            src={reviewData[2].profile}
            onClick={() => rotateArrayOnClick(2)}
            alt=""
          />
        </div>
        <div className="relative h-36 sm:h-auto">
          <img
            className={`absolute sm:bottom-0 top-0 sm:top-auto  left-2 sm:left-6 mb-20 h-16 aspect-square rounded-full shadow-lg shadow-gray-300-300 ${reviewData[3].style||''}`}
            src={reviewData[3].profile}
            onClick={() => rotateArrayOnClick(3)}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Review;
