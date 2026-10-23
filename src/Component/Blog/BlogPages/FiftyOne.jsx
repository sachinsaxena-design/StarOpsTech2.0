import React from 'react'
import { Code } from '../../../utils/Helpers'

function FiftyOne() {
    return (
        <>
        {/* This is Fifty-One Blog of StarOps */}
            <div>
                <img
                    className="max-h-[600px] w-full mx-auto rounded-lg"
                    src="https://cdn.staropstech.com/starops/Blogs/React_Work_behind_the_scenes/how_react_work_behind_the_scenes.jpg"
                    alt="How React Works Behind the Scenes"
                />

                <p className="mt-4">
                    When I first started using React, everything felt almost too easy:
                </p>
                <p>
                    I could:
                </p>
                <ul className="list-disc ml-6 mt-1 space-y-1">
                    <li>Create components</li>
                    <li>Manage state</li>
                    <li>See the UI update instantly</li>
                </ul>

                <p className="mt-4">
                    But after building a few projects, I started wondering:
                </p>

                <p className="mt-2 font-semibold">
                    How does React actually know what to update without reloading the whole page?
                </p>

                <p className="mt-2">
                    That curiosity pushed me to explore React <strong> beyond just syntax</strong>—and in this blog, I’ll share what I learned in a simple but detailed way.
                </p>

                <p className="font-semibold text-2xl mt-8">The Core Principle I Finally Understood</p>
                <p className='mt-2'>The most important concept that changed everything for me was:</p>
                <p className="mt-2 font-semibold">
                    UI = Function of State
                </p>
                <p className='mt-2'>This means</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>
                        The UI is just a representation of the current state. When the state changes, React re-renders the UI.
                    </li>
                    <li>
                        But React does NOT directly manipulate the DOM every time. It follows an optimized process.
                    </li>
                </ul>

                <p className="font-semibold text-2xl mt-8">Components: More Than Just UI Blocks</p>

                <p className="mt-2">
                    Initially, I thought components were just reusable UI pieces.
                </p>
                <p>
                    But internally, each component is:
                </p>

                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>A function that returns elements</li>
                    <li>Managed by React’s rendering engine</li>
                    <li>Part of a larger tree structure (Component Tree)</li>
                </ul>
                <p className='mt-2'>Example:</p>
                <Code
                    language="bash"
                    code={`
function App() {
  return <h1>Hello World</h1>;
}`}
                />
                <p>This looks simple, but React converts it into objects and builds a tree structure behind the scenes.</p>
                <br />
                <p className="font-semibold text-2xl ">What Actually Happens When State Changes?</p>
                <p>Let me walk through what I learned step-by-step.</p>
                <p>When I write:</p>
                <Code
                    language="bash"
                    code={`
const [count, setCount] = useState(0);
`}
                />
                <p className='mb-2'>and then call:</p>
                <Code
                    language="bash"
                    code={`
setCount(1);
`}
                />
                <p>Here’s what actually happens internally:</p>
                <p className="mt-2 font-semibold text-xl">Step 1: State Update is Scheduled</p>
                <p className="mt-2">React doesn’t immediately update the UI.</p>
                <ul className='list-disc space-y-1 ml-6'>
                    <li>It places the update in a queue and processes it shortly after in an optimized way.</li>
                </ul>

                <p className="mt-2 font-semibold text-xl">Step 2: Re-render is Triggered</p>
                <p className="mt-2">React re-runs the component function.</p>
                <ul className='list-disc space-y-1 ml-6'>
                    <li>This creates a new Virtual DOM tree.
                    </li>
                </ul>

                <p className="mt-2 font-semibold text-xl">Step 3: Diffing Starts</p>
                <p className="mt-2">React compares </p>
                <ul className='list-disc space-y-1 ml-6'>
                    <li>Old Virtual DOM</li>
                    <li>New Virtual DOM</li>
                </ul>
                <p className="mt-2">This process is called <strong>Reconciliation</strong>
                </p>

                <p className="mt-2 font-semibold text-xl">Step 4: Minimal Changes Applied</p>
                <p className="mt-2">React updates <strong>only the changed parts</strong> in the real DOM.This is why React is efficient.</p>

                <p className="font-semibold text-2  xl mt-8">Virtual DOM – What I Really Understood</p>

                <p className="mt-2">
                    At first,<strong> “Virtual DOM”</strong> sounded complex.
                </p>

                <p className="mt-2">
                    But I now think of it like:
                </p>
                <p className='ml-6'>A lightweight JavaScript representation of the real DOM React creates a lightweight copy of the real DOM</p>
                <p className='font-semibold'>Instead of doing this:</p>
                <ul className='list-disc space-y-1 ml-6'>
                    <li>Update real DOM directly (slow)</li>
                </ul>
                <p className='font-semibold'>React does:</p>
                <ul className='list-disc space-y-1 ml-6'>
                    <li>Update Virtual DOM → Compare → Apply minimal changes</li>
                </ul>
                <br />
                <p className="font-semibold text-2xl">Reconciliation – The Smart Comparison</p>
                <p>This is where React becomes powerful.</p>
                <p>React uses a <strong>diffing algorithm</strong> with some assumptions:</p>
                <p>Key Rules I Learned:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Different element types → replace completely</li>
                    <li>Same type → update only changed attributes</li>
                    <li>Lists → use keys to track items</li>
                </ul>
                <p className='mt-2'>For Example</p>
                <Code
                    language="bash"
                    code={`
<h1>Hello</h1>
`}
                />

                <p className="mt-2">Changes to:</p>

                <Code
                    language="bash"
                    code={`
<h1>Hello Sachin</h1>
`}
                />

                <p className="mt-2">
                    React only updates the text node, not the entire <span className='text-green-700'>{'<h1>'}</span>
                </p>
                <br />
                <p className="font-semibold text-2xl">Why “key” is Important (Something I Missed Earlier)</p>
                <p>When rendering lists:</p>
                <Code
                    language="bash"
                    code={`
items.map(item => <li key={item.id}>{item.name}</li>)
`}
                />

                <p className="mt-2">
                    Keys help React
                </p>
                <ul className='list-disc space-y-1 ml-6'>
                    <li>Identify which items changed</li>
                    <li>Avoid unnecessary re-renders</li>
                </ul>
                <p className="mt-2">
                    Without keys:
                </p>
                <ul className='list-disc space-y-1 ml-6'>
                    <li>Performance issues</li>
                    <li>Incorrect UI updates</li>
                </ul>
                <br />
                <p className="font-semibold text-2xl">Fiber Architecture – The Advanced Part I Explored</p>
                <p>When I dug deeper, I discovered <strong>React Fiber</strong>.</p>
                <p>This is React’s internal engine introduced to improve performance.</p>
                <p>What Fiber does:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Breaks rendering into small tasks</li>
                    <li>Allows pausing and resuming work</li>
                    <li>Prioritizes important  updates</li>
                </ul>
                <p>For example:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Typing in input → high priority</li>
                    <li>Rendering large list → low priority</li>
                </ul>
                <p>This is why React apps feel smooth even under heavy load</p>
                <br />
                <p className="font-semibold text-2xl "> Rendering Phases – My Clear Understanding</p>
                <p>React works in two main phases:</p>

                <ul className="list-decimal ml-6 mt-2 space-y-1">
                    <li>Render Phase (Can be interrupted)
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>Calculates changes</li>
                            <li>Builds Virtual DOM</li>
                            <li>Runs component functions</li>
                        </ul>
                    </li>
                    <li>Commit Phase (Cannot be interrupted)
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>Updates real DOM</li>
                            <li>Runs lifecycle methods</li>
                            <li>Applies changes</li>
                        </ul>
                    </li>
                </ul>
                <br />
                <p className="font-semibold text-2xl">JSX – What’s Really Happening</p>
                <p>I used to think JSX was something magical.</p>
                <p>But actually, this:</p>
                <Code
                    language="bash"
                    code={`
<h1>Hello</h1>
`}
                />

                <p className="mt-2">Gets converted into:</p>

                <Code
                    language="bash"
                    code={`
React.createElement("h1", null, "Hello");
`}
                />
                <p>So React works with objects, not HTML</p>
                <br />
                <p className="font-semibold text-2xl ">Hooks – Internal Behavior</p>
                <p>Hooks felt confusing at first.</p>
                <p>But internally, React:</p>

                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Stores hook values in an array</li>
                    <li>Tracks them by call order</li>
                </ul>
                <p className='mt-2'>That’s why:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Hooks must be called in the same order</li>
                    <li>Cannot be used conditionally</li>
                </ul>
                <Code language='bash'
                    code={`
useState()
useEffect()
`} />
                <p className="font-semibold text-2xl">Why React is Fast (My Final Understanding)</p>
                <p>After learning all this, I realized React is fast because:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Virtual DOM minimizes real DOM operations</li>
                    <li>Efficient diffing algorithm</li>
                    <li>Fiber enables scheduling</li>
                    <li>Batch updates reduce unnecessary renders</li>
                </ul>
                <br />
                <p className='font-semibold text-2xl'>My Final Mental Model</p>
                <p>Now I think of React like this</p>
                <p>State changes</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Component re-runs</li>
                    <li>New Virtual DOM created</li>
                    <li>Compared with old</li>
                    <li>Only differences updated</li>
                </ul>
                <br />
                <p className="font-semibold text-2xl">Conclusion</p>

                <p className="mt-2">
                    For me, React became much more powerful once I understood what’s happening behind the scenes.
                </p>

                <p className="mt-2">
                    If you’re learning React, don’t stop at syntax—explore the internals.
That’s where real understanding begins.

                </p>
            </div>
        </>
    )
}

export default FiftyOne