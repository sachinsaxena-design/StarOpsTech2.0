
import React from 'react'
import { Code } from '../../../utils/Helpers'

function FiftyThree() {
    return (
        <>
            {/* This is Fifty-Three Blog of StarOps */}
            <div>
                <img
                    className="max-h-[700px] w-full mx-auto rounded-lg"
                    src="https://cdn.staropstech.com/starops/Blogs/innodb/innodb.png"
                    alt="Building a Highly Available MySQL InnoDB Cluster on Amazon Linux"
                />

                <p className="mt-4">
                    There’s a huge difference between reading documentation and actually building a real database cluster on cloud infrastructure.
                </p>
                <p className="mt-2">
                    Most tutorials stop at:
                </p>
                <Code language='bash'
                    code={`
 Install MySQL → Run some commands → Cluster ready.
                    `}
                />
                <p className="mt-2">
                    But when you actually deploy it on AWS EC2 instances, deal with replication, GTIDs, Group Replication, security groups, clone recovery, MySQL Shell, and production-level architecture  things become very different.This is not just another copy-paste tutorial.
                </p>
                <p className="mt-2">
                    This is the full journey:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Why we chose InnoDB Cluster</li>
                    <li>How we configured every server</li>
                    <li>Why Group Replication matters</li>
                    <li>What errors appeared</li>
                    <li>Why clone recovery happened</li>
                    <li>Why <span className='text-green-500'>OK_NO_TOLERANCE</span> appeared</li>
                    <li>Why MySQL Router is important</li>
                    <li>What should be improved for production</li>
                </ul>
                <p className="mt-2">
                    By the end of this blog, you’ll not only have a working cluster, you’ll actually understand how it works internally.
                In this blog, we will set up a <span className='font-bold'>MySQL InnoDB Cluster</span> on two AWS Graviton EC2 instances.</p>
                <p className='my-2'>Your setup</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Machine 1: 10.0.1.100</li>
                    <li>Machine 2: 10.0.1.200</li>
                    <li>OS: Amazon Linux 2023</li>
                    <li>Architecture: ARM64 / aarch64</li>
                    <li>MySQL Version: 8.0.46</li>
                    <li>Cluster Name: devCluster</li>
                    <li>Cluster Mode: Single-Primary</li>
                </ul>

                <p className="font-semibold text-2xl mt-8">1. InnoDB Cluster vs NDB Cluster</p>
                <p className="mt-2">
                    Before installing, it is important to understand that InnoDB Cluster and NDB Cluster are not the same thing.
                </p>
                <p className="mt-2 font-semibold">InnoDB Cluster ≠ NDB Cluster</p>
                <p className="mt-2">Many engineers think both are the same. They are not. Here’s the easiest way to understand it:</p>
                <div className="overflow-x-auto mt-4">
                    <table className="w-full border border-gray-300 border-collapse text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Feature</th>
                                <th className="border border-gray-300 px-4 py-2">InnoDB Cluster</th>
                                <th className="border border-gray-300 px-4 py-2">NDB Cluster</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Storage Engine</td>
                                <td className="border px-4 py-2">InnoDB</td>
                                <td className="border px-4 py-2">NDB</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Main purpose</td>
                                <td className="border px-4 py-2">High availability for normal MySQL workloads</td>
                                <td className="border px-4 py-2">Distributed, shared-nothing clustered database</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border px-4 py-2">Replication</td>
                                <td className="border px-4 py-2">Group Replication</td>
                                <td className="border px-4 py-2">Native NDB data-node replication</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border px-4 py-2">Node types</td>
                                <td className="border px-4 py-2">MySQL server instances</td>
                                <td className="border px-4 py-2">Management node, data node, SQL node</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Application connection</td>
                                <td className="border px-4 py-2">Usually via MySQL Router</td>
                                <td className="border px-4 py-2">Usually via SQL nodes</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Setup Tool</td>
                                <td className="border px-4 py-2">MySQL Shell / AdminAPI</td>
                                <td className="border px-4 py-2">ndb_mgmd, ndbd, mysqld</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border px-4 py-2">Best For</td>
                                <td className="border px-4 py-2">Standard web apps, OLTP, HA MySQL</td>
                                <td className="border px-4 py-2">Very high availability distributed systems</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Complexity</td>
                                <td className="border px-4 py-2">Easier</td>
                                <td className="border px-4 py-2">More Complex</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className='my-2'>NDB Cluster has separate <span className='font-bold'>management nodes, data nodes</span>, and <span className='font-bold'>SQL nodes</span>, while InnoDB Cluster is built from normal MySQL Server instances using Group Replication</p>
                <p className="font-semibold text-2xl mt-8">2. What is MySQL InnoDB Cluster?</p>
                <p className="mt-2">MySQL InnoDB Cluster is a high-availability MySQL setup based on:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>MySQL Server</li>
                    <li>InnoDB Storage Engine</li>
                    <li>Group Replication</li>
                    <li>MySQL Shell</li>
                    <li>MySQL Router</li>
                </ul>

                <p className="mt-4">In our setup:</p>
                <Code
                    language="text"
                    code={`
 10.0.1.100  → PRIMARY   → Read/Write
 10.0.1.200  → SECONDARY → Read Only
`}
                />
                <p>The cluster status confirmed this:</p>
                <Code
                    language="text"
                    code={`
PRIMARY   = ip-10-0-1-100.ec2.internal:3306
SECONDARY = ip-10-0-1-200.ec2.internal:3306
Status    = OK_NO_TOLERANCE
`}
                />
                <p className="mt-2">
                    Important point:
                </p>
                <ul className='list-disc space-y-1 ml-6'>
                    <li>
                        This is not NDB Cluster.
                    </li>
                    <li>
                        This is InnoDB Cluster using Group Replication.
                    </li>
                </ul>
                <p className="font-semibold text-2xl mt-8">3. Server Preparation</p>
                <p className="mt-2">Run the system update on both machines:</p>
                <Code language="bash" code={`
sudo yum update -y
`} />
                <p><strong>NOTE:</strong> For production you should keep both nodes on the same OS release</p>
                <p className="font-semibold text-2xl mt-8">4. Install MySQL 8.0 Repository</p>
                <p className='my-2'>Amazon Linux repositories don’t always contain the exact MySQL version required for Group Replication setups. So we installed Oracle’s official Myo we installed Oracle’s official MySQL repository.</p>
                <p>On both machines, install the MySQL 8.0 repository:</p>
                <Code
                    language="bash"
                    code={`
sudo rpm -Uvh https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm
`}
                />
                <p ><strong>NOTE:</strong> Both cluster nodes should run the same MySQL major version.</p>
                <p className="font-semibold text-2xl mt-8">5. Install MySQL Server</p>
                <p className='my-2'>Install MySQL Community Server on both machines:</p>
                <Code
                    language="bash"
                    code={`
sudo yum install -y mysql-community-server
`}
                />
                <p>Verify:</p>
                <Code
                    language="bash"
                    code={`
mysql --version
`}
                />
                <p>Expected:</p>
                <Code
                    language="bash"
                    code={`
mysql  Ver 8.0.46
`}
                />

                <p className="font-semibold text-2xl mt-8">6. Start and Enable MySQL</p>
                <p className='my-2'>On both nodes</p>
                <Code
                    language="bash"
                    code={`
sudo systemctl enable mysqld
sudo systemctl start mysqld
`}
                />
                <p>Check status:</p>
                <Code
                    language="bash"
                    code={`
sudo systemctl status mysqld
`}
                />
                <p>If MySQL is active and running, you’re ready for the next step.</p>
                <p className="font-semibold text-2xl mt-8">7. Get Temporary Root Password</p>
                <p className='my-2'>This is where many people get stuck the first time. MySQL generates a temporary password automatically.</p>
                <p className='my-2'>Retrieve it using:</p>
                <Code
                    language="bash"
                    code={`
sudo grep 'temporary password' /var/log/mysqld.log
`}
                />
                <p>Example from machine 1:</p>
                <p>temporary password is generated for root@localhost: pF27o_qS&lt;3d,</p>
                <p className="my-2"> Example from machine 2:
                </p>
                <p>
                    temporary password is generated for root@localhost: emoj&gt;aDy6Q&gt;d
                </p>


                <p className="font-semibold text-2xl mt-8">8. Login and Reset Root Password</p>
                <p className='my-2'>Login:</p>
                <Code language='bash' code={`
mysql -u root -p
`} />
                <p>Then change root password:</p>
                <Code
                    language="sql"
                    code={`
ALTER USER 'root'@'localhost' IDENTIFIED BY 'localhostrootpass@123';
`}
                />

                <p><strong>NOTE:</strong> For testing this works, but for production this is risky.</p>
                <p className='my-2'>Better production approach</p>
                <Code
                    language="sql"
                    code={` 
CREATE USER 'cluster_admin'@'10.0.1.%' IDENTIFIED BY 'StrongPasswordHere';
GRANT ALL PRIVILEGES ON *.* TO 'cluster_admin'@'10.0.1.%' WITH GRANT OPTION;
FLUSH PRIVILEGES;`}
                />
                <p>Avoid:</p>
                <Code language='bash' code={`
root'@'%
`} />
                <p>because it allows root login from any host.</p>
                <p className='text-2xl font-semibold my-2'>9. Generating a Unique UUID for Group Replication</p>
                <p>Before configuring the MySQL InnoDB Cluster, we need to generate a <strong>unique UUID</strong> that will serve as the <strong>Group Replication Group Name</strong>. This UUID is one of the most important identifiers in the entire cluster.</p>
                <ul className='list-disc ml-5'>
                    <li className='text-lg'>
                        <p className='font-semibold'>
                            What is group_replication_group_name?
                        </p>
                        <ul className=' ml-6'>
                            <li className='my-2'>In MySQL InnoDB Cluster, all servers that belong to the same cluster must share a common identifier called:</li>
                            <li>group_replication_group_name</li>
                            <li className='my-2'>Think of it as the <strong>cluster's unique identity card</strong>. If two nodes use different values, they will never join the same cluster. If two unrelated clusters accidentally use the same UUID, serious conflicts can occur. That is why MySQL requires this value to be a globally unique UUID.</li>

                        </ul>
                    </li>

                </ul>
                <ul className='list-disc ml-5'>

                    <li className='my-2'>
                        <p className='font-semibold'>
                            Generate the UUID
                        </p>
                        <ul className='ml-6'>
                            <li>Run the following command on any Linux server (Node 1 is usually the best place):</li>
                            <li className='my-2'>
                                <Code language="bash" code={`
uuidgen
                                    `} />
                            </li>
                            <li>Example output:</li>
                            <li className='my-2'>
                                <Code language="bash" code={`
5ee2a229-1c15-4ced-a4c6-b218e6b41ff7
`} />
                            </li>
                            <li>Every time you run uuidgen, a brand-new universally unique identifier is generated.</li>
                        </ul>

                    </li>
                </ul>
                <ul className='list-disc ml-5'>
                    <li className='my-2'>
                        <p className='font-semibold my-2'>Save the UUID Carefully</p>
                        <ul className='ml-6'>
                            <li>Copy the generated UUID and save it securely. You will use exactly the same value on every MySQL node in the cluster.</li>
                            <li>For example:</li>
                            <li className='my-2'>
                                <Code language="bash" code={`
loose-group_replication_group_name="5ee2a229-1c15-4ced-a4c6-b218e6b41ff7"
`} />
                            </li>

                        </ul>
                    </li>

                </ul>
                <ul className='list-disc ml-5'>
                    <li className='my-2'>
                        <p className='font-semibold text-lg'>Why the Same UUID Must Be Used Everywhere</p>
                        <ul className='ml-6'>
                            <li className='my-2'>Suppose you generate:</li>
                            <li> 5ee2a229-1c15-4ced-a4c6-b218e6b41ff7</li>
                            <li className='my-2'>Then both Node 1 and Node 2 must contain:</li>
                            <li>loose-group_replication_group_name="5ee2a229-1c15-4ced-a4c6-b218e6b41ff7"</li>
                            <li className='my-2'>This tells MySQL:</li>
                            <li className='font-semibold'>“These servers are members of the same replication group.”</li>

                        </ul>
                    </li>
                </ul>

                <p className="font-semibold text-2xl mt-8">10. Configure /etc/my.cnf</p>
                <p className="mt-2">You edited:</p>
                <Code language='bash' code={`
sudo vi /etc/my.cnf
                    `}
                />
                <p className='my-2'>Machine 1 config:</p>
                <Code language="bash" code={`
[mysqld]
#
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
# innodb_buffer_pool_size = 128M
#
# Remove the leading "# " to disable binary logging
# Binary logging captures changes between backups and is enabled by
# default. It's default setting is log_bin=binlog
# disable_log_bin
#
# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M
#
# Remove leading # to revert to previous value for default_authentication_plugin,
# this will increase compatibility with older clients. For background, see:
# https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_default_authentication_plugin
# default-authentication-plugin=mysql_native_password

datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid


# ========================
# InnoDB Cluster Settings
# ========================

server-id=1

# Binary Logging
log_bin=binlog
binlog_format=ROW
binlog_checksum=NONE
log_slave_updates=ON

# GTID
gtid_mode=ON
enforce_gtid_consistency=ON

# Replication metadata
master_info_repository=TABLE
relay_log_info_repository=TABLE
relay_log=relay-bin

# Write set extraction
transaction_write_set_extraction=XXHASH64

# Group Replication Plugin
plugin-load-add=group_replication.so

# Group Replication Config
loose-group_replication_group_name="5ee2a229-1c15-4ced-a4c6-b218e6b41ff7"
loose-group_replication_start_on_boot=OFF

loose-group_replication_local_address="10.0.1.100:33061"
loose-group_replication_group_seeds="10.0.1.100:33061,10.0.1.200:33061"

loose-group_replication_bootstrap_group=OFF

# Networking
bind-address=0.0.0.0
`} />
                <p>Machine 2 config:</p>
                <Code language='bash' code={`
[mysqld]
#
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
# innodb_buffer_pool_size = 128M
#
# Remove the leading "# " to disable binary logging
# Binary logging captures changes between backups and is enabled by
# default. It's default setting is log_bin=binlog
# disable_log_bin
#
# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M
#
# Remove leading # to revert to previous value for default_authentication_plugin,
# this will increase compatibility with older clients. For background, see:
# https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_default_authentication_plugin
# default-authentication-plugin=mysql_native_password

datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid


# ========================
# InnoDB Cluster Settings
# ========================

server-id=2

# Binary Logging
log_bin=binlog
binlog_format=ROW
binlog_checksum=NONE
log_slave_updates=ON

# GTID
gtid_mode=ON
enforce_gtid_consistency=ON

# Replication metadata
master_info_repository=TABLE
relay_log_info_repository=TABLE
relay_log=relay-bin

# Write set extraction
transaction_write_set_extraction=XXHASH64

# Group Replication Plugin
plugin-load-add=group_replication.so

# Group Replication Config
loose-group_replication_group_name="5ee2a229-1c15-4ced-a4c6-b218e6b41ff7"
loose-group_replication_start_on_boot=OFF

loose-group_replication_local_address="10.0.1.200:33061"
loose-group_replication_group_seeds="10.0.1.100:33061,10.0.1.200:33061"

loose-group_replication_bootstrap_group=OFF

# Networking
bind-address=0.0.0.0

Important settings:
server-id must be unique
group_replication_group_name must be same on all nodes
group_replication_local_address must be unique per node
group_replication_group_seeds must include all cluster nodes
`} />
                <p>Restart MySQL on both nodes:</p>
                <Code
                    language="sql"
                    code={`
sudo systemctl restart mysqld
                        `}
                />
                <p>If MySQL fails to start, check syntax mistakes inside my.cnf.</p>

                <p className="font-semibold text-2xl mt-8">11. Create Replication User</p>
                <p className="mt-2">On machine 1 you created:</p>
                <Code
                    language="sql"
                    code={`
CREATE USER 'repl'@'%' IDENTIFIED BY 'StarOpsReplPass-2026';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';
FLUSH PRIVILEGES;
`}
                />
                <p>This is okay for manual Group Replication setups, but with MySQL Shell InnoDB Cluster, Shell can manage internal replication users automatically.</p>
                <p className='my-2'><strong>NOTE : </strong>For production, restrict host:</p>
                <Code
                    language="sql"
                    code={`
CREATE USER 'repl'@'10.0.1.%' IDENTIFIED BY 'StrongReplicationPassword';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'10.0.1.%';
FLUSH PRIVILEGES;`}
                />

                <p className="font-semibold text-2xl mt-6">12. Install MySQL Shell</p>
                <p className="mt-2">This is the most important tool in the InnoDB Cluster ecosystem.
                </p>
                <p>
                    On machine 1:
                </p>
                <Code
                    language="bash"
                    code={`
sudo yum install -y mysql-shell
mysqlsh --version
`}
                />
                <p>
                    Verify:
                </p>
                <Code
                    language="bash"
                    code={`
mysqlsh --version
`}
                />
                <p>You installed</p>
                <Code
                    language="bash"
                    code={`
mysql-shell-8.0.46-1.el9.aarch64
`}
                />

                <p className="font-semibold text-2xl mt-8">13. Connect to MySQL Shell</p>
                <p className="mt-2">From machine 1:</p>
                <Code
                    language="bash"
                    code={`
mysqlsh root@10.0.1.100
`}
                />
                <p>You entered MySQL Shell JS mode:</p>
                <p className='my-2'>
                    <Code language='SQL' code={`
MySQL 10.0.1.100:33060+ ssl JS >
                        `} />
                </p>
                <p>This shell is powerful.</p>
                <p>It automates</p>
                <ul className='list-disc space-y-1 ml-6'>
                    <li>cluster creation</li>
                    <li>validation</li>
                    <li>recovery</li>
                    <li>failover management</li>
                </ul>
                <p className="font-semibold text-2xl mt-8">14. Configure First Instance</p>
                <p className="mt-2">Run:</p>
                <Code
                    language="javascript"
                    code={`
dba.configureInstance('root@10.0.1.100')
`}
                />
                <p>MySQL Shell detected one required change</p>
                <table className="w-full border border-gray-300 border-collapse text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Varible</th>
                            <th className="border border-gray-300 px-4 py-2">Current Value:</th>
                            <th className="border border-gray-300 px-4 py-2">Required Value:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">binlog_transaction_dependency_tracking</td>
                            <td className="border px-4 py-2">COMMIT_ORDER</td>
                            <td className="border px-4 py-2">WRITESET</td>

                        </tr>
                    </tbody>
                </table>
                {/* <p>Variable:</p>
                <p className='my-2'>binlog_transaction_dependency_tracking</p>
                <p>Current Value: COMMIT_ORDER</p>
                <p className='my-2'>Required Value: WRITESET</p>

                */}
                <p className='mt-2'>Do you want to perform the required configuration changes? [y/n]:</p>
                <p className='mt-2'>You selected: <strong>y</strong></p>

                <p className='my-2'>Result</p>
                <p>The instance was configured to be used in an InnoDB cluster</p>


                <p className="font-semibold text-2xl mt-8">15. Configure Second Instance</p>
                <p className="mt-2">Run:</p>
                <Code
                    language="javascript"
                    code={`
dba.configureInstance('root@10.0.1.200')
`}
                />
                <p>MySQL Shell detected one required change</p>
                <table className="w-full border border-gray-300 border-collapse text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Varible</th>
                            <th className="border border-gray-300 px-4 py-2">Current Value:</th>
                            <th className="border border-gray-300 px-4 py-2">Required Value:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">binlog_transaction_dependency_tracking</td>
                            <td className="border px-4 py-2">COMMIT_ORDER</td>
                            <td className="border px-4 py-2">WRITESET</td>

                        </tr>
                    </tbody>
                </table>
                <p className='mt-2'>Do you want to perform the required configuration changes? [y/n]:</p>
                <p className='mt-2'>You selected: <strong>y</strong></p>

                <p className='my-2'>Result</p>
                <p >And it succeeded.</p>
                <p><strong>NOTE:</strong> <span className='text-green-600'>dba.configureInstance()</span> prepares MySQL instances for InnoDB Cluster usage. After that, <span className='text-green-600'>dba.createCluster()</span> creates the cluster using the connected instance as the seed. </p>

                <p className="font-semibold text-2xl mt-8">16. Create the InnoDB Cluster</p>
                <p className='mt-2'>From MySQL Shell on machine 1:</p>
                <Code
                    language="javascript"
                    code={`
var cluster = dba.createCluster('devCluster')
`}
                />
                <p className='my-2'>Output:</p>
                <Code language='bash' code={`
Cluster successfully created.
`} />
                <p>Use cluster.addInstance() to add MySQL instances. At this point, machine 1 became the primary node.</p>

                <p className="font-semibold text-2xl mt-8">17. Add Second Instance to Cluster</p>
                <p className='mt-2'>Run:</p>
                <Code
                    language="javascript"
                    code={`
cluster.addInstance('root@10.0.1.200:3306')
`}
                />
                <p>You received this warning. The instance contains transactions that do not originate from the cluster.
                    Errant GTIDs detected. 
                    This happened because machine 2 already had local transactions, such as user creation and grants. This scares many engineers the first time. But here’s what it actually means:</p>
                <p className='my-2'>Node 2 already contained transactions that were not part of the cluster.</p>
                <p>Usually caused by:</p>
                <ul className='list-disc space-y-1 ml-6'>
                    <li>local user creation</li>
                    <li>grants</li>
                    <li>configuration activity</li>
                </ul>
                <p className='my-2'>MySQL Shell gave recovery options</p>
                <Code language='bash' code={`
[C]lone / [A]bort
`} />
                <p>You selected:</p>
                <p className='font-semibold'>C</p>
                <p className='my-2'>That means machine 2 was overwritten using clone recovery from machine 1. This was correct for a new/empty node because machine2 had some local GTID transactions from user/config operations. Clone recovery overwrote machine2 with data from machine1. Clone completed successfully. Clone process has finished. The instance was successfully added to the cluster.</p>


                <p className="font-semibold text-2xl mt-8">18. Check Cluster Status</p>
                <p className='mt-2'>Run:</p>
                <Code
                    language="javascript"
                    code={`
cluster.status()
`}
                />
                <p>Your result:</p>
                <Code language='bash' code={`
{
  "clusterName": "devCluster",
  "defaultReplicaSet": {
    "primary": "ip-10-0-1-100.ec2.internal:3306",
    "status": "OK_NO_TOLERANCE",
    "statusText": "Cluster is NOT tolerant to any failures.",
    "topology": {
      "ip-10-0-1-100.ec2.internal:3306": {
        "memberRole": "PRIMARY",
        "mode": "R/W",
        "status": "ONLINE",
        "version": "8.0.46"
      },
      "ip-10-0-1-200.ec2.internal:3306": {
        "memberRole": "SECONDARY",
        "mode": "R/O",
        "status": "ONLINE",
        "version": "8.0.46"
      }
    },
    "topologyMode": "Single-Primary"
  }
}
`} />
                <p>This confirms your InnoDB Cluster is working.</p>
                <p className='my-2'>But status is:</p>
                <p className='text-green-600'>OK_NO_TOLERANCE</p>
                <p>Meaning</p>


                <p className="mt-2">
                    <strong><strong>NOTE:</strong> 2 nodes are not enough for real fault tolerance</strong>. MySQL recommends at least <strong>3 instances</strong> for tolerating one server failure
                </p>

                <p className="font-semibold text-2xl mt-8">19. Create Database on Primary (Test Replication)</p>
                <p className='mt-2'>On machine 1</p>
                <Code
                    language='bash'
                    code={`
mysql -uroot -p
`}
                />
                <p>Then:</p>
                <Code
                    language='sql'
                    code={`
CREATE DATABASE admin_db;
`}
                />
                <p>This database was created on the primary node.</p>
                <p className="font-semibold text-2xl mt-8">20. Verify Replication on Secondary</p>
                <p className='mt-2'>On machine 2:</p>
                <Code
                    language='bash'
                    code={`
mysql -uroot -p
                    `}
                />
                <p>Run:</p>
                <Code
                    language='SQL'
                    code={`
SHOW DATABASES;
`}
                />
                <p>Output showed:</p>
                <Code
                    language='SQL'
                    code={`
admin_db
                    `}
                />
                <p>This confirms replication is working</p>
                <p className="font-semibold text-2xl mt-8">21. Verify Storage Engine</p>
                <p className='mt-2'>On machine 1:</p>
                <Code
                    language='SQL'
                    code={`
SHOW ENGINES;
                    `}
                />
                <p>Output:
                </p>
                <Code
                    language='SQL'
                    code={`
InnoDB  DEFAULT
ndbcluster NO
`}
                />
                <p>
                    This proves:
                </p>
                <p className='my-2'>
                    Your cluster is using InnoDB. NDB is not enabled. So your setup is definitely <strong>InnoDB Cluster</strong>, not NDB Cluster.</p>
                <p className='font-semibold text-2xl mt-8'>22.Important Ports for Security Group</p>
                <p className='my-2'>For this setup, EC2 security groups must allow</p>

                <Code language='bash' code={`
3306   MySQL classic protocol
33060  MySQL X protocol
33061  Group Replication communication
`} />
                <p>Allow these only between MySQL nodes and trusted application/security groups</p>
                <p className='my-2'>Example:</p>
                <Code language='bash' code={`
MySQL node SG allows 3306 from app/Lambda SG
MySQL node SG allows 33060 from admin/bastion SG
MySQL node SG allows 33061 from MySQL node SG itself
`} />
                <p>Do not open these ports publicly.</p>
                <p className='font-semibold text-2xl mt-8'>23. Important Production Improvements</p>
                <ul className='list-disc ml-5'>
                    <li>
                        <p className='font-semibold text-lg my-2'>Add third node</p>
                        <ul className='ml-6'>
                            <li>Your cluster currently says:</li>
                            <li>


                                <Code language='bash' code={`
OK_NO_TOLERANCE
`} />
                            </li>
                            <li>Add one more node:</li>
                            <li>

                                <Code language='bash' code={`
cluster.addInstance('root@10.0.1.X:3306')
`} />
                            </li>
                            <li>With 3 nodes, your cluster can tolerate one node failure</li>
                        </ul>
                    </li>

                </ul>
            </div>

            <ul className='list-disc ml-5'>
                <li>
                    <p className='font-semibold my-2'>Install MySQL Router</p>
                    <ul className='ml-6'>

                        <li>Your cluster is working, but applications should not connect directly to only <span className='text-green-600'>10.0.1.100</span>. You should use <strong>MySQL Router</strong>. MySQL Router is lightweight middleware that routes traffic to the correct backend MySQL server in an InnoDB Cluster. </li>
                        <li>Typical app flow:</li>
                        <li>

                            FastAPI / Lambda / App
                            <br />
                            ↓
                            <br />
                            MySQL Router
                            <br />
                            ↓
                            <br />
                            InnoDB Cluster Primary / Secondary
                        </li>
                        <li className='mt-2'>So your app DB host should become the MySQL Router endpoint, not a single MySQL node.
                            Install MySQL Router on app EC2, bastion, or a dedicated router EC2:
                        </li>
                        <li>

                            <Code language='bash' code={`
sudo yum install -y mysql-router
`} />
                        </li>
                        <li>Bootstrap router</li>
                        <li>
                            <Code language='SQL' code={`
 mysqlrouter --bootstrap root@10.0.1.100:3306 --user=mysqlrouter
 `} />
                        </li>
                        <li>Then apps can connect through router ports:</li>
                        <li>6446 → Read/Write primary
                            6447 → Read-only replicas
                        </li>
                        <li>Example app DB URL:</li>
                        <li>

                            <Code language='SQL' code={`
mysql+pymysql://admin_user:password@mysql-router-host:6446/admin_db
`} />
                        </li>
                    </ul>
                </li>
            </ul>

            <ul className='ml-6 list-disc'>
                <li>
                    <p className='font-semibold my-2'>Do not use root for app</p>
                    <ul className="ml-6">
                        <li>Create application user:</li>
                        <li>

                            <Code language='SQL' code={`
CREATE USER 'admin_user'@'%' IDENTIFIED BY 'StrongAppPassword';
GRANT ALL PRIVILEGES ON admin_db.* TO 'admin_user'@'%';
FLUSH PRIVILEGES;
`} />
                        </li>
                        <li>Better:</li>
                        <li>

                            <Code language='SQL' code={`
CREATE USER 'admin_user'@'10.0.%' IDENTIFIED BY 'StrongAppPassword';
GRANT ALL PRIVILEGES ON admin_db.* TO 'admin_user'@'10.0.%';
FLUSH PRIVILEGES;
`} />
                        </li>
                    </ul>
                </li>
            </ul>
            <p className='font-semibold  text-2xl my-2'>24. Useful Commands</p>
            <p>Check cluster status:</p>
            <Code language='SQL' code={`
mysqlsh root@10.0.1.100
cluster = dba.getCluster()
cluster.status()
`} />
            <p>Check detailed status:</p>
            <p className='my-2'></p>
            <Code language='SQL' code={`
cluster.status({extended:})
`} />
            <p>Check primary:</p>
            <Code language='SQL' code={`
SELECT MEMBER_HOST, MEMBER_ROLE, MEMBER_STATE
FROM performance_schema.replication_group_members;
`} />
            <p>Check database replication:</p>
            <Code language='SQL' code={`
SHOW DATABASES;
`} />
            <p>Check read-only mode:</p>
            <Code language='SQL' code={`
SHOW VARIABLES LIKE 'super_read_only';
`} />
            <p>On secondary, it should usually be:</p>
            <p className='my-2 font-semibold'>ON</p>
            <p className='font-semibold  text-2xl my-2'>25. Final Architecture</p>
            <Code language='bash' code={`
Application / Lambda
↓
MySQL Router
↓
InnoDB Cluster
├── 10.0.1.100 PRIMARY   R/W
└── 10.0.1.200 SECONDARY R/O
`} />

            <p className='mb-2'>
                Recommended production architecture:
            </p>
            <Code language='bash' code={`

Application / Lambda
↓
MySQL Router
↓
InnoDB Cluster
├── Node 1 PRIMARY
├── Node 2 SECONDARY
└── Node 3 SECONDARY
`} />

            <p className='font-semibold my-2 text-2xl'>Conclusion</p>
            <p>You successfully installed and configured a <strong>MySQL InnoDB Cluster</strong> on Amazon Linux 2023 using two EC2 instances.</p>
            <p className='mt-2'>Your final cluster state:</p>
            <p>Cluster Name: devCluster</p>
            <p>Primary Node: 10.0.1.100</p>
            <p>Secondary Node: 10.0.1.200</p>
            <p>Mode: Single-Primary</p>
            <p>Replication: Working</p>
            <p>Storage Engine: InnoDB</p>
            <p>Status: OK_NO_TOLERANCE</p>
            <p className='mt-2'>The setup is correct for development/testing.</p>
            <p className='mt-2'>For production, the next steps should be:</p>
            <ul className='list-decimal space-y-1 ml-6 mt-2'>
                <li>Add a third MySQL node</li>
                <li>Install and bootstrap MySQL Router</li>
                <li>Remove root@'%'</li>
                <li>Use dedicated app and cluster admin users</li>
                <li>Restrict security groups</li>
                <li>Automate this setup using Ansible</li>

            </ul>

        </>
    )
}

export default FiftyThree