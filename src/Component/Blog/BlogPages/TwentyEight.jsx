import { Code } from "../../../utils/Helpers";

const TwentyEight = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/SSL_script/ssl_alert.png"
        alt="SSL Alerts"
      />
      <br />
      <p className="text-xl font-bold mb-4">
        Automating SSL Certificate Expiry Alerts to Microsoft Teams with Bash &
        OpenSSL
      </p>
      <p>
        It was a normal Tuesday morning. I grabbed my coffee, opened my laptop,
        and… ping. A teammate messaged me: “Hey, our client says their website
        is showing a scary ‘Your connection is not private’ warning. Any idea?”
      </p>
      <p>
        I quickly opened the site — and there it was. The dreaded red lock icon.
        SSL expired.
      </p>
      <br />
      <p className="font-semibold">The Problem</p>
      <p>
        We had dozens of domains running on that server, each with their own SSL
        certificates. Some were for clients, some for internal tools.
      </p>
      <p>
        The truth? I didn’t even remember when half of them were renewed. And
        checking them manually was a nightmare:
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>SSH into server</li>
        <li>
          Run <code>openssl s_client</code> for each domain
        </li>
        <li>Calculate expiry date in my head</li>
        <li>Repeat for all 40+ domains</li>
      </ul>
      <p>
        By the time I’d finish, my coffee would be cold and my patience gone.
      </p>
      <br />
      <p className="font-semibold">The Lightbulb Moment</p>
      <p>
        That day, after fixing the client’s cert, I told myself: Never again.
      </p>
      <p>
        If certificates could betray me silently, I’d make sure they spoke up
        before they expired. Loudly. In a place I actually check every day —
        Microsoft Teams.
      </p>
      <p>So, I decided to write a Bash script that:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>Finds every domain in my Apache config</li>
        <li>Checks its SSL expiry date automatically</li>
        <li>
          Sends me one clear report every Monday morning in Microsoft Teams
        </li>
        <li>Warns me if anything is expiring in the next 14 days</li>
      </ul>
      <br />
      <p className="font-semibold">The Plan</p>
      <ol className="list-decimal ml-6 space-y-1">
        <li>
          <strong>Detect</strong> → Pull all domain names from Apache configs
        </li>
        <li>
          <strong>Inspect</strong> → Use OpenSSL to fetch SSL certificate info
        </li>
        <li>
          <strong>Decide</strong> → Compare expiry date with today
        </li>
        <li>
          <strong>Notify</strong> → Send results to Microsoft Teams
        </li>
      </ol>
      <br />
      <p className="font-semibold">The Script Was Born</p>
      <p>
        After a few cups of coffee and a lot of trial-and-error with{" "}
        <code>grep</code> and <code>awk</code>, I ended up with this working
        script (full version at the end of the post).
      </p>
      <p>It checks each domain and classifies it as:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>✅ Healthy – good for now</li>
        <li>⚠️ Expiring soon – needs renewal</li>
        <li>❌ Broken or misconfigured – fix immediately</li>
      </ul>
      <br />
      <p className="font-semibold">The First Test</p>
      <p>
        When I ran the script for the first time, my Teams lit up with this neat
        table:
      </p>
      <Code
        language="bash"
        code={`🔒 SSL Expiry Report – Server: 203.0.113.45
⚠️  example.com – expires in 10 days on Aug 22 2025 15:30:00 IST
✅ myapp.com – valid, expires in 45 days on Sep 26 2025 15:30:00 IST
❌ unit.test.com – cert does not include domain (SANs: test.com)
❌ dewang.com – connection failed`}
      />
      <br />
      <p className="font-semibold">What Do These Outputs Mean?</p>
      <p>
        <strong>✅ Healthy Certificate</strong>
      </p>
      <Code
        br={false}
        language="bash"
        code={`✅ myapp.com – valid, expires in 45 days on Sep 26 2025 15:30:00 IST`}
      />
      <p>
        The certificate is valid, matches the domain, and is far from expiry
        (more than 14 days). All good — you can relax.
      </p>
      <br />

      <p>
        <strong>⚠️ Expiring Soon</strong>
      </p>
      <Code
        br={false}
        language="bash"
        code={`⚠️  example.com – expires in 10 days on Aug 22 2025 15:30:00 IST`}
      />
      <p>
        The certificate is valid, but will expire within the threshold (14
        days). You should renew it soon to avoid downtime.
      </p>
      <br />

      <p>
        <strong>❌ Certificate Does Not Include Domain</strong>
      </p>
      <Code
        br={false}
        language="bash"
        code={`❌ unit.test.com – cert does not include domain (SANs: test.com)`}
      />
      <p>
        The certificate is valid, but it’s issued for another domain or
        subdomain (in this case, test.com). This means test.com is not covered,
        so browsers will throw a security warning.
      </p>
      <br />

      <p>
        <strong>❌ Connection Failed</strong>
      </p>

      <Code
        br={false}
        language="bash"
        code={`❌ dewang.com – connection failed`}
      />
      <p>
        The script couldn’t establish a TLS connection to the domain on port
        443.Possible reasons:
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>The domain is down</li>
        <li>No SSL certificate is installed</li>
        <li>Firewall is blocking access</li>
      </ul>
      <br />
      <p className="font-semibold">The Script</p>
      <p>Here’s the script that saved me from future headaches:</p>
      <Code
        language="bash"
        code={`
#!/bin/bash

###############################################################################
# SSL Certificate Expiry Checker Script
# ➤ Checks SSL expiry using OpenSSL
# ➤ Sends alerts to Microsoft Teams (one message)
# ➤ Lists both alerts and healthy domains
# ➤ Displays expiry time in IST (Asia/Kolkata)
###############################################################################

# === Configuration ===
DOMAINS_FILE="/home/ubuntu/ssl_alert/domains.txt"
EXPIRING_FILE="/home/ubuntu/ssl_alert/expiring_domains.txt"
THRESHOLD=14
PORT=443
TEAMS_WEBHOOK=“your_teams_channel_webhook_url”  # REPLACE with your webhook

# === Fetch server's public IP ===
SERVER_IP=$(curl -s http://checkip.amazonaws.com)

# === Extract unique domains from Apache configs ===
grep -rhoE '^\s*[^#]*Server(Name|Alias)\s+\S+' \
     /etc/apache2/sites-available /etc/apache2/sites-enabled 2>/dev/null \
  | awk '{print $2}' \
  | grep -vE '^(localhost|127\.|::1|0\.0\.0\.0|www\.example\.com|example\.com)$' \
  | grep -vE ':[0-9]+$' \
  | sort -u > "$DOMAINS_FILE"

# === Initialize output files and buffers ===
echo "🔍 SSL Check from Server: $SERVER_IP" > "$EXPIRING_FILE"
ALERT_BODY="🔒 *SSL Certificate Expiry Report from Server: $SERVER_IP*\n"
HEALTHY_DOMAINS=""

# === Check each domain ===
while read -r DOMAIN || [[ -n "$DOMAIN" ]]; do
  [[ -z "$DOMAIN" || "$DOMAIN" =~ ^# ]] && continue

  CERT_FULL=$(echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:$PORT" 2>/dev/null)

  if [[ -z "$CERT_FULL" ]]; then
    MSG="❌ $DOMAIN – connection failed"
    echo "$MSG (from $SERVER_IP)" >> "$EXPIRING_FILE"
    ALERT_BODY+="$MSG\n"
    continue
  fi

  EXPIRY_DATE_UTC=$(echo "$CERT_FULL" | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
  if [[ -z "$EXPIRY_DATE_UTC" ]]; then
    MSG="❌ $DOMAIN – no expiry date found"
    echo "$MSG (from $SERVER_IP)" >> "$EXPIRING_FILE"
    ALERT_BODY+="$MSG\n"
    continue
  fi

  CERT_DOMAINS=$(echo "$CERT_FULL" | openssl x509 -noout -text 2>/dev/null | grep -oE "DNS:[^, ]+" | cut -d: -f2)
  if ! echo "$CERT_DOMAINS" | grep -q "^$DOMAIN$"; then
    MSG="❌ $DOMAIN – cert does not include domain (SANs: $CERT_DOMAINS)"
    echo "$MSG (from $SERVER_IP)" >> "$EXPIRING_FILE"
    ALERT_BODY+="$MSG\n"
    continue
  fi

  EXPIRY_SEC=$(date -u -d "$EXPIRY_DATE_UTC" +%s 2>/dev/null)
  NOW_SEC=$(date -u +%s)
  DAYS_LEFT=$(( (EXPIRY_SEC - NOW_SEC) / 86400 ))

  # Convert expiry date to IST
  EXPIRY_DATE_IST=$(TZ="Asia/Kolkata" date -d "@$EXPIRY_SEC" +"%b %d %Y %H:%M:%S IST")

  if (( DAYS_LEFT <= THRESHOLD )); then
    MSG="⚠️  $DOMAIN – expires in $DAYS_LEFT days on $EXPIRY_DATE_IST"
    echo "$MSG (from $SERVER_IP)" >> "$EXPIRING_FILE"
    ALERT_BODY+="$MSG\n"
  else
    MSG="✅ $DOMAIN – valid, expires in $DAYS_LEFT days on $EXPIRY_DATE_IST"
    echo "$MSG (from $SERVER_IP)" >> "$EXPIRING_FILE"
    HEALTHY_DOMAINS+="$MSG\n"
  fi

done < "$DOMAINS_FILE"

# === Append healthy domains section ===
if [[ -n "$HEALTHY_DOMAINS" ]]; then
  ALERT_BODY+="\n🟢 *Healthy Certificates:*\n$HEALTHY_DOMAINS"
fi

# === Send message to Microsoft Teams ===
if [[ "$ALERT_BODY" =~ [❌⚠️✅] ]]; then
  FORMATTED_TEXT="\`\`\`\n$ALERT_BODY\`\`\`"
  curl -s -H "Content-Type: application/json" \
       -d "{\"text\": \"$FORMATTED_TEXT\"}" \
       "$TEAMS_WEBHOOK"
else
  echo "✅ All certificates are healthy; nothing to send."
fi

`}
      />
      <br />
      <p className="font-semibold">Automation: Every Monday, Like Clockwork</p>
      <p>
        To make it part of my routine, I set a cron job to run only on Mondays
        at 9 AM:
      </p>
      <Code
        br={false}
        language="bash"
        code={`0 9 * * 1 /home/ubuntu/ssl_alert/ssl_check.sh`}
      />
      <p>
        Now, my Monday mornings start with a quick SSL health check before
        diving into the rest of the week’s chaos.
      </p>
      <br />
      <p className="font-semibold">The Takeaway</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Don’t wait for your clients to tell you your SSL expired or was
          misconfigured.
        </li>
        <li>Make your servers talk to you before disaster strikes.</li>
        <li>You don’t need to constantly watch SSL expiry dates.</li>
        <li>A simple weekly report is enough to stay ahead.</li>
        <li>
          This script turned SSL monitoring from a reactive headache into a
          proactive ritual.
        </li>
      </ul>
      <br />
      <p>
        For me, this script isn’t just a tool — it’s my early warning system.
      </p>
    </div>
  );
};

export default TwentyEight;
