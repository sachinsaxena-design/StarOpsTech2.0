import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ExpertisePage from "./ExpertisePage/ExpertisePage";
import EXPERTISE_DATA from "../data/expertise";


export default function ExpertiseDetail() {
  const { slug } = useParams();
  const data = EXPERTISE_DATA[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    if (data) document.title = `${data.hero.title} | StarOps`;
  }, [slug, data]);

  if (!data) {
    return (
      <main className="grid min-h-svh place-items-center bg-[#05060a] px-6 text-center text-white">
        <div>
          <h1 className="text-[clamp(28px,4vw,56px)] font-semibold tracking-[-0.03em]">Page not found</h1>
          <p className="mt-3 text-white/60">We couldn't find that expertise page.</p>
          <Link to="/" className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-medium text-black">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  
  return <ExpertisePage key={slug} data={data} />;
}