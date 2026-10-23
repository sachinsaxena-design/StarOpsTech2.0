/* Registry: URL slug → page content.
   The slug is what appears in the address bar: /services/<slug> */
import webDevelopment from "./webDevelopment";
import mobileDevelopment from "./mobileDevelopment";
import devops from "./devops";
import product from "./product";
import itConsulting from "./itConsulting";
import saas from "./saas";

const SERVICES_DATA = {
  "web-development": webDevelopment,
  "mobile-development": mobileDevelopment,
  devops,
  product,
  "it-consulting": itConsulting,
  saas,
};

export default SERVICES_DATA;