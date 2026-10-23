import React from "react";
import { Code } from "../../../utils/Helpers";

function ThirtyEight() {
  return (
    <div>
      <img
        className="max-h-[500px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/cloudflare_tunnel/cloudflare.png"
        alt="Cloudflare Tunnel Home Server"
      />

      <p>
        Once my home server was up and running, everything worked perfectly — as
        long as I was connected to my home Wi-Fi. The moment I stepped outside
        the network, it was like the server didn’t exist.
      </p>

      <p>
        I didn’t want to expose my home IP, mess with router port-forwarding, or
        deal with security risks. I wanted a clean, secure, and production-like
        way to access my self-hosted services from anywhere.
      </p>

      <p>
        That’s when I discovered <strong>Cloudflare Tunnel</strong> — and it
        completely changed how I think about self-hosting.
      </p>

      <br />

      <p className="font-semibold text-lg">What Cloudflare Tunnel Solves</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>No port forwarding on router</li>
        <li>No public IP exposure</li>
        <li>Automatic HTTPS & TLS</li>
        <li>Secure access with Cloudflare Access</li>
        <li>Perfect for home labs & small servers</li>
      </ul>

      <br />

      <p className="font-semibold text-lg">Prerequisites</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>A Linux server (Ubuntu in my case)</li>
        <li>
          Domain <strong>divyanshuverma.dev</strong> added to Cloudflare
        </li>
        <li>Services already running locally</li>
      </ul>

      <br />

      <p className="font-semibold text-lg">
        Step 1: Install cloudflared on Ubuntu
      </p>

      <Code
        language="bash"
        code={`
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | \
sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
                `}
      />

      <Code
        language="bash"
        code={`
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/ \\
\$(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/cloudflare.list
                `}
      />

      <Code
        language="bash"
        code={`
sudo apt update
sudo apt install cloudflared -y
                `}
      />

      <br />

      <p className="font-semibold text-lg">
        Step 2: Authenticate with Cloudflare
      </p>
      <Code
        language="bash"
        code={`
cloudflared tunnel login
                `}
      />

      <br />

      <p className="font-semibold text-lg">Step 3: Create a Tunnel</p>
      <Code
        language="bash"
        code={`
cloudflared tunnel create homelab
                `}
      />

      <br />

      <p className="font-semibold text-lg">Step 4: Map Subdomains</p>
      <Code
        language="bash"
        code={`
cloudflared tunnel route dns homelab media.divyanshuverma.dev
cloudflared tunnel route dns homelab dashboard.divyanshuverma.dev
                `}
      />

      <br />

      <p className="font-semibold text-lg">Step 5: Tunnel Configuration</p>
      <Code
        language="yaml"
        code={`
tunnel: homelab
credentials-file: /home/ubuntu/.cloudflared/TUNNEL_ID.json

ingress:
  - hostname: media.divyanshuverma.dev
    service: http://localhost:8096
    # Jellyfin Media Server

  - hostname: dashboard.divyanshuverma.dev
    service: http://localhost:3000
    # Internal dashboard

  - service: http_status:404
                `}
      />

      <br />

      <p className="font-semibold text-lg">Run Tunnel</p>
      <Code
        language="bash"
        code={`
cloudflared tunnel run homelab
                `}
      />

      <br />

      <p className="font-semibold text-lg">Run as System Service</p>
      <Code
        language="bash"
        code={`
sudo cloudflared service install
                `}
      />

      <br />

      <p className="font-semibold text-lg">Conclusion</p>
      <p>
        With Cloudflare Tunnel, <strong>divyanshuverma.dev</strong> now acts as
        a secure gateway to my home server — no exposed IPs, no open ports, just
        clean infrastructure.
      </p>
    </div>
  );
}

export default ThirtyEight;
