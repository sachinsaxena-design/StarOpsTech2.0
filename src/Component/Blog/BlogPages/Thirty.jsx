import { Code } from "../../../utils/Helpers";

const Thirty = () => {
  return (
    <div>
      <p className="text-xl font-bold mb-4">
        Getting Started with Terraform on Ubuntu: Step by Step Guide
      </p>
      <img
        className="max-h-[500px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Terraform/terraform_ubuntu.png"
        alt="Dynamic Inventory in Ansible"
      />
      <p>
        Terraform is an <strong>Infrastructure as Code (IaC)</strong> tool that
        helps you create and manage cloud resources (like AWS, Azure, GCP) using
        simple code. Instead of clicking in the AWS console, Terraform lets you
        write code and run it — and it builds everything for you.
      </p>
      <p className="font-semibold mt-4">This guide covers:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>What Terraform is used for</li>
        <li>Installing Terraform on Ubuntu</li>
        <li>Installing AWS CLI using Snap</li>
        <li>Creating AWS Access Key & Secret Key</li>
        <li>Configuring AWS CLI</li>
        <li>
          Terraform files explained (main.tf, variables.tf, providers.tf,
          terraform.tfvars, output.tf)
        </li>
        <li>Example Terraform code to create a VPC</li>
        <li>Running and cleaning up Terraform</li>
        <li>Final conclusion</li>
      </ul>
      <br />
      <p className="font-semibold">1. Why Use Terraform?</p>
      <p>
        Terraform is more than just a tool —
        <strong>it’s a framework for managing infrastructure.</strong>
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          <b>Infrastructure as Code:</b> Write infra in code, version it, share
          it.
        </li>
        <li>
          <b>Automation:</b> One command creates resources quickly.
        </li>
        <li>
          <b>Consistency: </b>Same code always produces the same result.
        </li>
        <li>
          <b>Multi-cloud support:</b> AWS, Azure, GCP, Kubernetes, etc.
        </li>
        <li>
          <b>Dependency handling:</b> Resources created in the right order.
        </li>
        <li>
          <b>Collaboration:</b> Teams can track changes and manage infra safely.
        </li>
      </ul>
      <br />
      <p className="font-semibold">2. Install Terraform on Ubuntu</p>
      <p>Run these commands step by step:</p>
      <Code
        language="bash"
        code={`
# Update and install dependencies
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
# Add HashiCorp's GPG key
wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null
# Verify the GPG key
gpg --no-default-keyring \
--keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
--fingerprint
# Add HashiCorp repo
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(grep -oP '(?<=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list
# Update and install Terraform
sudo apt update
sudo apt-get install terraform -y
`}
      />
      <b>
        Verify Terraform installation via <code>terraform -v</code>.
      </b>
      <img
        className="max-h-[500px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Terraform/s1.png"
        alt="Dynamic Inventory in Ansible"
      />
      <p>This confirms Terraform is installed.</p>
      <br />
      <p className="font-semibold">3. Install AWS CLI on Ubuntu (Using Snap)</p>
      <Code
        language="bash"
        code={`sudo apt update

sudo apt install snapd -y
`}
      />
      <p>Restart your system (so PATH is updated).</p>
      <b>Check if Snap is installed:</b>
      <p>
        Verify with <code>aws --version</code>.
      </p>
      <Code
        language="bash"
        code={`
snap version
`}
      />
      <b>Step 2: Install AWS CLI with Snap</b>
      <Code
        language="bash"
        code={`
sudo snap install aws-cli --classic
`}
      />
      <b>Step 3: Verify AWS CLI installation</b>
      <img
        className="max-h-[500px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Terraform/s2.png"
        alt="Dynamic Inventory in Ansible"
      />
      <p className="font-semibold">4. Generate AWS Access Key and Secret Key</p>
      <p>
        To connect Terraform with AWS, you need an Access Key ID and Secret
        Access Key.
      </p>
      <p>Steps to generate:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Login to AWS Console → Open{" "}
          <strong>IAM (Identity and Access Management)</strong>
        </li>
        <li>
          Click <strong>Users</strong> → Select your IAM user
        </li>
        <li>
          Go to <strong>Security credentials</strong> tab
        </li>
        <li>
          Under Access keys, click <strong>Create access key</strong>
        </li>
        <li>
          Choose <strong>Command Line Interface (CLI)</strong> as the use case
        </li>
        <li>
          Copy the Access Key ID and Secret Access Key (or download the .csv)
        </li>
      </ul>
      <p className="mt-2">
        <strong>Important:</strong> The Secret Key is shown only once. Save it
        securely.
      </p>
      <br />
      <p className="font-semibold">5. Configure AWS CLI</p>
      <p>Now configure AWS CLI with your keys:</p>
      <Code language="bash" code={`aws configure`} />
      You will be asked:
      <Code
        language="bash"
        code={`AWS Access Key ID [None]: YOUR_ACCESS_KEY_ID
AWS Secret Access Key [None]: YOUR_SECRET_ACCESS_KEY
Default region name [None]: us-east-1
Default output format [None]: json`}
      />
      <p className="font-semibold">6. Terraform Files Explained</p>
      <p>When working with Terraform, you’ll usually have these files:</p>
      <b>providers.tf</b>
      <p>Specifies which cloud provider and version Terraform should use.</p>
      <Code
        language="hcl"
        code={`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}`}
      />
      <p>
        <strong>Purpose:</strong>
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>Defines the provider (AWS, Azure, GCP, etc.)</li>
        <li>sets Terraform and provider versions.</li>
      </ul>
      <br />
      <b>variables.tf</b>
      <Code
        language="hcl"
        code={`variable "aws_region" {}
variable "vpc_cidr" {}`}
      />
      <b>Purpose</b>
      <ul className="list-disc ml-6 space-y-1">
        <li>Makes code reusable and dynamic</li>
        <li> keeping it DRY (Don’t Repeat Yourself).</li>
      </ul>
      <br />
      <b>terraform.tfvars</b>
      <Code
        language="hcl"
        code={`aws_region = "us-east-1"
vpc_cidr   = "10.0.0.0/16"`}
      />
      <b>Purpose:</b>
      <ul className="list-disc ml-6 space-y-1">
        <li>Keeps sensitive or environment-specific values separate</li>
        <li>easier to maintain.</li>
      </ul>
      <br />
      <b>backend.tf</b>
      <Code
        language="hcl"
        code={`terraform {
  backend "s3" {
    bucket  = "my-terraform-state-bucket"
    key     = "vpc/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}`}
      />
      <b>
        Purpose: Stores Terraform state remotely so teams can share and manage
        infrastructure safely.
      </b>
      <ul className="list-disc ml-6 space-y-1">
        <li>Ensures multiple team members share the same Terraform state</li>
        <li>Provides centralized and secure remote state storage</li>
        <li>Keeps local machines free from state file conflicts</li>
      </ul>
      <br />
      <b>main.tf</b>
      <p>
        The core of your Terraform configuration — defines actual resources.
      </p>
      <Code
        language="hcl"
        code={`resource "aws_vpc" "my_vpc" {
  cidr_block = var.vpc_cidr
  tags = {
    Name = "MyVPC"
  }
}`}
      />
      <b>Purpose</b>
      <ul className="list-disc ml-6 space-y-1">
        <li>Declares what resources to create (VPCs, EC2s, Subnets, etc.)</li>
        <li>Can include modules, networking, security groups, etc.</li>
      </ul>
      <br />
      <b>output.tf</b>
      <p>Displays important information after Terraform execution.</p>
      <Code
        language="hcl"
        code={`output "vpc_id" {
  value = aws_vpc.my_vpc.id
}`}
      />
      <b>Purpose</b>
      <ul className="list-disc ml-6 space-y-1">
        <li>Shows resource details post-deployment</li>
        <li>Useful for referencing in other modules or automation scripts</li>
      </ul>
      <br />
      <p className="font-semibold">7. Run Terraform</p>
      <p>Now that everything is ready, run:</p>
      <Code
        language="bash"
        code={`terraform init     # Download provider plugins
terraform plan     # Show what will be created
terraform validate  # Validate files
terraform apply -auto-approve   # Create resources`}
      />
      <p>Your VPC is now created on AWS!</p>
      <br />
      <p className="font-semibold">8. Clean Up</p>
      <p>To delete everything Terraform created:</p>
      <Code language="bash" code={`terraform destroy -auto-approve`} />
      <p className="font-semibold">Conclusion</p>
      <p>
        Terraform empowers DevOps teams to manage infrastructure efficiently by:
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Turns manual cloud setup into automated, version-controlled code.
        </li>
        <li>Ensures speed, repeatability, and consistency.</li>
        <li>Supports multiple cloud providers.</li>
        <li>Enables collaboration through shared state management.</li>
        <li>Handles resource dependencies automatically.</li>
      </ul>
    </div>
  );
};

export default Thirty;
