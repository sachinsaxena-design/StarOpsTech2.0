import React from 'react'

function FiftyFive() {
    return (
        <div>
            
            <img
                className="max-h-[700px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/homelab_push_notifaction/homelab_push.png"
                alt="Homelab Push Notifications Using Uptime Kuma and Pushover"
            />
            <p>
                Now that my home server is running services like Jellyfin and Immich
                24/7, I’ve run into a new problem: how do I actually know if something
                crashes? In the beginning, I’d only find out a service was down when I
                went to open the app and got met with a spinning loading wheel. That
                gets old pretty fast.
            </p>
            <br />
            <p>
                Since I’m trying to automate as much of my home lab as possible, I
                wanted a way for my server to tell me directly when something goes
                wrong. I didn't want to dig through CasaOS logs just to see if a Docker
                container stopped working. I wanted real-time alerts sent straight to my
                phone. After digging around the self-hosting community, I found the
                perfect combo: <strong>Uptime Kuma</strong> for monitoring and{" "}
                <strong>Pushover</strong> for notifications.
            </p>

            <br />
            <p className="font-semibold text-lg">The Tools: Uptime Kuma & Pushover</p>
            <p>
                If you aren't familiar with it, <strong>Uptime Kuma</strong> is a fancy,
                self-hosted monitoring tool. It looks like a premium enterprise
                dashboard, but it's completely free and open-source. It lets you ping
                your local IP addresses, check websites, or monitor specific Docker
                containers to make sure they are responsive.
            </p>
            <br />
            <p>
                But a dashboard is only useful if you're actively looking at it. To
                bridge the gap, I needed a notification service. While Uptime Kuma
                supports Discord, Telegram, and email, I wanted something dedicated and
                lightweight. Enter <strong>Pushover</strong>. It’s a simple service that
                gives you an API key and a mobile app. Whenever your server hits that
                API key, a push notification pops up on your phone instantly. It has a
                tiny one-time fee for life, but it beats managing a complex bot
                framework or flooding your personal inbox.
            </p>

            <br />
            <img
                className="max-h-[700px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/homelab_push_notifaction/UptimeKumaDashboard.png"
                alt="Uptime Kuma Dashboard on CasaOS"
            />
            <p>
                Setting up Uptime Kuma on my HP Elitedesk was incredibly easy thanks to
                CasaOS. I just went to the CasaOS App Store, searched for Uptime Kuma,
                and hit install. Because CasaOS is running everything via Docker under
                the hood, it took less than thirty seconds to deploy and assign an
                internal port.
            </p>

            <br />
            <p className="font-semibold text-lg">Configuring the Monitors</p>
            <p>
                Once I logged into the Uptime Kuma interface, I started adding my
                services. I set up simple HTTP/TCP ping monitors for my main
                applications. For example, I pointed one monitor to my Jellyfin
                container's local address. You can configure how often Uptime Kuma
                checks the service (I chose every 60 seconds) and how many times it
                should retry before throwing an alert.
            </p>
            <p>
                Following the classic lesson from my uni days—
                <strong>KISS (Keep it simple, stupid)</strong>—I didn't overcomplicate
                the intervals. Checking every minute ensures I know about an outage
                almost instantly without hammering my server's internal network traffic.
            </p>
            <br />
            <p>
                Next, I went to the Pushover website, created a free account, and
                generated an <strong>Application API Token</strong>
                and a <strong>User Key</strong>. Back in Uptime Kuma's settings, under
                "Setup Notification," I selected Pushover from the massive dropdown
                list, pasted my keys, and clicked the "Test" button.
            </p>

            <br />
            <img
                className="max-h-[600px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/homelab_push_notifaction/PushoverNotification.png"
                alt="Pushover Notification on iOS Device"
            />
            <p>
                A fraction of a second later, my phone vibrated. I looked down, and
                there it was: a crisp notification reading
                <em> "Test Successful."</em> I felt like a genius. I tied this
                notification profile to all my active monitors, meaning any time a
                service goes down—or comes back up—my phone gets an update.
            </p>

            <br />
            <p className="font-semibold text-lg">Putting It to the Test</p>
            <p>
                To really make sure it worked in the wild, I went back to my CasaOS
                dashboard and intentionally stopped my Immich container. I waited,
                staring at my phone. Exactly 60 seconds later, my phone lit up with an
                alert:
                <span className="text-red-600 font-semibold">
                    {" "}
                    [Immich] [DOWN] Connection refused
                </span>
                .
            </p>
            <p>
                I clicked "Start" on the container inside CasaOS to spin it back up, and
                within another minute, I got a satisfying green notification telling me
                Immich was back online. Having this level of visibility over my budget
                mini PC server feels incredibly satisfying.
            </p>

            <br />
            <p className="font-semibold text-lg">What’s Next?</p>
            <p>
                Now that the core monitoring is handled, I'm looking to expand my alert
                system even further:
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    Set up notifications for low disk space on my 750 GB drive before it
                    fills up with media.
                </li>
                <li>
                    Monitor CPU temperatures to ensure the old 6th-gen i5 processor isn't
                    running too hot inside the mini PC casing.
                </li>
                <li>
                    Configure Uptime Kuma to track external public endpoints once I set up
                    a secure remote VPN.
                </li>
            </ul>

            <br />
            <p className="font-semibold text-lg">Conclusion</p>
            <p>
                Setting up monitoring takes away the anxiety of self-hosting. I no
                longer have to manually check if my media or notes servers are working;
                my home lab handles its own reporting and pings me only when it needs
                attention.
            </p>
            <br />
            <p>
                If you are running a home lab—even a small one on an old desktop—I
                highly recommend setting up Uptime Kuma. It's a quick win that makes
                your DIY setup feel like a professional, production-grade data center!
            </p>
        </div>
    );
}

export default FiftyFive