import React from "react";
import { Code } from "../../../utils/Helpers";

const TwentyOne = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ngrok/ngrok-installation-guide.webp"
        alt="Ngrok Installation guide"
      />
      <br />
      <p>
        <b>What is Ngrok ?</b>
      </p>
      <p>
        Ngrok is a powerful tool that allows you to securely expose a locally
        running web service to the internet by creating a public-facing tunnel.
        Simply put, it enables you to share a web server on your local machine
        with the outside world, making it accessible from anywhere. <br />
        <br /> For instance, if you're developing a web application on your
        laptop, ngrok can generate a public URL that routes traffic directly to
        your local development environment. This is incredibly useful for
        sharing your in-progress work with others for testing, demos, or even
        accessing it remotely—without the need to deploy it on a live server.
        It's a seamless way to make your local project temporarily available to
        anyone, anywhere.
      </p>
      <br />
      <p>
        <b>Introduction to Ngrok: A Quick Start Guide</b>
      </p>
      <p>
        <strong>Ngrok</strong> is a powerful tool that establishes a secure
        tunnel between a public endpoint and a locally running web service,
        allowing you to make your local server accessible over the internet.
      </p>
      <br />
      <p>
        <b>With ngrok, you can easily:</b>
      </p>
      <ul className="list-inside list-disc">
        <li>Publicly share a website hosted on your local machine</li>
        <li>Showcase and demo an application under development</li>
        <li>Expose and share any TCP service running locally</li>
        <li>Test webhooks and external integrations with your local setup</li>
        <li>
          Access local websites or tools through a secure, remote connection
        </li>
      </ul>
      <br />
      <h3>
        <b>Core Features:</b>
      </h3>
      <ul className="list-disc list-inside">
        <li>Provide public access to locally hosted services</li>
        <li>Create secure tunnels to local web servers</li>
        <li>Inspect and replay traffic directed to your local endpoints</li>
        <li>Route traffic to specified ports on your machine</li>
      </ul>
      <br />
      <p>
        <b>Installation of NGrok</b>
      </p>
      <p>
        <b>Step 1:</b> SignUp on Ngrok
      </p>
      <p>
        Go to https://ngrok.com/download website and sign up or log in with
        Google.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ngrok/install-ngrok-through-brew.webp"
        alt="Install Ngrok on Mac"
      />
      <br />
      <p>
        <b>Step 2:</b>Install Ngrok
      </p>
      <p>
        Now, you need to open the terminal and run the command brew install
        ngrok/ngrok/ngrok this will install ngrok on your mac
      </p>
      <Code
        language={"bash"}
        code={`
brew install ngrok/ngrok/ngrok`}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ngrok/installing-ngrok.webp"
        alt="Install ngrok Homebrew"
      />
      <br />
      <p>
        <b>Step 3:</b>Add Authentication Token
      </p>
      <p>
        Now, you need run the command Run the following command to add your auth
        token to the default ngrok.yml configuration file. replace
        &lt;your-token&gt; with the your original auth token
      </p>
      <Code
        language={"bash"}
        code={`
ngrok config add-authtoken <your-token>`}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ngrok/adding-ngrok-authtoken.webp"
        alt="Add auth token in ngrok"
      />
      <br />
      <p>
        <b>Step 4:</b>Share your Localhost online
      </p>
      <p>
        Now, the final step is to start the Ngrok server. Use the following
        command to start the Ngrok server.replace &lt;port-number&gt; with the
        port number on which your application is running on <br />
        Well, we can use any port number to start the server like 8888, 8080,
        4242, 4444, etc.
      </p>
      <Code
        language={"bash"}
        code={`
ngrok http http://localhost:<port-number>`}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ngrok/serving-localhost-3000.webp"
        alt="Sharing Local host via ngrok"
      />
      <br />

      <p>
        <b>conclusion:</b>
      </p>
      <p>
        <strong>ngrok</strong> offers a convenient and secure way to make any
        locally hosted web service instantly available over the internet,
        simplifying collaboration, testing, and development workflows.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ngrok/exposed-3000.webp"
        alt="Add auth token in ngrok"
      />
      <br />

      {/* Self SEO  */}
      <div className="absolute -left-[9999px] ">
        <p>
          Divyanshu Verma, a passionate software developer currently pursuing
          his MTech at NIT Hamirpur. With a deep interest in exploring the inner
          workings of technology, Divyanshu has spent years honing his skills in
          full-stack development. Not only is he dedicated to building
          innovative and efficient applications, but he also actively
          contributes to the tech community by writing insightful blogs on
          emerging trends and technologies. His curiosity and drive to keep
          learning make him a standout in the tech world.
        </p>
        <a href="www.linkedin.com/in/divyanshuan"></a>
        <img
          src="https://divyanshuverma.site/Images/Divyanshu-Verma-NITH.webp"
          alt="Divyanshu verma NIT Hamirpur"
        />
        <img
          src="https://divyanshuverma.site/Images/Divyanshu-Verma-Photo.webp"
          alt="Divyanshu verma MTech NIT Hamirpur"
        />
        <img
          src="https://divyanshuverma.site/Images/Divyanshu-Verma-Software-Developer.webp"
          alt="Divyanshu verma softwere developer"
        />
        <img
          src="https://divyanshuverma.site/Images/Divyanshu-verma-developer-profile.webp"
          alt="profile pic of Divyanshu verma"
        />
        <img
          src="https://divyanshuverma.site/Images/Divyanshu-verma-developer.webp"
          alt="Divyanshu verma React Developer"
        />
        <img
          src="https://divyanshuverma.site/Images/Divyanshu-verma.webp"
          alt="Divyanshu verma NIT Hamirpur library"
        />
        <img
          src="https://divyanshuverma.site/Images/mrverma.webp"
          alt="
        Divyanshu Verma Picture"
        />
      </div>
    </div>
  );
};

export default TwentyOne;
