import React from "react";
import { Code } from "../../../utils/Helpers";

const Eighteen = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/tailwindCSS/poster.png"
        alt="Tailwind CSS Blog"
      />
      <br />
      <p>
        <b>What Is Tailwind CSS ? </b>
      </p>
      <br />
      <p>
        Tailwind CSS is a widely-used utility-first CSS framework that
        simplifies the creation of modern, responsive web designs. When paired
        with React, a robust JavaScript library for building user interfaces, it
        enables you to develop dynamic and visually engaging web applications.
        This guide will introduce you to the fundamentals of Tailwind CSS and
        demonstrate how to integrate it into your React projects effectively.
      </p>
      <br />

      <p>
        <b>Setting Up a React Project </b>
      </p>
      <p>
        Before we dive into using Tailwind CSS with React, make sure you have a
        React project set up. You can create a new React application using
        Create React App or any other preferred method. Once your React project
        is ready, you can start integrating Tailwind CSS.
      </p>
      <Code
        language={"bash"}
        code={`
npx create-react-app my-tailwind-app
cd my-tailwind-app`}
      />
      <p>
        <b>Integrating Tailwind CSS with React</b>
      </p>
      <p>
        Follow these steps to integrate Tailwind CSS into your React project:
      </p>
      <br />
      <p>
        <b>1. Install Tailwind CSS</b>
      </p>
      <p>
        Install tailwindcss via npm, and then run the init command to generate
        your tailwind.config.js file.
      </p>
      <Code
        language={"bash"}
        code={`
npm install -D tailwindcss
npx tailwindcss init`}
      />
      <p>
        <b>2. Configure your template paths</b>
      </p>
      <p>In tailwind.config.js paste the below code </p>
      <Code
        language={"js"}
        code={`
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}
      />
      <p>
        <b>3. Add the Tailwind directives to your CSS</b>
      </p>
      <p>
        Add the @tailwind directives for each of Tailwind’s layers to your
        ./src/index.css file.
      </p>
      <p>in index.css add these </p>
      <Code
        language={"css"}
        code={`
@tailwind base;
@tailwind components;
@tailwind utilities;`}
      />
      <p>
        <b>4. Start your build process</b>
      </p>
      <p>Run your build process with npm run start.</p>
      <Code
        language={"bash"}
        code={`
npm run start`}
      />
      <p>
        <b>5. Start using Tailwind in your project</b>
      </p>
      <p>Start using Tailwind’s utility classes to style your content.</p>
      <Code
        language={"css"}
        code={`
export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}`}
      />
      <br />
      <p>
        Tailwind CSS allows you to easily customize and add your own colors by
        modifying the configuration file, offering flexibility to tailor your
        design to match your unique brand or project needs.
      </p>
      <br />
      <p>
        <b>Customizing Colors in Tailwind CSS</b>
      </p>
      <p>
        for adding more cudtom colour to the project you can follow the further
        steps
      </p>
      <br />
      <p>
        <b>1. Edit the Tailwind Configuration File:</b>
      </p>
      <p>
        Open tailwind.config.js and extend the colors section in the theme
        configuration to include your custom colors.
      </p>
      <Code
        language={"js"}
        code={`
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1E40AF',
        'custom-green': '#10B981',
        // Add additional custom colors here
      },
    },
  },
}`}
      />
      <p>
        <b>2. Use Custom Colors in Your Styles:</b>
      </p>
      <p>
        Apply these custom colors in your JSX using Tailwind’s utility classes.
      </p>
      <Code
        language={"css"}
        code={`
// Example usage in JSX
function App() {
  return (
    <div className="bg-custom-blue text-white p-4">
      Custom color example
    </div>
  );
}`}
      />
      <p>
        By following these steps, you can easily integrate additional custom
        colors into your Tailwind CSS setup.
      </p>
    </div>
  );
};

export default Eighteen;
