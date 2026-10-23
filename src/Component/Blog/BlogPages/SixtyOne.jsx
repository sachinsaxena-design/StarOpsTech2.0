import React from "react";
import { Code } from "../../../utils/Helpers";

function SixtyOne() {
    return (
        <>
            <img
                className="max-h-[600px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/Nginx_VS_Apache/Nginx_VS_Apache.jpg"
                alt="Nginx vs Apache Complete Guide"
            />
            <p className="font-semibold text-2xl mt-4">
                Nginx vs Apache: A Complete Guide
            </p>

            <p>
                Choosing a web server can be confusing, especially when everyone has a
                strong opinion. If you've ever wondered, <strong>"Should I use Nginx or Apache?"</strong>{" "}
                you're not alone. Both are powerful, both are free, but they work very
                differently under the hood. This guide will clear up the confusion and help you choose the right
                one for your project.
            </p>


            <br />

            <p className="font-semibold text-2xl">The Basic Difference</p>

            <p className="mt-2">Here's the simplest way to remember:</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>
                    <strong>Apache</strong> → Handles each connection with a new process
                    or thread (traditional approach)
                </li>
                <li>
                    <strong>Nginx</strong> → Handles all connections with a single process
                    using events (modern approach)
                </li>
            </ul>
            <p className="mt-2">Still confused? Let's break it down further.</p>

            <br />

            <p className="font-semibold text-2xl">Understanding How They Work</p>

            <p className="font-semibold mt-2 text-lg">How Apache Works</p>

            <p>
                Apache creates a new thread or process for every visitor that connects
                to your website.
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Visitor 1 → New process/thread</li>
                <li>Visitor 2 → New process/thread</li>
                <li>Visitor 3 → New process/thread</li>
            </ul>

            <p className="mt-2">
                This works great for smaller sites, but each connection uses memory.
                With thousands of visitors, this adds up fast.
            </p>

            <p className="font-semibold text-lg mt-3">How Nginx Works</p>

            <p className="mt-2">
                Nginx uses an event-driven model. One process handles many connections
                at once, without creating new threads for each one.
            </p>

            <p className="mt-2">
                Visitor 1, 2, 3, 4, 5... → All handled by the same worker process
            </p>

            <p className="mt-2">
                This is why Nginx is famous for handling huge amounts of traffic with
                very little memory.
            </p>
            <br />

            <p className="font-semibold text-2xl">Apache Explained</p>

            <p className="font-semibold text-lg mt-2">What is Apache?</p>

            <p>
                Apache (or Apache HTTP Server) is the original popular web server, around since 1995. It's known for being flexible and easy to configure per-directory.
            </p>

            <br />

            <p className="font-semibold">Key Features</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>.htaccess files (per-folder configuration)</li>
                <li>Huge module ecosystem</li>
                <li>Great for dynamic content (PHP built-in support)</li>
                <li>Very well documented</li>
                <li> Easier for beginners to configure on shared hosting</li>
            </ul>

            <br />

            <p className="font-semibold">Basic Apache Config Example</p>
            <Code language='bash' code={`
<VirtualHost *:80>
   ServerName mywebsite.com
   DocumentRoot /var/www/mywebsite


   <Directory /var/www/mywebsite>
       AllowOverride All
       Require all granted
   </Directory>
</VirtualHost
      `} />

            <p className="font-semibold">Common Apache Commands</p>

            <p>Start Apache</p>
            <Code language='bash' code={`
sudo systemctl start apache2
`} />
            <p>Restart Apache</p>
            <Code language='bash' code={`
sudo systemctl restart apache2
`} />
            <p>Check the configuration for errors</p>
            <Code language='bash' code={`
sudo apachectl configtest
`} />
            <p>Enable a site</p>
            <Code language='bash' code={`
sudo a2ensite mywebsite.conf
`} />
            <p>Enable a module</p>
            <Code language='bash' code={`
sudo a2enmod rewrite
`} />

            <br />

            <p className="font-semibold text-lg">Nginx Explained</p>

            <p className="font-semibold">What is Nginx?</p>

            <p>
                Nginx (pronounced "engine-x") was built in 2004 specifically to solve the performance problems Apache had with high traffic. It's known for speed and efficiency.
            </p>

            <br />

            <p className="font-semibold">Key Features</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Handles thousands of connections with low memory</li>
                <li>Excellent as a reverse proxy</li>
                <li>Great for serving static files (images, CSS, JS)</li>
                <li>Built-in load balancing</li>
                <li>Popular for microservices and containers</li>
            </ul>

            <br />

            <p className="font-semibold">Basic Nginx Config Example</p>
            <Code language='bash' code={`
server {
   listen 80;
   server_name mywebsite.com;
   root /var/www/mywebsite;


   location / {
       try_files $uri $uri/ =404;
   }
}
`} />

            <p className="font-semibold">Common Nginx Commands</p>
            <p>Start Nginx</p>
            <Code language='bash' code={`
sudo systemctl start nginx
`} />
            <p>Restart Nginx</p>
            <Code language='bash' code={`
sudo systemctl restart nginx
`} />
            <p>Check the configuration for errors</p>
            <Code language='bash' code={`
sudo nginx -t
`} />
            <p>Reload without downtime</p>
            <Code language='bash' code={`
sudo systemctl reload nginx
`} />
            <p className="font-semibold text-lg">Key Differences</p>
            <p className="font-semibold mt-2">Side-by-Side Comparison</p>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border p-2">Feature</th>
                            <th className="border p-2">Apache</th>
                            <th className="border p-2">Nginx</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2 font-semibold">Architecture</td>
                            <td className="border p-2">Process/thread per connection</td>
                            <td className="border p-2">Event-driven (single process)</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Performance</td>
                            <td className="border p-2">Slows down with many connections</td>
                            <td className="border p-2">Handles high traffic easily</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Memory Usage</td>
                            <td className="border p-2">Higher with many visitors</td>
                            <td className="border p-2">Low and stable</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Static file serving</td>
                            <td className="border p-2">Good</td>
                            <td className="border p-2">Excellent</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Dynamic content (PHP)</td>
                            <td className="border p-2">Built-in support</td>
                            <td className="border p-2">Needs a separate processor (PHP-FPM)</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">.htaccess support</td>
                            <td className="border p-2">Yes</td>
                            <td className="border p-2">No</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Reverse proxy</td>
                            <td className="border p-2">Possible, less common</td>
                            <td className="border p-2">Excellent, very common</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Configuration</td>
                            <td className="border p-2">Per-directory files</td>
                            <td className="border p-2">Centralized config files</td>
                        </tr>
                        <tr>
                            <td className="border p-2 font-semibold">Best for</td>
                            <td className="border p-2">Shared hosting, dynamic sites</td>
                            <td className="border p-2">High traffic, microservices, proxying</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="font-semibold mt-3 text-2xl">Visual Example</p>
            <p className="mt-2 font-semibold">Apache handling 1,000 visitors:</p>
            <p>
                1,000 visitors = 1,000 processes/threads = High memory usage
            </p>
            <p className="mt-2 font-semibold ">
                Nginx handling 1,000 visitors:
            </p>
            <p>
                1,000 visitors = Still 1 worker process = Low memory usage
            </p>
            <br />
            <p className="text-2xl font-semibold">When to Use Each One</p>
            <p className="mt-2 text-lg font-semibold">Use Apache When:</p>
            <p className="mt-2">You're on shared hosting, you need .htaccess for per-folder rules. Your site runs classic PHP (like WordPress) without extra setup. You want lots of beginner tutorials and community support.</p>
            <p className="font-semibold mt-2">Example situations:</p>
            <p className="mt-2">I'm hosting a WordPress blog on shared hosting.</p>
            <p className="mt-2">I need different rules for different folders.</p>
            <p className="mt-2">My hosting provider only supports Apache.</p>

            <p className="mt-2 text-lg font-semibold">Use Nginx  When:</p>
            <p className="mt-2">You expect high traffic. You're serving lots of static files. You need a reverse proxy or load balancer. You're running microservices or Docker containers.</p>
            <p className="font-semibold mt-2">Example situations:</p>
            <p className="mt-2">My website gets thousands of visitors at once.</p>
            <p className="mt-2">I need to load balance between multiple app servers.</p>
            <p className="mt-2">I'm deploying a Node.js or Docker-based app.</p>

            <br />
            <p className="font-semibold text-2xl">Real Examples</p>
            <p className="mt-2 font-semibold">Example 1: Simple WordPress Site</p>
            <p className="mt-2"><strong>Goal:</strong> Host a small WordPress blog</p>
            <p className="mt-2"><strong>Use:</strong> Apache</p>

            <p className="mt-2 font-semibold">Install Apache and PHP</p>
            <Code language='bash' code={`
sudo apt update
sudo apt install apache2 php libapache2-mod-php php-mysql
`} />
            <p className="mt-2 font-semibold">Enable rewrite module for WordPress permalinks</p>
            <Code language='bash' code={`
sudo a2enmod rewrite
sudo systemctl restart apache2
`} />
            <p><strong>Why Apache?</strong> WordPress relies on .htaccess for permalinks, and Apache handles this out of the box.</p>
            <br />
            <p className="mt-2 font-semibold">Example 2: High-Traffic Application</p>
            <p className="mt-2"><strong>Goal:</strong> Serve an app expecting heavy traffic</p>
            <p className="mt-2"><strong>Use:</strong> Nginx</p>
            <Code language='bash' code={`
server {
listen 80;
server_name myapp.com;

location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    }
}
    `} />
            <p><strong>Why Nginx?</strong>It efficiently passes traffic to your app server (like Node.js) without slowing down.</p>
            <br />
            <p className="mt-2 font-semibold">Example 3: Using Both Together</p>
            <p className="mt-2"><strong>Goal:</strong> Best of both worlds</p>
            <p className="mt-2"><strong>Use:</strong> Nginx in front of Apache</p>
            <Code language='bash' code={`
Visitor → Nginx (handles static files + traffic) → Apache (handles PHP/dynamic content)
    `} />
            <p>This is a very common real-world setup:</p>
            <ul className="list-disc space-y-1 ml-6">
                <li>Nginx serves images, CSS, and JS directly (fast)</li>
                <li>Nginx forwards PHP requests to Apache behind it</li>
                <li>You get Nginx's speed AND Apache's <span className="text-green-400">.htaccess</span> flexibility</li>
            </ul>
            <br />

            <p className="mt-2 font-semibold">Example 4: Load Balancing Multiple Servers</p>
            <p className="mt-2"><strong>Goal:</strong>Distribute traffic across several app servers</p>
            <p className="mt-2"><strong>Use:</strong> Nginx</p>
            <Code language='bash' code={`
upstream backend {
   server 192.168.1.10;
   server 192.168.1.11;
   server 192.168.1.12;
}

server {
   listen 80;
   location / {
       proxy_pass http://backend;
   }
}
    `} />
            <p><strong>Why Nginx?</strong>Load balancing is one of its core strengths.</p>
            <br />
            <p className="font-semibold text-2xl">Common Mistakes to Avoid</p>

            <p className="mt-2 font-semibold text-lg">Mistake 1: Using Apache for high-traffic sites without tuning</p>
            <p className="mt-2">Problem: Site slows down or crashes under heavy load</p>
            <p>Solution: Switch to Nginx, or use Nginx in front of Apache</p>
            <br />
            <p className="font-semibold text-lg">Mistake 2: Expecting .htaccess to work in Nginx</p>
            <p className="mt-2">Wrong assumption: "I'll just copy my .htaccess rules to Nginx"</p>
            <p> Reality: Nginx doesn't support .htaccess at all</p>
            <p>Solution: Rewrite the rules directly in the Nginx config file</p>
            <br />
            <p className="font-semibold text-lg">Mistake 3: Not testing the config before restarting</p>
            <p className="mt-2 font-semibold">Bad - restart blindly</p>
            <Code language='bash' code={`
sudo systemctl restart nginx
                `} />
            <p className="font-semibold"> Good - test first</p>
            <Code language='bash' code={`
sudo nginx -t
sudo systemctl restart nginx
                `} />
            <p>Always test your configuration before restarting, especially in production.</p>
            <br />
            <p className="text-2xl font-semibold">Conclusion</p>
            <p className="mt-2">Remember this simple rule:</p>
            <p className="mt-2"><strong>Apache</strong> = Flexible, beginner-friendly, great for shared hosting, and .htaccess</p>
            <p className="mt-2"><strong>Nginx</strong> = Fast, lightweight, great for high traffic and reverse proxying</p>
            <p className="mt-2 text-lg">When to Use What</p>
            <p className="mt-2 font-semibold">Use Apache when:</p>
            <p>
                You're on shared hosting
            </p>
            <p>
                You need .htaccess flexibility
            </p>
            <p>
                You're running simple PHP sites like WordPress
            </p>
            <p className="font-semibold mt-2"> Use Nginx when:</p>
            <p>You expect high traffic</p>
            <p>You need a reverse proxy or load balancer</p>
            <p>You're serving static files or running microservices</p>

        </>
    );
}

export default SixtyOne;