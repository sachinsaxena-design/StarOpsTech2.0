import reacthero from '../../../assets/react-hero.jpg'
import reactintro from '../../../assets/react-intro.jpg'
console.log(reacthero)
const heroImg = reacthero;
const introImg = reactintro;

const reactJs = {
  hero: { title: "React Js Development Services", image: heroImg },

  intro: {
    title: "Dynamic Web Solutions with React",
    subtitle: "Fast, interactive interfaces built on a component architecture that scales with your product.",
    paragraphs: [
      "StarOps builds modern web applications with React, the library behind some of the web's most responsive products. Our developers turn complex requirements into clean, reusable components that are fast to build and easy to maintain.",
      "From single-page applications and dashboards to full customer-facing platforms, we focus on performance, accessibility, and a polished user experience on every screen size.",
      "We pair React with the right tooling, including TypeScript, modern state management, and automated testing, so your codebase stays healthy as it grows.",
    ],
    image: introImg,
    imageAlt: "StarOps developer building a React interface",
  },

  solutions: {
    title: "Our React Js Solutions",
    subtitle: "Everything you need to design, build, and scale a React front end.",
    items: [
      { title: "Custom React Applications", text: "Single-page apps and dashboards built from scratch around your workflows, with a clear structure and fast load times." },
      { title: "Component Libraries & Design Systems", text: "Reusable, documented components that keep your product consistent and speed up every new feature." },
      { title: "State Management & Performance", text: "Predictable data flow and careful optimization so large applications stay smooth and responsive." },
      { title: "Migration to React", text: "Move legacy front ends to React step by step, without disrupting your users or your release schedule." },
      { title: "API & Real-Time Integration", text: "Connect your interface to REST, GraphQL, and WebSocket back ends for live, data-rich experiences." },
      { title: "Testing & Maintenance", text: "Unit and end-to-end tests, upgrades, and ongoing support to keep your application stable and secure." },
    ],
  },

  caseStudies: {
    title: "React Projects That Deliver",
    subtitle: "The kinds of front-end challenges we solve with React.",
    items: [
      { title: "A Real-Time Analytics Dashboard", text: "Building a responsive dashboard that updates live and stays fast even with large data sets." },
      { title: "Rebuilding a Legacy Interface", text: "Replacing an aging front end with React, improving speed, usability, and developer productivity." },
      { title: "A Shared Component Library", text: "Creating reusable components that unified several products under one consistent design." },
      { title: "A Customer Portal with Role-Based Access", text: "Delivering a secure portal where each user type sees exactly the tools and data they need." },
      { title: "Speeding Up a Slow Application", text: "Profiling and optimizing rendering to cut load times and make interactions feel instant." },
      { title: "A Mobile-Friendly Web App", text: "Designing a React app that feels native on phones while working just as well on desktop." },
    ],
  },

  faq: {
    title: "Frequently Asked Question",
    subtitle: "Common questions about React development with StarOps.",
    items:  [
      {
        question: "What ReactJS services does StarOps provide?",
        answer: "StarOps specializes in end-to-end ReactJS development, offering consultation, design, coding, testing, and deployment. Tailored solutions for your business needs."
      },
      {
        question: "How does StarOps approach ReactJS project consultation?",
        answer: "Our consultation involves a thorough understanding of your goals, ensuring we provide strategic insights for an impactful ReactJS solution."
      },
      {
        question: "What sets StarOps ReactJS development apart?",
        answer: "StarOps stands out with innovative solutions, transparent communication, and a commitment to exceeding expectations in every ReactJS project."
      },
      {
        question: "Can StarOps create cross-platform applications using ReactJS?",
        answer: "Yes, StarOps leverages ReactJS expertise to develop cross-platform applications compatible with various operating systems."
      },
      {
        question: "How does StarOps optimize performance in ReactJS applications?",
        answer: "We implement performance optimization techniques, ensuring lightning-fast loading times and a smooth user experience in ReactJS development."
      },
      {
        question: "What is the typical timeline for a ReactJS project at StarOps?",
        answer: "The timeline varies based on project complexity. StarOps follows an agile methodology, delivering efficient and quality ReactJS solutions."
      },
      {
        question: "Can StarOps assist in migrating existing projects to ReactJS?",
        answer: "Yes, StarOps provides expertise in migrating projects to ReactJS, ensuring a seamless transition and enhanced functionalities."
      },
      {
        question: "How does StarOps ensure the security of ReactJS applications?",
        answer: "Security is a priority. We implement industry best practices for secure coding, data encryption, and authentication in ReactJS development."
      },
      {
        question: "What industries benefit from StarOps ReactJS solutions?",
        answer: "StarOps serves diverse industries, tailoring ReactJS solutions for healthcare, finance, e-commerce, entertainment, and more."
      },
      {
        question: "What is the pricing model for ReactJS development services at StarOps?",
        answer: "StarOps offers flexible pricing models, including fixed pricing, time and materials, or a dedicated team, based on ReactJS project requirements."
      }
    ],
  },
};

export default reactJs;
