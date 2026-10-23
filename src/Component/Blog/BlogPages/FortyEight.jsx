import React from 'react'
import { Code } from "../../../utils/Helpers";

function ThirtyEight() {
    return (
        <div>
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/Deploying_FASTAPI_REACT/Deploy_FastAPI_React.jpg"
                alt="FastAPI React Apache Deployment"
            />

            <p>
                Deploying a full-stack application in production requires more than
                simply running a backend server. A reliable deployment needs secure
                networking, reverse proxy configuration, SSL certificates, database
                setup, and process management.
            </p>
            <br />
            <p>
                In this guide, we will deploy a production-ready full-stack application using:
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    <strong>FastAPI →</strong> Backend API→ https://frontend.example.com
                </li>
                <li>
                    <strong>React (Vite) →</strong> Frontend→ https://api.example.com
                </li>
                <li>
                    <strong>PostgreSQL →</strong>Database
                </li>
                <li>
                    <strong>Apache →</strong>Reverse proxy & static hosting
                </li>
                <li>
                    <strong>Gunicorn →</strong>Production application server
                </li>
                <li>
                    <strong>systemd →</strong>Process monitoring & auto restart
                </li>
                <li>
                    <strong>Let’s Encrypt →</strong> Free SSL certificates
                </li>
            </ul>
            <br />
            <p>
                By the end of this guide, your application will be live on:
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    <strong>Frontend  →</strong> https://frontend.example.com
                </li>
                <li>
                    <strong>Backend  →</strong> https://api.example.com
                </li>
            </ul>

            <br />

            <p className="font-semibold text-xl">Architecture Overview</p>

            <p>
                This deployment architecture ensures scalability, security, and
                reliability.
            </p>

            <ul className="list-none ml-6 space-y-1">
                <li>User</li>
                <li>↓</li>
                <li>Apache (SSL Termination)</li>
                <li>↓</li>
                <li>React Frontend (Static Files)</li>
                <li>↓</li>
                <li>Reverse Proxy</li>
                <li>↓</li>
                <li>Gunicorn</li>
                <li>↓</li>
                <li>FastAPI Backend</li>
                <li>↓</li>
                <li>PostgreSQL Database</li>
            </ul>
            <p className='text-xl'><strong>This architecture provides</strong></p>
            <ul className='list-disc ml-6 space-y-1'>

                <li>
                    Secure HTTPS communication
                </li>
                <li>
                    Efficient API handling
                </li>
                <li>
                    Automatic service monitoring
                </li>
                <li>
                    Scalable production deployment
                </li>

            </ul>
            <br />

            <p className="font-semibold text-2xl">Step 1 — Prepare the Ubuntu Server</p>

            <p className='mt-2'>Update system packages:</p>
            <Code
                language="bash"
                code={`
sudo apt update && sudo apt upgrade -y
                    `}
            />

            <p>Install required tools:</p>
            <Code
                language="bash"
                code={`
sudo apt install apache2 git curl -y
sudo apt install python3 python3-venv python3-pip -y
sudo apt install nodejs npm -y
sudo apt install postgresql postgresql-contrib -y
sudo apt install certbot python3-certbot-apache -y
`}
            />

            <br />

            <p className="font-semibold text-2xl">
                Step 2 — Enable Required Apache Modules
            </p>
            <p className='mt-2'>Apache needs proxy modules to route traffic to FastAPI.</p>
            <Code
                language="bash"
                code={`
sudo a2enmod proxy proxy_http rewrite headers ssl
sudo systemctl restart apache2
`}
            />

            <br />

            <p className="font-semibold text-2xl">Step 3 — Clone the Repository</p>
            <p className='mt-2'>Move to the web directory:</p>
            <Code
                language='bash'
                code={`
cd /var/www
`}
            />
            <p>Clone your application repository:</p>
            <Code
                language="bash"
                code={`
git clone https://github.com/example-org/fastapi-react-demo.git
cd fastapi-react-demo
git checkout deployment
`}
            />
            <p>Switch to the deployment branch if required:</p>
            <Code
                language="bash"
                code={`
git checkout deployment
`}
            />
            <br />
            <p className='text-2xl font-semibold'>Backend Deployment (FastAPI)</p>
            <p className="font-semibold text-2xl mt-2">Step 4 — Install UV (Fast Python Package Manager)</p>
            <p className='mt-2'>This project uses pyproject.toml, so we will use UV.</p>
            <Code
                language="bash"
                code={`
pip3 install uv
`}
            />
            <p>Verify installation:</p>
            <Code
                language="bash"
                code={`
uv --version
`}
            />
            <br />

            <p className="font-semibold text-2xl">
                Step 5 — Configure Backend Environment
            </p>
            <p className='mt-2'>Navigate to backend directory :</p>
            <Code
                language="bash"
                code={`
cd /var/www/fastapi-react-demo/backend
cp .env.example .env
nano .env
`}
            />
            <p>Example production configuration:</p>
            <Code
                language="bash"
                code={`
APP_NAME="Demo FastAPI API"
DEBUG=False
ENVIRONMENT=production

HOST=0.0.0.0
PORT=8000

DATABASE_URL=postgresql+asyncpg://demo_user:StrongPassword@localhost:5432/demo_db
SECRET_KEY=GENERATE_RANDOM_SECRET

BACKEND_CORS_ORIGINS=https://frontend.example.com,https://api.example.com
Generate a secret key:
openssl rand -hex 32
`}
            />

            <br />

            <p className="font-semibold text-2xl mb-2">
                Step 6 — Setup Python Virtual Environment
            </p>

            <Code
                language="bash"
                code={`
uv venv
source .venv/bin/activate
`}
            />
            <p>Install dependencies:</p>
            <Code
                language="bash"
                code={`
uv pip install -r requirements.txt
`}
            />
            <br />

            <p className="font-semibold text-2X;">
                Step 7 — Configure PostgreSQL Database
            </p>
            <p className='mt-2'>Start PostgreSQL:</p>
            <Code
                language="bash"
                code={`
sudo systemctl start postgresql
`}
            />
            <p>Log in to PostgreSQL:</p>
            <Code
                language="bash"
                code={`
sudo -u postgres psql
`}
            />
            <p>Create database:</p>
            <Code
                language="sql"
                code={`
CREATE DATABASE demo_db;

CREATE USER demo_user WITH PASSWORD 'StrongPassword';

ALTER ROLE demo_user SET client_encoding TO 'utf8';
ALTER ROLE demo_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE demo_user SET timezone TO 'UTC';

GRANT ALL PRIVILEGES ON DATABASE demo_db TO demo_user;
`}
            />
            <p>Exit PostgreSQL:</p>
            <Code
                language="bash"
                code={`
\\q
`}
            />

            <br />

            <p className="font-semibold text-2xl mb-2">Step 8 — Run Database Migration</p>

            <Code
                language="bash"
                code={`
alembic upgrade head
`}
            />
            <p>Your database schema is now ready.</p>
            <p className='text-2xl font-semibold'>Avoid Running Uvicorn Directly in Production</p>
            <p className='mt-2'>Running FastAPI with:</p>
            <Code
                language='bash'
                code={`
nohup uvicorn app.main:app
            `} />
            <p>is not recommended because:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>No automatic restart
                </li>
                <li>
                    No monitoring
                </li>
                <li>
                    Limited performance
                </li>
            </ul>
            <p>Instead, use <strong>Gunicorn</strong>.</p>
            <br />

            <p className="font-semibold text-2xl">
                Step 9 — Run Backend with Gunicorn
            </p>
            <p className='mt-2'>Install required packages:</p>
            <Code
                language='bash'
                code={`
uv pip install gunicorn uvicorn            
                `}
            />
            <Code
                language="bash"
                code={`
gunicorn app.main:app \\
-k uvicorn.workers.UvicornWorker \\
--workers 2 \\
--bind 127.0.0.1:8000
`}
            />
            <p>Check API documentation:</p>
            <Code
                language='bash'
                code={`
http://SERVER-IP:8000/docs
`}
            />
            <p>Stop with <strong>CTRL + C</strong> after verifying.</p>
            <br />

            <p className="font-semibold text-2xl">
                Step 10 — Create systemd Service
            </p>
            <p className='mt-2'>Systemd provides:</p>
            <ul className='list-disc ml-6 space-y-1'>
                <li>Automatic restart on crash</li>
                <li>Auto start on reboot</li>
                <li>Centralized logs</li>
            </ul>
            <p>

                Create service file:
            </p>
            <Code
                language="bash"
                code={`
sudo nano /etc/systemd/system/demo-backend.service
`}
            />
            <p>Add:</p>
            <Code
                language="ini"
                code={`
[Unit]
Description=FastAPI Backend Service
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/var/www/fastapi-react-demo/backend

ExecStart=/var/www/fastapi-react-demo/backend/.venv/bin/gunicorn \\
app.main:app \\
-k uvicorn.workers.UvicornWorker \\
--workers 3 \\
--bind 127.0.0.1:8000

Restart=always

[Install]
WantedBy=multi-user.target
`}
            />
            <p>Enable and start service:</p>
            <Code
                language="bash"
                code={`
sudo systemctl daemon-reload
sudo systemctl enable demo-backend
sudo systemctl start demo-backend
`}
            />
            <p>Check status:</p>
            <Code
                language='bash'
                code={`
sudo systemctl status demo-backend
                `}
            />
            <br />

            <p className="font-semibold text-2xl">
                Step 11 — Configure Apache Reverse Proxy
            </p>
            <p className='mt-2'>Create Apache config:</p>
            <Code
                language="bash"
                code={`
sudo nano /etc/apache2/sites-available/api.example.com.conf
`}
            />
            <p>Add:</p>
            <Code
                language="apache"
                code={`
<VirtualHost *:80>

ServerName api.example.com

ProxyPreserveHost On
ProxyPass / http://127.0.0.1:8000/
ProxyPassReverse / http://127.0.0.1:8000/

ErrorLog \${APACHE_LOG_DIR}/api_error.log
CustomLog \${APACHE_LOG_DIR}/api_access.log combined

</VirtualHost>
`}
            />
            <p>Enable site:</p>
            <Code
                language="bash"
                code={`
sudo a2ensite api.example.com.conf
sudo systemctl reload apache2
`}
            />

            <br />

            <p className="font-semibold text-2xl mb-2">Step 12 — Enable SSL for Backend</p>

            <Code
                language="bash"
                code={`
sudo certbot --apache -d api.example.com
`}
            />
            <p>Your backend API is now secured with <strong>HTTPS</strong>.</p>
            <br />
            <p className='font-semibold text-2xl'>Frontend Deployment (React + Vite)</p>
            <p className="font-semibold text-2xl mt-2">
                Step 13 — Configure Frontend Environment
            </p>
            <p className='mt-2'>Navigate to frontend directory:</p>
            <Code
                language="bash"
                code={`
cd /var/www/fastapi-react-demo/frontend
nano .env
`}
            />
            <p>Add API URL:</p>
            <Code
                language="bash"
                code={`
VITE_API_BASE_URL='https://api.example.com/api/v1/'
`}
            />
            <p>Never use localhost in production</p>
            <br />

            <p className="font-semibold text-2xl">Step 14 — Build React Application</p>
            <p className='mt-2'>Install dependencies:</p>

            <Code
                language="bash"
                code={`
npm install
`}
            />
            <p>Build production files:</p>
            <Code
                language="bash"
                code={`
rm -rf dist
npm run build
`}
            />
            <p>Verify no localhost references:</p>
            <Code
                language="bash"
                code={`
grep -r "localhost" dist/
`}
            />
            <br />

            <p className="font-semibold text-2xl">
                Step 15 — Configure Apache for Frontend
            </p>
            <p className='mt-2'>Create Apache config:</p>
            <Code
                language="bash"
                code={`
sudo nano /etc/apache2/sites-available/frontend.example.com.conf
`}
            />
            <p>Add : </p>
            <Code
                language="apache"
                code={`
<VirtualHost *:80>

ServerName frontend.example.com
DocumentRoot /var/www/fastapi-react-demo/frontend/dist

<Directory /var/www/fastapi-react-demo/frontend/dist>
Options FollowSymLinks
AllowOverride All
Require all granted

RewriteEngine On
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

RewriteRule ^ index.html [L]

</Directory>

</VirtualHost>
`}
            />
            <p>Enable site :</p>
            <Code
                language="bash"
                code={`
sudo a2ensite frontend.example.com.conf
sudo systemctl reload apache2
`}
            />

            <br />

            <p className="font-semibold text-2xl mb-2">Step 16 — Enable SSL for Frontend</p>

            <Code
                language="bash"
                code={`
sudo certbot --apache -d frontend.example.com
`}
            />

            <br />

            <p className="font-semibold text-lg">Conclusion</p>

            <p>
                In this guide, we deployed a production-ready FastAPI backend and React frontend on Ubuntu using Apache as a reverse proxy. We configured PostgreSQL for the database, Gunicorn for running the backend application, systemd for service management, and Let’s Encrypt for HTTPS security.
            </p>

            <p>
                This setup provides a secure, scalable, and reliable environment for running full-stack applications in production. By combining these tools, you can efficiently deploy and manage modern web applications on a Linux server.
            </p>
        </div>
    );
}

export default ThirtyEight;
