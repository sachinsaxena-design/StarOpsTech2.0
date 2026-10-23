import React from 'react'
import { Code } from '../../../utils/Helpers'

function SeventyTwo() {
    return (
        <>
            <img
                className="max-h-[700px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/pdb/PodDisruptionBudgets_KeepingPodsSafe.png"
                alt="Kubernetes PodDisruptionBudgets: The Safety Net Your Production Pods Need"
            />
            <h1 className='text-2xl font-semibold'>Kubernetes PodDisruptionBudgets: The Safety Net Your Production Pods Need</h1>
            <p className='mt-2'>
                Kubernetes makes it easy to run applications across multiple nodes. But running multiple replicas doesn't automatically mean your application is protected from downtime.
            </p>
            <p className='mt-2'>
                Imagine a production application running with 5 replicas. Everything looks healthy—until a node needs maintenance, a cluster upgrade begins, or Kubernetes needs to drain a node.
            </p>
            <p className='mt-2'>Suddenly, several pods can disappear at once.</p>
            <p className='mt-2'>This is where <strong>PodDisruptionBudget (PDB)</strong> becomes important.</p>
            <p className='mt-2'>A PDB lets you tell Kubernetes:</p>
            <p className='mt-2 ml-6'>“During planned disruptions, keep enough of my application running.”</p>
            <br />

            <h1 className='text-2xl font-semibold'>What Is a PodDisruptionBudget?</h1>
            <p className='mt-2'>
                A <strong>PodDisruptionBudget</strong> is a Kubernetes resource that limits how many replicas of an application can be voluntarily disrupted at the same time.
            </p>
            <p className='mt-2'>For example, suppose your application has:</p>
            <p className='mt-2'>replicas: 5</p>
            <p className='mt-2'>You might want at least 4 pods to remain available during maintenance.</p>
            <p className='mt-2'>You can define:</p>
            <Code language='yaml' code={`
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  minAvailable: 4
  selector:
    matchLabels:
      app: api
      `} />
            <p className='mt-2'>This tells Kubernetes:</p>
            <p className='mt-2 font-semibold'>At least 4 matching pods should remain available during voluntary disruptions.</p>
            <br />

            <h1 className='text-2xl font-semibold'>Voluntary vs. Involuntary Disruptions</h1>
            <p className='mt-2'>This distinction is extremely important.</p>
            <br />
            <p className='text-xl font-semibold'>Voluntary disruptions</p>
            <p className='mt-2'>These are disruptions initiated intentionally by an administrator or Kubernetes components.</p>
            <p className='mt-2'>Examples include:</p>
            <ul className='ml-6 list-disc space-y-1'>
                <li>Node draining</li>
                <li>Cluster upgrades</li>
                <li>Node maintenance</li>
                <li>Voluntary pod eviction</li>
                <li>Certain autoscaling operations</li>
            </ul>
            <p className='mt-2'>PDBs are primarily designed to protect workloads from these situations.</p>
            <br />
            <p className='text-xl font-semibold'>Involuntary disruptions</p>
            <p className='mt-2'>These happen because something fails unexpectedly.</p>
            <p className='mt-2'>Examples:</p>
            <ul className='ml-6 list-disc space-y-1'>
                <li>Node crashes</li>
                <li>Hardware failure</li>
                <li>Out-of-memory conditions</li>
                <li>Kernel failures</li>
                <li>Network failures</li>
            </ul>
            <p className='mt-2'>A PDB <strong>cannot prevent these failures.</strong> </p>
            <p className='mt-2'>
                If a node suddenly disappears, Kubernetes cannot use a PDB to magically keep the pods running.
            </p>
            <p className='mt-2'>Instead, PDBs help control <strong>planned disruption</strong>.</p>
            <br />

            <h1 className='text-2xl font-semibold'>Why Replicas Alone Aren't Enough</h1>
            <p className='mt-2'>Consider this Deployment:</p>
            <Code language='yaml' code={`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 5
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: my-api:v1
`} />
            <p className='mt-2'>You have five replicas.</p>
            <p className='mt-2'>Now imagine two of those pods are running on a node that needs to be drained.</p>
            <p className='mt-2'>
                Without an appropriate disruption policy, multiple replicas could become unavailable during the operation.
            </p>
            <p className='mt-2'>The application might temporarily have only three healthy replicas.</p>
            <p className='mt-2'>If those pods are handling thousands of requests, the impact could be significant.</p>
            <p className='mt-2'>A PDB provides Kubernetes with a constraint around how many pods can be voluntarily evicted.</p>
            <br />

            <h1 className='text-2xl font-semibold'>minAvailable vs maxUnavailable</h1>
            <p className='mt-2'>There are two common ways to define a PDB.</p>
            <br />
            <p className='text-xl font-semibold'>Option 1: minAvailable</p>
            <p className='mt-2'>You specify the minimum number of pods that should remain available.</p>
            <Code language='yaml' code={`
spec:
  minAvailable: 4
`} />
            <p className='mt-2'>For five replicas:</p>
            <Code language='text' code={`
Total replicas     = 5
Minimum available  = 4
Allowed disruption = 1
`} />
            <p className='mt-2'>This is useful when you know the minimum capacity your application requires.</p>
            <br />
            <p className='text-xl font-semibold'>Option 2: maxUnavailable</p>
            <p className='mt-2'>Instead of specifying how many must remain available, you specify how many can be unavailable.</p>
            <Code language='yaml' code={`
spec:
  maxUnavailable: 1`} />
            <p className='mt-2'>For five replicas:</p>
            <Code language='text' code={`
Total replicas = 5
Maximum unavailable = 1`} />
            <p className='mt-2'>
                Both approaches can achieve similar results, but the right choice depends on how you want to express your availability requirement.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>A More Production-Friendly Example</h1>
            <p className='mt-2'>Suppose we have a frontend application with 10 replicas.</p>
            <Code language='yaml' code={`
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: frontend-pdb
spec:
  maxUnavailable: 1
  selector:
    matchLabels:
      app: frontend
`} />
            <p className='mt-2'>
                Now Kubernetes can voluntarily disrupt at most one matching pod at a time while respecting the budget.
            </p>
            <p className='mt-2'>During a node maintenance operation:</p>
            <Code language='text' code={`
Before maintenance

Node 1 → frontend
Node 2 → frontend
Node 3 → frontend
Node 4 → frontend
...
             ↓
        Node maintenance
             ↓
     Kubernetes checks PDB
             ↓
   Is disruption allowed?
        /           \\
      Yes            No
       ↓              ↓
   Evict pod       Wait  
`} />
            <p className='mt-2'>This is especially useful during cluster maintenance and upgrades.</p>
            <br />

            <h1 className='text-2xl font-semibold'>PDB Does Not Mean "Always Available"</h1>
            <p className='mt-2'>This is a common misconception.</p>
            <p className='mt-2'>A PDB does not guarantee that your application will always have the specified number of healthy pods.</p>
            <p className='mt-2'>It only places restrictions on voluntary disruptions.</p>
            <p className='mt-2'>For example:</p>
            <Code language='yaml' code={`
minAvailable: 3
`} />
            <p className='mt-2'>doesn't mean Kubernetes guarantees three healthy pods under every possible failure.</p>
            <p className='mt-2'>
                If all three pods are running on a node that suddenly crashes, the PDB cannot prevent the outage.
            </p>
            <p className='mt-2'>This is why PDBs should be combined with good Kubernetes architecture.</p>
            <br />

            <h1 className='text-2xl font-semibold'>PDB + Pod Anti-Affinity</h1>
            <p className='mt-2'>One of the biggest improvements you can make is to avoid putting all replicas on the same node.</p>
            <p className='mt-2'>For example:</p>
            <Code language='yaml' code={`affinity:
  podAntiAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          topologyKey: kubernetes.io/hostname
          labelSelector:
            matchLabels:
              app: api`} />
            <p className='mt-2'>Now Kubernetes prefers spreading replicas across different nodes.</p>
            <p className='mt-2'>Instead of:</p>
            <Code language='text' code={`
Node 1
 ├── API
 ├── API
 ├── API
 └── API`} />
            <p className='mt-2'>you ideally want something closer to:</p>
            <Code language='text' code={`
Node 1       Node 2       Node 3
  │            │            │
 API          API          API
 API          API          API`} />
            <p className='mt-2'>Now a single node failure doesn't necessarily take down the entire application.</p>
            <br />

            <h1 className='text-2xl font-semibold'>PDB + Readiness Probes</h1>
            <p className='mt-2'>Another important piece is the readiness probe.</p>
            <p className='mt-2'>Consider:</p>
            <Code language='yaml' code={`
readinessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
`} />
            <p className='mt-2'>The readiness probe tells Kubernetes whether a pod is actually ready to receive traffic.</p>
            <p className='mt-2'>This matters because a pod can be:</p>
            <Code language='text' code={`
Running ≠ Ready
`} />
            <p className='mt-2'>
                A container being in the Running state doesn't necessarily mean the application is ready to serve production traffic.
            </p>
            <p className='mt-2'>Combining:</p>
            <Code language='text' code={`
Readiness Probe + PDB + Multiple Replicas
`} />
            <p className='mt-2'>provides much better protection during planned maintenance.</p>
            <br />

            <h1 className='text-2xl font-semibold'>A Common Production Mistake</h1>
            <p className='mt-2'>One of the easiest mistakes is creating a PDB that is too restrictive.</p>
            <p className='mt-2'>For example:</p>
            <Code language='yaml' code={`
replicas: 3
`} />
            <p className='mt-2'>and:</p>
            <Code language='yaml' code={`
minAvailable: 3
`} />
            <p className='mt-2'>Now:</p>
            <Code language='text' code={`
Running replicas = 3
Required         = 3
Allowed disruption = 0
`} />
            <p className='mt-2'>
                A node drain may get stuck because Kubernetes cannot voluntarily evict any of those pods without violating the PDB.
            </p>
            <p className='mt-2'>The opposite mistake is making the budget too permissive:</p>
            <Code language='yaml' code={`
maxUnavailable: 3
`} />
            <p className='mt-2'>
                For a three-replica application, this provides little protection against simultaneous voluntary disruption.
            </p>
            <p className='mt-2'>The PDB should reflect the actual availability requirement of the application.</p>
            <br />

            <h1 className='text-2xl font-semibold'>Don't Forget Cluster Capacity</h1>
            <p className='mt-2'>There is another important consideration.</p>
            <p className='mt-2'>Suppose you have:</p>
            <Code language='text' code={`
3 replicas
3 nodes`} />
            <p className='mt-2'>and:</p>
            <Code language='yaml' code={`
minAvailable: 2
`} />
            <p className='mt-2'>The PDB allows one pod to be disrupted.</p>
            <p className='mt-2'>But where will the evicted pod go?</p>
            <p className='mt-2'>If the remaining nodes don't have enough CPU or memory, the replacement pod may remain:</p>
            <Code language='text' code={`
Pending
`} />
            <p className='mt-2'>So PDBs don't replace capacity planning.</p>
            <p className='mt-2'>A production Kubernetes environment needs all of these pieces working together:</p>
            <Code language='text' code={`
                Kubernetes Availability
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
   Replicas            PDB          Pod Distribution
       │                 │                 │
       └─────────────────┼─────────────────┘
                         │
                  Readiness Probes
                         │
                  Cluster Capacity
`} />
            <br />

            <h1 className='text-2xl font-semibold'>How to Check a PDB</h1>
            <p className='mt-2'>You can inspect PDBs with:</p>
            <Code language='bash' code={`
kubectl get pdb
`} />
            <p className='mt-2'>For more details:</p>
            <Code language='bash' code={`
kubectl describe pdb frontend-pdb
`} />
            <p className='mt-2'>You may see information such as:</p>
            <Code language='text' code={`
Min available: 9
Allowed disruptions: 1
Current: 10
Desired: 9
`} />
            <p className='mt-2'>The key field to watch is:</p>
            <Code language='text' code={`
Allowed disruptions
                `} />
            <p >If it is:</p>
            <Code language='text' code={`
0
`} />
            <p className='mt-2'>
                Kubernetes currently cannot voluntarily disrupt another matching pod without violating the budget.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>A Practical Production Checklist</h1>
            <p className='mt-2'>Before deploying a critical Kubernetes workload, consider:</p>
            <ul className='ml-6 list-disc space-y-1'>
                <li>Multiple replicas configured</li>
                <li>Readiness probe configured</li>
                <li>Liveness/startup probes where appropriate</li>
                <li>PDB configured</li>
                <li>Pods distributed across nodes/zones</li>
                <li>Adequate CPU and memory capacity</li>
                <li>Requests and limits configured appropriately</li>
                <li>Rolling update strategy reviewed</li>
                <li>Application tested during node drain</li>
                <li>PDB behavior tested during cluster upgrades</li>
            </ul>
            <p className='mt-2'>You can test your assumptions with:</p>
            <p className='mt-2'>You can test your assumptions with:</p>
            <Code language='bash' code={`
kubectl drain <node-name> --ignore-daemonsets
`} />
            <p >and observe how Kubernetes handles the workload.</p>
            <br />

            <h1 className='text-2xl font-semibold'>The Bigger Picture</h1>
            <p className='mt-2'>
                Kubernetes gives you the building blocks for highly available applications, but simply running your application inside Kubernetes doesn't automatically make it highly available.
            </p>
            <p className='mt-2'>A resilient workload usually requires several layers:</p>
            <Code language='text' code={`                   Application
                         │
                ┌────────┴────────┐
                │                 │
             Replicas         Readiness
                │                 │
                └────────┬────────┘
                         │
                        PDB
                         │
                Pod Distribution
                         │
                  Cluster Capacity
                         │
                     Kubernetes`} />
            <p className='mt-2'>A PodDisruptionBudget is not a complete high-availability strategy.</p>
            <p className='mt-2'>
                It is one piece of the puzzle that helps Kubernetes perform planned maintenance without unnecessarily sacrificing application availability.
            </p>
            <p className='mt-2'>And in production, that's often the difference between:</p>
            <p className='mt-2'>“We're doing maintenance.”</p>
            <p className='mt-2'>and</p>
            <p className='mt-2'>“Why is production down?”</p>
        </>
    )
}

export default SeventyTwo