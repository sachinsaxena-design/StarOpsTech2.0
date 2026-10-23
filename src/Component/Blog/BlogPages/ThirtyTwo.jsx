// import { Code } from "../../../utils/Helpers";

const ThirtyTwo = () => {
    return (
        <div>
            <p className="text-xl font-bold mb-4">
                Welcome to My Home Lab Adventures
            </p>
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                    
                src="https://cdn.staropstech.com/starops/Blogs/home_lab_adventure/photos/Poster.png"
                alt="MySQL Migration to AWS Graviton EC2"
            />
            <p>
                Since I work in software and product, I’ve mostly spent my days thinking
                about code, features, and user experiences. But over the past few months,
                I’ve found myself getting more curious about what happens under the hood —
                the hardware and infrastructure side of computing. It’s not something I
                need every day at work, but there’s something satisfying about understanding
                how the pieces of a system actually fit together.
            </p>
            <br />
            <p>
                I figured the best way to really get my hands dirty would be to set up a home
                server — something budget-friendly that I could tinker with, experiment on,
                and maybe even learn a thing or two from along the way. It seemed like a small
                project at first, but I quickly realized it was the start of something…
                well, let’s just say addictive.
            </p>

            <br />
            <p>
                Then I spotted an old mini PC I had tucked away — an <strong>HP Elitedesk with
                    a 6th-gen i5 processor</strong>. I hadn’t used it in years, mainly because it
                was painfully slow. It was still running on an old HDD, and with only 4 GB of
                RAM, it could barely handle anything beyond basic tasks. Over time, it just
                ended up sitting in a corner, gathering dust.
            </p>
            <br />
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                    
                src="https://cdn.staropstech.com/starops/Blogs/home_lab_adventure/photos/HpEliteDesk.png"
                alt="MySQL Migration to AWS Graviton EC2"
            />
            <p>
                But as I thought about my home lab project, an idea hit me: this could actually
                be the perfect starting point. It was small, energy-efficient, and if I gave it
                a little love, it could handle multiple services without breaking a sweat. So,
                I decided to breathe new life into it. I replaced the sluggish HDD with a fast
                SSD and upgraded the RAM from 4 GB to 8 GB. It felt like I was giving an old,
                forgotten machine a second chance to prove itself — and I couldn’t wait to see
                what it could do.
            </p>

            <br />
            <p className="font-semibold text-lg">Upgrading the HP: Hard Drive & RAM</p>
            <p>
                With my HP Elitedesk sitting in front of me, it was time to breathe some life
                into it. First up: the hard drive. Luckily, I had another “dead” laptop lying
                around — an Acer V5. (Honestly, I live in a graveyard of old tech I just can’t
                bring myself to throw away… sorry, not sorry.) I managed to pull the old 2.5”
                SATA drive out of the Acer and popped it into the HP.
            </p>
            <br />
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/home_lab_adventure/photos/HomeServerHardware.png "
                alt="MySQL Migration to AWS Graviton EC2"
            />
            <p>
                That little move ended up opening a whole new angle for my server project. While
                digging through the drive, I stumbled across a bunch of old films I’d forgotten
                about. I backed them up, and now they’re going to become part of my server setup —
                more on that later!
            </p>
            <br />
            <p>
                Next, I tackled the RAM. The HP only had 4 GB, which was fine for basic tasks
                but definitely not enough for a proper home server. I slid in an 8 GB stick I had
                lying around, and just like that, the machine suddenly felt a lot more capable.
            </p>
            <br />
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/home_lab_adventure/photos/HomeServerRAM.png "
                alt="MySQL Migration to AWS Graviton EC2"
            />
            <p>
                Between the SSD from the Acer and the RAM upgrade, it felt like I was breathing
                new life into a forgotten computer. It was no longer just a dusty old mini PC —
                it was slowly transforming into a low-energy, multi-service home server, ready
                for some serious tinkering.
            </p>

            <br />
            <p className="font-semibold text-lg">Replacing Windows with Ubuntu</p>
            <p>
                Here comes a bit of a controversial take… The drive I’d popped into the HP was
                still running Windows 8. I could have updated it or just stuck with what was
                there, but I wanted something lightweight for a machine with aging hardware and
                a 750 GB hard drive — especially since this single drive was going to serve as
                both the OS boot and storage.
            </p>
            <p>
                So, I decided to go the Linux route and picked <strong>Ubuntu</strong>. It felt like
                the right choice for a beginner like me who hadn’t really used Linux before.
            </p>
            <br />
            <p>Installing it was surprisingly straightforward I downloaded the <a href="https://ubuntu.com/download/desktop" rel="noopener noreferrer" className="text-red-600" target="_blank"> Ubuntu ISO</a>, flashed it onto a USB drive using  <a href="https://rufus.ie/en/" rel="noopener noreferrer" className="text-red-600" target="_blank">Rufus</a>, popped it into the HP, booted into BIOS, and went through the installation. And here’s a fun little hack—I didn’t have a spare monitor at the time, so I actually used my iPad as a temporary screen to install and monitor the setup. It worked perfectly and felt very “MacGyver.”
            </p>

            <br />
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/home_lab_adventure/photos/UbuntuOnHomeLab.png "
                alt="MySQL Migration to AWS Graviton EC2"
            />
            <p>
                Some of the techy folks might ask why I went with <strong>Ubuntu Desktop </strong>
                instead of Ubuntu  Server, since this was going to be a server anyway. The answer is
                simple: this was my first real attempt, and I wanted a GUI to make setup and
                maintenance easier.
                I remembered a lesson from one of my software engineering lecturers and it stuck
                with me: <strong>KISS — Keep it simple, stupid.</strong> And that’s exactly what
                I did.
            </p>

            <br />
            <p className="font-semibold text-lg">Setting Up the Server</p>
            <p>
                While researching small server setups, I stumbled across something called the
                <strong> Zima Board</strong> and its GUI system, <a href="https://casaos.zimaspace.com/"target="_blank" rel="noopener noreferrer" className="text-red-600">CasaOS</a> — an
                open-source platform that runs on Linux. It looked like the perfect starting
                point for a beginner like me to dip my toes into server management.
            </p>
            <p>
                After making sure my laptop was configured to run 24/7, I installed Casa through
                the terminal.
                Side note: the simplicity and power of Linux commands really blew me away
                compared to the clunky experience in Windows.
            </p>
            <p>
                I did hit a small hiccup along the way. Casa is supposed to tell you the IP
                address to access it once installation is complete, but for some reason, that
                message never showed up. No worries though — I ended up finding the IP in my
                router’s event log and got things working.
            </p>
            <br />
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/home_lab_adventure/photos/DashboardCasaos.png "
                alt="MySQL Migration to AWS Graviton EC2"
            />
            <p>
                With <strong>CasaOS</strong> up and running, the next step was choosing which
                apps to download and checking out others I might want later. For those who
                don’t know, Casa is basically a visual way to manage Docker containers. I’d
                dabbled in Docker before, and I love how lightweight and simple it is to run
                services through it. Casaos just makes everything even easier.
            </p>

            <br />
            <p>
                I also have to say, the dashboard itself is sleek and beginner-friendly. Since
                it’s hosted on its own IP, I can access the entire dashboard — and all the
                services running on my server — from any device in my home connected to the
                network. It’s a small thing, but being able to manage everything from my phone,
                tablet, or laptop feels incredibly empowering.
            </p>

            <br />
            <p className="font-semibold text-lg">What I’m Running</p>
            <p>Right now, my little home server is handling a few services that I’m really excited about:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><strong>Jellyfin</strong> — A media player that gives a Netflix-like experience for your own media files. This has been a total game-changer for all those old films I found on the hard drive. Being able to stream them anywhere in my home feels amazing.</li>
                <li><strong>Immich</strong> — For managing photos and videos across devices.</li>
                <li><strong>Obsidian</strong> — My personal note-taking and knowledge management setup.</li>
            </ul>

            <br />
            <p className="font-semibold text-lg">Future Improvements</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Expand storage on this device or add a separate NAS for bigger media collections and backups.</li>
                <li>Explore custom Docker containers beyond the pre-configured apps in Casa.</li>
                <li>Host a personal website, blog, or small app on the server.</li>
                <li>Set up automation and monitoring: scheduled backups, resource alerts, and service uptime checks.</li>
                <li>Experiment with home automation tools or lightweight databases.</li>
                <li>Try self-hosted cloud storage solutions.</li>
                <li>Set up a VPN for secure remote access.</li>
                <li>Test fun side projects like a small game server or other experimental services.</li>
            </ul>

            <br />
            <p className="font-semibold text-lg">Conclusion</p>
            <p>
                This is just the beginning of my home lab journey, and there’s so much more
                I want to explore. Over the next few weeks, I’m planning to write a series of
                blogs diving into each application I’m running on the server. I’ll cover how
                I set them up, tips I learned along the way, and any tricks to get the most
                out of them.
            </p>
            <br />
            <p>
                If you’re curious about home labs, Linux, or self-hosted services, stay tuned —
                there’s plenty of nerdy fun coming up!
            </p>
           
        </div>
    );
};

export default ThirtyTwo;
