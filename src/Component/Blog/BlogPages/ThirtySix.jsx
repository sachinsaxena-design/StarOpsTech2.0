import React from "react";
import { Code } from "../../../utils/Helpers";

const ThirtySix = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Wildcard_SSL_Certificate /Renewing_install.png"
        alt="Wildcard SSL Certificate"
      />
      <br />

      <p>
        In this practical guide, I’ll walk through the exact real-world process I used to renew and deploy a <strong>Wildcard SSL certificate (*.example-app.com)</strong> on an Apache web server running on <strong>Ubuntu Linux</strong>.
        <br />
        The SSL certificate was provided in <b>.pfx format</b>, and our goal was
        to:
      </p>

      <ul className="list-inside list-disc">
        <li>Extract key + certificates</li>
        <li>Apply SSL to multiple subdomains</li>
        <li>Validate secure HTTPS operation</li>
        <li>Ensure zero downtime</li>
      </ul>

      <br />

      <p className="font-semibold text-lg">
        What is a Wildcard SSL?
      </p>
      <p>
       A wildcard certificate secures: A parent domain, Unlimited subdomains under it:
        Example:
        <ul className="list-inside list-disc">
          <li><strong>*.example-app.com</strong></li>
          <li>portal.example-app.com</li>
          <li>admin.example-app.com</li>
          <li>api.example-app.com</li>
        </ul>
       It’s cost-effective and scalable for service-based applications.
      </p>

      <br />

      <p className="font-semibold text-lg">
        Environment Details
      </p>
      <ul className="list-inside list-disc">
        <li><strong>Component:</strong>Operating System</li>
        <li><strong>Details:</strong> Ubuntu 22.04 LTS</li>
        <br />
        <li><strong>Component:</strong> Web Server</li>
        <li><strong>Details:</strong> Apache 2.4</li>
        <br />
        <li><strong>Component:</strong> SSL Provider</li>
        <li><strong>Details:</strong> Trusted Certificate Authority</li>
        <br />
        <li><strong>Component:</strong>Format Provided</li>
        <li><strong>Details:</strong> .pfx (PKCS#12)</li>
      </ul>

      <br />
      <p className="font-semibold text-lg">
        Step 1 — Upload the SSL .pfx File
      </p>
      <p>Transfer certificate from local system to server:</p>
      <Code
        language={"bash"}
        code={`
scp wildcard-2025.pfx user@server-ip:/tmp/
`}
      />
      <p>Move to a secure location:</p>
      <Code
        language={"bash"}
        code={`
sudo mv /tmp/wildcard-2025.pfx /etc/ssl/private/
sudo chmod 600 /etc/ssl/private/wildcard-2025.pfx
`}
      />
      <br />
      <p className="font-semibold text-lg">
        Step 2 — Extract Private Key & Certificates
      </p>
      <p>The <strong>.pfx</strong> file contains:</p>
      <ul className="list-inside list-disc">
        <li>Private Key</li>
        <li>Main Certificate</li>
        <li>CA Chain Certificate</li>
      </ul>
      <br />
      <p>Extract all using<strong>openssl</strong></p>
      <p>Extract the private key (encrypted):</p>
      <Code
        language={"bash"}
        code={`
sudo openssl pkcs12 -in /etc/ssl/private/wildcard-2025.pfx -nocerts -out /etc/ssl/private/wildcard.key
`}
      />

      <p>Remove password (Apache requires unencrypted key):</p>
      <Code
        language={"bash"}
        code={`
sudo openssl rsa -in /etc/ssl/private/wildcard.key -out /etc/ssl/private/wildcard_nopass.key
`}
      />

      <p>Extract certificate:</p>
      <Code
        language={"bash"}
        code={`
sudo opensssl pkcs12 -in /etc/ssl/private/wildcard-2025.pfx -clcerts -nokeys -out /etc/ssl/certs/wildcard.crt
`}
      />

      <p>Download intermediate chain:</p>
      <Code
        language={"bash"}
        code={`
sudo curl -L -o /etc/ssl/certs/wildcard_chain.crt https://certs.godaddy.com/repository/gd_bundle-g2-g1.crt
`}
      />

      <br />
      <p className="font-semibold text-lg">
        Step 3 — Verify Extracted Files
      </p>
      <Code
        language={"bash"}
        code={`
sudo ls -lh /etc/ssl/certs/wildcard*.crt /etc/ssl/private/wildcard_nopass.key
`}
      />

      <p>Expected files:</p>
      <ul className="list-inside list-disc">
        <li>wildcard.crt : Main certificate</li>
        <li>wildcard_chain.crt : Chain certificate</li>
        <li>wildcard_nopass.key : Private key</li>
      </ul>

      <br />

      <p className="font-semibold text-lg">
        Step 4 — Update Apache SSL Configuration
      </p>
      <p>Edit each SSL-enabled VirtualHost file inside:</p>
      <Code language={"bash"} code={`
/etc/apache2/sites-available/
`} />

      <p>Update SSL paths:</p>
      <Code
        language={"bash"}
        code={`
SSLCertificateFile /etc/ssl/certs/wildcard.crt
SSLCertificateKeyFile /etc/ssl/private/wildcard_nopass.key
SSLCertificateChainFile /etc/ssl/certs/wildcard_chain.crt
`}
      />

      <br />
      <p className="font-semibold text-lg">
        Step 5 — Test Apache Config & Reload
      </p>
      <p>Check config syntax:</p>
      <Code language={"bash"} code={`
sudo apachectl configtest
`} />
      <p>Expected: <b>Syntax OK</b></p>

      <p>Restart the Apache service:</p>
      <Code language={"bash"} code={`
sudo systemctl reload apache2
`} />
      <br />

      <p className="font-semibold text-lg">
        Step 6 — Validate SSL for All Subdomains
      </p>
      <p>Use the OpenSSL command:</p>
      <Code
        language={"bash"}
        code={`
for h in portal.example-app.com admin.example-app.com api.example-app.com; do
echo "=== $h ==="
echo | openssl s_client -servername "$h" $h:443 2>/dev/null | openssl x509 -noout -issuer -subject -dates
echo
done`}
      />

      <p>Expected:</p>
      <ul className="list-inside list-disc">
        <li>Correct issuer</li>
        <li>Valid expiry date</li>
        <li>Wildcard CN</li>
      </ul>

      <br />

      <p className="font-semibold text-lg" >
        Step 7 — Browser SSL Validation
      </p>
      <p>Open your website in a browser</p>
      <p>
        Check for the 🔒 lock icon → SSL is active
      </p>
      <p>View certificate details — it should show:</p>
      <ul className="list-inside list-disc">
        <li><strong>Common Name: *.example-app.com</strong></li>
        <li><strong>Issuer</strong>: Trusted CA</li>
        <li><strong>Validity</strong>: Not expired</li>
      </ul>

      <br />
      <p className="font-semibold text-lg">
        Step 8 — Secure Certificate Files
      </p>
      <p><strong>Restrict access:</strong></p>
      <Code
        language={"bash"}
        code={`
sudo chmod 640 /etc/ssl/private/wildcard_nopass.key
sudo chown root:root /etc/ssl/private/wildcard_nopass.key
sudo rm -f /etc/ssl/private/wildcard.key
`}
      />
      <br />
      <p className="font-semibold text-lg">
        Conclusion
      </p>
      <p>
        With a few powerful Linux commands and precise SSL configuration, we successfully installed and renewed a Wildcard SSL across multiple subdomains on Apache — ensuring secure access and strong encryption.  
        <br />
        This method applies to: Production, Staging, UAT environments
      </p>
    </div>
  );
};

export default ThirtySix;
