import { Code } from "../../../utils/Helpers";

const TwentyNine = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Ansible/dynamic_inventory.png"
        alt="Dynamic Inventory in Ansible"
      />
      <br />
      <p className="text-xl font-bold mb-4">
        Dynamic Inventory in Ansible — Simple Guide (for Beginners)
      </p>
      <p>
        Short: Dynamic inventory lets Ansible ask AWS: “Which EC2 instances do I
        have right now?” — so you don’t have to update server lists by hand.
      </p>
      <p>
        This guide shows how to use the <code>aws_ec2</code> plugin with the
        region <strong>ap-south-1</strong>, filter by tags, group servers
        (master, worker, Prometheus, Grafana), and run a playbook.
      </p>
      <br />

      <p className="font-semibold">
        What is Dynamic Inventory and Why Do We Use It?
      </p>
      <p>
        Normally, we write servers manually in a file (static inventory). But
        when your servers are in the cloud and change often, static inventory
        becomes painful.
      </p>
      <p>Dynamic inventory solves this problem by:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Automatically finding servers in the cloud (AWS EC2 in our case).
        </li>
        <li>Grouping them based on tags or other filters.</li>
        <li>Always keeping the list up to date.</li>
      </ul>
      <br />

      <p className="font-semibold">1. Prerequisites</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>AWS account → To create and manage servers in the cloud.</li>
        <li>
          One EC2 instance (Ansible master) → Runs Ansible and controls others.
        </li>
        <li>Ansible installed → To run playbooks.</li>
        <li>Python and pip installed → Needed for Ansible and packages.</li>
        <li>
          IAM permissions → At least <code>AmazonEC2ReadOnlyAccess</code> to
          list instances. Use <code>AmazonEC2FullAccess</code> for
          create/delete.
        </li>
      </ul>
      <br />

      <p className="font-semibold">2. Install Required Packages</p>
      <Code
        language="bash"
        code={`pip install boto boto3
ansible-galaxy collection install amazon.aws`}
      />
      <br />

      <p className="font-semibold">3. Create Dynamic Inventory File</p>
      <p>
        Inside your project folder (<code>inventory/aws_ec2.yml</code>), add:
      </p>
      <Code
        language="yaml"
        code={`plugin: aws_ec2
regions:
  - ap-south-1
filters:
  "tag:Name": "star-*"
groups:
  master_node: "'master' in tags.Name"
  worker_node: "'worker' in tags.Name"
  prometheus_node: "'prometheus' in tags.Name"
  grafana_node: "'grafana' in tags.Name"
hostnames:
  - private-ip-address
compose:
  ansible_host: private_ip_address`}
      />
      <p className="mt-2">Explanation in simple words:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>Looks in ap-south-1 region.</li>
        <li>
          Only takes instances whose <code>Name</code> tag starts with{" "}
          <code>star-</code>.
        </li>
        <li>Groups them based on keywords in the Name tag.</li>
        <li>Uses the private IP to connect.</li>
      </ul>
      <br />

      <p className="font-semibold">4. Test the Dynamic Inventory</p>
      <Code
        language="bash"
        code={`ansible-inventory -i inventory/aws_ec2.yml --list`}
      />
      <p>
        You’ll see EC2 instances grouped as master_node, worker_node,
        prometheus_node, and grafana_node.
      </p>
      <br />

      <p className="font-semibold">5. Example Playbook to Install Packages</p>
      <p>
        Create a playbook called <code>install_packages.yml</code>:
      </p>
      <Code
        language="yaml"
        code={`- name: Install software on EC2 instances
  hosts: all
  become: yes

  tasks:
    - name: Update system packages
      yum:
        name: "*"
        state: latest

    - name: Install git and python3
      yum:
        name:
          - git
          - python3
        state: present`}
      />
      <p className="mt-2">Run it:</p>
      <Code
        language="bash"
        code={`ansible-playbook -i inventory/aws_ec2.yml install_packages.yml`}
      />
      <br />

      <p className="font-semibold">Conclusion</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Dynamic inventory in Ansible makes managing cloud servers automatic.
        </li>
        <li>
          Use AWS tags to organize servers (master, worker, prometheus,
          grafana).
        </li>
      </ul>
      <p>
        With this setup, your Ansible master can control all AWS servers
        automatically!
      </p>
    </div>
  );
};

export default TwentyNine;
