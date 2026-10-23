import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ServicePage from "./ServicePage/ServicePage";
import SERVICES_DATA from "../Data/service";
import ContactUs from "../Section/ContactUsSections";


export default function ServiceDetail() {
  const { slug } = useParams();
  const data = SERVICES_DATA[slug];


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    if (data) document.title = `${data.hero.title} | StarOps`;
  }, [slug, data]);

  if (!data) {
    return (
      <main className="grid min-h-svh place-items-center bg-[#05060a] px-6 text-center text-white">
        <div>
          <h1 className="text-[clamp(28px,4vw,56px)] font-semibold tracking-[-0.03em]">Service not found</h1>
          <p className="mt-3 text-white/60">We couldn't find that service page.</p>
          <Link to="/" className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-medium text-black">
            Back to home
          </Link>
        </div>
      </main>
    );
  }


  return (
    <>
      <ServicePage key={slug} data={data} />
      <ContactUs />
    </>
  )
}