import React from "react";
import { Code } from "../../../utils/Helpers";

function FortyNine() {
    return (
        <div>
            <img
                className="max-h-[700px] w-full mx-auto rounded-lg mb-4"
                src="https://cdn.staropstech.com/starops/Blogs/Ampliy_Deployment_Break/Amplify_Deploy.jpg"
                alt="AWS Amplify GitHub IP Allow List Issue"
            />

            <p>
                When AWS Amplify is connected to a GitHub repository, deployment usually feels effortless. Push code to GitHub, Amplify detects the change, triggers a build, and deploys the latest version. Even manual redeployments or creation of new Apps from the Amplify Console work smoothly.
            </p>
            <p>That was exactly how things worked for us before we tightened security on GitHub.</p>

            <p>
                The problem started after VPN-related GitHub network restrictions were introduced and the GitHub organization IP allow list was enabled. Suddenly, Amplify stopped building. Automatic deployments stopped. Manual redeployments stopped. Even creating a brand-new Amplify app failed
            </p>
            <p>At first glance, the error messages looked misleading. One pointed to IAM role issues. Another pointed to GitHub access restrictions. The IAM configuration had not changed, so the real cause turned out to be elsewhere.</p>
            <p>This post explains the full debugging journey, what did not work, what AWS Support confirmed, and the workaround that finally made Amplify deployments work again.</p>

            <br />

            <p className="text-2xl font-semibold">
                The Environment Before the Issue
            </p>
            <p className="mt-1">Before the GitHub network restrictions were applied:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>AWS Amplify connected to GitHub repository</li>
                <li>Automatic deployments on every push</li>
                <li>Manual redeployments worked</li>
                <li>New Amplify apps could be created</li>
            </ul>

            <p>In other words, the CI/CD flow between GitHub and Amplify was healthy.</p>

            <br />

            <p className="text-2xl font-semibold">What Changed</p>

            <p>
                After integrating VPN-related restrictions with GitHub and enforcing an IP allow list at the GitHub organization level, Amplify deployments started failing.
            </p>
            <p>Two major symptoms appeared:</p>

            <p className="text-xl font-semibold mt-2">1. Existing Amplify app redeployments failed</p>
            <p>Manual redeployments no longer worked, and automatic builds triggered by GitHub pushes also stopped.</p>
            <p className="mt-1 mb-1">Amplify build logs showed:</p>
            <Code language='bash'
                code={`

Unable to assume specified IAM Role. Please ensure the selected IAM Role has sufficient permissions and the Trust Relationship is configured correctly.                
                `} />
            <p className="mb-2">At first, this looked like an AWS IAM trust relationship issue.</p>
            <p>But that did not make sense because:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>No one had changed the IAM role</li>
                <li>The same Amplify app had been working earlier</li>
                <li>The issue started only after GitHub network restrictions were enforced</li>
            </ul>
            <br />
            <p className="text-xl font-semibold">2. New Amplify app creation also failed</p>
            <p>When trying to deploy a new Amplify app, GitHub returned this error:</p>
            <Code language='bash'
                code={`
{
   "message": "Although you appear to have the correct authorization credentials, the ORG_NAME organization has an IP allow list enabled,and your IP address is not permitted to access this resource.",

   "documentation_url": "https://docs.github.com/rest/repos/webhooks#list-repository-webhooks",
  
   "status": "403"
}`} />
            <p>
                This error was much more useful. It showed that Amplify was failing while trying to access the GitHub repository because GitHub’s organization IP allow list was blocking the request.
            </p>

            <p className="text-2xl font-semibold mt-2">
                First verification: was Amplify still connected to GitHub?
            </p>
            <p className="mt-2">The first thing I checked was whether the AWS Amplify GitHub App was still installed and had the right repository permissions.</p>
            <p className="mb-2 mt-2">In GitHub, I verified:</p>
            <p><strong>Organization Settings → Applications → Installed GitHub Apps → AWS Amplify</strong></p>
            <p>The app was present, and the required repository permissions were already granted.</p>
            <p>So the problem was not that Amplify had lost repository authorization.</p>
            <br />

            <p className="text-2xl font-semibold">
                Proving that the issue was caused by the GitHub IP allow list
            </p>
            <p>To confirm whether the IP allow list was the true cause, I temporarily whitelisted everything by adding:</p>
            <Code
                language='bash'
                code={`
 0.0.0.0/0
`}
            />
            <p>under:</p>
            <p><strong>Organization Settings → Security → IP allow list</strong></p>
            <p className="mt-2">After doing that:</p>
            <ul className="list-disc ml-6 space-y-1"   >
                <li>Redeploying the existing Amplify app worked</li>
                <li>Creating a new Amplify app worked</li>
            </ul>
            <p className="mt-2">That immediately confirmed the root of the problem:</p>
            <p className="mt-2 mb-2">
                <strong>Amplify was being blocked by the GitHub organization IP allow list.</strong>
            </p>
            <p>Once GitHub’s restriction was effectively opened, Amplify could talk to GitHub again.</p>
            <br />

            <p className="text-2xl font-semibold">
                The obvious fix that should have worked, but did not
            </p>
            <p className="mt-1">
                GitHub provides an option called:
            </p>
            <p className="mt-2 mb-2"><strong>Allow GitHub Apps to bypass IP allow list</strong></p>
            <p className="mb-2">This sounded like the perfect solution.</p>
            <p>The expectation was simple:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Keep VPN and IP restrictions for users</li>
                <li>Allow AWS Amplify’s GitHub App to access the repository</li>
                <li>Avoid manually maintaining AWS IP ranges</li>
            </ul>
            <p className="mt-2">The integration was intact, so permissions were not the issue.</p>
            <p className="mt-2">So I enabled that setting under:</p>
            <p className="mt-2 mb-2"><strong>GitHub Organization → Settings → Security → IP allow list</strong></p>
             <img
                className="max-h-[600px] w-full mx-auto rounded-lg mb-4"
                src="https://cdn.staropstech.com/starops/Blogs/Ampliy_Deployment_Break/Amplify_1.png"
                alt="AWS Amplify GitHub IP Allow List Issue"
            />
            <p>But even after enabling it, the issue did not go away.</p>
            <p>I tried again to:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Redeploy the current Amplify service</li>
                <li>Create a new Amplify service</li>
            </ul>
            <p>The same problem remained.</p>
            <p>So in this case, enabling GitHub App bypass alone was not enough.</p>
            <br />
            <p className="text-2xl font-semibold">
                The real challenge: how do you allowlist a serverless service?
            </p>

            <p>At this point the real question became:</p>

            <p className="mt-2 mb-2"><strong>If AWS Amplify is serverless, what IP address do I even add to GitHub’s allow list?</strong></p>
            <p className="mt-2">Amplify itself does not expose a fixed static IP that you can simply whitelist.</p>
            <p className="mt-2">Looking through public documentation, I found that AWS Amplify Hosting relies on other AWS services in the background, especially <strong>AWS CodeBuild</strong>, for build operations. That gave me a lead.</p>
            <p>AWS publishes public IP ranges in this JSON file:</p>
            <Code
                language='bash'
                code={`
https://ip-ranges.amazonaws.com/ip-ranges.json
`}
            />
            <p className="mt-1">So I attempted the next workaround:</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Fetch AWS public IP ranges</li>
                <li>Filter only the CIDR blocks for my AWS region</li>
                <li>Include services related to Amplify backend activity, especially:
                    <ul className="list-[circle] ml-6 space-y-1">
                        <li>CODEBUILD</li>
                    </ul>
                </li>
            </ul>

            <p>
                Then I added those CIDRs into GitHub organization IP allow list.
            </p>

            <br />

            <p className="text-2xl font-semibold">
                Why CODEBUILD alone was not enough ?
            </p>

            <p className="mt-2">
                Initially, it is tempting to assume that only CodeBuild IP ranges are needed because Amplify uses CodeBuild behind the scenes.
            </p>
            <p className="mt-2">
                That assumption turned out to be incomplete.
            </p>
            <p className="mt-2">Even after adding those ranges, the deployments still failed.</p>
            <p className="mt-2">This is where public documentation became insufficient. I could not find a clear answer in GitHub docs, AWS docs, GitHub issues, or forum discussions that precisely documented the required allow list behavior for Amplify with GitHub org IP restrictions.</p>
            <p>That is why I reached out to AWS Support.</p>
            <br />

            <p className="text-2xl font-semibold">
                What AWS Support confirmed
            </p>

            <p className="mt-2">
                AWS Support responded with an important clarification:
            </p>

            <p className="mt-2 mb-2 font-bold">
                This is a known limitation - AWS Amplify Hosting does not currently publish static IP address ranges for GitHub repository access.
            </p>
            <p className="mt-2">
                They also referenced an active feature request being tracked by the Amplify team.
            </p>
            <p className="mt-2">AWS Support further confirmed that they had tested and reproduced the same issue on their side using a sample app with GitHub organization IP allow listing enabled.
            </p>
            <p className="mt-2">Their conclusion was:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    Amplify GitHub access does not use a dedicated static allow list
                </li>
                <li>
                    AWS Amplify GitHub App does not have fixed published IPs
                </li>
                <li>
                    This is by design
                </li>
                <li>
                    Allow listing CodeBuild IPs alone is not sufficient
                </li>
                <li>
                    Additional IP ranges are required
                </li>

            </ul>
            <p className="mt-2">
                According to the update from the Amplify service team, the practical workaround was to allow list IP ranges for both:
            </p>
            <ul className="list-disc ml-6 space-y-1 mt-1 mb-2">
                <li><strong>EC2</strong></li>
                <li><strong>CODEBUILD</strong></li>
            </ul>
            <p className="mt-2">
                For the relevant AWS region
            </p>
            <p className="mt-2">After doing that, Amplify deployments could work with GitHub organization IP restrictions in place.</p>
            <br />

            <p className="text-2xl font-semibold">
                Why this is frustrating
            </p>

            <p className="mt-2">
                This is the core problem:
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    GitHub organization IP allow list requires explicit approved IP ranges
                </li>
                <li>

                    AWS Amplify does not publish a static set of GitHub-access IPs
                </li>
                <li>

                    GitHub App bypass may still not solve the issue in all scenarios
                </li>
                <li>
                    Amplify is serverless, so there is no single source IP to whitelist
                </li>
                <li>

                    AWS Support cannot provide a guaranteed “shortlist” of required CIDRs
                </li>
            </ul>
            <p className="mt-2"><strong>AWS Support also clarified that even if someone tries to reduce the list to a smaller subset, they cannot guarantee uninterrupted service, because Amplify may use other IPs later and GitHub requests could start failing again.</strong></p>
            <p className="mt-2">So I thought that their workaround is not pretty, but it is better than opening access to the entire internet</p>
            <br />

            <p className="text-2xl font-semibold">
                The working solution
            </p>
            <p className="mt-2">Since there were too many EC2 and CodeBuild CIDRs to enter manually, I wrote a script that:</p>
            <ul className="list-decimal ml-6 space-y-1 mb-2">
                <li>Fetches AWS public IP ranges.</li>
                <li>Filters EC2 and CODEBUILD CIDRs for the required region.</li>
                <li>Uses the GitHub API to insert those entries automatically into the organization IP allow list.</li>
            </ul>
            <p>This removed the need to create the entries one by one.</p>
            <p className="mt-2">Before running the script, you need a GitHub token with the required permissions to manage organization settings.</p>
            <img
                className="max-h-[600px] w-full mx-auto rounded-lg mb-4"
                src="https://cdn.staropstech.com/starops/Blogs/Ampliy_Deployment_Break/Amplify_2.png"
                alt="AWS Amplify GitHub IP Allow List Issue"
            />
            <br />
            <p className="text-2xl font-semibold">Script to add AWS EC2 and CodeBuild IP ranges to GitHub organization IP allow list</p>
            <Code
                language='bash'
                code={`
#!/bin/bash

# Usage: GITHUB_TOKEN=<your_token> ./add-ips-to-github.sh
ORG="your-org-name"
TOKEN="you-github-token"

if [ -z "$TOKEN" ]; then
  echo "Error: Set GITHUB_TOKEN env variable"
  exit 1
fi

# Get the org node ID
ORG_NODE_ID=$(curl -s \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/orgs/$ORG | jq -r '.node_id')

echo "Org node ID: $ORG_NODE_ID"

# Remove all existing IP allow list entries
# echo "Removing existing IP allow list entries..."
# while true; do
#   ENTRIES=$(curl -s -X POST \
#     -H "Authorization: Bearer $TOKEN" \
#     -H "Content-Type: application/json" \
#     https://api.github.com/graphql \
#     -d "{\"query\":\"{ organization(login: \\\"$ORG\\\") { ipAllowListEntries(first: 100) { nodes { id allowListValue } } } }\"}") 
#   IDS=($(echo "$ENTRIES" | jq -r '.data.organization.ipAllowListEntries.nodes[].id'))
#   [ \${#IDS[@]} -eq 0 ] && break
#   DELETED=0
#   for ID in "\${IDS[@]}"; do
#     VALUE=$(echo "$ENTRIES" | jq -r ".data.organization.ipAllowListEntries.nodes[] | select(.id==\"$ID\") | .allowListValue")
#     echo -n "Removing $VALUE ... "
#     DEL=$(curl -s -X POST \
#       -H "Authorization: Bearer $TOKEN" \
#       -H "Content-Type: application/json" \
#       https://api.github.com/graphql \
#       -d "{\"query\":\"mutation { deleteIpAllowListEntry(input: { ipAllowListEntryId: \\\"$ID\\\" }) { ipAllowListEntry { allowListValue } } }\"}") 
#     if echo "$DEL" | grep -q "allowListValue"; then
#       echo "OK"
#       DELETED=$((DELETED + 1))
#     else
#       echo "SKIPPED: $(echo $DEL | jq -r '.errors[0].message // "unknown error"')"
#     fi
#   done
#   [ $DELETED -eq 0 ] && break
# done
# echo "Existing entries cleared."

REGION="your-aws-region"
AWS_IP_JSON=$(curl -s https://ip-ranges.amazonaws.com/ip-ranges.json)
IPS=($(echo "$AWS_IP_JSON" | 
  jq -r ".prefixes[] | select(.region==\"$REGION\" and (.service==\"CODEBUILD\" or .service==\"EC2\")) | .ip_prefix" | sort -u))

if [ \${#IPS[@]} -eq 0 ]; then
  echo "Error: No CODEBUILD IPs found for $REGION"
  exit 1
fi

echo "Found \${#IPS[@]} CODEBUILD IPs for $REGION"

for IP in "\${IPS[@]}"; do
  echo -n "Adding $IP ... "
  RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    https://api.github.com/graphql \
    -d "{\"query\":\"mutation { createIpAllowListEntry(input: { ownerId: \\\"$ORG_NODE_ID\\\", allowListValue: \\\"$IP\\\", name: \\\"AWS Amplify CODEBUILD $REGION\\\", isActive: true }) { ipAllowListEntry { allowListValue } } }\"}")
  
  if echo "$RESPONSE" | grep -q "allowListValue"; then
    echo "OK"
  else
    echo "FAILED: $(echo $RESPONSE | jq -r '.errors[0].message // .message // "unknown error"')"
  fi
done
`}
            />
            <br />
            <p className="font-semibold text-2xl ">
                What happened after running the script
            </p>

            <p className="mt-2">
                Once the script completed and all the relevant entries were added to the GitHub organization IP allow list, I retried both scenarios:
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Redeploying the current Amplify service</li>
                <li>Creating a new Amplify service</li>
            </ul>
            <p className="mt-2">This time, both worked successfully.</p>
            <p className="mt-2">That confirmed the workaround.</p>
            <br />
            <p className=" font-semibold text-2xl">Important limitation</p>
            <p className="mt-2">Even though this solution works, it comes with an operational downside:</p>
            <p className="mt-2">
                <strong>you may need to keep those AWS ranges updated over time.</strong>
            </p>
            <p className="mt-2">Why?</p>
            <p className="mt-2">
                Because AWS IP ranges can change, and Amplify does not guarantee a fixed shortlist of CIDRs that will always be used.
            </p>
            <p className="mt-2">
                I asked AWS Support whether there is a smaller guaranteed subset that could be allow listed instead of adding so many ranges.
            </p>
            <p className="mt-2">
                Their answer was effectively no.
            </p>
            <p className="mt-2 mb-2">
                <strong>They said they could not provide a reliable shortlist, because doing so would risk future service interruptions if Amplify used another IP range later.</strong>
            </p>
            <p>So the tradeoff becomes:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Either open GitHub too broadly</li>
                <li>Or maintain a larger set of AWS regional CIDRs for EC2 and CodeBuild</li>
            </ul>
            <p className="mt-2">
                From a security perspective, maintaining an AWS-only subset is still better than exposing access to the whole world.
            </p>
            <br />
            <p className="text-2xl font-semibold">
                Lessons learned
            </p>
            <p className="mt-2">There are a few key takeaways from this issue</p>
            <p className="mt-2 text-xl font-semibold">1. The IAM role error can be misleading</p>

            <p className="mt-2">The message:</p>

            <p className="mt-2">Unable to assume specified IAM Role</p>

            <p className="mt-2">Can send you in the wrong direction.</p>

            <p className="mt-2">In our case, the IAM role was not the real issue. The actual failure was caused by GitHub blocking Amplify’s access due to organization IP restrictions.</p>

            <p className="mt-2">So whenever this error appears right after enabling GitHub IP restrictions, check GitHub connectivity first.</p>

            <p className="mt-2 font-semibold text-xl">2."Allow GitHub Apps to bypass IP allow list” may not fully solve it</p>
            <p className="mt-2">It is still worth trying, but do not assume it will fix the issue in every Amplify setup.</p>

            <p className="mt-2 text-xl font-semibold">3. Amplify does not publish fixed GitHub-access IPs</p>
            <p className="mt-2">That is the central limitation.</p>
            <p className="mt-2">If your organization enforces GitHub IP allow lists, you must plan for this.</p>

            <p className="mt-2 text-xl font-semibold">4. CODEBUILD alone may not be enough</p>
            <p className="mt-2">According to AWS Support testing, EC2 and CodeBuild regional ranges both mattered in the working workaround.</p>

            <p className="mt-2 text-xl font-semibold">5. Automation is essential</p>
            <p className="mt-2">Manually adding dozens or hundreds of CIDRs to GitHub is painful and error-prone. If you adopt this workaround, automate it.</p>

            <br />

            <p className="text-2xl font-semibold">Recommended approach</p>
            <p className="mt-2">If you are using AWS Amplify with a GitHub organization that has IP allow list restrictions enabled, this is the most practical approach today:</p>
            <ul className="list-decimal ml-6 space-y-1">
                <li>
                    Verify the issue by temporarily relaxing the GitHub IP allow list
                </li>
                <li>
                    Confirm Amplify works once the restriction is removed
                </li>
                <li>
                    Try enabling GitHub Apps bypass
                </li>
                <li>
                    If that still fails, fetch AWS IP ranges for your region
                </li>
                <li>
                    Add both EC2 and CODEBUILD CIDRs to the GitHub organization IP allow list
                </li>
                <li>
                    Automate the allow list updates using a script
                </li>
                <li>
                    Periodically review the AWS IP range file for changes
                </li>
            </ul>
            <br />

            <p className="text-2xl font-semibold">Final thoughts</p>

            <p className="mt-2">
                This issue is not obvious, and current public documentation does not make the behavior clear enough.
            </p>

            <p className="mt-2">The confusing part is that everything looks healthy on the surface:</p>
            <ul className="list-disc ml-6 space-y-1 mb-2">
                <li>
                    Amplify is installed as a GitHub App
                </li>
                <li>
                    Repository permissions are correct
                </li>
                <li>
                    IAM roles are unchanged
                </li>
                <li>
                    Amplify itself is not misconfigured
                </li>
            </ul>
            <p>Yet deployment still fails because GitHub blocks the backend network path Amplify uses.</p>
            <p className="mt-2">The important reality is this:</p>

            <p className="mt-2"> <strong>AWS Amplify Hosting does not currently provide static published IPs for GitHub repository access.</strong></p>

            <p className="mt-2">Until AWS ships a better native solution, the most workable approach for teams that must enforce GitHub IP allow lists is to allow list the relevant AWS regional EC2 and CodeBuild CIDRs and automate the process as much as possible.</p>

            <p className="mt-2">Not perfect, but far better than opening access completely.</p>

            <br />

            <p className="text-2xl font-semibold">References</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>GitHub docs: Allowing access by GitHub Apps
                    <br />
                    <a href="https://docs.github.com/en/enterprise-cloud@latest/admin/configuring-settings/hardening-security-for-your-enterprise/restricting-network-traffic-to-your-enterprise-with-an-ip-allow-list#allowing-access-by-github-apps" target="_blank" rel="noopener noreferrer" className="text-blue-600">
                        https://docs.github.com/en/enterprise-cloud@latest/admin/configuring-settings/hardening-security-for-your-enterprise/restricting-network-traffic-to-your-enterprise-with-an-ip-allow-list#allowing-access-by-github-apps
                    </a>
                </li>
                <li>AWS Amplify Hosting issue
                    <br />
                    <a className="text-blue-600" href="https://github.com/aws-amplify/amplify-hosting/issues/3353" target="_blank" rel="noopener noreferrer">
                        https://github.com/aws-amplify/amplify-hosting/issues/3353
                    </a>
                </li>
                <li>AWS IP ranges documentation
                    <br />
                    <a className="text-blue-600" href="https://docs.aws.amazon.com/vpc/latest/userguide/aws-ip-ranges.html" target="_blank" rel="noopener noreferrer">
                        https://docs.aws.amazon.com/vpc/latest/userguide/aws-ip-ranges.html
                    </a>
                </li>
                <li>AWS Amplify GitHub setup docs
                    <br />
                    <a className="text-blue-600" href="https://docs.aws.amazon.com/amplify/latest/userguide/setting-up-GitHub-access.html" target="_blank" rel="noopener noreferrer">
                        https://docs.aws.amazon.com/amplify/latest/userguide/setting-up-GitHub-access.html
                    </a>
                </li>
                <li>AWS public IP ranges JSON
                    <br />
                    <a className="text-blue-600" href="https://ip-ranges.amazonaws.com/ip-ranges.json" target="_blank" rel="noopener noreferrer">
                        https://ip-ranges.amazonaws.com/ip-ranges.json
                    </a>
                </li>
                <li>Related Amplify discussion
                    <br />
                    <a className="text-blue-600" href="https://github.com/aws-amplify/amplify-hosting/issues/3634#issuecomment-1673944756" target="_blank" rel="noopener noreferrer">
                        https://github.com/aws-amplify/amplify-hosting/issues/3634#issuecomment-1673944756
                    </a>
                </li>
                <li>Related Gatsby issue
                    <br />
                    <a className="text-blue-600" href="https://github.com/gatsbyjs/gatsby/issues/17990" target="_blank" rel="noopener noreferrer">
                        https://github.com/gatsbyjs/gatsby/issues/17990
                    </a>
                </li>
                <li>AWS CodeBuild background reference
                    <br />
                    <a className="text-blue-600" href="https://aws.amazon.com/blogs/devops/extending-aws-codebuild-with-custom-build-environments/#:~:text=AWS%20CodeBuild%20is%20a%20fully,CodeBuild%20to%20use%20this%20environment." target="_blank" rel="noopener noreferrer">
                        https://aws.amazon.com/blogs/devops/extending-aws-codebuild-with-custom-build-environments/#:~:text=AWS%20CodeBuild%20is%20a%20fully,CodeBuild%20to%20use%20this%20environment.
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default FortyNine;