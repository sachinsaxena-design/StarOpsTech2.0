import React from 'react'
import { Code } from '../../../utils/Helpers'

function FiftyTwo() {
    return (
        <>
            {/* This is Fifty-Two Blog of StarOps */}
            <div>
                <img
                    className="max-h-[700px] w-full mx-auto rounded-lg"
                    src="https://cdn.staropstech.com/starops/Blogs/AWS_Snapshots_&_AMI/AWS_Snapshots_&_AMI.jpg"
                    alt="AWS Snapshots and AMI Guide"
                />
                <p className="font-semibold text-2xl mt-4">Introduction</p>
                <p className="mt-2">
                    In AWS, two important tools for managing data and servers are <strong>EBS Snapshots</strong> and <strong>AMIs</strong>.
                    Many engineers use them, but not everyone fully understands how they work behind the scenes or how to use them effectively together.
                </p>
                <p className="mt-2">
                    This guide explains these concepts in a simple way. It covers how snapshots and AMIs work, how they are created and managed, how to copy them across regions, and how to automate everything using CLI and Lambda. It also includes tips on encryption and real-world best practices to build a more reliable and cost-effective cloud setup.
                </p>

                {/* PART 1 */}
                <p className="font-semibold text-2xl mt-8">Part 1: EBS Snapshots</p>

                <p className="font-semibold text-xl mt-4">What is an EBS Snapshot?</p>
                <p className="mt-2">
                    An EBS Snapshot is basically a backup of your EBS volume taken at a specific point in time.
                    These Snapshots are stored in <strong>Amazon S3 (managed internally by AWS, not visible in your S3 buckets)</strong>. Each snapshot has a unique ID, like snap-0abc1234def567890.
                </p>
                <p className="mt-2 font-semibold">Simple Understanding:</p>
                <p>
                    The first snapshot is a full backup of your data.

                </p>
                <p>
                    After that, every new snapshot only saves the changes made since the last one (incremental backup).
                </p>
                <p>
                    This helps reduce storage cost while still allowing you to fully restore your data whenever needed. Even though snapshots are incremental, each snapshot is logically independent, and AWS can restore a full volume from any snapshot.

                </p>


                <p className="font-semibold text-xl mt-6">How Snapshots Work Internally</p>
                <p className="mt-2">
                    AWS manages snapshots at the block level (small chunks of data).
                </p>

                <p>For example, if you have a 100 GB volume but only 10 GB is actually used, then the snapshot will store only that 10 GB — not the full 100 GB.</p>
                <p>When you take more snapshots:</p>
                <ul className='ml-6 space-y-1 mt-2 list-disc'>
                    <li>AWS saves only the changed data (not everything again)
                    </li>
                    <li>
                        Unchanged data is referenced from previous snapshots
                    </li>
                </ul>
                <p>This creates a chain of snapshots. AWS automatically manages the snapshot chain, so you don’t need to worry about dependencies between snapshots.</p>
                <p>Important point:
                </p>
                <p>
                    Even though snapshots are linked in a chain, you can restore from any snapshot directly.
                    AWS automatically combines the required data from the chain in the background to rebuild the full volume.
                </p>

                <p className="font-semibold text-xl mt-6">Create Snapshot (CLI)</p>
                <Code
                    language="bash"
                    code={`
aws ec2 create-snapshot \\
--volume-id vol-123 \\
--description "my-backup"
`}
                />

                <p className="font-semibold text-xl mt-6">Copy Snapshot to Another Region</p>
                <Code
                    language="bash"
                    code={`
aws ec2 copy-snapshot \\
 --source-region us-east-1 \\
 --destination-region ap-south-1 \\
 --source-snapshot-id snap-123
`}
                />

                <p className="mt-2">Useful for <strong> Disaster Recovery (DR)</strong></p>

                <p className="font-semibold text-2xl mt-6">Automation (Very Important in Real Projects)</p>
                <p>Manually taking backups is risky</p>
                <p>Use <strong>AWS Data Lifecycle Manager</strong></p>
                <p>It helps you:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Take daily backups</li>
                    <li>Delete old ones automatically
                    </li>
                    <li>Save cost</li>
                </ul>

                <p className="mt-2">Example:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li> Daily snapshot at 3 AM</li>
                    <li>Keep the last 7 days' backup</li>
                </ul>
                <p className="font-semibold text-2xl mt-6">Snapshot Encryption</p>
                <p className='my-2'>Security is very important</p>
                <p>Use <strong>AWS Key Management Service
                </strong></p>
                <p className='my-2'>If volume is encrypted → snapshot is automatically encrypted</p>

                <p className="font-semibold text-2xl mt-6">Cost Optimization Tips</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Delete unused snapshots</li>
                    <li>Use the archive for old backups</li>
                    <li>Always use tagging</li>
                    <li>Monitor in AWS Cost Explorer</li>
                </ul>

                <p className="mt-2 ">
                    <strong>Important:</strong> Deleting an AMI does NOT delete its underlying snapshots — you must delete them manually to avoid extra cost.
                </p>

                {/* PART 2 */}
                <p className="font-semibold text-2xl mt-8">Part 2: AMI (Amazon Machine Image)</p>

                <p className="font-semibold text-xl mt-4">What is AMI?</p>
                <p className="mt-2">
                    An Amazon Machine Image (AMI) is simply a template (blueprint) used to launch EC2 instances.
                </p>
                <p>It includes everything needed to start a serve</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Operating System (Linux/Windows)</li>
                    <li>Installed software</li>
                    <li>Configuration settings</li>
                    <li>References to EBS snapshots (storage)</li>
                </ul>
                <p className='my-2'>In simple words:</p>
                <p className="mt-2 ">
                    An AMI is like a ready-made server image — you just launch it, and your server is up with everything pre-configured.

                </p>

                <p className="font-semibold text-xl mt-6">Types of AMIs</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>AWS-managed AMIs – Provided by AWS (e.g., Amazon Linux, Ubuntu)</li>
                    <li>Community AMIs – Shared by other users publicly</li>
                    <li>Private AMIs – Created and used within your own AWS account</li>
                </ul>

                <p className="font-semibold text-xl mt-6">AMI Components</p>
                <p>An AMI is made up of a few important parts:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li><strong>Root Volume Snapshot</strong>
                        <p className='ml-6'>This is the main EBS snapshot that contains the OS and boot files.</p>
                    </li>
                    <li><strong>Launch Permissions</strong>
                        <p className='ml-6'>Controls who can use this AMI (only you, specific accounts, or public).</p>
                    </li>
                    <li><strong>Block Device Mapping</strong>
                        <p className='ml-6'>Defines which storage volumes will be attached when the instance starts (root + extra volumes).</p>
                    </li>
                    <li><strong>Virtualization Type</strong>
                        <p className='ml-6'>Usually HVM (Hardware Virtual Machine) — required for modern EC2 instances.</p>
                    </li>
                    <li><strong>Architecture</strong>
                        <p className='ml-6'>Defines CPU type:</p>
                        <ul className='ml-12 space-y-1 list-[circle]'>
                            <li>x86_64 (Intel/AMD)</li>
                            <li>arm64 (AWS Graviton)</li>
                        </ul>
                    </li>

                </ul>

                <p className="mt-2 text-2xl font-semibold">
                    Simple understanding:
                </p>
                <p className='my-2'>If Snapshot = backup of disk</p>
                <p>Then AMI = full server template (OS + config + snapshot)</p>
                <p className='text-xl font-semibold'>Create AMI</p>
                <Code
                    language="bash"
                    code={`
aws ec2 create-image \\
 --instance-id i-123 \\
 --name "my-ami"
`}
                />

                <p className="font-semibold text-2xl mt-6">Golden AMI (Very Important Concept)</p>
                <p className='my-2'>Golden AMI =<strong> fully configured production-ready image</strong></p>
                <p>Steps:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Launch EC2</li>
                    <li>Install everything</li>
                    <li>Configure properly</li>
                    <li>Always remove sensitive data (like SSH keys, logs, and credentials) before creating a Golden AMI.</li>
                    <li>Create AMI</li>
                </ul>
                <p className='my-2'> Now reuse it everywhere</p>
                <p className="font-semibold text-xl mt-6">Copy AMI to Another Region
                </p>
                <Code
                    language="bash"
                    code={`
aws ec2 copy-image \\
 --source-region us-east-1 \\
 --region ap-south-1 \\
 --source-image-id ami-123 \\
 --name "copy-ami"
`}
                />

                <p className="font-semibold text-xl mt-6">Delete Old AMIs (Important)
                </p>
                <Code
                    language="bash"
                    code={`
aws ec2 deregister-image --image-id ami-123
`}
                />
                <p className="mt-2"> Also, delete snapshots (very important, otherwise the cost continues)
                </p>

                {/* PART 3 */}
                <p className="font-semibold text-2xl mt-8">Part 3: Snapshot vs AMI (Key Differences )</p>
                <p className="my-2">Understanding the difference between EBS Snapshots and AMIs is very important when working on AWS.</p>
                <p className="mt-2 font-semibold">Basic Difference</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li><strong>EBS Snapshot</strong> → Backup of a single volume (only data)</li>
                    <li><strong>AMI</strong> → Complete server template (OS + software + config + snapshots)</li>
                </ul>
                <p className='text-2xl font-semibold my-2'>Side-by-Side Comparison</p>
                <table className="w-full border border-gray-300 border-collapse text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Feature</th>
                            <th className="border border-gray-300 px-4 py-2">EBS Snapshot</th>
                            <th className="border border-gray-300 px-4 py-2">AMI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Includes OS</td>
                            <td className="border border-gray-300 px-4 py-2">No</td>
                            <td className="border border-gray-300 px-4 py-2">Yes</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">Incremental</td>
                            <td className="border border-gray-300 px-4 py-2">Yes</td>
                            <td className="border border-gray-300 px-4 py-2">AMI creates new snapshots, but those snapshots are incremental internally</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Use Case</td>
                            <td className="border border-gray-300 px-4 py-2">Backup & restore</td>
                            <td className="border border-gray-300 px-4 py-2">Launch new servers</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2"> Storage</td>
                            <td className="border border-gray-300 px-4 py-2">S3 (AWS managed)</td>
                            <td className="border border-gray-300 px-4 py-2">S3 + Snapshot references</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Encryption</td>
                            <td className="border border-gray-300 px-4 py-2">Supportede</td>
                            <td className="border border-gray-300 px-4 py-2">Supportede</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Sharing</td>
                            <td className="border border-gray-300 px-4 py-2">Account/Public</td>
                            <td className="border border-gray-300 px-4 py-2">Account/Public/Marketplace</td>
                        </tr>
                    </tbody>
                </table>
                <p className='text-2xl font-semibold my-2'>Simple Understanding</p>
                <ul className="list-disc ml-6 my-2 space-y-1">
                    <li>Snapshot = <strong>Data backup</strong></li>
                    <li>AMI =<strong>Ready-to-use server</strong></li>
                </ul>
                <p>Snapshot stores only <strong>data blocks</strong></p>
                <p>AMI stores a <strong>full machine setup</strong></p>

                <p className='text-2xl font-semibold my-2'>Detailed Difference</p>

                <p><strong>EBS Snapshot</strong></p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Backup of one EBS volume only</li>
                    <li>
                        Does not include OS configuration
                    </li>
                    <li>
                        Works in an incremental way (only changed data is stored)
                    </li>
                    <li>
                        Cannot launch EC2 directly (first create volume, then attach)
                    </li>
                </ul>
                <p><strong>AWS AMI</strong></p>

                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Complete EC2 server image</li>
                    <li>Includes:
                        <ul className='list-[circle] ml-6 space-y-1'>
                            <li>OS</li>
                            <li>
                                Installed apps
                            </li>
                            <li>
                                Configuration
                            </li>
                            <li>
                                Snapshot references
                            </li>
                        </ul>
                    </li>
                    <li>Can directly launch EC2 instances</li>
                    <li>Used in Auto Scaling & deployments</li>
                </ul>

                <p className="font-semibold text-2xl mt-6">When to Use What?</p>

                <p className="mt-2 font-semibold">Use Snapshot when:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>You want to backup data (database, logs, etc.)</li>
                    <li>You need to restore or recover the volume</li>
                    <li>You want to migrate data to another region/AZ</li>
                    <li>You need scheduled backups (DLM)</li>
                </ul>

                <p className="mt-2 font-semibold">Use AMI when:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>You want to create a golden image</li>
                    <li>You need Auto Scaling Group setup</li>
                    <li>You want to replicate full server setup</li>
                    <li>You are building CI/CD image pipeline</li>
                    <li>You want to share a pre-configured server</li>
                </ul>

                <p className="font-semibold text-xl mt-6">Rule of Thumb</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Snapshot → Data backup  & storage</li>
                    <li>AMI → Server creation</li>
                </ul>

                <p className="font-semibold text-2xl mt-8">Conclusion</p>
                <p className="mt-2">
                    In real production environments, snapshots are used for backup and disaster recovery, while AMIs are used in Auto Scaling Groups and CI/CD pipelines.
                </p>
                <p>EBS Snapshots and AMIs are both very important in AWS.</p>
                <ul className='ml-6 space-y-1 list-disc'>
                    <li>Snapshots help you safely back up and restore data</li>
                    <li>AMIs help you quickly launch and scale servers</li>
                </ul>
                <p className='my-2'>In simple terms:</p>
                <p> Snapshot = data backup
                </p>
                <p>
                    AMI = ready server
                </p>
                <p className="mt-2">
                   Use them together to build a reliable, scalable, and cost-effective AWS setup.
                </p>
            </div>
        </>
    )
}

export default FiftyTwo