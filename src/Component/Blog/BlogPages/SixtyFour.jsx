import React from "react";
import { Code } from "../../../utils/Helpers";

function SixtyFour() {
    return (
        <div>
            {/* Blog Banner */}
          <img
                className="max-h-[600px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/sam/Banner.png"
                alt="Nginx vs Apache Complete Guide"
            />

            <p className="mt-2">
                It started with a simple requirement.
            </p>

            <p className="mt-2">
                I had a few FastAPI services that needed to run on AWS Lambda.
            </p>

            <p className="mt-2">
                Nothing unusual.
            </p>

            <p className="mt-2">
                One Lambda for ServiceA. Another for ServiceB. Another for ServiceC.
            </p>

            <p className="mt-2">
                Each service had its own container image in Amazon ECR, but the
                infrastructure around them looked surprisingly similar.
            </p>

            <p className="mt-2">
                Every Lambda needed:
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>An IAM execution role</li>
                <li>VPC configuration</li>
                <li>Subnets</li>
                <li>Security groups</li>
                <li>Environment variables</li>
                <li>Secrets from AWS Secrets Manager</li>
                <li>Memory and timeout configuration</li>
                <li>A container image</li>
                <li>An API Gateway route</li>
            </ul>

            <p className="mt-2">
                At first, this didn't feel like a problem.
            </p>

            <p className="mt-2">
                I could simply create the resources and move on.
            </p>

            <p className="mt-2">
                But then I imagined the next service.
            </p>

            <p className="mt-2">
                And the service after that.
            </p>

            <p className="mt-2">
                Suddenly, I was looking at the same infrastructure configuration
                being repeated again and again.
            </p>

            <p className="mt-2">
                That's when I started asking myself:
            </p>

            <p className="mt-2 font-semibold italic">
                What if I don't need to write the Lambda infrastructure four times?
            </p>

            <p className="mt-2">
                What if I could define the common infrastructure once and simply
                tell AWS:
            </p>

            <p className="mt-2 font-semibold italic">
                "Deploy this Lambda using this service configuration and this
                container image."
            </p>

            <p className="mt-2">
                That question led me to build a small reusable AWS SAM architecture
                using <strong>three files</strong>.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                The Three-File Architecture
            </p>

            <p className="mt-2">
                The final structure was intentionally simple:
            </p>

            <Code
                language="text"
                code={`
saml_base_template.yaml

deployment.yaml

networking_properties.json
`}
            />

            <p className="mt-2">
                Each file has a very specific responsibility.
            </p>

            {/* IMAGE 1
                Replace this placeholder with the actual architecture image URL.
            */}
            <div className="my-5 rounded-lg border p-5 text-center text-gray-500">
                <img
                    className="max-h-[600px] w-full mx-auto rounded-lg"
                    src="https://cdn.staropstech.com/starops/Blogs/sam/Image1.png"
                    alt="Nginx vs Apache Complete Guide"
                />
            </div>

            <p className="mt-2">
                The important part is that the base template doesn't care which
                service it is deploying.
            </p>

            <p className="mt-2">
                It simply receives parameters.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                1. The Base Template — The Reusable Building Block
            </p>

            <p className="mt-2">
                The first file is the base SAM template.
            </p>

            <p className="mt-2">
                Its job is simple:
            </p>

            <p className="mt-2 font-semibold">
                Create one Lambda function using parameters supplied by the
                deployment template.
            </p>

            <p className="mt-2">
                Instead of hardcoding everything, I defined parameters such as:
            </p>

            <Code
                language="yaml"
                code={`
Parameters:
  FunctionName:
    Type: String

  ImageKey:
    Type: String

  MemorySize:
    Type: Number
    Default: 512

  Timeout:
    Type: Number
    Default: 30

  Architectures:
    Type: String
    Default: "arm64"
`}
            />

            <p className="mt-2">
                This immediately makes the template reusable.
            </p>

            <p className="mt-2">
                The Lambda name can change.
            </p>

            <p className="mt-2">
                The image can change.
            </p>

            <p className="mt-2">
                Memory can change.
            </p>

            <p className="mt-2">
                Timeout can change.
            </p>

            <p className="mt-2">
                Architecture can change.
            </p>

            <p className="mt-2">
                But the infrastructure definition remains the same.
            </p>

            <br />

            <p className="font-semibold text-xl">
                Choosing the Correct ECR Image
            </p>

            <p className="mt-2">
                One of the things I wanted to avoid was passing a completely
                different <span className="text-green-600">ImageUri</span> every
                time.
            </p>

            <p className="mt-2">
                Instead, I created a mapping.
            </p>

            <Code
                language="yaml"
                code={`
Mappings:
  FunctionImageMap:
    ServiceAFunction:
      ImageUri: "..."

    ServiceBFunction:
      ImageUri: "..."

    ServiceCFunction:
      ImageUri: "..."
`}
            />

            <p className="mt-2">
                Now the deployment only needs to provide an{" "}
                <span className="text-green-600">ImageKey</span>.
            </p>

            <p className="mt-2">
                The base template can resolve the corresponding ECR image:
            </p>

            <Code
                language="yaml"
                code={`
ImageUri: !FindInMap
  - FunctionImageMap
  - !Ref ImageKey
  - ImageUri
`}
            />

            <p className="mt-2">
                This gives me a single place to maintain the relationship between:
            </p>

            <p className="mt-2 font-semibold">
                service → ECR image
            </p>

            <br />

            <p className="font-semibold text-xl">
                Lambda + VPC
            </p>

            <p className="mt-2">
                Another important requirement was that these Lambda functions
                needed access to resources inside the VPC.
            </p>

            <p className="mt-2">
                So the base template handles the VPC configuration as well:
            </p>

            <Code
                language="yaml"
                code={`
VpcConfig:
  SubnetIds: !Ref SubnetIds
  SecurityGroupIds: !Ref SecurityGroupIds
`}
            />

            <p className="mt-2">
                The actual networking values aren't hardcoded inside the Lambda
                definition.
            </p>

            <p className="mt-2">
                Instead, they're passed into the template.
            </p>

            <p className="mt-2">
                That distinction becomes important when the same deployment
                architecture needs to be used across environments.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                2. The Deployment Template — The Orchestrator
            </p>

            <p className="mt-2">
                The second file is where things become interesting.
            </p>

            <p className="mt-2">
                The deployment template doesn't define every Lambda implementation
                itself.
            </p>

            <p className="mt-2">
                Instead, it acts as the <strong>orchestrator</strong>.
            </p>

            <p className="mt-2">
                It creates the API Gateway and invokes the reusable base template
                through nested CloudFormation stacks.
            </p>

            <p className="mt-2">
                For example:
            </p>

            <Code
                language="yaml"
                code={`
ServiceALambda:
  Type: AWS::CloudFormation::Stack

  Properties:
    TemplateURL: "https://.../saml_base_template.yaml"

    Parameters:
      FunctionName: "ServiceAFunction"
      ...
`}
            />

            <p className="mt-2">
                And then another service can use the exact same base template:
            </p>

            <Code
                language="yaml"
                code={`
ServiceBLambda:
  Type: AWS::CloudFormation::Stack

  Properties:
    TemplateURL: "https://.../saml_base_template.yaml"

    Parameters:
      FunctionName: "ServiceBFunction"
      ...
`}
            />

            <p className="mt-2">
                Same template.
            </p>

            <p className="mt-2">
                Different parameters.
            </p>

            <p className="mt-2">
                Different service.
            </p>

            <p className="mt-2 font-semibold">
                That's the key idea.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                3. API Gateway Becomes the Front Door
            </p>

            <p className="mt-2">
                Now we have multiple Lambda functions, but clients still need a
                single entry point.
            </p>

            <p className="mt-2">
                That's where API Gateway comes in.
            </p>

            <p className="mt-2">
                I created a common API structure:
            </p>

            <Code
                language="text"
                code={`
/ Org
  / api
    / v1
      / serviceA/{proxy+}
      / serviceB/{proxy+}
      / serviceC/{proxy+}
`}
            />

            <p className="mt-2">
                This gives each FastAPI service its own logical route while keeping
                everything behind one API Gateway.
            </p>

            <p className="mt-2">
                For example:
            </p>

            <Code
                language="text"
                code={`
/v1/serviceA/*
/v1/serviceB/*
/v1/serviceC/*
`}
            />

            <p className="mt-2">
                The API Gateway integration then forwards the request to the
                corresponding Lambda.
            </p>

            <p className="mt-2">
                So the request flow becomes:
            </p>

            {/* IMAGE 2
                Replace this placeholder with the actual request-flow image URL.
            */}
            <div className="my-5 rounded-lg border p-5 text-center text-gray-500">
                <img
                    className="max-h-[600px] w-full mx-auto rounded-lg"
                    src="https://cdn.staropstech.com/starops/Blogs/sam/Image2.png"
                    alt="Nginx vs Apache Complete Guide"
                />
            </div>

            <p className="mt-2">
                From the client's perspective, it looks like one API.
            </p>

            <p className="mt-2">
                Behind the scenes, it is multiple independently deployable
                services.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                4. Keeping Networking Separate
            </p>

            <p className="mt-2">
                The third file is intentionally simple:
            </p>

            <Code
                language="json"
                code={`
{
  "VpcId": "vpc-xxxxxxxx",
  "SubnetIds": [
    "subnet-xxxxxxxx"
  ],
  "SecurityGroupIds": [
    "sg-xxxxxxxx"
  ]
}
`}
            />

            <p className="mt-2">
                Why keep this separate?
            </p>

            <p className="mt-2">
                Because networking configuration is infrastructure configuration.
            </p>

            <p className="mt-2">
                I don't want to mix values such as VPC IDs and subnet IDs
                throughout my application deployment templates.
            </p>

            <p className="mt-2">
                The idea is to keep the responsibilities clear:
            </p>

            <Code
                language="text"
                code={`
Application configuration
        ↓
deployment.yaml

Reusable Lambda infrastructure
        ↓
saml_base_template.yaml

Network configuration
        ↓
networking_properties.json
`}
            />

            <p className="mt-2">
                This makes the architecture easier to understand and maintain.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                What Changed After This?
            </p>

            <p className="mt-2">
                The biggest improvement wasn't that I could deploy Lambda.
            </p>

            <p className="mt-2">
                AWS SAM could already do that.
            </p>

            <p className="mt-2">
                The improvement was <strong>how I thought about the
                    infrastructure</strong>.
            </p>

            <p className="mt-2">
                Instead of thinking:
            </p>

            <p className="mt-2 font-semibold italic">
                "I need to create four Lambda functions."
            </p>

            <p className="mt-2">
                I started thinking:
            </p>

            <p className="mt-2 font-semibold italic">
                "I need one reusable Lambda definition that can create four
                different functions."
            </p>

            <p className="mt-2">
                That's a small change in thinking, but it has a big impact.
            </p>

            <p className="mt-2">
                If tomorrow I add another service, I don't need to copy an entire
                Lambda configuration.
            </p>

            <p className="mt-2">
                I can reuse the same base template and provide the new service's
                parameters.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                The Bigger Lesson
            </p>

            <p className="mt-2">
                Infrastructure code can become repetitive surprisingly quickly.
            </p>

            <p className="mt-2">
                And repetition in infrastructure is dangerous.
            </p>

            <p className="mt-2">
                A small difference between two supposedly identical Lambda
                configurations can eventually turn into a debugging session.
            </p>

            <p className="mt-2">
                One function has a different timeout.
            </p>

            <p className="mt-2">
                Another has a different security group.
            </p>

            <p className="mt-2">
                One uses a different environment variable.
            </p>

            <p className="mt-2">
                Another points to a different image.
            </p>

            <p className="mt-2">
                Before long, you have infrastructure drift.
            </p>

            <p className="mt-2">
                Reusable templates help reduce that problem.
            </p>

            <p className="mt-2">
                The goal isn't to create the most complicated CloudFormation
                architecture possible.
            </p>

            <p className="mt-2">
                The goal is to create{" "}
                <strong>
                    simple building blocks that can be composed together.
                </strong>
            </p>

            <p className="mt-2">
                In my case, those building blocks became:
            </p>

            {/* IMAGE 3
                Replace this placeholder with the actual architecture/building-block
                image URL.
            */}
            <div className="my-5 rounded-lg border p-5 text-center text-gray-500">
                <img
                    className="max-h-[600px] w-full mx-auto rounded-lg"
                    src="https://cdn.staropstech.com/starops/Blogs/sam/Image3.png"
                    alt="Nginx vs Apache Complete Guide"
                />
            </div>

            <p className="mt-2">
                And that's what I like most about this setup.
            </p>

            <p className="mt-2">
                It's not really about writing fewer lines of YAML.
            </p>

            <p className="mt-2 font-semibold">
                It's about making the next deployment easier than the previous one.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Final Thoughts
            </p>

            <p className="mt-2">
                When you have one Lambda, almost any deployment approach can work.
            </p>

            <p className="mt-2">
                When you have several services, things start getting interesting.
            </p>

            <p className="mt-2">
                And when those services share the same infrastructure
                requirements, that's when reusable infrastructure starts paying
                off.
            </p>

            <p className="mt-2">
                For my FastAPI services, AWS SAM gave me a way to turn repeated
                Lambda configuration into a reusable deployment pattern.
            </p>

            <p className="mt-2">
                The architecture is simple:
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>
                    <strong>One reusable base template.</strong>
                </li>
                <li>
                    <strong>One deployment/orchestration template.</strong>
                </li>
                <li>
                    <strong>One separate networking configuration.</strong>
                </li>
                <li>
                    <strong>
                        Multiple FastAPI services running behind a common API
                        Gateway.
                    </strong>
                </li>
            </ul>

            <p className="mt-2">
                The real win wasn't deploying four Lambdas.
            </p>

            <p className="mt-2 font-semibold text-lg">
                The real win was making the fifth one easier.
            </p>
        </div>
    );
}

export default SixtyFour;