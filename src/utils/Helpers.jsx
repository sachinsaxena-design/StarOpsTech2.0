import { CopyBlock, dracula } from "react-code-blocks";

export function filterJobs(jobs, searchParams, jobLocation) {
  if (
    !searchParams &&
    (!jobLocation || jobLocation.toLowerCase() === "job location")
  ) {
    // If searchParams is empty and jobLocation is "Job Location", return all jobs
    return jobs;
  }

  const lowercaseSearchParams = searchParams ? searchParams.toLowerCase() : "";
  const lowercaseJobLocation = jobLocation
    ? jobLocation.toLowerCase()
    : "job location";

  return jobs.filter((job) => {
    // Convert job details to lowercase for case-insensitive comparison
    const lowercaseJobId = job.job_id.toLowerCase();
    const lowercaseJobTitle = job.job_title.toLowerCase();
    const lowercaseTags = job.tags.map((tag) => tag.toLowerCase());

    // Filter based on case-insensitive searchParams
    const matchSearchParams =
      !lowercaseSearchParams ||
      lowercaseJobId.includes(lowercaseSearchParams) ||
      lowercaseJobTitle.includes(lowercaseSearchParams) ||
      lowercaseTags.includes(lowercaseSearchParams);

    // Filter based on case-insensitive jobLocation
    const matchJobLocation =
      lowercaseJobLocation === "job location" ||
      lowercaseJobLocation === "all" || // Assuming "all" is a special case for all locations
      job.job_location.some((location) =>
        location.toLowerCase().includes(lowercaseJobLocation)
      );

    // Return true if both conditions are met
    return matchSearchParams && matchJobLocation;
  });
}

export const Para = ({ children }) => {
  return (
    <>
      <p> {children}</p>
      <br />
    </>
  );
};

export const Code = ({ code, language, br = true }) => {
  return (
    <div className="text-base break-all ">
      <CopyBlock
        text={code}
        language={language}
        theme={dracula}
        showLineNumbers={false}
        wrapLines
        wrapLongLines={true}
      />
      {br ? <br /> : <></>}
    </div>
  );
};
