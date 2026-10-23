import React from 'react'
import { Code } from "../../../utils/Helpers";
function ThirtyNine() {
    return (
        <div>
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/Wordpress_Site_Migration/wordpress_site.jpg"
                alt="WordPress Site Migration"
            />

            <p>
                WordPress site migration is the process of moving a WordPress website
                from one server to another server  without losing data, SEO rankings, or
                uptime.
            </p>
            <p>
                This includes <strong> website files, database, domain configuration,
                    Apache setup, </strong>and <strong> SSL certificates.</strong>
            </p>

            <p>
                In this detailed guide, you will learn <strong> how to migrate a WordPress website manually</strong>, which is the <strong>safest and most professional method</strong>, especially for production servers.
            </p>

            <br />

            <p className="font-semibold text-lg">What Is WordPress Site Migration?</p>
            <p >WordPress migration means:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Moving WordPress files (<strong>wp-content</strong>, themes, plugins, uploads)</li>
                <li>Migrating MySQL database</li>
                <li>Updating configuration ( <strong>wp-config.php</strong> )</li>
                <li>Setting up Apache Virtual Host</li>
                <li>Installing SSL (HTTPS)</li>
                <li>Fixing errors after migration</li>
            </ul>
            <p>This guide covers <strong>everything end-to-end</strong></p>
            <br />

            <p className="font-semibold text-lg">When Do You Need WordPress Migration?</p>
            <p>You need a WordPress migration when:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Moving to a <strong>new server </strong></li>
                <li>Changing hosting provider</li>
                <li>Moving from staging to production</li>
                <li>Server upgrades (Ubuntu, PHP, MySQL)</li>
                <li>Website performance optimization</li>
            </ul>

            <br />

            <p className="font-semibold text-lg">Prerequisites for WordPress Migration</p>
            <p>Before starting, make sure you have:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>SSH access to the<strong>old server</strong> and the  <strong>new servers</strong></li>
                <li>Root or sudo privileges</li>
                <li>Domain name ready</li>
                <li>Apache installed on new server</li>
                <li>MySQL installed on new server</li>
            </ul>

            <br />

            <p className="font-semibold text-lg">
                Step 1: Backup WordPress Files (Old Server)
            </p>
            <p>Log in to the old server</p>
            <p>cd /var/www/html</p>
            <p>Create a compressed backup of WordPress files:</p>
            <Code
                language="bash"
                code={`
sudo tar -czvf /home/ubuntu/project_dir_name-$(date +%F).tar.gz
project_dir_name
        `}
            />
            <p>This backup contains:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Themes</li>
                <li>Plugins</li>
                <li>Uploads</li>
                <li>Core WordPress files</li>
            </ul>
            <br />

            <p className="font-semibold text-lg">
                Step 2: Backup WordPress Database (Old Server)
            </p>
            <p>Find database name in <strong>wp-config.php</strong></p>
            <Code
                language="bash"
                code={`
grep DB_ /var/www/html/project_dir_name/wp-config.php
        `}
            />
            <p>Example:</p>
            <p>
                define('DB_NAME', 'db_name');
            </p>
            <p>
                define('DB_USER', 'root');
            </p>
            <p>
                define('DB_PASSWORD', 'password');

            </p>
            <Code
                language="bash"
                code={`
mysqldump -u root -p db_name > 
/home/ubuntu/project_dir_name-db-backup-$(date +%F).sql
        `}
            />

            <br />

            <p className="font-semibold text-lg">
                Step 3: Copy Backup to New Server
            </p>
            <p>From <strong>old server</strong></p>
            <Code
                language="bash"
                code={`
scp /home/ubuntu/project_dir_name-2025-12-05.tar.gz 
ubuntu@NEW_SERVER_IP:/home/ubuntu/
scp /home/ubuntu/project_dir_name-db-backup-2025-12-05.sql 
ubuntu@NEW_SERVER_IP:/home/ubuntu/
        `}
            />

            <br />

            <p className="font-semibold text-lg">
                Step 4: Restore WordPress Files (New Server)
            </p>
            <p>Login to<strong> new server:</strong></p>
            <Code
                language="bash"
                code={`
cd /var/www/html
sudo tar -xzvf /home/ubuntu/project_dir_name-2025-12-05.tar.gz -C 
/var/www/html
        `}
            />

            <p className="mt-2 font-semibold">Common Mistake (Important)</p>
            <p>Sometimes files extract like:</p>
            <Code
                language='bash'
                code={`
/var/www/html/var/www/html/project_dir_name
                `}
            />
            <p>Fix it:</p>
            <Code
                language="bash"
                code={`
sudo mv /var/www/html/var/www/html/project_dir_name /var/www/html/
sudo rm -rf /var/www/html/var
        `}
            />

            <br />

            <p className="font-semibold text-lg">Step 5: Set Correct Permissions</p>
            <Code
                language="bash"
                code={`
sudo chown -R www-data:www-data /var/www/html/project_dir_name
sudo find /var/www/html/projec_dir_name -type d -exec chmod 755 {} \\;
sudo find /var/www/html/project_dir_name -type f -exec chmod 644 {} \\;

        `}
            />

            <br />

            <p className="font-semibold text-lg">
                Step 6: Create Database on New Server
            </p>
            <p>Login to MySQL:</p>
            <Code
                language="bash"
                code={`
mysql -u root -p
        `}
            />
            <p>Create database:</p>
            <Code
                language="bash"
                code={`
CREATE DATABASE db_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
Exit        
        `}
            />
            <br />

            <p className="font-semibold text-lg">
                Step 7: Restore Database on New Server
            </p>
            <Code
                language="bash"
                code={`
mysql -u root -p db_name < /home/ubuntu/project_dir_name-db-backup-2025-12-05.sql
        `}
            />
            <p>Verify tables:</p>
            <Code
                language="bash"
                code={`
mysql -u root -p -e "USE db_name; SHOW TABLES;"
        `}
            />
            <br />

            <p className="font-semibold text-lg">
                Step 8: Update wp-config.php
            </p>
            <p>Edit file:</p>
            <Code
                language="bash"
                code={`
sudo nano /var/www/html/arnet-uae/wp-config.php
        `}
            />
            <p>Update database details:</p>
            <p><strong>define('DB_NAME', 'db_name');</strong></p>
            <p><strong>define('DB_USER', 'root');</strong></p>
            <p><strong>define('DB_PASSWORD', 'YOUR_PASSWORD');</strong></p>
            <p><strong>define('DB_HOST', 'localhost');</strong></p>
            <p>Save and exit.</p>
            <br />
            <p className="font-semibold text-lg">
                Step 9: Apache Virtual Host Configuration
            </p>
            <p>Create config file:</p>
            <Code
                language="bash"
                code={`
sudo nano /etc/apache2/sites-available/example.com.conf
`}
            />
            <p>Add:</p>
            <Code
                language="bash"
                code={`
<VirtualHost *:80>
  ServerName example.com
  ServerAlias www.example.com

  DocumentRoot /var/www/html/project_dir_name
  <Directory /var/www/html/project_dir_name>
    AllowOverride All
    Require all granted
  </Directory>

  ErrorLog \${APACHE_LOG_DIR}/example.error.log
  CustomLog \${APACHE_LOG_DIR}/example.access.log combined
</VirtualHost>
        `}
            />
            <p>Enable site:</p>
            <Code
                language="bash"
                code={`
sudo a2ensite example.com.conf
sudo systemctl reload apache2
`} />
            <br />

            <p className="font-semibold text-lg">
                Step 10: Install SSL Certificate
            </p>
            <Code
                language="bash"
                code={`
sudo certbot --apache -d example.com
        `}
            />
            <p>Choose <strong>Reinstall certificate</strong> if asked</p>
            <br />

            <p className="font-semibold text-lg">
                Step 11: Restart Services
            </p>

            <Code
                language="bash"
                code={`
sudo systemctl restart apache2
sudo systemctl restart mysql
        `}
            />

            <br />
            <p className="font-semibold text-lg">
                Step 12: Verify Website
            </p>
            <p>Open browser:</p>
            <p>https://example.com</p>
            <p className='font-semibold text-lg'>Common WordPress Migration Errors & Fixes</p>
            <p>Error: Establishing a Database Connection</p>
            <p>Fix:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Check DB name</li>
                <li>Check DB password</li>
                <li>Database imported properly</li>
            </ul>
            <p>mysql -u root -p db_name</p>
            <p className="font-semibold text-lg">
                404 Error After Migration
            </p>
            <p>Fix:</p>
            <Code
                language='bash'
                code={`
sudo a2enmod rewrite
sudo systemctl restart apache2
`} />
            <p>Permission Denied Error</p>
            <p>Fix:</p>
            <Code
                language='bash'
                code={`
sudo chown -R www-data:www-data /var/www/html/project_dir_name
`} />
            <p>SSL Not Working</p>
            <p>Fix:</p>
            <Code
                language='bash'
                code={`
sudo certbot --apache -d yourdomain.com
sudo systemctl reload apache2
`}
            />
            <p className="font-semibold text-lg">Conclusion</p>
            <p>
                Manual WordPress site migration is a safe and reliable way to move a website to a new server.By following the correct steps for backup, database restore, file transfer, Apache setup, and SSL configuration, you can migrate a WordPress site without downtime or data loss.
            </p>

            <p className="mt-2">
                This method is suitable for beginners as well as production servers and helps avoid common issues like database errors, permission problems, and SSL issues.
            </p>
            <p> After migration, always verify the website and take a fresh backup on the new server.</p>
        </div >
    );
}

export default ThirtyNine
