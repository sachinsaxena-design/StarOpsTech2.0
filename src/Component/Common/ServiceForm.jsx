import React, { useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

const ServiceForm = () => {
  const form = useRef();
  const [key, setKey] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    mobileNo: "",
    email: "",
  });
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateMobileNo = (mobileNo) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobileNo);
  };
  const validateForm = () => {
    const name = form.current.name.value;
    const mobileNo = form.current.mobile_no.value;
    const email = form.current.email.value;
    const newErrors = {
      name: name ? "" : "Name is required",
      mobileNo: mobileNo
        ? validateMobileNo(mobileNo)
          ? ""
          : "Invalid mobile number"
        : "Mobile number is required",
      email: email
        ? validateEmail(email)
          ? ""
          : "Invalid email address"
        : "Email is required",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    emailjs
      .sendForm("service_5w4nb5c", "template_246bben", form.current, {
        publicKey: "8KuKon5nVMyxfYNzZ",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          form.current.reset();
          alert("form submitted sucessfully");
          setErrors({
            name: "",
            mobileNo: "",
            email: "",
          });
        },
        (error) => {
          alert("form not Submitted");
          console.log("FAILED...", error.text);
        }
      );
  };
  const advantagesArray = [
    "Excellent Team",
    "Effective Delivery",
    "Quality Efforts",
    "Genuineness and Commitment",
    // "Up to 50% Cost Saving",
    "Source Code Authorization",
    "Non-Disclosure Agreement",
    "No Lock-In Contract",
    "Agile & DevOps Implementation",
    "Clean Code",
    "Fast and Easy On-boarding",
    "Total Control Over the Code",
  ];
  const onChange = (value) => {
    setKey(value);
  };

  return (
    <div className="mt-24 p-2 md:p-0 container mx-auto flex flex-col items-center justify-center">
      <SectionHeading
        heading="Connect with Us"
        description="Discover the best solutions with our expert team. Reach out for assistance and experience excellence in every query."
      />

      <div className="mt-10 w-full  flex flex-col md:flex-row gap-5 ">
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center border p-6 rounded-lg bg-slate-50 bg-opacity-10 shadow-lg">
          <p className="text-2xl py-10">Contact Form</p>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-full  grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4"
          >
            <div className="relative pt-5 w-full ">
              <label
                className="absolute top-0 left-0 text-sm font-semibold"
                htmlFor="name"
              >
                Name <span className="text-xs text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-lg border p-1 text-slate-700 outline-none focus:border-logo"
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs font-medium pt-1">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="relative pt-5 w-full ">
              <label
                className="absolute top-0 left-0 text-sm font-semibold"
                htmlFor="mobile_no"
              >
                Mobile No <span className="text-xs text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-lg border p-1 text-slate-700 outline-none focus:border-logo "
                type="text"
                id="mobile_no"
                name="mobile_no"
                placeholder="Enter your mobile no"
              />
              {errors.mobileNo && (
                <p className="text-red-500 text-xs font-medium pt-1">
                  {errors.mobileNo}
                </p>
              )}
            </div>
            <div className="relative pt-5 w-full ">
              <label
                className="absolute top-0 left-0 text-sm font-semibold"
                htmlFor="email"
              >
                Email <span className="text-xs text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-lg border p-1 text-slate-700 outline-none focus:border-logo "
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-medium pt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="relative pt-5 w-full ">
              <label
                className="absolute top-0 left-0 text-sm font-semibold"
                htmlFor="country"
              >
                Country
              </label>
              <input
                className="w-full rounded-lg border p-1 text-slate-700 outline-none focus:border-logo "
                type="text"
                id="country"
                name="country"
                placeholder="Enter your country"
              />
            </div>

            <div className="relative pt-5 w-full  md:col-span-2">
              <label
                className="absolute top-0 left-0 text-sm font-semibold"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                className="w-full rounded-lg border p-1 text-slate-700 outline-none focus:border-logo"
                id="message"
                name="message"
                placeholder="Enter your message"
                rows="5"
              ></textarea>
            </div>
            <ReCAPTCHA
              sitekey="6Lf6EwUrAAAAAH2rLpt6RxPqCVJ1XvOTkw7_MrUh"
              onChange={onChange}
            />
            <div className="md:col-span-2 flex items-center justify-center">
              <button
                className={`${
                  key ? "bg-logo" : "bg-gray-400 cursor-not-allowed"
                } rounded-lg shadow-blue-300 shadow-sm px-3 py-1 text-white`}
                disabled={!key}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/3 border bg-slate-50 bg-opacity-10 p-6 flex flex-col  rounded-lg shadow-lg">
          <h1 className="text-2xl font-medium text-left w-11/12  ">
            We Delivering Customer Sucesss
          </h1>
          <p className="text-sm font-light  w-10/12">
            Building Software-As-A-Service (SaaS) Products Requires A Unique
            Approach
          </p>
          <div className="py-2">
            <ul>
              {advantagesArray.map((value, key) => (
                <li
                  className="flex flex-row items-center justify-start gap-2"
                  key={key}
                >
                  <img
                    className="h-7"
                    src="https://cdn-icons-png.flaticon.com/512/6559/6559073.png"
                    alt="Excellent Team Icon"
                  />
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
