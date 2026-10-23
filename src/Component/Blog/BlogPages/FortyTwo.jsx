const FortyTwo = () => {
  return (
    <div>
      <img
        className="max-h-[800px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Immich/p_4.png"
        alt="Immich On Casaos"
      />
      <p>
        Once CasaOS was up and running on my home server, I finally had a stable
        foundation to start experimenting with real-world services. Not just
        things that looked cool on a dashboard, but tools that could actually
        replace something my family and I already used every day.
      </p>
      <p>Photos felt like the obvious place to start.</p>
      <p>
        Between phones, WhatsApp forwards, cloud backups, and random old hard
        drives, our family photos were scattered everywhere. Some were backed
        up, some weren’t, and most of us were just hoping nothing important
        would ever get lost.
      </p>
      <br />
      <p>
        That’s when I came across <a href="https://immich.app/">Immich.</a>
      </p>
      <b>What Is Immich (in Simple Terms)?</b>
      <p>
        Immich is a self-hosted photo and video backup solution that feels very
        similar to Google Photos — except it runs entirely on your own server.
        It gives you:
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>Automatic photo backups from your phone</li>
        <li>Clean, timeline-based photo gallery</li>
        <li>Separate user accounts for each family member</li>
        <li>Full control over where your data lives</li>
      </ul>
      <p>For someone already running CasaOS, Immich felt like a perfect fit.</p>

      <b>Installing Immich via CasaOS</b>
      <p>
        One of the things I really appreciate about CasaOS is how approachable
        it makes Docker. Under the hood, everything runs using Docker, but you
        rarely have to think about that while getting started.
      </p>
      <p>
        To install Immich, I opened the CasaOS dashboard and headed to the App
        Store. A quick search brought up Immich, along with a short description
        and the required services it would spin up.
      </p>
      <p>The installation process itself was mostly point-and-click:</p>
      <p>Choose the storage directory where photos and videos would live</p>
      <img
        className="max-h-[800px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Immich/p_8.png"
        alt="Creating file on Casaos"
      />
      <p>
        go to app store of Casaos and search Immich using Casaos really helpd me
        to be manage things without being technerd
      </p>
      <img
        className="max-h-[800px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Immich/p_2.png"
        alt="Casaos immich"
      />
      <p>
        First-Time Setup and Configuration On first access, Immich walks you
        through creating an admin account. This account controls the server and
        manages users, which is important if you’re planning to use it with
        family members. I spent some time making sure the storage paths were
        correct. Since photos are the most important data on the server, I
        wanted them stored somewhere obvious and easy to back up later. This
        step felt less like “server administration” and more like setting up a
        new app — which, honestly, made the experience much less intimidating.
      </p>
      <img
        className="max-h-[800px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Immich/p_3.png"
        alt="Configuration in immich"
      />
      <b>Adding Family Members</b>
      <img
        className="max-h-[800px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Immich/p_7.png"
        alt="Creating new user in Immich"
      />
      <p>Each family member gets:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>Their own login</li>
        <li>Their own photo library</li>
        <li>Full privacy by default</li>
      </ul>
      <p>
        I created separate accounts and shared the server IP with them. Once
        logged in, everyone could see an empty timeline — ready to be filled.
      </p>
      <p>This is where Immich really started to feel powerful.</p>
      <b>Everyday Usage Experience</b>

      <p>Using Immich day-to-day feels fast and familiar.</p>

      <p>
        Scrolling through years of photos is smooth, uploads over local Wi-Fi
        are quick, and the interface stays responsive even on modest hardware.
        Since everything is running locally, there’s no waiting on cloud servers
        or throttled speeds.
      </p>
      <img
        className="max-h-[800px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Immich/p_5.png"
        alt="Immich Server stats"
      />

      <p>
        What surprised me most was how invisible the server became. Once set up,
        no one thinks about it anymore — which is exactly how good
        infrastructure should behave.
      </p>

      <b>What I Want to Improve Next</b>

      <p>This setup is solid, but there’s always room to grow:</p>

      <ul className="list-disc ml-6 space-y-1">
        <li>Scheduled backups of Immich data</li>
        <li>External storage or NAS integration</li>
        <li>Secure remote access via VPN</li>
        <li>Shared family albums for events and trips</li>
      </ul>

      <p>
        Each improvement feels like another step deeper into understanding how
        systems really work — not just in theory, but in everyday life.
      </p>
    </div>
  );
};

export default FortyTwo;
