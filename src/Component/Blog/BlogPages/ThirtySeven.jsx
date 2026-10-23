import { Code } from "../../../utils/Helpers";

const ThirtySeven = () => {
    return (
        <div>
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/Why_Fetch_Axios/Fetch_Axios.jpg"
                alt="Why You Should Use Fetch Instead of Axios in Modern Browsers"
            />

            <p>
                For many years, Axios has been one of the most popular HTTP client libraries for JavaScript applications. Developers loved its simplified syntax, built-in JSON handling, interceptors, and broad browser support. However, the landscape of the modern web has changed dramatically. The Fetch API — once limited, unreliable, and inconsistent — has now matured into a powerful, modern, and fully standardized tool built directly into the browser.
            </p>

            <br />
            <p>
                Today’s browsers, frameworks, and runtimes are increasingly optimized around the Fetch standard — making it not only the recommended choice for web development but also the future of network communication in JavaScript.
            </p>
            <br />
            <p>
                In this comprehensive guide, I will explain six major reasons why, as developers, we should prefer the Fetch API over Axios in modern browsers. Each topic is thoroughly detailed to ensure clarity, understanding, and real-world relevance.
            </p>
            <br />
            <p className="font-semibold text-lg">1. Fetch Is Native and Requires Zero Dependencies</p>
            <p>
                One of the most compelling reasons to choose Fetch is its native availability. Unlike Axios, which requires installation and adds to your bundle size, Fetch is built directly into every modern browser and nearly all major JavaScript environments.
            </p>

            <p><strong>Why This Matters</strong></p>
            <p>Modern web development highly values:
            </p>
            <ul className="list-disc ml-6 space-y-1 ">
                <li>Smaller bundle size</li>
                <li>Faster loading</li>
                <li>Fewer dependencies</li>
                <li>Less vulnerability exposure</li>
            </ul>
            <p>When we use Axios, our project brings in additional kilobytes of bundled code. While this may seem insignificant on its own, combining it with multiple other libraries can gradually increase the overall bundle size and negatively impact performance.</p>
            <ul className="list-disc ml-6 space-y-1 ">
                <li>Initial page load</li>
                <li>JavaScript parsing</li>
                <li>Script execution</li>
            </ul>
            <p><strong>With Fetch:</strong></p>
            <ul className="list-disc ml-6 space-y-1 ">
                <li>There is <strong>no installation</strong></li>
                <li><strong>No import required</strong></li>
                <li><strong>No package maintenance</strong></li>
                <li><strong>No dependency conflicts</strong></li>
            </ul>
            <p>Using the platform’s built-in capabilities always improves long-term stability.</p>

            <p><strong>Impact on Security</strong></p>
            <p>Every external library introduces:</p>
            <ul className="list-disc ml-6 space-y-1 ">
                <li>Potential security vulnerabilities</li>
                <li>Outdated dependencies</li>
                <li>Possible breaking changes in updates</li>
            </ul>
            <p>By using native APIs, you eliminate these risks.</p>
            <br />
            <p><strong>Impact on Performance</strong></p>
            <p>Imagine a SaaS application used worldwide. A few kilobytes saved per request can:</p>
            <ul className="list-disc ml-6 space-y-1 ">
                <li>Reduce data usage</li>
                <li>Increase Lighthouse performance scores</li>
                <li>Improve Google search ranking</li>
            </ul>
            <p>Native Fetch = Zero cost</p>
            <br />
            <p className="font-semibold text-lg">2. Modern, Cleaner, and Standardized API</p>
            <p>
                Before Fetch existed, developers struggled with the <strong> XMLHttpRequest (XHR)</strong> API. Axios was created to simplify XHR and provide a more ergonomic interface.
            </p>
            <p>But today’s Fetch API is:</p>
            <ul className="list-disc ml-6 space-y-1 ">
                <li>Modern</li>
                <li>Promise-based</li>
                <li>Designed for async/await</li>
                <li>Fully aligned with web standards</li>
            </ul>
            <p>The syntax is cleaner, predictable, and future-proof.</p>
            <br />
            <p><strong>Axios Example:</strong></p>
            <Code
                language="bash"
                code={`axios.get('/api/users')
.then(response => console.log(response.data))
.catch(error => console.error(error));
`}
            />
            <p><strong>Fetch Example:</strong></p>
            <Code
                language="bash"
                code={`const response = await fetch('/api/users');
const data = await response.json();
console.log(data);
`}
            />
            <p>
                Fetch feels native,intuitive, and consistent with the rest of modern JavaScript.
            </p>
            <p><strong>Better Error Model</strong></p>
            <p>Axios automatically throws errors for non-2xx HTTP statuses.</p>
            <p>Fetch, however:</p>
            <ul className="list-disc ml-6 space-y-1 ">
                <li>Throws only on network errors (DNS failure, CORS issue)</li>
                <li>Allows you to manually decide what counts as an “error”</li>
            </ul>
            <p>This gives developers more control:</p>
            <Code language='bash'
                code={`const response = await fetch('/api/user');
if (!response.ok) {
throw new Error(\`Request failed:\${response.status}\`);
}`} />
            <p>This level of explicitness is preferred in robust applications where different HTTP codes mean different actions.</p>
            <br />

            <p><strong>No Abstraction Layer</strong></p>

            <p>Axios wraps the browser’s native implementation with its own abstraction.</p>

            <p>Fetch is the standard — meaning:</p>
            <ul className="list-disc ml-6 space-y-1 ">
                <li>You’re coding directly against the browser</li>
                <li>Documentation is universal across all browsers</li>
                <li>Behavior is predictable and future updates improve your app automatically</li>
            </ul>

            <br />

            <p className="font-semibold text-lg">3. Better Integration With Web Platform APIs</p>
            <p>
                The browser of today is not the browser of 2015. The modern web platform is filled with powerful APIs, all of which work seamlessly with Fetch
            </p>

            <p>Some Web APIs that integrate naturally with Fetch include:</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Service Workers</li>
                <li>Cache API</li>
                <li>Streams API</li>
                <li>ReadableStream / WritableStream</li>
                <li>AbortController</li>
                <li>Web Workers</li>
                <li>FormData</li>
                <li>Blob/File API</li>
                <li>Request & Response classes</li>
            </ul>
            <p>Axios, designed years before these APIs were mainstream, cannot match this level of integration.</p>
            <br />
            <p><strong>Example: Using Fetch in Service Workers</strong></p>
            Service Workers intercept network requests via the Fetch API itself:
            <Code
                language="bash"
                code={`self.addEventListener('fetch', event => {
event.respondWith(fetch(event.request));
});`}
            />

            <p>Axios cannot be used this way.</p>

            <p><strong>Accessing Request and Response Bodies</strong></p>
            <p>Fetch returns <strong>actual Response objects</strong>, giving you deep control:</p>
            <Code language='bash'
                code={`
const headers = response.headers.get('content-type');
`} />
            <p>You can clone responses, inspect streams, modify metadata — all impossible or limited with Axios.</p>

            <p><strong>Cache API Integration</strong></p>

            <p>Fetch allows native use of the Cache API:</p>

            <Code language='bash'
                code={`
const cache = await caches.open('v1');
await cache.put('/data', response.clone());
`} />

            <p>This is invaluable for:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Progressive Web Apps</li>
                <li>Offline functionality</li>
                <li>Edge computing</li>
            </ul>

            <p>Axios cannot store its own responses in the browser cache using platform APIs</p>
            <br />
            <p><strong>Why This Matters Today </strong></p>
            <p>Browsers have evolved beyond just rendering pages. They now</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Stream data</li>
                <li>Handle offline apps</li>
                <li>Process large files</li>
                <li>Run background sync tasks</li>
                <li>Optimize performance automatically</li>
            </ul>

            <p>Fetch is at the center of this ecosystem.</p>

            <br />
            <p className="font-semibold text-lg">4. Native Support for Streaming and Large Data</p>
            <p>
                One of the most powerful features of the modern Fetch API is native streaming support via the Streams API.
            </p>

            <p><strong>Streaming allows you to:</strong></p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Process data as it arrives</li>
                <li>Reduce memory usage</li>
                <li>Provide real-time user feedback</li>
                <li>Build AI-powered interfaces</li>
                <li>Handle large files efficiently</li>
            </ul>
            <p>Axios does not support browser streaming</p>
            <p><strong>Why Streaming Matters</strong></p>
            <p>Imagine these use cases:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>AI text being generated live</li>
                <li>Streaming logs from a server</li>
                <li>Rendering JSON line-by-line</li>
                <li>Watching video or audio chunks</li>
                <li>Loading a huge CSV without freezing the UI</li>
            </ul>

            <p>Fetch handles all of these smoothly.</p>

            <p><strong>Streaming Example</strong></p>
            <Code
                language="bash"
                code={`const response = await fetch('/stream');
const reader = response.body.getReader();

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  console.log(new TextDecoder().decode(value));
}`}
            />

            <p>
                Axios would need the entire response before processing it — wasting memory and time.
            </p>

            <p>Better User Experience</p>
            <p>With streaming:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>UIs feel more responsive</li>
                <li>Loading screens are smoother</li>
                <li>Users see content sooner</li>
                <li>Large files don’t crash devices</li>
            </ul>
            <p>Modern frontend frameworks depend on streaming APIs. Axios is not built for this ecosystem.</p>
            <br />
            <p className="font-semibold text-lg">5. Official AbortController for Canceling Requests</p>
            <p>
                Canceling requests is extremely important in modern applications, especially in:

            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>React Apps</li>
                <li>Serach Bars</li>
                <li>Auti-Complete Suggestions</li>
                <li>SPA Navigation</li>
                <li>Mobile apps with unstable network</li>
            </ul>
            <br />
            <p>Fetch provides  <strong>AbortController</strong>, a standardized API to cancel requests.</p>
            <p><strong>Fetch Cancellation Example</strong></p>
            <Code
                language="bash"
                code={`const controller = new AbortController();
fetch('/api/data', { signal: controller.signal });
controller.abort();`}
            />

            <p>
                <strong> Why It Matters</strong>
            </p>

            <p>Without cancellation:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Old requests may overwrite new results</li>
                <li>Race conditions occur</li>
                <li>Memory leaks happen</li>
                <li>Components unmount while requests are pending</li>
            </ul>
            <p>Axios supports cancellation, but via:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Custom cancel tokens</li>
                <li>Not part of web standards</li>
                <li>Different API than the browser’s expected approach</li>
            </ul>
            <br />
            <p>In modern frameworks (React, Next.js, Svelte), AbortController is default.</p>
            <Code language='bash'
                code={`useEffect(() => {
const controller = new AbortController();
fetch('/api/search?q=' + query, { signal: controller.signal });

return () => controller.abort();
}, [query]);`} />
            <p>Clean, predictable, recommended.</p>
            <br />

            <p className="font-semibold text-lg">6. Works Best in Modern Frameworks & Edge Runtimes</p>
            <p>
                The Fetch API has become the official standard not only in browsers but in nearly every modern JavaScript runtime:
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Next.js (Route Handlers, Server Actions, Middleware)</li>
                <li>Remix (Loaders & Actions)</li>
                <li>Cloudflare Workers</li>
                <li>Cloudflare Workers</li>
                <li>Deno</li>
                <li>Bun</li>
                <li>Astro</li>
                <li>SvelteKit</li>
                <li>Vercel Edge Functions</li>
                <li>Node.js 18+ (global fetch)</li>
            </ul>
            <br />
            <p>These environments do not support Axios natively.</p>
            <br />
            <p><strong>Fetch Is Universal</strong></p>
            <p>Whether you run:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    On the browser
                </li>
                <li>On the server</li>
                <li>On the edge</li>
                <li>In a worke</li>
            </ul>
            <Code
                language='bash'
                code={`                
fetch(url)
`} />

            <p>Axios cannot run in:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Cloudflare Workers</li>
                <li>Most edge runtimes</li>
                <li>Browser-based serverless functions</li>
            </ul>

            <p><strong>Example:Next.js Route Handler</strong></p>
            <Code
                language="bash"
                code={`export async function GET() {
  const res = await fetch('https://api.example.com/data');
  return Response.json(await res.json());
}`}
            />

            <p>Axios would not work in this environment because it relies on Node’s HTTP module — which doesn’t exist on the edge.</p>

            <br />
            <p className="font-semibold text-lg">Conclusion</p>
            <p>
                The Fetch API has evolved to make web development more efficient, modular, and aligned with modern standards — and it’s quickly becoming the default choice for handling HTTP requests in modern browsers
            </p>

            <p>It provides:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Zero dependencies and native browser support.</li>
                <li>Cleaner, promise-based syntax.</li>
                <li>Powerful integration with browser APIs like Streams, Service Workers, and AbortController.</li>
                <li>Better performance and lightweight footprint.</li>
                <li>Compatibility with modern frameworks and edge runtimes.</li>
            </ul>

            <p>
                As a frontend developer, I’ve found that embracing Fetch early helps me write cleaner, more maintainable, and future-proof applications. If you want to explore more about modern web development, stay tuned — there’s a lot more exciting stuff to learn!
            </p>
        </div>
    );
};

export default ThirtySeven;
