import profileData from "../Data/blog/blogprofile.json";

const RenderProfile = ({ name }) => {
  const data = profileData[name];
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={data.link}
      className="flex items-center gap-3"
    >
      <img
        className="h-9 aspect-square rounded-full"
        src={data.profile}
        alt={`profile pic of ${data.name}`}
      />
      <div className="flex flex-col text-gray-700">
        <div className="flex flex-row gap-2 items-center">
          <p className="font-semibold leading-4">{data.name}</p>
          <img
            className="h-3 brightness-110"
            src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"
            alt={`linkedin icon`}
          />
        </div>
        <p className="text-xs">{data.position}</p>
      </div>
    </a>
  );
};

export default RenderProfile;
