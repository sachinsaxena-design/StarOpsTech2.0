import React from 'react'
import { Code } from '../../../utils/Helpers';
function FortyFour() {
    return (
        <div>
            <img
                className="max-h-[800px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/grade_production/production_grade.jpeg"
                alt="Monolithic vs Microservices Architecture"
            />
            <p>
                In this blog, we will deploy a complete production-grade application on a single Ubuntu server using:
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Docker & Docker Compose</li>
                <li>MongoDB in Docker</li>
                <li>Backend API (Node.js)</li>
                <li>Frontend (Vite/React static build)</li>
                <li>Admin Panel (Vite/React static build)</li>
                <li>Apache as Reverse Proxy</li>
                <li>Subdomain routing</li>
                <li>SSL using Let’s Encrypt</li>
            </ul>

            <p className="font-semibold">By the end, you will have:</p>
            <ul className="ml-6 space-y-1">
                <li>https://testing-fe.example.com → Frontend</li>
                <li>https://testing-admin.example.com → Admin Panel</li>
                <li>https://testing-be.example.com → Backend API</li>
            </ul>

            <b>Architecture</b>
            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
                {`Internet
   |
 HTTPS (443)
   |
Apache Reverse Proxy
   |
+-------------------------------+
| FE Container    (8081 → 80)   |
| Admin Container (8082 → 80)   |
| Backend API     (3000)        |
+-------------------------------+
             |
          MongoDB (27017)
`}
            </pre>

            <p>
                All services run in Docker containers and are connected using a private
                Docker network.
            </p>

            <b>Step 1: Install Required Packages</b>
            <Code language='bash'
                code={`
sudo apt update
sudo apt install docker.io docker-compose apache2 -y
sudo systemctl start docker
sudo systemctl enable docker
`}
            />
            (Optional)
            <Code language='bash' code={`
sudo usermod -aG docker ubuntu
newgrp docker
            `} />
            <p className='font-semibold text-xl'>Step 2: Prepare Your Project</p>
            <p>Directory structure:</p>
            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
                {`myapp/
├── docker-compose.yml
├── gcwiz-fe/
├── GCwizAdmin/
└── GCwizAdminBE/`}
            </pre>

            <p className='font-semibold'>Frontend/Admin Dockerfile</p>
            <Code language='bash'
                code={`
# Build stage
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Runtime stage
FROM httpd:2.4
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/
`}
            />

            <p className='font-semibold'>Backend Dockerfile</p>
            <Code language="bash"
                code={`
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
`}
            />

            <p className='font-semibold text-xl'>Step 3:Create Backend .env</p>
            <p className='font-semibold'>Inside GCwizAdminBE/.env</p>
            <Code language='bash'
                code={`
PORT=3000
MONGODB_DATABASE_URL=mongodb://mongodb:27017/gcwiz
CORS_WHITELIST=https://testing-fe.example.com,https://testing-admin.example.com
JWT_SECRET=supersecretkey
MAX_LOGIN_ATTEMPTS=5
NODE_ENV=production
`} />
            <p className='font-semibold text-xl'>Step 4: Build Images</p>

            <Code language='bash'
                code={`
docker build -t gcwiz-fe ./gcwiz-fe
docker build -t gcwiz-admin ./GCwizAdmin
docker build -t gcwiz-be ./GCwizAdminBE
`}
            />

            <b>Step 5: Docker Compose</b>
            <p><strong>Create docker-compose.yml in myapp/:</strong></p>
            <Code language='bash' code={`
version: "3.9"

services:
 mongodb:
   image: mongo:6
   container_name: mongodb
   restart: always
   volumes:
     - mongo_data:/data/db
   networks:
     - gcwiz-net

 backend:
   image: gcwiz-be
   container_name: be
   restart: always
   env_file:
     - ./GCwizAdminBE/.env
   ports:
     - "3000:3000"
   depends_on:
     - mongodb
   networks:
     - gcwiz-net

 fe:
   image: gcwiz-fe
   container_name: fe
   restart: always
   ports:
     - "8081:80"
   networks:
     - gcwiz-net

 admin:
   image: gcwiz-admin
   container_name: admin
   restart: always
   ports:
     - "8082:80"
   networks:
     - gcwiz-net

volumes:
 mongo_data:

networks:
 gcwiz-net:
   driver: bridge`}
            />
            <p><strong>Run everything</strong></p>
            <Code language='bash' code={`
docker compose up -d
            `} />
            <p>Check:</p>
            <Code language='bash' code={`
docker ps
            `} />
            <p className='font-semibold text-xl'>Step 6:Create Subdomains</p>
            <p>In your DNS (Namecheap / GoDaddy / Route53):</p>
            <table className="w-full border border-gray-300 border-collapse text-left">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Subdomain</th>
                        <th className="border border-gray-300 px-4 py-2">Type</th>
                        <th className="border border-gray-300 px-4 py-2">Ip</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">testing-fe.example.com</td>
                        <td className="border border-gray-300 px-4 py-2">A</td>
                        <td className="border border-gray-300 px-4 py-2">SERVER_IP</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">testing-admin.example.com</td>
                        <td className="border border-gray-300 px-4 py-2">A</td>
                        <td className="border border-gray-300 px-4 py-2">SERVER_IP</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">testing-be.example.com</td>
                        <td className="border border-gray-300 px-4 py-2">A</td>
                        <td className="border border-gray-300 px-4 py-2">SERVER_IP</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <p className='font-semibold text-xl'>Step 7: Apache Reverse Proxy</p>
            <p>Enable proxy:</p>
            <Code language='bash' code={`
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl restart apache2
`}
            />
            <p>Create three configs:</p>
            <p><strong>Frontend:</strong></p>
            <Code
                language='bash'
                code={`
sudo nano /etc/apache2/sites-available/testing-fe.conf
`} />
            <Code language='bash' code={`
<VirtualHost *:80>
 ServerName testing-fe.example.com
 ProxyPreserveHost On
 ProxyPass / http://localhost:8081/
 ProxyPassReverse / http://localhost:8081/
</VirtualHost>
`}
            />
            <p><strong>Admin:</strong></p>
            <Code language='bash' code={`
sudo nano /etc/apache2/sites-available/testing-admin.conf
                `} />
            <Code language='bash' code={`
<VirtualHost *:80>
 ServerName testing-admin.example.com
 ProxyPreserveHost On
 ProxyPass / http://localhost:8082/
 ProxyPassReverse / http://localhost:8082/
</VirtualHost>
`} />
            <p><strong>Backend:</strong></p>
            <Code language='bash' code={`
sudo nano /etc/apache2/sites-available/testing-be.conf
`} />
            <Code language='bash' code={`
<VirtualHost *:80>
 ServerName testing-be.example.com
 ProxyPreserveHost On
 ProxyPass / http://localhost:3000/
 ProxyPassReverse / http://localhost:3000/
</VirtualHost>
`} />
            <p>Enable:</p>
            <Code language='bash' code={`
sudo a2ensite testing-fe.conf
sudo a2ensite testing-admin.conf
sudo a2ensite testing-be.conf
sudo a2dissite 000-default.conf
sudo systemctl reload apache2
`} />
            <p><strong>Test:</strong></p>
            <Code language='bash' code={`
curl http://testing-fe.example.com
curl http://testing-admin.example.com
curl http://testing-be.example.com/home/announcements
`} />

            <p className='font-semibold text-xl'>Step 8: SSL Using Let’s Encrypt</p>
            <p>Install Certbot:</p>
            <Code language='bash' code={`
sudo apt install certbot python3-certbot-apache -y
`} />
            <p>Run:</p>
            <Code language='bash' code={`
sudo certbot --apache \\
-d testing-fe.example.com \\
-d testing-admin.example.com \\
-d testing-be.example.com
`} />
            <p>Choose:</p>
            <p>Redirect HTTP to HTTPS → Yes</p>
            <p>Verify:</p>
            <Code language='bash' code={`
sudo certbot renew --dry-run
                `} />

            <Code language='bash' code={`
https://testing-fe.example.com
https://testing-admin.example.com
https://testing-be.example.com
`} />

            <b>Conclusion</b>
            <p>
                In this blog, we successfully deployed a complete production-ready application using Docker, Apache, subdomains, and SSL. All services (Frontend, Admin Panel, Backend, and MongoDB) are running in separate containers and are securely accessible using HTTPS.
            </p>
            <p>
                Apache is used as a reverse proxy to route traffic to the correct container based on subdomains. Let’s Encrypt provides free SSL certificates with automatic renewal, making the setup secure and reliable.
                </p>
                <p>
                This setup is simple, clean, and very close to real industry production environments. It shows how Docker and Apache can be used together to build a secure, scalable, and professional deployment system.

            </p>
        </div>
    );
}

export default FortyFour
