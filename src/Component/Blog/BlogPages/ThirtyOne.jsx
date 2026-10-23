import { Code } from "../../../utils/Helpers";

const ThirtyOne = () => {
    return (
        <div>
            <p className="text-xl font-bold mb-4">
                MySQL Migration Guide: Moving from Ubuntu Server to AWS Graviton EC2
                (Step-by-Step)
            </p>

            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/mysql%20incremental%20backup/MySQL_Migration_Guide.png "
                alt="MySQL Migration to AWS Graviton EC2"
            />

            <p>
                Migrating your MySQL database from a traditional Ubuntu server to an <strong> AWS
                Graviton EC2 instance </strong> is one of the most cost-effective and
                performance-optimized upgrades you can make. This guide will walk you
                through the<strong> entire process — from setup to testing — in simple,
                actionable steps </strong> that anyone can follow. 
                <br />
                <br />
                Whether you’re moving a single database or an entire environment, this guide ensures a <strong> smooth and safe migration.</strong>
            </p>

            <br />
            <p className="font-semibold">Why Move to AWS Graviton?</p>
            <p><strong> ARM64 processors</strong>,offering power to AWS Graviton instances::</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><strong>Up to 40% better price-performance</strong> than x86-based instances</li>
                <li><strong>Lower operational costs</strong></li>
                <li><strong>Energy-efficient architecture</strong></li>
                <li>
                    <strong>Full compatibility</strong> with modern workloads like MySQL, Nginx, Docker,
                    and more
                </li>
            </ul>

            <br />
            <p className="font-semibold">Migration Overview</p>
            <p>We’ll go through these phases:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><strong>Prepare the Graviton Server</strong></li>
                <li><strong>Backup Data from the Old Server</strong></li>
                <li><strong>Transfer Backup to the New Server</strong></li>
                <li><strong>Restore Databases</strong></li>
                <li><strong>Configure Applications</strong></li>
                <li><strong>Secure & Optimize MySQL</strong></li>
                <li><strong>Testing & Validation</strong></li>
            </ul>

            <br />
            <p className="font-semibold">Prepare the New Graviton Server</p>
            <b>Step 1: Connect to Your Graviton Instance</b>
            <Code language="bash" code={`
ssh -i your-key.pem ubuntu@your-graviton-instance-ip
                `} />

            <b>Step 2: Update System Packages</b>
            <Code
                language="bash"
                code={`sudo apt update
sudo apt upgrade -y`}
            />

            <b>Step 3: Install MySQL Server</b>
            <Code
                language="bash"
                code={`sudo apt install mysql-server -y
sudo systemctl start mysql
sudo systemctl enable mysql
sudo systemctl status mysql`}
            />

            <b>Step 4: Secure MySQL Installation</b>
            <Code language="bash" code={`sudo mysql_secure_installation`} />
            <p>Follow the prompts:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Set root password</li>
                <li>Remove anonymous users: <strong>Y</strong></li>
                <li>Disallow remote root login: <strong>Y</strong></li>
                <li>Remove test database: <strong>Y</strong></li>
            </ul>
            <br />
            <p className="font-semibold">Backup Data from Current Server</p>
            <b>Step 5: Create a MySQL Dump</b>
            <Code
                language="bash"
                code={`
mysqldump -u root -p --all-databases --routines --triggers --events
 --single-transaction > full_backup_$(date +%Y%m%d_%H%M%S).sql
`}
            />
            <p>Or backup specific databases:</p>
            <Code
                language="bash"
                code={`
mysqldump -u root -p --databases db1 db2 db3 --single-transaction > full_backup_$(date +%Y%m%d_%H%M%S).sql`}
            />

            <b>Step 6: Compress the Backup</b>
            <Code
                language="bash"
                code={`gzip full_backup_*.sql
ls -lh full_backup_*.sql.gz`}
            />

            <br />
            <p className="font-semibold">
                Prepare Secure Access Between Old and New Servers
            </p>
            <p>
                Before transferring your MySQL backup, make sure the old server can
                securely connect to the new Graviton server using SSH or SCP. 
                Otherwise,your transfer commands (like <span className="text-green-600">scp</span>) will fail due to permission or network
                restrictions.
            </p>

            <b>Step 7: Add the Old Server’s IP to the AWS Security Group</b>
            <ul className="list-disc ml-6 space-y-1">
                <li>Go to AWS Management Console → EC2 → Security Groups</li>
                <li>Find the Security Group attached to your Graviton instance</li>
                <li>Click on Inbound Rules → Edit Inbound Rules</li>
                <li>Add these rules:</li>
            </ul>
            <Code
                language="bash"
                code={`Type: SSH  
Protocol: TCP  
Port Range: 22  
Source: <old-server-public-ip>/32  
Description: Allow old server SSH access

Type: MySQL  
Protocol: TCP  
Port Range: 3306  
Source: <old-server-public-ip>/32  
Description: (Optional) Allow old server MySQL access for testing`}
            />

            <b>Step 8: Copy Graviton Server’s SSH Key to Old Server</b>
            <p>
                If you want to transfer files directly from the old server to the new
                one using <span className="text-green-600">scp</span>, you’ll need the Graviton instance’s private key (<span className="text-green-600">.pem </span>
                 file) on the old server.On your local machine:
            </p>
            <p className="font-bold">Upload the Graviton key to the old server:</p>
            <Code
                language="bash"
                code={`scp -i your-local-key.pem graviton-key.pem 
username@old-server-ip:/home/username/`}
            />
            <p className="font-bold">Set correct permissions:</p>
            <Code language="bash" code={`
chmod 400 /home/username/graviton-key.pem
`} />

            <br />
            <p className="font-semibold ">Transfer Data to Graviton Server</p>
            <p className="font-semibold">Using SCP:</p>
            <Code
                language="bash"
                code={`scp -i graviton-key.pem full_backup_*.sql.gz 
ubuntu@graviton-server-ip:/home/ubuntu/`}
            />
            <p className="font-semibold">Restore Data on the New Server</p>
            <b>Step 9: Prepare for Data Import</b>
            <Code
                language="bash"
                code={`gunzip full_backup_*.sql.gz
sudo mysql -u root -p`}
            />

            <b>Step 10: Import the Database</b>
            <Code language="bash" code={`
mysql -u root -p < full_backup_*.sql
`} />
            <p>Monitor import progress:</p>
            <Code language="bash" code={`
mysql -u root -p -e "SHOW PROCESSLIST;"
`} />

            <b>Step 11: Verify the Import</b>
            <Code
                language="bash"
                code={`SHOW DATABASES;
USE your_database_name;
SHOW TABLES;
SELECT COUNT(*) FROM your_table_name;`}
            />

            <br />
            <p className="font-semibold">Step 13: Update Application Configurations</p>
            <p>Update your app’s environment or config file:</p>
            <Code
                language="bash"
                code={`DB_HOST=new-graviton-server-ip
DB_USER=app_user
DB_PASS=strong_password
DB_NAME=your_database`}
            />

            <p className="font-semibold">Conclusion</p>
            <p>
                Migrating MySQL from a traditional Ubuntu server to an AWS Graviton EC2
                instance is not just about moving data — it’s about upgrading your
                performance, scalability, and cost efficiency. By following this
                step-by-step guide, you’ve ensured that your migration process is
               <strong> secure, efficient, and fully optimized</strong> for Graviton’s ARM64
                architecture.
            </p>
        </div>
    );
};

export default ThirtyOne;
