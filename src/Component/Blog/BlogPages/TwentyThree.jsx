import React from "react";
import { Code } from "../../../utils/Helpers";

const TwentyThree = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Docker_Containers/cover.jpeg"
        alt="Docker Containers"
      />
      <br />
      <p>
        Imagine you’re a chef who travels around the world, bringing delicious
        recipes to different kitchens. Each time you arrive, you want everything
        to be perfect: the right tools, ingredients, and environment to whip up
        a fantastic meal. But packing an entire kitchen for every trip would be
        exhausting! <br />
        Enter <b>Docker containers</b>: your trusty traveling kitchen, ready to
        help you serve up amazing dishes no matter where you are. In this blog,
        we’ll explore Docker containers and how they work, all while following
        our chef’s culinary journey!
      </p>
      <br />
      <p>
        <b>The Magical Kitchen: What Are Docker Containers?</b>
      </p>
      <p>
        As our chef, let’s call you <b>Chef Aditi</b>, you know that a great
        meal needs the right ingredients and tools. A Docker container is like a
        magical kitchen that holds everything you need to cook your dish: the
        recipe (your code), ingredients (libraries and dependencies), and all
        the cooking tools (runtime and environment).
        <br /> No matter if you’re in the luxurious Taj Hotel in Mumbai or the
        bustling Paranthe Wali Gali in Chandni Chowk, your kitchen (container)
        will help you create the same wonderful meal every time.
      </p>
      <br />
      <p>
        <b>Containers vs. Traditional Kitchens (Virtual Machines)</b>
      </p>
      <p>
        Now, Chef Aditi, imagine trying to pack an entire kitchen every time you
        traveled. It would take forever and use up so much space! That’s what
        traditional virtual machines (VMs) are like. They require a whole
        operating system and lots of resources.
        <br />
        Instead, containers are like modular kitchen boxes that fit neatly in
        your suitcase. They share the kitchen’s main tools (the host OS) while
        keeping everything else packed and organized. This makes containers
        lightweight, quick to set up, and easy to transport!
      </p>
      <br />
      <p>
        <b>Chef Aditi's First Cooking Adventure: Running a Docker Container</b>
      </p>

      <p>
        One day, Chef Aditi gets invited to prepare an extravagant meal for a
        wedding at Baga Beach, Goa. To get started, she needs to set up her
        Docker container (kitchen) with an Nginx web server to display the
        wedding menu.
      </p>
      <br />
      <p>
        <b>Step 1: Setting Up the Kitchen</b>
      </p>
      <p>
        With just a flick of her wrist (or a command line), Chef Aditi runs the
        following command to set up her kitchen:
      </p>
      <Code
        language={"bash"}
        code={`
docker run -d -p 80:80 nginx`}
      />
      <p>
        What does this do? It tells Docker to:
        <ul className="list-inside list-disc">
          <li>
            <b>`-d`</b>: Run the kitchen in the background (detached mode).
          </li>
          <li>
            <b>-p 80:80</b>: Open a serving window (port 80) for wedding guests
            to see the delicious menu.
          </li>
          <li>
            <b>nginx</b>: Set up an Nginx server as her cooking station.
          </li>
        </ul>
      </p>
      <p>
        <b>Step 2: Checking Out the Cooking Stations</b>
      </p>
      <p>Curious about which kitchens are open, Chef Aditi decides to check:</p>
      <Code
        language={"bash"}
        code={`
docker ps`}
      />
      <p>
        This command shows all the active kitchens (containers). If she wants to
        see the kitchens that have already closed up shop, she types:
      </p>
      <Code
        language={"bash"}
        code={`
docker ps -a`}
      />

      <p>
        <b>Managing the Cooking Stations: Starting and Stopping Containers</b>
      </p>
      <p>
        As Chef Aditi serves her guests at the wedding, sometimes she needs to
        pause a station or restart one if something goes wrong. Here’s how she
        manages them:
      </p>
      <ul className="list-inside list-disc">
        <li>
          <b>Starting a kitchen again</b> (if it’s closed):
          <Code
            language={"bash"}
            code={`
docker start <container_id>`}
          />
        </li>
        <li>
          <b>Stopping a kitchen temporarily</b>:
          <Code
            language={"bash"}
            code={`
docker stop <container_id>`}
          />
        </li>
        <li>
          <b>Restarting a kitchen</b> (if the soufflé falls):
          <Code
            language={"bash"}
            code={`
docker restart <container_id>`}
          />
        </li>
        <li>
          If a kitchen is too chaotic, she can even force it to close down:
          <Code
            language={"bash"}
            code={`
docker kill <container_id>`}
          />
        </li>
      </ul>

      <p>
        <b>Peeking Inside the Kitchen: Inspecting Containers</b>
      </p>
      <p>
        Sometimes, Chef Aditi needs to check what’s happening in one of her
        kitchens. Using the
        <Code
          language={"bash"}
          code={`
docker exec -it <container_id> /bin/bash`}
        />
        command, she can step inside to see what’s cooking. Now, she’s inside
        the container, able to inspect the ingredients and fix any issues that
        may arise!
      </p>
      <br />
      <p>
        <b>Keeping Track of What’s Cooking: Viewing Container Logs</b>
      </p>
      <p>
        As the wedding guests are being served, Chef Aditi likes to keep track
        of who ordered what. In Docker, every container keeps a log of its
        activities. To see what’s been happening in her kitchen, Chef Aditi can
        check the logs:
      </p>
      <Code
        language={"bash"}
        code={`
docker logs <container_id>`}
      />
      <p>
        This way, she knows how many guests have enjoyed her signature dishes!
      </p>
      <br />
      <p>
        <b>Cleaning Up After the Wedding Feast: Removing Containers</b>
      </p>
      <p>
        Once the wedding is over, it’s time to clean up. To remove a container
        that’s no longer needed, Chef Aditi uses:
      </p>
      <Code
        language={"bash"}
        code={`
docker rm <container_id>`}
      />
      <p>
        And if she wants to clear out all the unused kitchens at once, she has a
        quick way to do that:
      </p>
      <Code
        language={"bash"}
        code={`docker stop $(docker ps -aq)
docker rm $(docker ps -aq)`}
      />
      <p>
        This clears out all closed kitchens, making room for new culinary
        adventures.
      </p>
      <br />
      <p>
        <b>Final Cleanup: Pruning Unused Resources</b>
      </p>
      <p>
        After several wedding events, Chef Aditi notices that some ingredients
        and tools are no longer needed. She uses a magic command to tidy up:
      </p>
      <Code
        language={"bash"}
        code={`
docker system prune`}
      />
      <p>
        This clears out any leftover ingredients (unused containers, images, and
        volumes), ensuring that her kitchen stays organized and ready for the
        next big feast!
      </p>
      <br />
      <p>
        <b>Conclusion</b>
      </p>
      <p>
        And there you have it! Through Chef Aditi’s culinary adventures, you’ve
        learned how Docker containers work, from setting them up to managing and
        cleaning them. Just like a traveling chef, containers allow you to take
        your app anywhere, ensuring it runs perfectly every time.
      </p>
      <p>
        In our next blog, we’ll dive into <b>Docker Images</b> — the recipes you
        use to create your containers. Stay tuned for more exciting kitchen
        adventures!
      </p>
    </div>
  );
};

export default TwentyThree;
