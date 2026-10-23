import React from "react";
import { Code } from "../../../utils/Helpers";

const Nineteen = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ssl/SSL_INTEGRATION.webp"
        alt="SSL_INTEGRATION"
      />
      <br />
      <p>
        Securing your website with HTTPS is crucial for protecting your
        visitors' data and improving your site's search engine ranking. Let's
        Encrypt offers free SSL certificates that can be easily set up with
        Nginx. In this blog, we'll walk you through the process of obtaining and
        configuring a Let's Encrypt SSL certificate for your website.
      </p>
      <br />
      <p>
        <b>Prerequisites</b>
      </p>
      <p>Before you begin, ensure that you have the following:</p>
      <ul className="list-disc list-inside">
        <li>A domain name pointing to your server (e.g., dewang.tech).</li>
        <li>Nginx installed and running on your server.</li>
        <li>Access to your server's terminal (SSH access).</li>
      </ul>
      <br />{" "}
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ssl/1_http.webp"
        alt="SSL_INTEGRATION"
      />
      <br />
      <p>
        <b>Step 1: Install Certbot</b>
      </p>
      <p>
        Certbot is a tool that automates the process of obtaining and renewing
        Let's Encrypt SSL certificates. Install Certbot and the Nginx plugin by
        running the following commands:
      </p>
      <Code
        language={"bash"}
        code={`
sudo apt update
sudo apt install certbot python3-certbot-nginx`}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ssl/2_update.webp"
        alt="SSL_INTEGRATION"
      />
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ssl/3_python.webp"
        alt="SSL_INTEGRATION"
      />
      <br />
      <p>
        <b>Step 2: Obtain the SSL Certificate</b>
      </p>
      <p>
        Use Certbot to obtain an SSL certificate for your domain and
        automatically configure Nginx to use it. Run the following command,
        replacing dewang.tech with your domain:
      </p>
      <Code
        language={"bash"}
        code={`
sudo certbot --nginx -d dewang.tech`}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ssl/4_ssl.webp"
        alt="SSL_INTEGRATION"
      />
      <br />
      <p>
        <b>Step 3: Verify SSL Configuration</b>
      </p>
      <p>
        Certbot should have updated your Nginx configuration file. Verify that
        the SSL directives are correctly included by opening the configuration
        file:
      </p>
      <Code
        language={"bash"}
        code={`
sudo cat /etc/nginx/sites-available/default`}
      />
      <p>Ensure that the file contains the following directives:</p>
      <Code
        language={"bash"}
        code={`
nginx
server {
    listen 80;
    server_name dewang.tech;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name dewang.tech;

    ssl_certificate /etc/letsencrypt/live/dewang.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dewang.tech/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root /var/www/dewang.tech;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}`}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ssl/5_nginx.webp"
        alt="SSL_INTEGRATION"
      />
      {/* <br /> */}
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ssl/6_certbot.webp"
        alt="SSL_INTEGRATION"
      />
      <br />
      <p>
        <b>Step 4: Test Nginx Configuration</b>
      </p>
      <p>Test the Nginx configuration to ensure there are no syntax errors:</p>
      <Code
        language={"bash"}
        code={`
sudo nginx -t`}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ssl/7_file.webp"
        alt="SSL_INTEGRATION"
      />
      <p>
        If the test is successful, you will see a message indicating that the
        configuration file syntax is OK.
      </p>
      <br />
      <p>
        <b>Step 5: Restart Nginx</b>
      </p>
      <p> Apply the changes by restarting Nginx:</p>
      <Code
        language={"bash"}
        code={`
sudo systemctl restart nginx`}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ssl/8_linux.webp"
        alt="SSL_INTEGRATION"
      />
      <br />
      <p>
        <b>Step 6: Automatic Certificate Renewal</b>
      </p>
      <p>
        Certbot sets up a cron job to automatically renew the certificates
        before they expire. You can test the renewal process with:
      </p>
      <Code
        language={"bash"}
        code={`
sudo certbot renew --dry-run`}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ssl/9_letsencrypt.webp"
        alt="SSL_INTEGRATION"
      />
      <p>
        This command simulates the renewal process to ensure everything is
        working correctly.
      </p>
      <br />
      <p>
        <b>Conclusion</b>
      </p>
      <p>
        You have successfully secured your website with a free SSL certificate
        from Let's Encrypt. Your site is now accessible over HTTPS, providing
        better security and trust for your visitors. Regularly check your site's
        SSL status and ensure that automatic renewals are functioning correctly.
        By following these steps, you can provide a secure browsing experience
        for your users without incurring any costs. Happy hosting!
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/ssl/10_https.webp"
        alt="SSL_INTEGRATION"
      />
    </div>
  );
};

export default Nineteen;
