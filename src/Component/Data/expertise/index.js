/* Registry: URL slug → page content.
   The slug is what appears in the address bar: /expertise/<slug> */
import reactJs from "./reactJs";
import python from "./python";
import nextJs from "./nextJs";
import django from "./django";
import devopsExpertise from "./devopsExpertise";
import flutter from "./flutter";

const EXPERTISE_DATA = {
  "react-js": reactJs,
  python,
  "next-js": nextJs,
  django,
  devops: devopsExpertise,
  flutter,
};

export default EXPERTISE_DATA;
