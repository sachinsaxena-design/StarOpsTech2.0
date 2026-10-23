import { Code } from "../../../utils/Helpers";

const TwentyFive = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Web_Traffic _Securely/AwsEc2Poster.webp"
        alt="AWS EC2 Private Subnet Blog Poster"
      />
      <br />

      <p>
        <b>AWS EC2 in Private Subnet: How to Serve Web Traffic Securely</b>
      </p>
      <br />
      <p>
        When designing secure and scalable cloud infrastructure, one common
        challenge stands out: exposing a web server hosted on a private EC2
        instance without compromising security. This blog guides you through how
        to allow public users to access such a server while keeping the instance
        safe in a private subnet.
      </p>

      <br />
      <p>
        <b>Step 1: Create a VPC</b>
      </p>
      <p>
        In the AWS Console, search for <i>VPC</i> and go to the dashboard. Click{" "}
        <i>Create VPC</i> → Select <i>VPC only</i> → Name it <i>My-VPC</i> →
        CIDR: <i>10.0.0.0/16</i>.
      </p>
      <img
        className="max-h-[400px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Web_Traffic _Securely/VPCCreate.webp"
        alt="VPC Creation"
      />

      <br />
      <p>
        <b>Step 2: Create Subnets</b>
      </p>
      <p>
        Create four subnets (2 public, 2 private) across two Availability Zones.
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>10.0.1.0/24 → Public Subnet 1 (e.g., ap-south-1a)</li>
        <li>10.0.2.0/24 → Private Subnet 1</li>
        <li>10.0.3.0/24 → Public Subnet 2 (e.g., ap-south-1b)</li>
        <li>10.0.4.0/24 → Private Subnet 2</li>
      </ul>
      <img
        className="max-h-[400px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Web_Traffic _Securely/subnetCreate.webp"
        alt="Subnet Creation"
      />

      <br />
      <p>
        <b>Step 3: Create an Internet Gateway</b>
      </p>
      <p>
        Go to <i>Internet Gateways</i> → Create and name it <i>My-IGW</i> →
        Attach it to your VPC.
      </p>
      <img
        className="max-h-[400px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Web_Traffic _Securely/igw.webp"
        alt="Internet Gateway"
      />

      <br />
      <p>
        <b>Step 4: Create a NAT Gateway</b>
      </p>
      <p>
        NAT Gateways allow private EC2s to access the internet (e.g., to install
        packages).
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Go to <i>NAT Gateway</i> section
        </li>
        <li>
          Name: <i>My-NAT</i>
        </li>
        <li>Subnet: A Public Subnet</li>
        <li>Elastic IP: Allocate or select one</li>
      </ul>
      <img
        className="max-h-[400px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Web_Traffic _Securely/NATGateway.webp"
        alt="NAT Gateway"
      />
x
      <br />
      <p>
        <b>Step 5: Create Route Tables</b>
      </p>
      <p>
        <u>Public Route Table:</u>
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Name: <i>Public-Route-Table</i>
        </li>
        <li>Route: 0.0.0.0/0 → Internet Gateway</li>
        <li>Associate with Public Subnets</li>
      </ul>
      <p>
        <u>Private Route Table:</u>
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Name: <i>Private-Route-Table</i>
        </li>
        <li>Route: 0.0.0.0/0 → NAT Gateway</li>
        <li>Associate with Private Subnets</li>
      </ul>
      <img
        className="max-h-[400px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Web_Traffic _Securely/routeTables.webp"
        alt="Route Tables"
      />

      <br />
      <p>
        <b>Step 6: Launch Web Servers in Private Subnet</b>
      </p>
      <p>
        Launch two EC2 instances in private subnets. Disable public IP
        assignment.
      </p>
      <Code
        language="bash"
        code={`#!/bin/bash
sudo apt update -y
sudo apt install -y apache2
sudo systemctl start apache2
sudo systemctl enable apache2`}
      />
      <p>For the second server (Nginx):</p>
      <Code
        language="bash"
        code={`#!/bin/bash
sudo apt update -y
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx`}
      />
      <img
        className="max-h-[400px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Web_Traffic _Securely/WebServer.webp"
        alt="Web Server Setup"
      />

      <br />
      <p>
        <b>Step 7: Configure Application Load Balancer (ALB)</b>
      </p>
      <p>Create an ALB to expose your private EC2s to the public:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Name: <i>my-app-alb</i>
        </li>
        <li>
          Scheme: <i>Internet-facing</i>
        </li>
        <li>Subnets: Choose 2 Public Subnets</li>
        <li>Allow HTTP (port 80) from 0.0.0.0/0</li>
      </ul>
      <p>Create a target group:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Type: <i>Instance</i>, Protocol: <i>HTTP</i>, Port: <i>80</i>
        </li>
        <li>Register server1 and server2</li>
      </ul>
      <img
        className="max-h-[400px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Web_Traffic _Securely/albTg.webp"
        alt="ALB Target Group"
      />
      <br />
      <img
        className="max-h-[400px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Web_Traffic _Securely/myServerAlb.webp"
        alt="My Server ALB"
      />

      <br />
      <p>
        <b>Why Use ALB?</b>
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>EC2s in private subnet cannot be accessed directly</li>
        <li>ALB forwards traffic securely to them</li>
        <li>Users access your app publicly via ALB</li>
      </ul>

      <br />
      <p>
        <b>Step 8: Test the Setup</b>
      </p>
      <p>
        Go to Load Balancers → Copy the ALB DNS → Paste in your browser. You
        should see Apache or Nginx (alternating if both are in the target
        group).
      </p>
      <img
        className="max-h-[400px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Web_Traffic _Securely/apache_test.webp"
        alt="Apache Test"
      />
      <br />
      <img
        className="max-h-[400px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Web_Traffic _Securely/nginxTest.webp"
        alt="Nginx Test"
      />
      <br />
      <p>
        <b>Conclusion</b>
      </p>
      <p>
        By placing your EC2 instances in a private subnet and using a
        public-facing ALB, you strike a balance between security and
        accessibility. Your servers remain hidden from direct public exposure,
        while still delivering your app to users around the world.
      </p>
    </div>
  );
};

export default TwentyFive;
