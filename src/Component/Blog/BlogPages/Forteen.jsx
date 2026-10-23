import React from "react";
import { Code } from "react-code-blocks";
import { Para } from "../../../utils/Helpers";

const Forteen = () => {
  return (
    <>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/react-tostify/React Tostify.png"
        alt="react tostify"
      />
      <br />
      <p>
        <strong>React Toastify</strong>
      </p>
      <br />
      <Para>
        React Toastify is like the superstar of displaying those pop-up messages
        you often see in React apps. It's loved for being easy to use and
        letting developers tweak the messages to match their app's style. You
        can make different kinds of messages - like when something goes right,
        wrong, or just for info.
        <br />
        <br />
        One cool thing about React Toastify is how customizable it is. You can
        decide how long the messages stay, where they pop up on the screen, and
        how they look. This means they fit right in with your app's vibe.
        <br />
        <br />
        People really dig React Toastify because it's simple and doesn't make
        you write tons of code. You just add one part to your app, and boom,
        you're ready to show messages. It's also super friendly with different
        versions of React, so you can use it on all sorts of projects.
        <br />
        <br />
        But wait, there's more! React Toastify offers extra features to make
        your app even cooler. You can tweak how the messages look, where they
        show up, and even add buttons to them. And because it's always being
        looked after and improved by a bunch of folks, you know it's reliable
        for your projects, big or small.
      </Para>
      <p>
        <b>When to use react-tostify</b>
      </p>
      <br />
      <p>
        React Toastify comes in handy when you want to keep users updated with
        notifications or toast messages in various situations. Here are some
        common scenarios where it shines:
      </p>
      <ul className="list-inside  list-disc">
        <li>
          Celebrating successful form submissions: Give users a pat on the back
          with a success message when they successfully submit a form.
        </li>

        <li>
          Handling errors or validation hiccups: If something goes wrong during
          form submission or validation, React Toastify can help by showing
          error messages or highlighting areas needing attention.
        </li>

        <li>
          Keeping users in the loop during async tasks: Whether it's fetching
          data from an API or uploading files, React Toastify can display
          loading indicators or progress bars to let users know what's happening
          behind the scenes.
        </li>
        <li>
          Sharing important updates: Use React Toastify to spread the word about
          system updates, new features, or important notifications users need to
          be aware of.
        </li>
      </ul>
      <br />
      <p>
        In the next section, we'll dive into how to use React Toastify to notify
        users about the results of an API call for guessing nationalities based
        on a given name.
      </p>
      <br />
      <p>
        <b>How to use React-Totify in react Project</b>
      </p>
      <p>
        Use any of the commands below to install React-Toastify in a React
        project:
      </p>
      <Code
        code={`
  # npm
  npm install react-toastify
  # yarn
  yarn add react-toastify`}
        language={"shell"}
      />
      <br />
      <p>
        Once you've installed React-Toastify, you'll need to bring in the
        ToastContainer component and the toast object into your project.
        Additionally, make sure to include the CSS file provided by
        React-Toastify. Here's how you can do it:
      </p>
      <Code
        code={`
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';`}
        language={"jsx"}
      />
      <br />
      <p>
        In your App.js file, include the React-Toastify library and its
        associated CSS file. Then, use the toast.success function to display a
        success notification message. Here's an example:
      </p>
      <Code
        code={`
  import "./App.css";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  function App() {
    const showToast = () => {
      toast.success("Success Notification !");
    };
    return (
      <div className="App">
        <ToastContainer />
        <button onClick={showToast}>Notify</button>
      </div>
    );
  }
  
  export default App;
            `}
        language={"jsx"}
      />
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg border"
        src="https://cdn.staropstech.com/starops/Blogs/react-tostify/reacttostify.png"
        alt="react tostify"
      />
      <br />
      <p>
        <b>Changing your toast message’s position and toast message types</b>
      </p>
      <br />
      <p>
        This method employs distinct styling for each type of message, aiding
        quick comprehension of the information and its purpose. For instance, a
        red-colored toast UI often indicates a warning or error, while a
        green-colored one typically signifies a successful response
      </p>
      <br />
      <p>
        By default, toast messages appear at the top right of the page. You can
        change this position by specifying a different one from the six
        available options provided by React-Toastify:
      </p>
      <ul className="list-inside list-disc">
        <li>Top right</li>
        <li>Top center</li>
        <li>Top left</li>
        <li>Bottom right</li>
        <li>Bottom center</li>
        <li>Bottom left</li>
      </ul>
      <p>
        Simply choose the desired position to display your toast messages
        accordingly.
      </p>
      <Code
        code={`
  import "./App.css";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  function App() {
    const notify = () => {
      toast("Default Notification !");
      toast.success("Success Notification !", {
        position: "top-center",
      });
  
      toast.error("Error Notification !", {
        position: "top-left",
      });
  
      toast.warn("Warning Notification !", {
        position: "bottom-left",
      });
  
      toast.info("Info Notification !", {
        position: "bottom-center",
      });
  
      toast("Custom Style Notification with css class!", {
        position: "bottom-right",
      });
    };
    return (
      <div className="App">
        <ToastContainer />
        <button onClick={notify}>Notify</button>
      </div>
    );
  }
  export default App;
  
          `}
        language={"jsx"}
      />
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg border"
        src="https://cdn.staropstech.com/starops/Blogs/react-tostify/typesoftoast.png"
        alt="react tostify"
      />
    </>
  );
};

export default Forteen;
