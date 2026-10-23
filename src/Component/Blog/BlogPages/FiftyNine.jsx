import React from "react";
import { Code } from "../../../utils/Helpers";

function FiftyNine() {
    return (
        <div>
            <img
                className="max-h-[600px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/pi_hole_block_ads/pi_poster.png"
                alt="Pi-hole Dashboard"
            />

            <p>
                As my home lab grew, so did the number of devices connected to my network. Between my phone, laptop, smart TV, tablet, and a handful of IoT devices, I realized I was spending way too much time dealing with ads and trackers. On my computer, I had a browser extension installed. My phone had a different ad blocker. My TV? There wasn't much I could do there.
            </p>

            <br />

            <p>
                The more I thought about it, the less sense it made. Why was I configuring every device individually when they all shared the same internet connection?
            </p>

            <br />

            <p>
                Since my server already runs 24/7 with services like{" "} <strong>Jellyfin</strong>, <strong>Immich</strong>, and{" "} <strong>Uptime Kuma</strong>, I figured it could handle one more job. Instead of blocking ads on each device, I wanted to block them for my entire network. That search eventually led me to{" "} <strong>Pi-hole</strong>, one of the most recommended tools in the self-hosting community.
            </p>

            <br />

            <p>
                After running it for a while, I honestly wonder why I didn't set it up sooner.
            </p>

            <br />

            <p className="font-semibold text-2xl mb-2">
                What Exactly is a Pi-hole?
            </p>

            <p>
                If you haven't come across it before, <strong>Pi-hole</strong> is a self-hosted DNS server that filters out advertising and tracking domains before they ever reach your devices.
            </p>
            <img
                className="max-h-[400px] w-6/12 mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/pi_hole_block_ads/pi_img_1.png"
                alt="Pi-hole Dashboard"
            />

            <br />

            <p>
                Normally, when you visit a website, your device asks a DNS server to translate a domain name into an IP address. Pi-hole sits in the middle of that process. If the domain belongs to a known advertising or tracking service, Pi-hole simply refuses to resolve it. Since the request never completes, the advertisement never gets downloaded.
            </p>

            <br />

            <p>
                It's a surprisingly simple idea, but it's incredibly effective.
            </p>

            <br />

            <p>
                The biggest advantage is that it works at the network level. Every device using your home's DNS server automatically benefits from it. That includes devices where installing browser extensions isn't even possible, like smart TVs, gaming consoles, streaming boxes, and many IoT devices.
            </p>

            <br />

            <p className="font-semibold text-2xl mb-2">
                Why I Chose Pi-hole
            </p>

            <p>
                There are plenty of DNS filtering services available today, including cloud-based options like AdGuard DNS and NextDNS. While those services work well, I wanted something that stayed entirely within my home network.
            </p>

            <br />

            <p>
                Running Pi-hole locally meant I had complete control over my DNS server, my blocklists, and my privacy. There wasn't another cloud service processing my DNS requests, and I could customize everything whenever I wanted.
            </p>

            <br />

            <p className="mb-2">
                Another reason was simplicity.
            </p>    <p>
                Since my home server already hosts several Docker containers through CasaOS, deploying another container took only a few minutes. I didn't need to buy additional hardware or dedicate a Raspberry Pi just for DNS filtering. Everything runs on the same machine that's already online all day.
            </p>

            <br />

            <p className="font-semibold text-2xl mb-2">
                Installing Pi-hole with Docker
            </p>

            <p className="mb-2">
                One of the reasons Pi-hole has become so popular is how easy it is to deploy.
            </p>
            <p className="mb-2">
                In CasaOS, Pi-hole is available directly through the App Store, making installation almost effortless. If you're using Docker Compose instead, the official documentation provides a ready-to-use configuration.
            </p>
            <Code language="bash"
                code={`
# More info at https://github.com/pi-hole/docker-pi-hole/ and https://docs.pi-hole.net/
services:
  pihole:
    container_name: pihole
    image: pihole/pihole:latest
    ports:
      # DNS Ports
      - "53:53/tcp"
      - "53:53/udp"
      # Default HTTP Port
      - "80:80/tcp"
      # Default HTTPs Port. FTL will generate a self-signed certificate
      - "443:443/tcp"
      # Uncomment the below if using Pi-hole as your DHCP Server
      #- "67:67/udp"
      # Uncomment the line below if you are using Pi-hole as your NTP server
      #- "123:123/udp"
    environment:
      # Set the appropriate timezone for your location from
      # https://en.wikipedia.org/wiki/List_of_tz_database_time_zones, e.g:
      TZ: 'Europe/London'
      # Set a password to access the web interface. Not setting one will result in a random password being assigned
      FTLCONF_webserver_api_password: 'correct horse battery staple'
      # If using Docker's default 'bridge' network setting the dns listening mode should be set to 'ALL'
      FTLCONF_dns_listeningMode: 'ALL'
    # Volumes store your data between container upgrades
    volumes:
      # For persisting Pi-hole's databases and common configuration file
      - './etc-pihole:/etc/pihole'
      # Uncomment the below if you have custom dnsmasq config files that you want to persist. Not needed for most starting fresh with Pi-hole v6. If you're upgrading from v5 you and have used this directory before, you should keep it enabled for the first v6 container start to allow for a complete migration. It can be removed afterwards. Needs environment variable FTLCONF_misc_etc_dnsmasq_d: 'true'
      #- './etc-dnsmasq.d:/etc/dnsmasq.d'
    cap_add:
      # See https://docs.pi-hole.net/docker/configuration/#note-on-capabilities
      # Required if you are using Pi-hole as your DHCP server, else not needed
      - NET_ADMIN
      # Required if you are using Pi-hole as your NTP client to be able to set the host's system time
      - SYS_TIME
      # Optional, if Pi-hole should get some more processing time
      - SYS_NICE
    restart: unless-stopped
`} />

            <p>During installation, I configured a few important settings:</p>

            <ul className="list-disc ml-6 space-y-2">
                <li>Assigned a static IP address to my server.</li>
                <li>Selected an upstream DNS provider.</li>
                <li>Set the Pi-hole web interface password.</li>
                <li>
                    Mounted persistent storage so my configuration survives
                    updates.
                </li>
            </ul>

            <br />

            <p>
                The static IP is especially important because every device on your network will eventually use this server for DNS. If its IP address changes, your internet will suddenly stop resolving domain names until the router is updated.
            </p>

            <br />

            <p>
                Taking a few minutes to reserve a permanent IP saves a lot of headaches later.
            </p>

            <br />

            <p className="font-semibold text-2xl mb-2">
                Making Pi-hole Work for the Entire Network
            </p>

            <p className="mb-2">
                Installing Pi-hole is only half the process.
            </p>

            <p className="mb-2">
                The real magic happens when you tell your router to use Pi-hole as its DNS server.
            </p>
            <p className="mb-2">
                Once I changed my router's DNS settings to point to my server's local IP address, every device that connected to Wi-Fi automatically started sending DNS requests through Pi-hole.
            </p>

            <ul className="list-disc ml-6 space-y-2">
                <li>No browser extensions.</li>
                <li>No additional apps.</li>
                <li>No manual setup on every device.</li>
            </ul>
            <p className="mb-2">
                Even devices I'd forgotten about immediately started benefiting
                from DNS filtering.
            </p>
            <p >
                After renewing the network connection on my phone and laptop, I opened a few websites and immediately noticed something was different. Banner ads were gone. Many websites loaded slightly faster, and pages felt much cleaner.
            </p>

            <br />

            <p className="font-semibold text-2xl mb-2">
                The Dashboard is Surprisingly Addictive
            </p>
            <p className="mb-2">
                I expected Pi-hole to quietly sit in the background, but I quickly found myself checking the dashboard several times a day.
            </p>
            <img
                className="max-h-[500px] w-10/12 mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/pi_hole_block_ads/pi_Img_2.jpeg"
                alt="Pi-hole Statistics Dashboard"
            />

            <p className="mb-2">
                The web interface gives you a live view of everything happening on
                your network.
            </p>

            <p className="mb-2">You can see:</p>

            <ul className="list-disc ml-6 space-y-2">
                <li>Total DNS queries</li>
                <li>Blocked requests</li>
                <li>Top blocked domains</li>
                <li>Most active clients</li>
                <li>Query history</li>
                <li>Network statistics</li>
            </ul>


            <p className="mb-2">
                Watching thousands of advertising requests get blocked every single day was honestly eye-opening.
            </p>
            <p className="mb-2">
                Many devices constantly contact analytics servers even when you're not actively using them. Smart TVs, mobile apps, and IoT devices all generate far more background traffic than I realized.
            </p>
            <p>
                Pi-hole makes all of that visible.
            </p>
            <br />

            <p className="font-semibold text-2xl mb-2">
                When Things Don't Work
            </p>

            <p className="mb-2">
                Like every ad blocker, Pi-hole isn't perfect.
            </p>

            <p className="mb-2">
                Occasionally a website refuses to load correctly because one of its required domains is included in a blocklist.
            </p>
            <p className="mb-2">
                Fortunately, fixing these problems is usually straightforward.
            </p>

            <p className="mb-2">
                The dashboard lets you inspect recent DNS requests, identify the blocked domain, and whitelist it if necessary. Most issues can be solved in under a minute.
            </p>

            <p>
                In my experience, these situations are fairly rare, and the occasional whitelist entry is well worth the cleaner browsing experience.
            </p>

            <br />

            <p className="font-semibold text-2xl mb-2">
                Choosing the Right Blocklists
            </p>

            <p className="mb-2">
                Pi-hole includes a default blocklist that's already effective for most users.
            </p>

            <p className="mb-2">
                Over time, I experimented with adding additional community-maintained lists that block tracking services, telemetry, malware domains, and other unwanted traffic.
            </p>
            <p className="mb-2">
                It's tempting to install every blocklist you can find, but I've learned that more isn't always better.
            </p>
            <p className="mb-2">Huge blocklists often increase false positives and can break legitimate websites.</p>
            <p>
                Keeping a smaller, well-maintained collection has given me the best balance between blocking unwanted content and maintaining compatibility.
            </p>

            <br />

            <p className="font-semibold text-2xl mb-2">
                Performance
            </p>

            <p className="mb-2">
                One concern I had before installing Pi-hole was whether introducing another DNS server would slow down my internet.
            </p>

            <p className="mb-2" >
                In reality, the opposite happened.
            </p>

            <p className="mb-2">
                Because Pi-hole caches DNS responses locally, frequently visited websites often resolve faster than before.
            </p>

            <p >
                Websites obviously still depend on your internet connection, but reducing unnecessary advertising requests and serving cached DNS responses makes browsing feel a little more responsive.
            </p>

            <br />

            <p className="font-semibold text-2xl mb-2">
                Conclusion
            </p>

            <p>
                Pi-hole has become one of those services I almost forget is running, and that's probably the biggest compliment I can give it.
            </p>

            <br />

            <p>
                After the initial setup, it simply does its job. Every device on my network benefits automatically, websites feel cleaner, and I have much better visibility into what's happening behind the scenes.
            </p>

            <br />

            <p>
                For a home lab that's already running around the clock, adding Pi-hole feels like a natural next step. It doesn't require powerful hardware, it doesn't consume many resources, and it provides immediate benefits the moment you point your router toward it.
            </p>

            <br />

            <p>
                If you're already self-hosting services like <strong>Jellyfin</strong>,{" "} <strong>Immich</strong>, or <strong>Home Assistant</strong>, I'd put Pi-hole near the top of the list of projects to try next. It's one of those small additions that quietly improves your entire network every single day.
            </p>
        </div>
    );
}

export default FiftyNine;