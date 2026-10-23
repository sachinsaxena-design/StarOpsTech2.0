import React from "react";
import { Code } from "../../../utils/Helpers";

function SixtySeven() {
    return (
        <div>
            <img
                className="max-h-[700px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/Production_API_Outage/K8sIssue.png"
                alt="One Question Made Me Realize Git Isn't the Only Version Control System"
            />
            <p className='font-semibold text-xl'>How I would troubleshoot a production issue when Kubernetes, AWS, networking, and application layers are all involved</p>
            <p className='mt-2'>
                One of the biggest differences between a junior and an experienced DevOps engineer is not how many tools they know.
            </p>
            <p className='mt-2'>
                It is how they <strong>approach an unknown problem</strong> .
            </p>
            <p className='mt-2'>
                In production, you rarely get a message saying:
            </p>
            <p className="font-bold mt-2">
                "The Kubernetes pod has a memory leak. Restart it."
            </p>
            <p className='mt-2'>
                Instead, you get something like:
            </p>
            <p className="font-semibold mt-2">
                "The application is slow, users are getting 502 errors, and nobody knows why."
            </p>
            <p className='mt-2'>
                At that point, knowing Kubernetes, AWS, Terraform, Jenkins, Prometheus, Grafana, Elasticsearch, Nginx, and Linux individually is not enough.
            </p>
            <p className='mt-2'>
                You need a <strong>structured problem-solving methodology</strong> .
            </p>
            <p className='mt-2'>
                In this article, we'll walk through a realistic production incident and troubleshoot it step by step.
            </p>

            <p className="font-semibold text-2xl mt-2">
                The Production Scenario
            </p>

            <p className="mt-2">
                Imagine the following architecture:
            </p>

            <Code language="bash"
                code={`
                   Users
                      |
                  Route 53
                      |
                 Load Balancer
                      |
                 Ingress
                      |
                Kubernetes / EKS
                      |
             +--------+--------+
             |                 |
          Pod 1             Pod 2
             |                 |
             +--------+--------+
                      |
                  Backend API
                      |
                   Database
`}
            />

            <p className="mt-2">
                The application has been running normally for several weeks.
            </p>
            <p className="mt-2">
                Suddenly, users report:
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>API requests are taking <strong>10–20 seconds</strong></li>
                <li>Some requests return <strong>502 Bad Gateway</strong></li>
                <li>A few requests return <strong>504 Gateway Timeout</strong></li>
                <li>CPU doesn't appear extremely high</li>
                <li>Jenkins deployment was successful</li>
                <li>Kubernetes pods are technically <strong>Running</strong></li>
            </ul>

            <p className="mt-2">
                The first instinct might be:
            </p>
            <p className="font-semibold mt-2">
                "Restart the pods."
            </p>
            <p className="mt-2">
                But production troubleshooting should not begin with random actions.
            </p>
            <p className="mt-2">
                We need to <strong>find the evidence first</strong>.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 1: Define the Problem
            </p>

            <p className="mt-2">
                Before touching anything, I would clarify what exactly is failing.
            </p>
            <p className='font-semibold text-xl mt-2'>What exactly is failing?</p>
            <p className="mt-2">For example:</p>
            <p className='mt-3'>Error:</p>
            <p>502/504 responses</p>

            <p className='mt-3'>Impact:</p>
            <p>Production API</p>

            <p className='mt-3'>Start time:</p>
            <p>10:42 AM</p>

            <p className='mt-3'>Affected:</p>
            <p>Approximately 30% of requests</p>

            <p className='mt-3'>Recent changes:</p>
            <p>Deployment at 10:25 AM</p>

            <p className="mt-3">
                This immediately gives us a timeline.
            </p>
            <p className="mt-3">
                A useful incident statement would be:
            </p>
            <p className="font-semibold mt-2">
                "Since 10:42 AM, production API latency has increased significantly and approximately 30% of requests are returning 502/504 errors."
            </p>
            <p className="mt-2 font-semibold    ">
                This is much better than:
            </p>
            <p className="font-semibold mt-2">
                "Production is slow."
            </p>
            <p className="mt-2">
                The first rule of troubleshooting is:
            </p>
            <p className='font-semibold'>
                Turn a vague complaint into a measurable problem.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 2: Check the Monitoring Dashboard
            </p>

            <p className="mt-2"> My first technical step would be to check the monitoring system. </p>
            <p className='mt-2'>For example, using:</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Prometheus</li>
                <li>Grafana</li>
                <li>CloudWatch</li>
                <li>Load Balancer metrics</li>
            </ul>
            <p className="mt-2">I would look at:</p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Request Rate</li>
                <li>Error Rate</li>
                <li>Latency</li>
                <li>CPU</li>
                <li>Memory</li>
                <li>Pod Restarts</li>
                <li>Network</li>
                <li>Disk</li>
                <li>Database Connections</li>
            </ul>

            <p className="mt-2">Suppose Grafana shows:</p>

            <Code language="bash"
                code={`
Request rate:       Normal
CPU:                45%
Memory:             62%
Pod restarts:       0
HTTP 5xx:           ↑
Latency:            ↑↑
`}
            />

            <p className="mt-2">
                This is interesting.
            </p>
            <p className="mt-2">
                The application isn't CPU-bound.
            </p>
            <p className="mt-2">
                There are no obvious pod crashes.
            </p>
            <p className="mt-2">
                So immediately restarting the pods doesn't make much sense.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 3: Check Whether the Problem Is Application-Specific
            </p>

            <p className="mt-2">
                Next, I would compare different API endpoints.
            </p>

            <Code language="bash"
                code={`
GET /health       → 20ms
GET /users        → 120ms
GET /orders       → 15s
GET /products     → 80ms
`}
            />

            <p className="mt-2">
                Now we have a major clue. The entire application isn't necessarily slow. The <span className='text-green-600'>/orders</span> endpoint is the problem.
            </p>
            <p className="mt-2">
                This changes the investigation completely. Instead of troubleshooting
            </p>
            <Code language="bash" code={`                AWS 
                 ↓ 
            Load Balancer 
                 ↓ 
             Kubernetes 
                 ↓ 
              All Pods`} />
            <p>
                we can start focusing on:
            </p>
            <Code language="bash" code={`                /orders 
                 ↓
          Application logic 
                 ↓ 
        Database / external dependency      `} />
            <p className="mt-2">
                This is an important DevOps skill: reduce the search space.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 4: Check the Kubernetes Layer
            </p>

            <p className="mt-2">
                Now let's inspect the EKS environment.
            </p>

            <Code language="bash"
                code={`
kubectl get pods -n production
                    `}
            />

            <p className="mt-2">Suppose we get:</p>

            <Code language="bash"
                code={`
NAME                          READY   STATUS    RESTARTS
orders-api-7f8c9d7c6b-abc12  1/1     Running   0
orders-api-7f8c9d7c6b-def34  1/1     Running   0
orders-api-7f8c9d7c6b-ghi56  1/1     Running   0
`}
            />

            <p className="mt-2">Everything looks healthy. Next:</p>

            <Code language="bash"
                code={`
kubectl describe pod orders-api-7f8c9d7c6b-abc12 -n production
`}
            />

            <p className="mt-2">Check:</p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Events</li>
                <li>Readiness probes</li>
                <li>Liveness probes</li>
                <li>Resource limits</li>
                <li>Node placement</li>
                <li>Container state</li>
            </ul>

            <p className="mt-2">Then:</p>

            <Code language="bash"
                code={`  
kubectl top pods -n production
`}
            />

            <p className="mt-2">Suppose:</p>

            <Code language="bash"
                code={`
orders-api-abc12    CPU: 180m    MEMORY: 420Mi
orders-api-def34    CPU: 175m    MEMORY: 415Mi
orders-api-ghi56    CPU: 170m    MEMORY: 430Mi
`}
            />

            <p className="mt-2">
                Again, nothing immediately suspicious. So we don't have evidence that Kubernetes itself is the root cause.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 5: Check the Application Logs
            </p>

            <p className="mt-2">
                Now we move closer to the failing request.
            </p>

            <Code language="bash"
                code={`
kubectl logs orders-api-abc12 -n production
`}
            />

            <p className="mt-2">Suppose we find:</p>

            <Code language="bash"
                code={`
INFO Request received: GET /orders
INFO Fetching customer orders
WARN Database query taking longer than expected
WARN Database query taking longer than expected
ERROR Request timeout
`}
            />

            <p className="mt-2">
                Now we have another clue: the application is waiting for the database. But we still don't know why.
            </p>
            <p className="mt-2">
                This distinction is extremely important. The application log tells us where the request is waiting. It doesn't necessarily tell us why the dependency is slow.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 6: Check Database Connectivity
            </p>

            <p className="mt-2">
                From the application pod, test connectivity to the database.
            </p>

            <Code language="bash"
                code={`
kubectl exec -it orders-api-abc12 -n production -- sh
`}
            />

            <p className="mt-2">Then:</p>

            <Code language="bash"
                code={`
nc -zv <database-host> 5432
`}
            />

            <p className="mt-2">If connectivity is successful:</p>

            <Code language="bash"
                code={`
Connection to <database-host> 5432 port [tcp/postgresql] succeeded!
`}
            />

            <p className="mt-2">
                Then the problem isn't simply "the application cannot connect to the database." The connection works.
            </p>
            <p className="mt-2">
                The question becomes: why are database operations taking so long?
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 7: Investigate the Database
            </p>

            <p className="mt-2">
                Now check database metrics. Depending on the database, we might inspect:
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>CPU</li>
                <li>Memory</li>
                <li>Connection count</li>
                <li>Connection pool</li>
                <li>Disk I/O</li>
                <li>Read/write latency</li>
                <li>Locks</li>
                <li>Slow queries</li>
            </ul>

            <p className="mt-2">Suppose CloudWatch shows:</p>

            <Code language="bash"
                code={`
Database CPU:          38%
Connections:           95%
Max connections:       100
Read latency:          Normal
Write latency:         Normal
`}
            />

            <p className="mt-2">
                One metric immediately stands out: <span className='text-green-600'>Connections = 95 / 100</span>.
            </p>
            <p className="mt-2">
                The application is almost exhausting the database connection limit. This could explain why requests are waiting.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 8: Check Application Connection Pooling
            </p>

            <p className="mt-2">
                Now inspect the application configuration. Suppose the application has:
            </p>

            <Code language="bash"
                code={`
DB_POOL_SIZE=30
`}
            />

            <p className="mt-2">And we have:</p>

            <Code language="bash"
                code={`
3 Kubernetes pods × 30 connections
= 90 database connections
`}
            />

            <p className="mt-2">Add administrative connections and other services:</p>

            <Code language="bash"
                code={`
90 + 5 + 5
= ~100
`}
            />

            <p className="mt-2">
                We have potentially found the root cause. The application was scaled to three pods, but the database connection pool was configured as if only one or two instances existed.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 9: Why Did It Suddenly Start Happening?
            </p>

            <p className="mt-2">
                This is where experienced troubleshooting becomes important. We found a likely technical cause. But we should ask: why now?
            </p>
            <p className="mt-2">Let's check the deployment timeline. Suppose:</p>

            <Code language="bash"
                code={`
10:25 AM → New version deployed
10:30 AM → Traffic increased
10:42 AM → Latency increased
`}
            />

            <p className="mt-2">
                We compare the previous and current application configuration.
            </p>

            <p className="mt-2">Previous:</p>
            <Code language="bash" code={`
DB_POOL_SIZE=10
`} />

            <p className="mt-2">Current:</p>
            <Code language="bash" code={`
DB_POOL_SIZE=30
`} />

            <p className="mt-2">
                There is the smoking gun. The deployment increased the connection pool from 10 to 30.
            </p>
            <p className="mt-2">With three pods:</p>

            <p className="mt-2">Previous:</p>
            <Code language="bash" code={`
3 × 10 = 30 connections
`} />

            <p className="mt-2">Current:</p>
            <Code language="bash" code={`
3 × 30 = 90 connections
`} />

            <p className="mt-2">
                The application didn't necessarily have a CPU or memory problem. It had a resource coordination problem between Kubernetes and the database.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 10: Mitigate the Incident
            </p>

            <p className="mt-2">
                During a production incident, the priority is: restore service, then investigate deeply.
            </p>
            <p className="mt-2">
                If the new configuration caused the issue, the safest immediate mitigation could be rolling back.
            </p>

            <Code language="bash" code={`
kubectl rollout history deployment/orders-api -n production
`} />

            <p className="mt-2">Then:</p>

            <Code language="bash" code={`
kubectl rollout undo deployment/orders-api -n production
`} />

            <p className="mt-2">Monitor:</p>

            <Code language="bash" code={`
kubectl rollout status deployment/orders-api -n production
`} />

            <p className="mt-2">Then verify:</p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>HTTP 5xx ↓</li>
                <li>Latency ↓</li>
                <li>Database connections ↓</li>
                <li>Successful requests ↑</li>
            </ul>

            <p className="mt-2">
                The objective is not to prove your theory. The objective is to restore production safely.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 11: Verify the Fix
            </p>

            <p className="mt-2">
                After rollback, don't simply say "it works." Verify using multiple signals.
            </p>

            <p className="mt-2 font-semibold">Application</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Error rate → Normal</li>
                <li>Latency → Normal</li>
            </ul>

            <p className="mt-2 font-semibold">Kubernetes</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Pods → Healthy</li>
                <li>Restarts → 0</li>
                <li>Readiness → Passing</li>
            </ul>

            <p className="mt-2 font-semibold">Database</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Connections → 35</li>
                <li>CPU → Normal</li>
                <li>Query latency → Normal</li>
            </ul>

            <p className="mt-2 font-semibold">Load Balancer</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>HTTP 5xx → Normal</li>
                <li>Target response time → Normal</li>
            </ul>

            <p className="mt-2">
                This gives us confidence that the incident is actually resolved.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Step 12: Find the Root Cause
            </p>

            <p className="mt-2">
                A good incident investigation should go beyond "we rolled back the deployment." The root cause should explain the chain of events.
            </p>

            <Code language="bash"
                code={`
Configuration change
        ↓
DB connection pool increased
        ↓
Multiple Kubernetes replicas
        ↓
Total DB connections increased
        ↓
Database connection limit reached
        ↓
Requests waited for available connections
        ↓
API latency increased
        ↓
Load balancer generated 502/504
`}
            />

            <p className="mt-2">This is the real root-cause chain.</p>

            <br />

            <p className="font-semibold text-2xl">
                Step 13: Prevent the Problem From Happening Again
            </p>

            <p className="mt-2">
                This is where DevOps adds the most value.
            </p>

            <p className="mt-2 font-semibold">1. Validate Configuration Before Deployment</p>
            <p className="mt-2">
                Use CI/CD checks to detect dangerous configuration changes. For example, <strong>DB_POOL_SIZE, REPLICAS,</strong> and <strong>MAX_DATABASE_CONNECTIONS</strong> should be evaluated together.
            </p>

            <p className="mt-2 font-semibold">2. Calculate Capacity</p>
            <p className="mt-2">A simple formula can help:</p>
            <p className="mt-2 font-semibold">
                Maximum DB connections required = Number of application replicas × Connection pool size
            </p>
            <p className="mt-2">For example:</p>
            <Code language="bash"
                code={`
5 replicas × 20 connections
= 100 connections
`}
            />
            <p className="mt-2">
                If the database supports only 80 connections, the configuration is unsafe.
            </p>

            <p className="mt-2 font-semibold">3. Add Deployment Guardrails</p>
            <p className="mt-2">
                A production pipeline should not blindly deploy every configuration.
            </p>
            <Code language="bash"
                code={`
Developer
   ↓
Git
   ↓
Pull Request
   ↓
Terraform / Kubernetes validation
   ↓
Automated tests
   ↓
Security checks
   ↓
Approval
   ↓
Deployment
`}
            />
            <p className="mt-2">Configuration should be treated as code.</p>

            <p className="mt-2 font-semibold">4. Add Better Observability</p>
            <p className="mt-2">Instead of monitoring only CPU and memory, monitor:</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Request latency</li>
                <li>Error rate</li>
                <li>Database connections</li>
                <li>Connection pool usage</li>
                <li>Pod restarts</li>
                <li>Queue depth</li>
                <li>External API latency</li>
            </ul>
            <p className="mt-2">A dashboard should answer: what is broken? and preferably: where is it broken?</p>

            <p className="mt-2 font-semibold">5. Use Alerts Based on Symptoms</p>
            <p className="mt-2">Instead of only alerting <strong>CPU {'>'} 80%</strong>, also alert on:</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>HTTP 5xx {'>'} threshold</li>
                <li>Latency {'>'} threshold</li>
                <li>DB connections {'>'} 80%</li>
                <li>Connection pool saturation {'>'} threshold</li>
            </ul>
            <p className="mt-2">Because production problems don't always appear as high CPU.</p>

            <p className="mt-2 font-semibold">6. Improve CI/CD</p>
            <p className="mt-2">A mature deployment pipeline can include:</p>
            <Code language="bash"
                code={`
Build
 ↓
Unit Tests
 ↓
Security Scan
 ↓
Docker Build
 ↓
Image Scan
 ↓
Deploy to Dev
 ↓
Integration Tests
 ↓
Deploy to Stage
 ↓
Smoke Tests
 ↓
Approval
 ↓
Production
 ↓
Health Verification
`}
            />
            <p className="mt-2">
                For critical applications, add Canary Deployment or Blue-Green Deployment.
            </p>
            <p className="mt-2">
                This reduces the blast radius of configuration mistakes.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                The Most Important Lesson
            </p>

            <p className="mt-2">
                The biggest lesson from this incident isn't a Kubernetes command.
            </p>
            <p className="mt-2">It isn't an AWS command.</p>
            <p className="mt-2">It isn't a Prometheus query.</p>
            <p className="mt-2">It is the problem-solving process.</p>
            <p className="mt-2">
                A strong DevOps engineer doesn't immediately jump to:
            </p>
            <Code language="bash" code={`
kubectl delete pod
`} />
            <p className="mt-2">Instead, they ask:</p>

            <Code language="bash"
                code={`
What exactly is failing?
        ↓
When did it start?
        ↓
What changed?
        ↓
Which component is affected?
        ↓
Can I reproduce or measure it?
        ↓
What evidence supports my hypothesis?
        ↓
What is the safest mitigation?
        ↓
How do I verify recovery?
        ↓
How do I prevent recurrence?
`}
            />

            <br />

            <p className="font-semibold text-2xl">
                A Practical DevOps Troubleshooting Framework
            </p>

            <p className="mt-2">
                For production incidents, I like to think in these layers:
            </p>

            <Code language="bash"
                code={`
             INCIDENT
                  |
        +---------+---------+
        |                   |
      SYMPTOM             IMPACT
        |
        ↓
    TIMELINE
        |
        ↓
    RECENT CHANGES
        |
        ↓
    OBSERVABILITY
        |
   +----+----+----+
   |    |    |    |
  App  K8s  AWS  DB
   |    |    |    |
   +----+----+----+
        |
        ↓
    HYPOTHESIS
        |
        ↓
      TEST
        |
        ↓
    MITIGATION
        |
        ↓
    VERIFICATION
        |
        ↓
   ROOT CAUSE
        |
        ↓
   PREVENTION
`}
            />

            <p className="mt-2">
                This framework works across many production incidents.
            </p>
            <p className="mt-2">Whether the problem is Kubernetes, AWS, CI/CD, networking, database, Linux, application configuration, infrastructure, or monitoring, the underlying methodology remains similar.</p>

            <br />

            <p className="font-semibold text-2xl">
                Final Takeaway
            </p>

            <p className="mt-2">
                Production troubleshooting is not about guessing the right command.
            </p>
            <p className="mt-2">
                It is about following evidence.
            </p>
            <p className="mt-2 font-semibold ">
                Observe → Isolate → Hypothesize → Test → Mitigate → Verify → Prevent
            </p>
            <p className="mt-2">
                If you develop this mindset, you become much more effective—not only as a DevOps Engineer, but also as an SRE, Cloud Engineer, Platform Engineer, or Infrastructure Engineer.
            </p>
            <p className="mt-2">
                And when the 2 AM production alert arrives, you won't start by asking:
            </p>
            <p className="font-semibold  mt-2">
                "What command should I run?"
            </p>
            <p className="mt-2">
                You'll start by asking:
            </p>
            <p className="font-semibold  mt-2">
                "What evidence do I have, and what does it tell me?"
            </p>
        </div>
    );
}

export default SixtySeven;