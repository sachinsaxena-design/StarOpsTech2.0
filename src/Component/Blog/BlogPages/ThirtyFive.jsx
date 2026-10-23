import React from 'react'
import { Code } from '../../../utils/Helpers';
function ThirtyFive() {
    return (
        <div>
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"

                src="https://cdn.staropstech.com/starops/Blogs/Apache_Down_Alert/apachedownalert.jpg"
                alt="Automated Apache Down Alert "
            />
            <p>
                When running production or staging environments, ensuring high availability of your web server is critical. If Apache goes down even for a minute, business operations, user access, and deployments may all be impacted.
            </p>
            <p>
                To prevent unexpected downtime, here’s a solution that <strong> automatically monitors the Apache service</strong> and sends alert notifications <strong> only when the server goes down</strong> — not on every check.
            </p>
            <br />
            <p>
                This guide walks through deploying a lightweight <strong> Bash-based alerting script</strong>, powered by:
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Systemd service</li>
                <li>System Timer</li>
                <li>Microsoft Teams webhook notifications</li>
            </ul>

            <br />
            <p className="font-semibold text-lg">What This Alert Script Does</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Checks whether Apache is active every minute</li>
                <li>Sends a <strong>single</strong> alert when the service goes down (avoids spam)</li>
                <li>Captures the latest Apache logs for quick troubleshooting</li>
                <li>Includes:</li>
                <ul className="list-[circle] ml-6 space-y-1">
                    <li>Server hostname</li>
                    <li>Server IP</li>
                    <li>Timestamp (IST)</li>
                    <li>Journal logs snippet</li>
                </ul>
            </ul>
            <br />
            <p className="font-semibold text-lg">Microsoft Teams Webhook Integration for Apache Alert System</p>
            <p>
                To receive downtime alerts directly in your Microsoft Teams channel, we need to configure an <strong>Incoming Webhook Connector.</strong>
            </p>
            <p>This allows the script to send alert messages into a Teams chat/group automatically.</p>

            <br />
            <p className="font-semibold text-lg">Step 1: Open Your Microsoft Teams Channel</p>
            <p>Navigate to the channel where you want alerts delivered.</p>
            <p>Example: Team Name → Alerts Channel</p>
            <br />
            <p className="font-semibold text-lg">Step 2: Configure Incoming Webhook</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Click the <strong>three-dot menu</strong> next to the channel name.</li>
                <li> Select <strong>Connectors</strong>.</li>
                <li> Search for <strong>Incoming Webhook</strong>.</li>
                <li>Click <strong>Configure</strong>.</li>
            </ul>
            <br />
            <p className="font-semibold text-lg">Step 3: Add Webhook Details</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Give the webhook a meaningful name
                    <br />
                    Example: Apache-Alerts Staging Server.</li>
                <li> Click<strong>Create</strong>.</li>
            </ul>
            <br />
            <p className="font-semibold text-lg">Step 4: Copy the Webhook URL</p>
            <p>Teams will now provide your unique <strong> Webhook Endpoint URL</strong>:</p>
            <p>It will look like this:</p>
            <p className='break-all font-bold'>
                {`https://<tenant>.webhook.office.com/webhookb2/<ID1>@<ID2>/IncomingWebhook/<ID3>/<ID4>/<TOKEN>`}
            </p>
            <p>Copy this URL and store it safely
                Replace inside your Bash script:
            </p>
            <br />
            <p><strong>WEBHOOK={`https://<your-copied-webhook-url>`}</strong></p>
            <br />
            <p className="font-semibold text-lg">Step 5: Test Webhook Manually  </p>
            <p>To ensure the webhook is working, run this:</p>
            <Code
                language='bash'
                code={`
curl -X POST -H "Content-Type: application/json" 
-d '{"text""Webhook test: Apache alert integration successful!"}' \
"https://<your-copied-webhook-url>"
`}
            />
            <p>If successful, a test message should appear instantly in Teams
            </p>
            <p>
                If error: check firewall/outbound internet on server
            </p>
            <br />
            <p className="font-semibold text-lg">Step 6: Setup the Monitoring Script
            </p>
            <p>
                Paste and run the following command to create the file:
            </p>
            <Code
                language='bash'
                code={`
sudo tee /usr/local/bin/apache_alert_onlydown.sh > /dev/null <<'EOF'
#!/usr/bin/env bash
set -euo pipefail


# ----- config -----
SERVICE="apache2"
HOST="server_name"
STATEFILE="/run/apache_alert_state"
WEBHOOK="YOUR_TEAMS_WEBHOOK_URL"
LOCKFILE="/run/apache_alert.lock"


SYSTEMCTL="$(command -v systemctl || true)"
CURL="$(command -v curl || true)"
DATE="$(command -v date || true)"
MKTEMP="$(command -v mktemp || true)"
JOURNALCTL="$(command -v journalctl || true)"
IP_CMD="$(command -v hostname || true)"


CURL_OPTS=(--silent --show-error --fail --connect-timeout 5 --max-time 10 --retry 2 --retry-delay 2)
DIAG_LINES=60
SERVER_IP="$($IP_CMD -I 2>/dev/null | awk '{print $1}' | head -n1 ||echo "unknown")"


exec 9>"$LOCKFILE"
if ! flock -n 9; then
 exit 0
fi


timestamp(){ "$DATE" +"%Y-%m-%d %H:%M:%S IST"; }


if "$SYSTEMCTL" is-active --quiet "$SERVICE"; then
 [ -f "$STATEFILE" ] && rm -f "$STATEFILE"
 exit 0
fi


if [ -f "$STATEFILE" ]; then
 exit 0
fi
JOURNAL_SNIPPET=""
if command -v journalctl >/dev/null 2>&1; then
 JOURNAL_SNIPPET="$(journalctl -u "$SERVICE" -n $DIAG_LINES --no-pager --no-hostname --output=short-iso 2>/dev/null || true)"
fi


PAYLOAD_FILE="$($MKTEMP /tmp/apache_alert.XXXXXX)"
cat > "$PAYLOAD_FILE" <<JSON
{
 "text": "ALERT: $SERVICE is DOWN on $HOST (IP: $SERVER_IP)",
 "attachments": [
   {
     "title": "Apache Service Failure",
     "text": "Server: $HOST\nIP: $SERVER_IP\nTime (IST): $(timestamp)\n\nLast $DIAG_LINES journal lines:\n$(echo "$JOURNAL_SNIPPET" | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')"
   }
 ]
}
JSON


if "$CURL" "${`CURL_OPTS[@]`}" -H "Content-Type: application/json" --data-binary @"$PAYLOAD_FILE" "$WEBHOOK"; then
 printf '%s\n' "$(timestamp) - alert sent" > "$STATEFILE"
 rm -f "$PAYLOAD_FILE"
 exit 0
else
 echo "$(timestamp) - failed to send webhook" >&2
 rm -f "$PAYLOAD_FILE"
 exit 1
fi
EOF
                    `}
            />
            <p>Make it executable: </p>
            <Code
                language='bash'
                code={`
sudo chmod +x /usr/local/bin/apache_alert_onlydown.sh
                `}
            />
            <br />
            <p className="font-semibold text-lg">Step 7: Create the Systemd Service Unit</p>
            <Code
                language='bash'
                code={`
sudo tee /etc/systemd/system/apache_alert_onlydown.service >/dev/null <<'EOF'
[Unit]
Description=Apache only-down alert (runs script)
Wants=network-online.target
After=network-online.target


[Service]
Type=oneshot
ExecStart=/usr/local/bin/apache_alert_onlydown.sh
Nice=10
StandardOutput=journal
StandardError=journal
EOF

                `}
            />
            <br />
            <p className='font-semibold text-lg'>Step 8: Systemd Timer (Check Every Minute)</p>
            <Code
                language='bash'
                code={`
sudo tee /etc/systemd/system/apache_alert_onlydown.timer > /dev/null<<'EOF'
[Unit]
Description=Run apache_alert_onlydown every minute

[Timer]
OnBootSec=30s
OnUnitActiveSec=1min
Unit=apache_alert_onlydown.service
Persistent=true

[Install]
WantedBy=timers.target
EOF
`} />

            <br />
            <p className="font-semibold text-lg">Step 9: Enable & Reload Systemd</p>
            <Code
                language='bash'
                code={`
sudo systemctl daemon-reload
sudo systemctl enable --now apache_alert_onlydown.timer
sudo systemctl start apache_alert_onlydown.timer               
                `} />
            <br />
            <p className="font-semibold text-lg">Verification Commands  </p>
            <p> Check timer status:</p>
            <Code
                language='bash'
                code={`
sudo systemctl status apache_alert_onlydown.timer --no-pager
                `} />
            <p> View all active timers:
            </p>
            <Code
                language='bash'
                code={`
sudo systemctl list-timers --all | grep apache_alert_onlydown
                `} />
            <p> Check latest script logs</p>
            <Code
                language='bash'
                code={`
sudo journalctl -u apache_alert_onlydown.service -n 200 --no-pager
                `} />
            <p> Restart after changes:</p>
            <Code
                language='bash'
                code={`
sudo systemctl daemon-reload
sudo systemctl restart apache_alert_onlydown.timer
                `} />
            <p className="font-semibold text-lg">Conclusion</p>
            <p>
                With this setup, your server will automatically alert you on Microsoft Teams whenever Apache goes down. It helps you respond quickly to issues and keeps your websites and applications running smoothly. The best part is that it’s lightweight, easy to set up, and doesn’t require any extra monitoring tools.
            </p>
        </div>
    );
}

export default ThirtyFive
