import React from "react";
import { Code } from "../../../utils/Helpers";

function FiftyEight() {
    return (
        <div>
            <img
                className="max-h-[700px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/aws_workstation/aws_vpn.png"
                alt="AWS Developer Workstation Architecture with Site-to-Site VPN and NAT Gateway"
            />
            <p className="text-2xl font-semibold">Introduction</p>

            <p>
                Many organizations need developer machines in the cloud while ensuring that:
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li> Developer workstations are not exposed to the public internet.
                </li>
                <li>
                    Access is only possible from the corporate network or VPN.
                </li>
                <li>
                    Developers can still access GitHub, package repositories, and Windows Updates.
                </li>
                <li>
                    The environment is scalable and secure.
                </li>
            </ul>
            <p className="mt-4">
                In this guide, we will build a complete AWS Developer Workstation environment in the ap-south-1 (Mumbai) region using:
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Amazon VPC</li>
                <li>
                    Private Subnets
                </li>
                <li>
                    NAT Gateway
                </li>
                <li>Site-to-Site VPN</li>
                <li> Cisco Meraki MX</li>
                <li>Windows EC2 Developer Workstations</li>
                <li>Security Groups</li>
                <li>GitHub IP Allow-listing</li>
            </ul>
            <p className="mt-2">By the end of this blog, you will have a production-ready developer environment.</p>
            <br />

            <p className="font-semibold text-2xl">Final Architecture</p>
            <Code language='bash'
                code={`
Developer Laptop
      │
      │ Cisco AnyConnect VPN
      ▼
Dewang Corporate Network
      │
      ▼
Cisco Meraki MX
       │
══════ IPSec VPN ══════
      │
      ▼
AWS Virtual Private Gateway
      │
      ▼
Developer VPC
       │
 ┌───────────────┐
 │ Private Subnet│
 │ Windows EC2   │
 └───────────────┘
      │
      ▼
NAT Gateway
      │
      ▼
Internet (GitHub, Windows Update)
`}
            />

            <br />

            <p className="font-semibold text-2xl">Prerequisites</p>

            <p className="font-semibold text-lg mt-2">
                AWS Requirements
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>AWS Account</li>
                <li>
                    Administrative permissions
                </li>
                <li>
                    Region: ap-south-1 (Mumbai)
                </li>
            </ul>
            <p className="font-semibold text-lg mt-4">
                Networking Information Required
            </p>
            <p className="font-semibold mt-2">
                AWS Side
            </p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>VPC CIDR</li>
                <li>Private subnet CIDRs</li>
                <li>NAT Gateway Elastic IP</li>
            </ul>
            <p className="font-semibold mt-2">
                Corporate Side
            </p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Meraki Public IP</li>
                <li>Corporate LAN CIDRs</li>
                <li>VPN requirements</li>
                <li>Static Routing or BGP information</li>
            </ul>

            <br />

            <p className="font-semibold text-2xl">
                Step 1: Create the Developer VPC
            </p>

            <p>Open: </p>
            <p className="font-semibold">AWS Console → VPC → Your VPCs → Create VPC</p>
            <p className="mt-2">Configuration:
            </p>
            <p>Name: developer-vpc</p>
            <p>
                CIDR:
            </p>
            <Code language='bash' code={`
10.0.0.0/16
`} />
            <p className="mt-2">
                Enable:
            </p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>DNS Resolution</li>
                <li> DNS Hostnames</li>
            </ul>

            <p className="mt-4 mb-2">Why?</p>
            <p>
                The VPC becomes the isolated network boundary for all developer resources.
            </p>
            <br />

            <p className="font-semibold text-2xl">
                Step 2: Create Private Subnets
            </p>

            <p>Create</p>
            <div className="mt-2">
                <p >Private-Subnet-A</p>
                <Code language='bash' code={`
10.0.1.0/24
`} />
            </div>
            <div className="mt-2">
                <p >Private-Subnet-B</p>
                <Code language='bash' code={`
10.0.2.0/24
`} />
            </div>

            <p className="mt-2">
                Do NOT enable:
            </p>
            <p className="mt-2">
                Auto Assign Public IP
            </p>
            <div className="mt-2">
                <p >
                    Why?
                </p>
                <p className="mt-2">Developer machines should never receive public IP addresses.</p>
            </div>

            <br />

            <p className="font-semibold text-2xl">
                Step 3: Create an Internet Gateway
            </p>

            <p className="font-semibold">
                VPC → Internet Gateways → Create
            </p>
            <div className="mt-2">
                <p>Attach it to:</p>
                <p>developer-vpc</p>
            </div>
            <div className="mt-2">
                <p>Why?</p>
                <p> The NAT Gateway requires internet access through the Internet Gateway.</p>

            </div>

            <br />

            <p className="font-semibold text-2xl">
                Step 4: Create the Public Subnet
            </p>
            <div className="mt-2">
                <Code language='bash' code={`
10.0.100.0/24
`} />
                <p>This subnet will host the NAT Gateway.</p>
            </div>


            <br />

            <p className="font-semibold text-2xl">
                Step 5: Deploy the NAT Gateway
            </p>
            <p className="font-semibold">VPC → NAT Gateways → Create NAT Gateway</p>
            <p>Select:</p>
            <div className="mt-2">
                <p>Public Subnet</p>
                <p>
                    Allocate Elastic IP
                </p>
            </div>
            <div className="mt-2">
                <p>Why?</p>
                <p>Private instances need outbound internet access.</p>
            </div>

            <p className="mt-2">
                Examples:
            </p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>GitHub</li>
                <li>Windows Updates</li>
                <li>Chocolatey Packages</li>
                <li>Docker Pulls</li>
            </ul>

            <br />

            <p className="font-semibold text-2xl">
                Step 6: Configure Route Tables
            </p>
            <p className=" font-semibold mt-3">Private Route Table</p>
            <div className="mt-2">
                <Code language='bash' code={`
10.0.0.0/16  → Local
0.0.0.0/0    → NAT Gateway
`} />

                <p></p>
            </div>

            <p className="font-semibold mt-3">Public Route Table</p>
            <div className="mt-2">
                <Code language='bash' code={`
10.0.0.0/16  → Local
0.0.0.0/0    → Internet Gateway
`} />

            </div>


            <br />

            <p className="font-semibold text-2xl">
                Step 7: Create the Customer Gateway
            </p>
            <p className="font-semibold mt-2">VPC → Customer Gateways → Create
            </p>
            <div className="mt-2">
                <p>
                    Name:
                </p>
                <p>
                    dewang-meraki-cgw
                </p>
            </div>
            <div>
                <p>IP:</p>
                <p>{"<Meraki Public IP>"}</p>
            </div>
            <div className="mt-2">
                <p>Why?</p>
                <p>AWS must know where the on-premises VPN device resides.</p>

            </div>
            <br />

            <p className="font-semibold text-2xl">
                Step 8: Create the Virtual Private Gateway
            </p>
            <p className="font-semibold mt-2">VPC → Virtual Private Gateways → Create</p>
            <div className="mt-2">
                <p>
                    Name:
                </p>
                <p>
                    developer-vgw
                </p>
            </div>
            <div>
                <p>Attach it to the VPC.</p>
            </div>
            <div className="mt-2">
                <p>Why?</p>
                <p>The VGW acts as AWS's VPN endpoint.</p>

            </div>


            <br />

            <p className="font-semibold text-2xl">
                Step 9: Create the Site-to-Site VPN
            </p>

            <p className="font-semibold">
                VPC → Site-to-Site VPN Connections → Create
            </p>

            <p>
                Choose:
            </p>
            <div className="mt-2">
                <p>
                    Virtual Private Gateway:
                </p>
                <p>
                    developer-vgw
                </p>
            </div>
            <div className="mt-2">
                <p>
                    Customer Gateway:
                </p>
                <p>
                    developer-meraki-cgw
                </p>
            </div>
            <p className="mt-2">
                Choose:
            </p>

            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Static Routing OR</li>
                <li>Dynamic Routing (BGP)</li>
            </ul>

            <p className="mt-2">
                AWS automatically creates:
            </p>

            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Tunnel 1</li>
                <li>Tunnel 2</li>
            </ul>

            <p>
                for High Availability.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 10: Download VPN Configuration
            </p>

            <p>
                Download configuration for:
            </p>
            <div className="mt-2">
                <p>
                    Vendor:
                </p>
                <p>
                    Cisco
                </p>
            </div>
            <div className="mt-2">
                <p>
                    Platform:
                </p>
                <p>
                    Meraki MX
                </p>
            </div>

            <p className="mt-2">
                The file contains:
            </p>

            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Tunnel IPs</li>
                <li>Pre-shared Keys</li>
                <li>IKE Settings</li>
                <li>Phase 1 Configuration</li>
                <li>Phase 2 Configuration</li>
            </ul>

            <p className="mt-2">
                Share it with the network team.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 11: Configure AWS Routes for Corporate Networks
            </p>

            <p>
                Example:
            </p>
            <Code language='bash' code={`
172.168.10.0/24 → Virtual Private Gateway
172.168.20.0/24 → Virtual Private Gateway
`} />

            <p>
                Why?
            </p>

            <p>
                AWS must know that traffic for office networks should traverse the VPN.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 12: Configure Cisco Meraki
            </p>

            <p>
                On the Meraki dashboard:
            </p>

            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Add both AWS VPN tunnels.</li>
                <li>Configure Pre-shared Keys.</li>
                <li>Add AWS VPC routes.</li>
                <li>Enable route advertisement.</li>
            </ul>

            <br />

            <p className="font-semibold text-2xl">
                Step 13: Verify VPN Tunnel Status
            </p>

            <p className="font-semibold mt-3">
                VPC → Site-to-Site VPN Connections
            </p>

            <p>
                Verify:
            </p>

            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Tunnel 1 = UP</li>
                <li>Tunnel 2 = UP</li>
            </ul>

            <br />

            <p className="font-semibold text-2xl">
                Step 14: Launch Windows Developer Workstations
            </p>

            <p>
                EC2 → Launch Instance
            </p>

            <p>
                Configuration:
            </p>

            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Windows Server 2022</li>
                <li>Private Subnet</li>
                <li>No Public IP</li>
            </ul>

            <br />

            <p className="font-semibold text-2xl">
                Step 15: Configure Security Groups
            </p>

            <p className="mt-2">
                Inbound:
            </p>
            <p className="mt-2">
                TCP 3389
            </p>
            <div>
                <p>Source:</p>
                <p> Corporate LAN CIDRs</p>
            </div>
            <div className="mt-2">
                <p>
                    Never use:
                </p>
                <Code language='bash' code={`
0.0.0.0/0    
`} />
            </div>

            <br />

            <p className="font-semibold text-2xl">
                Step 16: Verify RDP Connectivity
            </p>

            <p>
                From a device connected to the corporate VPN:
            </p>
            <div className="mt-2 mb-2">
                <p>mstsc</p>
                <Code language='bash' code={`
10.0.1.x    
`} />

            </div>

            <p>
                You should successfully connect to the Windows instance.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 17: Verify Internet Access
            </p>

            <p className="mt-2">
                Inside Windows:
            </p>
            <Code language='bash' code={`
curl https://github.com
                `} />
            <p className="mt-2">
                Test-NetConnection github.com -Port 443
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 18: Configure GitHub Allow-list
            </p>

            <p className="mt-2 mb-2">
                Provide the NAT Gateway Elastic IP to the GitHub administrators.
            </p>

            <p>
                This ensures:
            </p>

            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Git clones work.</li>
                <li>GitHub Actions access works.</li>
                <li>Developers can authenticate.</li>
            </ul>

            <br />

            <p className="font-semibold text-2xl">
                Step 19: Perform End-to-End Testing
            </p>

            <p className="mt-2">
                Validate:
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>✓ VPN connectivity</li>
                <li>✓ RDP access</li>
                <li>✓ Internet access</li>
                <li>✓ GitHub access</li>
                <li>✓ No public access to EC2</li>
            </ul>

            <br />

            <p className="font-semibold text-2xl">
                Final Outcome
            </p>

            <p className="mt-2">
                You now have:
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Secure developer workstations</li>
                <li>Private-only access</li>
                <li>Corporate VPN connectivity</li>
                <li>Controlled internet access</li>
                <li>High availability VPN</li>
                <li>GitHub allow-list integration</li>
                <li>Production-ready developer environment</li>
            </ul>

            <br />

            <p className="font-semibold text-2xl">
                Conclusion
            </p>

            <p>
                This architecture provides an enterprise-grade development environment where developer machines remain private, secure, and centrally managed while still having controlled access to the internet and corporate resources.
            </p>
        </div>
    );
}

export default FiftyEight;