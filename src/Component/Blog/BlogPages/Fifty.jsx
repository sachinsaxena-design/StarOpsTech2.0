import React from 'react'
import { Code } from '../../../utils/Helpers'
function Fifty() {
    return (
        <>
            <div>
                <img
                    className="max-h-[500px] w-full mx-auto rounded-lg"
                    src="https://cdn.staropstech.com/starops/Blogs/JS_Memory_leak/JS_Memory_Leak.jpg"
                    alt="Understanding Memory Leaks in JavaScript"
                />

                <p className="mt-4">
                    Memory leaks are one of the most overlooked yet critical issues in JavaScript applications. They silently degrade performance, slow down your app, and can even crash the browser if left unchecked.
                </p>

                <p className="mt-2 font-semibold">In this blog, I will break down:</p>

                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>What memory leaks are</li>
                    <li>Why they happen</li>
                    <li>Common causes</li>
                    <li>How to detect and fix them</li>
                </ul>

                <p className="font-semibold text-xl mt-8">What is a Memory Leak?</p>

                <p className="mt-2">
                    A memory leak occurs when memory that is no longer needed is not released, causing your application to consume more and more memory over time.
                </p>

                <p className="mt-2">
                    JavaScript has automatic garbage collection, but that doesn’t mean memory leaks can’t occur.
                </p>

                <p className="mt-2">
                    Garbage collector only removes memory when there are no references to it.
                </p>

                <p className="font-semibold text-xl mt-8">How JavaScript Memory Management Works</p>

                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Allocates memory when objects are created</li>
                    <li>Tracks references</li>
                    <li>Frees memory when objects are no longer reachable</li>
                </ul>

                <p className="mt-2">
                    If something still holds a reference, GC won’t clean it.
                </p>

                <p className="font-semibold text-xl mt-8">Common Causes of Memory Leaks</p>

                <p className="mt-4 font-semibold">1. Global Variables</p>

                <Code language='bash'
                    code=
                    {`
 let data = [];
 function addData() {
   data.push(new Array(1000000).fill("leak"));
 }`}
                />

                <p className="mt-2"><strong>Problem:</strong> data keeps growing and is never cleared.</p>
                <p className="mt-2"><strong>Fix:</strong> Avoid unnecessary globals, use scoped variables.</p>

                <p className="mt-6 font-semibold">2. Forgotten Timers & Intervals</p>

                <Code language='bash' code=
                    {`
 setInterval(() => {
  console.log("Running...");
}, 1000);`}
                />

                <p className="mt-2"><strong>Problem:</strong>The interval runs indefinitely, holding memory.</p>

                <Code language='bash'
                code=
                    {`
 const interval = setInterval(() => {
 console.log("Running...");
 }, 1000);
 clearInterval(interval);`}
                />

                <p className="mt-4 font-semibold">3. Event Listeners Not Removed</p>

                <Code language='bash' code=
                    {`
 button.addEventListener("click", handleClick);
 `}
                />

                <p className="mt-2"><strong>Problem:</strong> Listener remains after element removal → memory leak</p>

                <Code language='bash' code=
                    {`
 button.removeEventListener("click", handleClick);
`}
                />

                <p className="mt-4 font-semibold">4. Closures Holding References</p>

                <Code language='bash' code=
                    {`
 function outer() {
 let largeData = new Array(1000000).fill("data");
 return function inner() {
    console.log("Hello");
 };
}`}
                />

                <p className="mt-2"><strong>Problem:</strong> inner keeps reference to largeData</p>
                <p className="mt-2"><strong>Fix:</strong> Avoid unnecessary closures, nullify unused data</p>

                <p className="mt-6 font-semibold">5. Detached DOM Elements</p>

                <Code language='bash' code=
                    {`
 let element = document.getElementById("myDiv");
 element.remove();
`}
                />

                <p className="mt-2"><strong>Problem:</strong> Reference still exists → memory not freed</p>

                <Code language='bash' code=
                    {`
 element = null;
`}
                />

                <p className="font-semibold text-xl mt-4">How I Usually Detect Memory Leaks</p>

                <p className="mt-2 font-semibold">Chrome DevTools is my go-to</p>

                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Open DevTools → Memory tab</li>
                    <li>Take a Heap Snapshot</li>
                    <li>Interact with the app</li>
                    <li>Take another snapshot</li>
                </ul>

                <p className="mt-2">
                    If memory keeps increasing → something’s wrong
                </p>

                <p className="mt-4 font-semibold">Another quick trick</p>

                <Code language='bash' code=
                    {`
console.log(performance.memory);
`}
                />

                <p className="mt-2">
                    Not super detailed, but gives a rough idea if memory is growing.
                </p>

                <p className="font-semibold text-xl mt-8">Things I Follow Now to Avoid Leaks</p>

                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Don’t overuse global variables</li>
                    <li>Always clean up intervals and timeouts</li>
                    <li>Remove event listeners when not needed</li>
                    <li>Be careful with closures</li>
                    <li>Clear references to unused DOM elements</li>
                    <li>Use WeakMap / WeakSet when appropriate</li>
                </ul>

                <p className="font-semibold text-xl mt-8">Real Scenario I Faced</p>

                <p className="mt-2">
                    I once built a dashboard that fetched data every few seconds, stored responses in state, and added listeners dynamically—but I forgot cleanup.
                </p>

                <p className="mt-2">Result after ~30 minutes:</p>

                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Memory usage shot up</li>
                    <li>UI became sluggish</li>
                    <li>Tab crashed</li>
                </ul>

                <p className="mt-2">Fixing just 3 things solved it:</p>

                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Cleared intervals</li>
                    <li>Cleaned listeners</li>
                    <li>Stopped storing unnecessary data</li>
                </ul>

                <p className="font-semibold text-xl mt-8">Special Note for React Devs</p>

                <Code language='bash' 
                code={`
 useEffect(() => {
 const interval = setInterval(() => {
     console.log("running");
 }, 1000);

 return () => clearInterval(interval);
}, []);`}
                />

                <p className="mt-2">
                    That cleanup function is not optional—it’s necessary.
                </p>

                <p className="font-semibold text-xl mt-8">Conclusion</p>

                <p className="mt-2">
                    Memory leaks are not something you notice immediately, which is why they’re easy to ignore in the beginning. But over time, they can seriously impact your application’s performance and user experience.
                </p>

                <p className="mt-2">
                    From my experience, most leaks don’t happen because of complex logic—they happen because of small things we forget, like not clearing intervals or leaving event listeners behind.
                </p>

                <p className="mt-2">
                    The good part is, once you start being mindful about cleanup and how references work in JavaScript, avoiding memory leaks becomes much easier.
                </p>

                <p className="mt-2">
                    At the end of the day, writing code isn’t just about making features work—it’s also about making sure they continue to work efficiently over time.
                </p>

                <p className="mt-2 font-semibold">
                    Now, whenever I build something, I always think: “Am I cleaning up everything I create?”
                </p>
            </div>
        </>
    )
}

export default Fifty