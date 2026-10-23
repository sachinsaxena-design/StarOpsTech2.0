import React from "react";
import { Code } from "../../../utils/Helpers";

const FortyThree = () => {
    return (
        <div>
            <img
                className="max-h-[800px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/My_SQL_STEPUP/Purple Modern Technology Startup Presentation.jpg"
                alt="Automating MySQL Cluster Setup Using Ansible Roles"
            />

            <p>
                Deploying a <strong> MySQL Cluster manually</strong> across multiple servers can be time-consuming, complex, and prone to errors. Each node must be configured carefully, services started in the correct order, and replication or clustering settings applied consistently.
            </p>

            <br />
            <p>
                Using <strong>Ansible roles</strong>, you can automate this entire process. This ensures that <strong>management (master) and worker nodes</strong> are configured consistently, reduces manual mistakes, and makes scaling or updating the cluster much easier.
            </p>

            <br />
            <p>
                In this guide, we will create a <strong>MySQL Cluster</strong> on AWS with:
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>
                    <strong>Master Node (Management Node):</strong>  Coordinates the cluster, manages configuration <strong className="text-green-300">(config.ini)</strong>, monitors cluster health, and runs the MySQL client for queries.
                </li>
                <li>
                    <strong>Worker Nodes (Data Nodes):</strong> Store the actual database data, replicate across nodes based on <strong className="text-green-300">no_of_replicas</strong>, and provide high availability
                </li>
            </ul>

            <p>
                Instead of relying on <strong>AWS RDS</strong> or other <strong>managed database services</strong>, this approach provides a cost-efficient way to run a <strong>MySQL Cluster</strong>. You only pay for the EC2 instances and storage, while still achieving a <strong>highly available, scalable, and fully controlled MySQL Cluster</strong>.
            </p>

            <br />
            <p className="font-semibold text-xl">We will use:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><strong>Dynamic inventory </strong>from AWS, so nodes are automatically discovered.</li>
                <li><strong>Ansible roles</strong>, so tasks like installing dependencies, configuring services, and deploying clients are reusable and easy to maintain.</li>
            </ul>
            <p>By the end of this guide, you will have a <strong>fully automated MySQL Cluster setup</strong> that is cost-effective, scalable, and easy to manage.</p>
            <br />
            <p className="font-semibold text-xl">Prerequisites</p>
            <p>Before starting, ensure the following:</p>
            <ul className="list-decimal ml-6 space-y-1">
                <li>
                    <strong>Create EC2 Instances</strong>
                    <ul className="list-disc ml-6 space-y-1">
                        <li><strong>Master node</strong> – one instance, tagged <span className="text-green-300">Name=mysqlsetup-master</span></li>
                        <li><strong>Worker nodes</strong> – one or more instances, tagged <span className="text-green-300">Name=mysqlsetup-worker</span></li>
                        <li>OS: <strong>Amazon Linux 2</strong> (or compatible Linux like CentOS/RHEL)</li>
                    </ul>
                </li>
                <li><strong>Control Machine (Ansible Master)</strong>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Ansible installed</li>
                        <li>Python installed</li>
                        <li><strong><span className="text-green-300">boto3</span> and <span className="text-green-300">botocore</span> installed</strong> (required for AWS dynamic inventory)</li>
                        <li>Network access (SSH) to all EC2 instances</li>
                        <li>Permission to use sudo on all nodes
                        </li>
                    </ul>
                </li>
                <li><strong>Master node access and IAM:</strong>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Master node must have SSH access to all worker nodes so it can run tasks remotely.</li>
                        <li>Attach an <strong>EC2 full-access IAM role</strong> to the master node to allow automatic inventory discovery and instance management.
                        </li>
                    </ul>
                </li>
                <li><strong>Security</strong>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Security groups must allow SSH between master and worker nodes</li>
                    </ul></li>
                <li>
                    <strong>Verify Ansible Inventory:</strong>
                    <Code language='bash'
                        code={`
ansible-inventory -i aws_ec2.yaml --graph
`}
                    />
                    <p>This command outputs all hosts grouped by <span className="text-green-300">master_node</span> and <span className="text-green-300">worker_node</span>.</p>
                </li>
            </ul>

            <br />
            <p className="font-semibold text-xl">Step 1: Create the Ansible Role</p>
            <p>Create the role structure using:</p>
            <Code
                language="bash"
                code={`
ansible-galaxy init mysql-setup
`}
            />
            <p>Directory structure:
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>
                        {`mysql-setup/
├── README.md
├── files/
├── handlers/
├── meta/
├── tasks/
├── templates/
└── vars/`}
                    </code>
                </pre>
            </p>
            <p>We will populate each folder with the files below.</p>
            <br />
            <p className="font-semibold text-xl">Step 2:Role Files</p>

            <p><strong>2.1 Tasks </strong></p>
            <p className="text-green-300">tasks/dependency.yaml</p>
            <Code language="bash"
                code={`
# Ensure wget is installed on all nodes
- name: Ensure wget is installed
ansible.builtin.yum:
name: wget
state: present
`} />

            <p className="font-semibold"><span className="text-green-300">tasks/mgmt.yaml</span> (Management Node)</p>
            <Code language="bash"
                code={`
# Download MySQL Cluster Management Server
- name: Download MySQL Cluster Management at Management node (Master)
  ansible.builtin.shell: |
    wget -q {{ mgmt_url }} -O {{ mgmt_path }}
  args:
    creates: "{{ mgmt_path }}"

# Install RPM
- name: Install MySQL Cluster Management Server RPM
  ansible.builtin.shell: |
    yum localinstall -y {{ mgmt_path }}

# Create cluster directory
- name: Create MySQL Cluster directory
  ansible.builtin.file:
    path: "{{ mgmt_cluster_dir }}"
    state: directory

# Create config.ini
- name: Create MySQL Cluster config.ini
  ansible.builtin.template:
    src: "templates/mgmt.ini.j2"
    dest: "{{ mgmt_cluster_dir }}/config.ini"

# Copy systemd service
- name: Copy ndb_mgmd systemd service
  ansible.builtin.copy:
    src: "ndb_mgmd.service"
    dest: "{{ ndb_mgmd_service_path }}"

# Enable service
- name: Reload systemd and enable ndb_mgmd
  ansible.builtin.systemd:
    name: ndb_mgmd
    enabled: true
    state: restarted
`} />

            <p className="font-semibold"><span className="text-green-300">tasks/worker.yaml</span> (Data Nodes)</p>
            <Code language="bash"
                code={`
# Download MySQL Cluster Data Node
- name: Download MySQL Cluster Data Node
  ansible.builtin.shell: |
    wget -q {{ worker_url }} -O {{ worker_path }}
  args:
    creates: "{{ worker_path }}"

# Install RPM
- name: Install MySQL Cluster Data Node
  ansible.builtin.shell: |
    yum localinstall -y {{ worker_path }}

# Create data directory
- name: Create MySQL Cluster data directory
  ansible.builtin.file:
    path: "{{ worker_data_dir }}"
    state: directory

# Ensure /etc/my.cnf exists
- name: Ensure /etc/my.cnf exists
  ansible.builtin.file:
    path: "{{ worker_config_file }}"
    state: touch

# Create worker config
- name: Create MySQL Cluster worker config
  ansible.builtin.template:
    src: "templates/worker.ini.j2"
    dest: "{{ worker_config_file }}"

# Copy systemd service
- name: Copy ndbd systemd service
  ansible.builtin.copy:
    src: "ndbd.service"
    dest: "{{ ndb_service_path }}"
  notify: Restart ndb

- name: Force all notified ndbd handlers to run
  meta: flush_handlers
`} />
            <p className="font-semibold"><span className="text-green-300">tasks/mysql-client.yaml</span> (Master Node MySQL Client)</p>
            <Code language="bash"
                code={`
# Create client directory
- name: Create MySQL Client directory
  ansible.builtin.file:
    path: "{{ mysql_client_dir }}"
    state: directory

# Download client RPMs
- name: Download MySQL Cluster Client RPMs
  ansible.builtin.shell: |
    wget -q {{ item }} -O {{ mysql_client_dir }}/{{ item | basename }}
  with_items: "{{ mysql_client_urls }}"

# Install client RPMs
- name: Install MySQL Cluster Client RPMs
  ansible.builtin.shell: |
    yum localinstall -y {{ mysql_client_dir }}/{{ item | basename }}
  with_items: "{{ mysql_client_urls }}"

# Configure /etc/my.cnf
- name: Add MySQL settings to /etc/my.cnf
  ansible.builtin.template:
    src: "templates/mgmt-client.ini.j2"
    dest: "{{ mgmt_config_file }}"
  notify: Restart ndb_mgmd

- name: Force all notified handlers
  meta: flush_handlers

# Enable MySQL service
- name: Enable mysqld.service
  ansible.builtin.systemd:
    name: mysqld
    enabled: true
    state: restarted
`} />
            <p className="font-semibold"><span className="text-green-300">tasks/main.yml</span> (Include other tasks based on group)</p>
            <Code language="bash"
                code={`
- name: Install dependencies
  include_tasks: dependency.yaml

- name: Install Management Node
  include_tasks: mgmt.yaml
  when: "'master_node' in group_names"

- name: Install Data Node
  include_tasks: worker.yaml
  when: "'worker_node' in group_names"

- name: Install MySQL Client
  include_tasks: mysql-client.yaml
  when: "'master_node' in group_names"
`} />
            <br />
            <p className="font-semibold text-xl">2.2 Handlers</p>
            <p className="font-semibold mt-2 text-green-300">handlers/main.yml</p>
            <Code language="bash"
                code={`
- name: Restart ndb_mgmd
ansible.builtin.systemd:
 name: ndb_mgmd
 state: restarted
 enabled: true

- name: Restart ndb
ansible.builtin.systemd:
 name: ndbd
 state: restarted
 enabled: true
`}
            />

            <br />

            <p className="font-semibold text-xl">2.3 Variables</p>
            <p className="font-semibold mt-2 text-green-300">vars/main.yml</p>
            <Code
                language="bash"
                code={`no_of_replicas: 1
node_id_offset: 1

# Management Node
mgmt_path: "/home/ec2-user/mysql-cluster-community-management-server-8.4.3-1.el9.aarch64.rpm"
mgmt_url: "https://dev.mysql.com/get/Downloads/MySQL-Cluster-8.4.3/mysql-cluster-community-management-server-8.4.3-1.el9.aarch64.rpm"
mgmt_cluster_dir: "/var/lib/mysql-cluster"
ndb_mgmd_service_path: "/etc/systemd/system/ndb_mgmd.service"
mgmt_config_file: "/etc/my.cnf"
bind_address: 0.0.0.0
default_storage_engine: NDB

# Worker Nodes
worker_path: "/home/ec2-user/mysql-cluster-community-data-node-8.4.3-1.el9.aarch64.rpm"
worker_url: "https://dev.mysql.com/get/Downloads/MySQL-Cluster-8.4.3/mysql-cluster-community-data-node-8.4.3-1.el9.aarch64.rpm"
ndb_service_path: /etc/systemd/system/ndbd.service
worker_data_dir: "/usr/local/mysql/data"
worker_config_file: "/etc/my.cnf"
mysql_cluster_connectstring: "{{ groups['master_node'] | map('extract', hostvars, 'ansible_host') | join(',') }}"

# MySQL Client
mysql_client_dir: "/home/ec2-user/mysql-client"
mysql_client_urls:
  - "https://dev.mysql.com/get/Downloads/MySQL-Cluster-8.4.3/mysql-cluster-community-client-plugins-8.4.3-1.el9.aarch64.rpm"
  - "https://dev.mysql.com/get/Downloads/MySQL-Cluster-8.4.3/mysql-cluster-community-common-8.4.3-1.el9.aarch64.rpm"
  - "https://dev.mysql.com/get/Downloads/MySQL-Cluster-8.4.3/mysql-cluster-community-libs-8.4.3-1.el9.aarch64.rpm"
  - "https://dev.mysql.com/get/Downloads/MySQL-Cluster-8.4.3/mysql-cluster-community-libs-compat-8.4.3-1.el9.aarch64.rpm"
  - "https://dev.mysql.com/get/Downloads/MySQL-Cluster-8.4.3/mysql-cluster-community-icu-data-files-8.4.3-1.el9.aarch64.rpm"
  - "https://dev.mysql.com/get/Downloads/MySQL-Cluster-8.4.3/mysql-cluster-community-client-8.4.3-1.el9.aarch64.rpm"
  - "https://dev.mysql.com/get/Downloads/MySQL-Cluster-8.4.3/mysql-cluster-community-server-8.4.3-1.el9.aarch64.rpm"`}
            />

            <br />

            <p className="font-semibold text-xl">2.4 Templates</p>
            <p className="font-semibold mt-2 text-green-300">templates/mgmt.ini.j2</p>
            <Code
                language="bash"
                code={`
[ndbd default]
NoOfReplicas={{ no_of_replicas | default(1) }}

{% for host in groups['master_node'] %}
[ndb_mgmd]
hostname={{ hostvars[host].ansible_host }}
datadir={{ mgmt_cluster_dir }}
NodeId={{ loop.index + node_id_offset }}
{% endfor %}

{% for host in groups['worker_node'] %}
[ndbd]
hostname={{ hostvars[host].ansible_host }}
NodeId={{ loop.index + node_id_offset + groups['master_node'] | length }}
datadir={{ worker_data_dir }}
{% endfor %}

{% for host in groups['master_node'] %}
[mysqld]
hostname={{ hostvars[host].ansible_host }}
{% endfor %}
`}
            />
            <p className="font-semibold mt-2 text-green-300">templates/worker.ini.j2</p>
            <Code
                language="bash"
                code={`
[mysql_cluster]
ndb-connectstring={{ mysql_cluster_connectstring }}
`}
            />

            <p className="font-semibold mt-2 text-green-300">templates/mgmt-client.ini.j2</p>
            <Code
                language="bash"
                code={`
[mysqld]
bind_address = {{ bind_address }}
ndbcluster
default_storage_engine = {{ default_storage_engine }}

datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid

[mysql_cluster]
ndb-connectstring={{ mysql_cluster_connectstring }}
`}
            />
            <br />
            <p className="font-semibold mt-2">2.5 Files (Systemd services)</p>
            <p className="font-semibold mt-2 text-green-300">files/ndb_mgmd.service</p>
            <Code language="bash"
                code={`
[Unit]
Description=MySQL NDB Cluster Management Server
After=network.target auditd.service

[Service]
Type=forking
ExecStart=/usr/sbin/ndb_mgmd -f /var/lib/mysql-cluster/config.ini
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure

[Install]
WantedBy=multi-user.target
`} />
            <p className="font-semibold mt-2 text-green-300">files/ndbd.service</p>
            <Code language="bash"
                code={`
[Unit]
Description=MySQL NDB Data Node Daemon
After=network.target auditd.service

[Service]
Type=forking
ExecStart=/usr/sbin/ndbd
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure

[Install]
WantedBy=multi-user.target
`} />
            <p className="font-semibold text-xl">Step 3: Inventory</p>
            <p ><span className="text-green-300">aws_ec2.yaml</span> (Dynamic inventory)</p>
            <Code language="bash"
                code={`
plugin: aws_ec2
regions:
  - ap-south-1
filters:
  tag:Name: "mysqlsetup-*"
groups:
  master_node: "'master' in tags.Name"
  worker_node: "'worker' in tags.Name"
hostnames:
  - private-ip-address
compose:
  ansible_host: private_ip_address
`} />
            <br />
            <p className="font-semibold text-xl">Step 4: Playbook</p>
            <p className="text-green-300">mysql-setup.yaml</p>
            <Code
                language='bash'
                code={`
- name: Set up MySQL Cluster
hosts: all
become: true
roles:
- mysql-setup`}
            />

            <br />

            <p className="font-semibold text-xl">Step 5: Run the Playbook</p>
            <ul className="list-decimal ml-6">
                <li>Verify inventory:
                    <Code language="bash"
                        code={`
ansible-inventory -i aws_ec2.yaml --list                        
`} />
                </li>
                <li>
                    Run playbook
                    <Code language="bash"
                        code={`
ansible-playbook -i aws_ec2.yaml mysql-setup.yaml
`} />
                </li>
            </ul>
            <br />

            <p className="font-semibold text-xl">Step 6: Verify the Cluster</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Management node: <Code language='bash' code={`
systemctl status ndb_mgmd
`} />
                </li>
                <li>Worker nodes: <Code language='bash' code={`
systemctl status ndbd
`} />
                </li>
                <li>MySQL client: <Code language='bash' code={`
mysql -u root -p -h 127.0.0.1
`} />
                </li>
            </ul>

            <br />

            <p className="font-semibold text-lg">Conclusion</p>
            <ul className="list-disc ml-6">
                <li><strong>Master Node:</strong> Manages the cluster, monitors worker nodes, and runs the MySQL client for queries. It ensures that all nodes operate correctly and maintains the cluster configuration.</li>
                <li><strong>Worker Nodes:</strong> Store the actual database data and connect to the master. They replicate data based on the no_of_replicas setting, providing redundancy and high availability.</li>
                <li><strong>Ansible Roles Benefits:</strong> Organize tasks into reusable modules, making it easy to scale, automate, and maintain the cluster. Handlers ensure that changes to configuration files are automatically applied across all nodes</li>
                <li><strong>Automation & Maintenance:</strong> Any updates to templates or variables propagate automatically, reducing manual work and preventing errors.</li>
                <li><strong> High Availability & Flexibility:</strong> The setup provides replication, failover, and scalability. It works in AWS or on-premises environments, giving full control over the cluster architecture.</li>
            </ul>
        </div>
    );
};

export default FortyThree;
