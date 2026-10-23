import React from "react";
import { Code } from "react-code-blocks";
import { Para } from "../../../utils/Helpers";

const Thirteen = () => {
  return (
    <>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/cover.gif"
        alt="lambda-and-cloudWatch"
      />
      <br />
      <Para>
        Managing AWS costs can be a daunting task, especially when you forget to
        turn off your EC2 instances during non-working hours. I used to face
        this issue regularly, and it was driving up my AWS bill unnecessarily.
        But then, I discovered a way to automate the start and stop of my EC2
        instances using AWS Lambda and CloudWatch Events. Here’s how I did it.
      </Para>
      <Para>
        <b>Step 1: Signing In to the AWS Console 🔑</b>
      </Para>
      <Para>
        One evening, I sat down with my laptop, determined to tackle my AWS
        billing issue once and for all. The first thing I did was sign in to my
        AWS Management Console, my gateway to the world of cloud computing.
      </Para>
      <Para>
        <b>Step 2: Setting Up IAM Role and Policy 🔧</b>
      </Para>
      <p>
        <b> 2.1 Finding the IAM Service</b>
      </p>
      I knew that to automate my EC2 instances, I needed to create an IAM role
      and policy. So, I typed "IAM" in the AWS Console’s search bar and hit
      enter. The IAM dashboard opened up, presenting me with a host of options.{" "}
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/1_aws.png"
        alt="lambda-and-cloudWatch"
      />
      <p>
        <b>2.2 Crafting the Perfect Policy</b>
      </p>{" "}
      <p className="indent-2">
        <b> 2.2.1 Navigating to Policies</b>
      </p>{" "}
      <p className="pl-2">
        From the left-hand sidebar, I selected "Policies" under the "Access
        Management" section. This was where I would define the permissions
        needed to start and stop my EC2 instances.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/2_iam.png"
        alt="lambda-and-cloudWatch"
      />
      <p className="indent-2">
        <b> 2.2.2 Creating a New Policy</b>
      </p>
      <p className="pl-2">
        I clicked on "Create policy" and switched to the JSON editor. With a few
        deep breaths, I pasted the following policy template, which I had
        meticulously crafted:
      </p>
      <br />
      <Code
        code={`
{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Action": [
  "ec2:StartInstances",
  "ec2:StopInstances",
  "ec2:DescribeInstances"
],
"Resource": "*"
}
]
}`}
        language="json"
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/3_policy.png"
        alt="lambda-and-cloudWatch"
      />
      <Para>
        This policy would allow my future Lambda function to start, stop, and
        describe EC2 instances. I clicked "Next" and named the policy &nbsp;
        <b>ec2_start_stop_policy</b>. After a quick review, I clicked "Create
        Policy."
        <br />
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/4_cloud.png"
          alt="lambda-and-cloudWatch"
        />
        <br />
        <b> Note:</b> Including DescribeInstances was crucial. It allowed the
        function to check the instance's state before performing any action,
        ensuring it wouldn’t try to stop an already stopped instance or start
        one that was already running.
      </Para>
      <p>
        <b>2.3 Setting Up the Role</b>
      </p>{" "}
      <p className="indent-2">
        <b> 2.3.1 Creating a New Role</b>
      </p>{" "}
      <p className="pl-2">
        Next, I navigated to the "Roles" section from the same sidebar and
        clicked on "Create role."
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/5_role.png"
        alt="lambda-and-cloudWatch"
      />
      <p className="indent-2">
        <b> 2.3.2 Choosing the Trusted Entity</b>
      </p>
      <p className="pl-2">
        I chose "AWS Service" as the trusted entity and selected "Lambda" as the
        use case.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/6_policy attachment.png"
        alt="lambda-and-cloudWatch"
      />
      <p className="indent-2">
        <b> 2.3.3 Attaching the Policy</b>
      </p>
      <p className="pl-2">
        I found my <b>ec2_start_stop_policy</b> in the search bar, selected it,
        and proceeded to the next step.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/7_devops.png"
        alt="lambda-and-cloudWatch"
      />
      <p className="indent-2">
        <b> 2.3.4 Naming the Role</b>
      </p>
      <p className="pl-2">
        I named this role <b>ec2_start_stop_role</b> and clicked "Create Role."
        Now, I had an IAM role that my Lambda function could assume to control
        my EC2 instances.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/8_json.png"
        alt="lambda-and-cloudWatch"
      />
      <br />
      <p>
        <b>Step 3: Setting Up Lambda Functions 💻</b>
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/9_lambda.png"
        alt="lambda-and-cloudWatch"
      />
      <br />
      <p>
        <b>3.1 The Start Function</b>
      </p>{" "}
      <p className="indent-2">
        <b>3.1.1 Creating the Function</b>
      </p>{" "}
      <p className="pl-2">
        I navigated to the Lambda service and clicked on "Create function." I
        named the function <b>ec2_start</b>, chose Python as the runtime, and
        selected my ec2_start_stop_role as the execution role.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/10 _aws_lambda.png"
        alt="lambda-and-cloudWatch"
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/11_start_function.png"
        alt="lambda-and-cloudWatch"
      />
      <p className="indent-2">
        <b> 3.1.2 Writing the Code</b>
      </p>
      <p className="pl-2">In the code editor, I pasted the following script:</p>
      <br />
      <Code
        code={`
import boto3
def lambda_handler(event, context):
ec2 = boto3.client('ec2', region_name='your-region')
ec2.start_instances(InstanceIds=['your-instance-id'])
return 'EC2 instance started'
`}
        language={"python"}
      />
      <p>
        Replacing <b>your-region</b> and <b>your-instance-id</b> with my
        specific details, I clicked "Deploy."
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/12_ec2.png"
        alt="lambda-and-cloudWatch"
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/13_test_case.png"
        alt="lambda-and-cloudWatch"
      />
      <p className="indent-2">
        <b>3.1.3 Testing the Function</b>
      </p>{" "}
      <p className="pl-2">
        I clicked "Test," named the event <b>ec2_start_test</b>, and saved it.
        After adjusting the timeout to 30 seconds, I ran the test. Success! My
        EC2 instance started as expected.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/14_trigger.png"
        alt="lambda-and-cloudWatch"
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/15_deploy.png"
        alt="lambda-and-cloudWatch"
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/16_execution.png"
        alt="lambda-and-cloudWatch"
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/17_stop_instance.png"
        alt="lambda-and-cloudWatch"
      />
      <p>
        <b> 3.2 The Stop Function</b>
      </p>
      <p>
        Following the same steps, I created another Lambda function named &nbsp;
        <b>ec2_stop</b> with the following script:
      </p>
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/18_python.png"
        alt="lambda-and-cloudWatch"
      />
      <br />
      <Code
        code={`
import boto3
def lambda_handler(event, context):
ec2 = boto3.client('ec2', region_name='your-region')
ec2.stop_instances(InstanceIds=['your-instance-id'])
return 'EC2 instance stopped
    `}
        language={"python"}
      />
      <p>
        Again, I tested this function and confirmed that it stopped my EC2
        instance without any issues.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/19_lambda_function.png"
        alt="lambda-and-cloudWatch"
      />{" "}
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/20_computer_stop.png"
        alt="lambda-and-cloudWatch"
      />{" "}
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/21_aws_console.png"
        alt="lambda-and-cloudWatch"
      />
      <br />
      <p>
        <b>Step 4: Setting Up CloudWatch Events 📅</b>
      </p>
      <br />
      <p>
        <b>4.1 Automating the Start Function </b>
      </p>
      <p className="pl-2">
        <b>4.1.1 Adding the Trigger</b>
      </p>
      <p className="pl-2">
        With my Lambda functions ready, I moved on to automation. In the Lambda
        console, I clicked "Add Trigger" and selected EventBridge (formerly
        CloudWatch Events).
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/22_iam_service.png"
        alt="lambda-and-cloudWatch"
      />
      <p className="pl-2 ">
        <b>4.1.2 Configuring the Rule</b>{" "}
      </p>
      <p className="pl-2">
        I created a new rule named <b>ec2_start_event</b> with a schedule
        expression. Since I wanted my instance to start at 10 AM IST (which is
        4:30 AM UTC), I used the following cron expression:
      </p>
      <br />
      <Code
        code={`
cron(30 4 ? * MON-FRI *)`}
        language={"shell"}
      />
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/23_cloudwatch.png"
        alt="lambda-and-cloudWatch"
      />
      <br />
      <p>
        <b>4.2 Automating the Stop Function</b>{" "}
      </p>
      <p>
        Similarly, I added a trigger to the stop function with the rule named{" "}
        <b>ec2_stop_event</b> using this cron expression to stop the instance at
        8 PM IST (2:30 PM UTC):
      </p>
      <br />
      <Code
        code={`
cron(30 14 ? * MON-FRI *)`}
        language={"shell"}
      />
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/24_event.png"
        alt="lambda-and-cloudWatch"
      />
      <br />
      <p>
        <b> Conclusion 🎉</b>
      </p>
      <Para>
        By implementing this automation, I was able to drastically reduce my AWS
        costs. The following images illustrate the effectiveness of this setup:
      </Para>
      <ul className="list-decimal list-inside pl-2">
        <li>
          <b>Before 10 AM:</b> The EC2 instance is stopped, ensuring no
          unnecessary costs.
        </li>
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/25_time.png"
          alt="lambda-and-cloudWatch"
        />
        <li>
          <b>After 10 AM: </b>The EC2 instance is automatically started, ready
          for the workday.
        </li>

        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/26_sde_start_time.png"
          alt="lambda-and-cloudWatch"
        />
        <li>
          {" "}
          <b>Before 8 PM:</b> The instance is running during office hours.
        </li>
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/27_office_working_hour.png"
          alt="lambda-and-cloudWatch"
        />
        <li>
          <b> After 8 PM:</b> The instance is automatically stopped, saving
          costs during non-working hours.
        </li>
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Automating_EC2_StartStop_with_Lambda/28_billing_management.png"
          alt="lambda-and-cloudWatch"
        />
      </ul>
      <p>
        This automation has ensured that my EC2 instances only run when needed,
        thereby minimizing my AWS billing. By using AWS Lambda and CloudWatch
        Events, I never have to worry about forgetting to turn off my instances
        again. This simple yet powerful setup can help you achieve significant
        savings on your AWS account. Happy saving!
      </p>
    </>
  );
};

export default Thirteen;
