import React from "react";
import { Code, Para } from "../../../utils/Helpers";

const Seventeenth = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Ansible/ansible.png"
        alt="Ansible"
      />
      <br />
      <p>
        <strong>What is Ansible?</strong>
      </p>
      <br />
      <Para>
        Ansible is an open-source automation tool that manages configuration,
        application deployment, and various IT tasks. It allows you to control
        multiple systems from a single central system. For instance, a system
        administrator often has numerous repetitive tasks like updating systems
        or installing software, which can be quite tedious. Automating these
        tasks with scripts is more efficient but requires time to write and
        maintain the scripts. Additionally, a script designed for one version of
        Ubuntu, such as 12.x, may not work on other versions like 14.x or 16.x
        without modifications.
      </Para>
      <p>
        <b>Configuration Management:-</b>
      </p>
      <Para>
        In your infrastructure, identify which services are currently running
        and which ones you want to back up. Additionally, there will be times
        when you need to work on different servers.
      </Para>
      <p>
        <b>Inventory Files and Playbooks:-</b>
      </p>
      <p>
        Ansible manages inventory using simple text files called inventory
        files, which contain all the details about the remote machines you want
        to manage with the Ansible controller. Ansible uses these inventory
        files to control or take actions on remote machines using playbooks.
      </p>
      <br />
      <p>
        <b>Why Use Ansible Over Chef or Puppet?</b>
      </p>

      <ul className="list-disc list-inside">
        <li>
          <b>Simplicity:</b> Ansible uses YAML for configurations and requires
          no agents, making it easy to set up and use.
        </li>
        <li>
          <b>Minimal Setup:</b> Only a control machine and SSH access to nodes
          are needed, unlike the more complex setups of Chef and Puppet.
        </li>
        <li>
          <b>Agentless Architecture:</b> Reduces overhead and potential failure
          points, simplifying management.
        </li>
        <li>
          <b>Flexibility:</b> Rich set of built-in modules and easy
          extensibility.
        </li>
        <li>
          <b>Community Support:</b> Strong, active community with extensive
          documentation.
        </li>
        <li>
          <b>Integration:</b> Smooth integration with CI/CD tools for continuous
          deployment.
        </li>
      </ul>
      <br />
      <p>A sample inventory file might look like this:</p>
      <Code
        language={"text"}
        code={`# This is an example of an inventory file
[webservers]
webserver1.example.com
webserver2.example.com

[databases]
dbserver1.example.com
dbserver2.example.com

A sample play book may look like -
# This is an example of a simple playbook
- name: Install and start Apache web server
  hosts: webservers
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present

    - name: Ensure Apache is running
      service:
        name: apache2
        state: started`}
      />
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Ansible/ansible_management_node.png"
        alt="Ansible node management"
      />
      <br />
      <p>
        <b>Now, let's look at how to install Ansible on the master node:</b>
      </p>
      <p>Update the package list:</p>
      <Code
        language={"bash"}
        code={`
sudo apt update`}
      />
      <Code
        language={"bash"}
        code={`
sudo apt install software-properties-common`}
      />
      <p>Add the Ansible repository:</p>
      <Code
        language={"bash"}
        code={`
sudo add-apt-repository --yes --update ppa:ansible/ansible`}
      />
      <p>Install Ansible:</p>
      <Code
        language={"bash"}
        code={`
sudo apt install ansible`}
      />
      <p>Verify the installation by checking the version of Ansible:</p>
      <Code
        language={"bash"}
        code={`
ansible --version`}
      />
      <p>
        To further confirm that Ansible is fully installed, navigate to the
        <b> /etc/ansible/</b>. In this directory, you'll find the hosts file,
        which is the inventory file where all server details are maintained.
      </p>
    </div>
  );
};

export default Seventeenth;
