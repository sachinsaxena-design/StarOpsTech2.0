import React from 'react'
import { Code } from '../../../utils/Helpers'

function Seventy() {
  return (
    <>
      <img
        className="max-h-[700px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/AWS_IAM_Policies_Explained/AWS_Managed_Customer_Managed_Inline_Policies.png"
        alt="AWS IAM Policies Explained: AWS Managed vs Customer Managed vs Inline Policies"
      />
      
      <p className='mt-2'>
        If you've ever asked "who can do what in my AWS account," the answer always comes back to one thing: IAM policies. They're the rulebook that decides which identities can touch which resources, and getting them right is one of the most important parts of running a secure AWS environment.
      </p>
      <p className='mt-2'>
        In this post, we'll break down what IAM policies are, the three types you'll encounter, and how AWS actually decides whether to allow or deny a request.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>What Is an IAM Policy?</h1>
      <p className='mt-2'>
        At its core, an IAM policy is a set of rules written in JSON that defines who is allowed to do what with which AWS resources. It controls access to AWS services and resources, and it's one of the main tools that keeps your AWS environment secure.
      </p>
      <p className='mt-2'>Policies aren't floating on their own - they get attached to one of three types of entities:</p>
      <ul className='ml-6 list-disc space-y-1'>
        <li>Users</li>
        <li>Groups</li>
        <li>Roles</li>
      </ul>
      <p className='mt-2'>
        And in AWS IAM, there are essentially three flavors of policy: <strong>AWS Managed</strong>, <strong>Customer Managed</strong>, and <strong>Inline</strong>. Let's go through each one.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>1. AWS Managed Policies</h1>
      <p className='mt-2'>
        AWS managed policies are created and managed by AWS itself. They're built for common use cases across a wide range of AWS services, ready to attach to multiple IAM users, groups, or roles the moment you need them. One of their biggest perks: AWS automatically updates them to grant access to new services or actions, so you don't have to manually chase down policy changes. They exist to help you quickly assign the permissions a job function or application needs, and they come in two subtypes — general-purpose AWS managed policies, and service-linked policies designed for specific AWS services.
      </p>
      <br />
      <p className='text-xl font-semibold'>Example: AmazonEC2FullAccess</p>
      <p className='mt-2'>
        Imagine you have an IAM user called <strong>EC2MasterMind</strong> whose whole job is managing EC2 instances. Attaching the <strong>AmazonEC2FullAccess</strong> policy gives that user everything needed to:
      </p>
      <ul className='ml-6 list-disc space-y-1'>
        <li>Launch EC2 instances with a chosen AMI, instance type, and configuration</li>
        <li>Start, stop, reboot, and terminate instances</li>
        <li>Manage instance storage - volumes and snapshots</li>
        <li>Configure networking and security groups</li>
        <li>Create and manage SSH key pairs for secure login</li>
        <li>Monitor instances and set alerts via CloudWatch</li>
      </ul>
      <br />
      <p className='text-lg font-semibold'>Benefits & Limitations</p>
      <p className='mt-2'>
        <strong>Benefits:</strong> simplicity, predefined by AWS, automatic updates, reusability across entities, and built-in best practices.
      </p>
      <p className='mt-2'><strong>Limitations:</strong></p>
      <ul className='ml-6 list-disc space-y-1'>
        <li>No resource-specific access control - you can't restrict it to individual EC2 instances</li>
        <li>No customization - if it doesn't cover your exact need, you can't modify it</li>
        <li>Often grants broader permissions than necessary, which can quietly increase security risk</li>
        <li>You're dependent on AWS for any updates or changes</li>
        <li>Large managed policies can be genuinely hard to fully understand</li>
      </ul>
      <p className='mt-2'>In short: great for getting started fast, not great when you need precision.</p>
      <br />

      <h1 className='text-2xl font-semibold'>2. Customer Managed Policies</h1>
      <p className='mt-2'>
        This is where fine-grained control comes in. Customer-managed policies are created and managed by you, tailored to your specific needs, and attachable to multiple IAM entities — but unlike AWS-managed policies, updates are manual, and you get versioning and rollback for free.
      </p>

      <p className='text-lg font-semibold mt-2'>Example: Limiting EC2 access to specific instances</p>
      <p className='mt-2'>
        Say you don't want EC2MasterMind to manage every EC2 instance — only two out of three. A customer-managed policy lets you scope permissions down to exact resource ARNs:
      </p>
      <Code language='json' code={`
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:StartInstances",
        "ec2:StopInstances",
        "ec2:TerminateInstances"
      ],
      "Resource": [
        "arn:aws:ec2:region:account-id:instance/instance-id-1",
        "arn:aws:ec2:region:account-id:instance/instance-id-2"
      ]
    }
  ]
}`} />
      <p className='mt-2'>
        You can (and should) test policies like this using the <span className='underline'> IAM Policy Simulator</span> before rolling them out.
      </p>
      <br />

      <h1 className='text-xl font-semibold'>How AWS Evaluates Policies</h1>
      <p className='mt-2'>Understanding evaluation logic is essential once you start writing custom policies:</p>
      <ul className='ml-6 list-disc space-y-1'>
        <li><strong>Default Deny</strong> - if no policy explicitly allows an action, it is denied by default.</li>
        <li><strong>Explicit Allow</strong> - a permission is granted only when a policy explicitly allows it.</li>
        <li><strong>Explicit Deny always wins</strong> - if any policy explicitly denies an action, that deny overrides any allow, no matter how many other policies say yes.</li>
      </ul>

      <p className='mt-2'>Example of an explicit deny:</p>
      <Code language='json' code={`
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "ec2:*",
      "Resource": "arn:aws:ec2:region:account-id:instance/instance-id"
    }
  ]
}`} />
      <p className='mt-2'>
        One practical limit to keep in mind: each customer managed policy has a maximum size of <strong>6,144 characters</strong>, measured by the JSON representation including whitespace.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>3. Inline Policies</h1>
      <p className='mt-2'>
        Inline policies are the most tightly scoped of the three. Instead of existing as a separate object, they're embedded directly inside a single IAM user, group, or role.
      </p>
      <p className='text-lg font-semibold mt-2'>Key characteristics</p>
      <ul className='ml-6 list-disc space-y-1'>
        <li><strong>Direct association</strong> - unlike managed policies, which live as independent entities and can attach to multiple identities, an inline policy lives inside one identity only.</li>
        <li><strong>One-to-one relationship</strong> - each inline policy belongs to exactly one IAM entity, and if that entity is deleted, the policy is deleted with it.</li>
        <li><strong>Non-reusable</strong> - since it's embedded in a single entity, it can't be shared or reused elsewhere.</li>
        <li><strong>No ARN</strong> - because inline policies aren't separate entities, they don't get their own Amazon Resource Name.</li>
      </ul>

      <p className='text-lg font-semibold mt-2'>When to use inline policies</p>
      <ul className='ml-6 list-disc space-y-1'>
        <li>Meeting a specific, one-off job requirement</li>
        <li>Keeping tightly scoped permissions locked down</li>
        <li>Short-term projects that need custom access temporarily</li>
        <li>Enforcing a strict one-to-one rule between a policy and its entity</li>
        <li>Cases where the permission set is simple enough to manage in isolation</li>
      </ul>
      <br />

      <h1 className='text-2xl font-semibold'>Comparison</h1>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left"></th>
            <th className="border p-2 text-left">AWS Managed</th>
            <th className="border p-2 text-left">Customer Managed</th>
            <th className="border p-2 text-left">Inline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 font-semibold">Created by</td>
            <td className="border p-2">AWS</td>
            <td className="border p-2">You</td>
            <td className="border p-2">You</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Reusable across entities</td>
            <td className="border p-2">Yes</td>
            <td className="border p-2">Yes</td>
            <td className="border p-2">No</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Has an ARN</td>
            <td className="border p-2">Yes</td>
            <td className="border p-2">Yes</td>
            <td className="border p-2">No</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Updates</td>
            <td className="border p-2">Automatic (by AWS)</td>
            <td className="border p-2">Manual</td>
            <td className="border p-2">Manual</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Best for</td>
            <td className="border p-2">Fast setup, common use cases</td>
            <td className="border p-2">Fine-grained, org-specific control</td>
            <td className="border p-2">One-off, tightly scoped needs</td>
          </tr>
        </tbody>
      </table>
      <br />

      <h1 className='text-2xl font-semibold'>Final Thoughts</h1>
      <p className='mt-2'>
        There's no single “correct” policy type — the right choice depends on the trade-off you're making between speed and precision. AWS managed policies get you moving fast with sensible defaults. Customer-managed policies give you the control to lock down access to exactly what's needed, with the benefit of versioning. Inline policies are the scalpel for one-off, tightly bound permission needs.
      </p>
      <p className='mt-2'>
        The real skill in IAM isn't memorizing policy types — it's knowing when least privilege matters enough to reach for a custom policy instead of a broad, convenient one.
      </p>
    </>
  )
}

export default Seventy