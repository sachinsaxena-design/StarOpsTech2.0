import { Code } from "../../../utils/Helpers";


const ThirtyThree = () => {
    return (
        <div>
            <p className="text-xl font-bold mb-4">
                Why You Should Use Functional Components Instead of Class Components in React
            </p>
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/Functional_Class_Components /National Technology Day - Made with PosterMyWall.jpg "
                alt=" Why You Should Use Functional Components Instead of Class Components in React"
            />
            <p>
                React has evolved dramatically since its introduction by Facebook in 2013. Early React applications were built mainly using class components, which allowed us to manage state and lifecycle methods. However, with the introduction of functional components and especially React Hooks in version 16.8 in 2019, the way we write components has completely changed.
            </p>
            <br />
            <p>
                As of now, functional components have become the standard and recommended way to write modern React applications. But why did this shift happen? What makes functional components better?
            </p>
            <br />
            <p>
                Let me explain the reasons behind this major evolution and understand why functional components are now the future of React development.
            </p>

            <br />
            <p className="font-semibold text-lg">1. Understanding Class & Functional Components</p>
            <p>
                Before diving into “why,” let’s briefly understand <strong>what</strong> each type of component is.
            </p>
            <p>
                <strong>Class Components:</strong> Class components are ES6 classes that extend from <code>React.Component</code>. They used to be the only way to handle <strong>state</strong> and <strong> lifecycle methods</strong> in React.
            </p>

            <Code
                language="bash"
                code={`import React, { Component } from "react";

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h2>Hello, {this.props.name}</h2>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment} > Increase </button>
      </div>
    )
  }
}

export default Welcome;`}
            />

            <br />
            <p>
                <strong>Functional Components:</strong> Functional components are plain JavaScript functions that return JSX. Initially, they were stateless, but with the introduction of <strong>Hooks</strong>, they can now manage state, handle side effects, and perform everything class components could — but more efficiently.
            </p>
            <Code
                language="bash"
                code=
                {`import React, { useState } from "react";

function Welcome({ name }) {
  const [count, setCount] = useState(0);
 
  return (
    <div>
      <h2>Hello, {name}</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase </button>
    </div>
  );
}

export default Welcome;`}
            />
            <br />
            <p className="font-semibold text-lg">2. Cleaner and Simpler Syntax</p>
            <p>
                One of the biggest advantages of functional components is simplicity. In class components, you often deal with <span className="text-red-600">this</span>, constructors, and method bindings, which can make the code verbose and confusing — especially for beginners. In functional components, you simply call <span className="text-red-600">useState</span> or <span className="text-red-600">useEffect</span> and write logic directly inside the function.
            </p>

            <p><strong>Functional Component Advantages:</strong></p>
            <ul className="list-disc ml-6 space-y-1">
                <li>No need to bind methods using <code>this</code> keyword.</li>
                <li>Easier to read and write.</li>
                <li>Code becomes more concise and maintainable.</li>
            </ul>

            <Code
                language="bash"
                code={`// Class Component
this.setState({ name: "Sachin" });

// Functional Component
setName("Sachin");`}
            />

            <p>It’s small differences like this that make your codebase <strong>less error-prone</strong> and <strong> more readable</strong>.</p>

            <br />
            <p className="font-semibold text-lg">3. React Hooks Changed Everything</p>
            <p>
                The introduction of <strong> React Hooks</strong> in 2019 was the turning point. Hooks allowed functional components to:
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Store and update state (<code>useState</code>)</li>
                <li>Handle side effects (<code>useEffect</code>)</li>
                <li>Access context (<code>useContext</code>)</li>
                <li>Optimize performance (<code>useMemo</code>, <code>useCallback</code>)</li>
                <li>Manage complex logic (<code>useReducer</code>, <code>useRef</code>)</li>
            </ul>

            <p>
                Hooks completely <strong>removed the limitations </strong> that functional components had earlier.

            </p>
            <p>
                <strong>Example– </strong> Before Hooks, you couldn’t use lifecycle methods like componentDidMount or componentWillUnmount in functional components. Now, with <code>useEffect</code>, you can do that easily:
            </p>
            <Code
                language="bash"
                code=
                {`useEffect(() => {
  console.log ("Component mounted!");
  return () => console.log ("Component unmounted!");
}, []);`}
            />

            <p>This level of power and simplicity made class components <strong>largely obsolete</strong> for new React projects.</p>

            <br />
            <p className="font-semibold text-lg">4. Easier Code Reusability with Custom Hooks</p>
            <p>
                Functional components enable developers to extract and reuse logic using <strong> custom hooks</strong> — something that’s very difficult to achieve with class components.
            </p>
            <p>For example, if you need to fetch data from an API in multiple components, instead of duplicating the logic, you can simply write one reusable hook:
            </p>

            <Code
                language="bash"
                code=
                {`import { useState, useEffect } from "react";
 
function useFetch(url) {
  const [data, setData] = useState(null);
 
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);
 
  return data;
}

export default useFetch;`}
            />

            <p>Now you can use it anywhere:</p>


            <Code 
                className='overflow-scroll w-full'
                language="bash"
                code={`
const users= useFetch (" https://localhost:3000/users/info ");
`}
            />

            <p>This makes your app more <strong>modular, testable, and reusable</strong>     — a major advantage over class-based components.</p>

            <br />
            <p className="font-semibold text-lg">5. Better Performance and Optimization</p>
            <p>
                Functional components are generally <strong>faster</strong> and <strong>lighter</strong> than class components.
            </p>
            <p>Why?</p>
            <p>
                because they don’t require the heavy structure of classes — like constructors or complex lifecycle methods.
            </p>
            <p>
                React also introduced <strong>React.memo()</strong>, which helps functional components avoid unnecessary re-renders. Combined with hooks like <span className="text-red-600">useCallback</span> and <span className="text-red-600">useMemo</span>, you can make your app perform significantly better with less boilerplate.
            </p>
            <Code
                language="bash"
                code=
                {`const Child = React.memo(({ value }) => {
  console.log("Child Rendered");
  return <p>{value}</p>;
});`}
            />

            <p>Using memoization ensures that the component re-renderss <strong>only when necessary</strong>, improving efficiency.</p>

            <p className="font-semibold text-lg">6. Easier Testing and Debugging</p>
            <p>
                Functional components are easier to test because:
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>They are pure functions (given the same input, they return the same output).</li>
                <li>No need to mock lifecycle methods.</li>
                <li>Hooks simplify side effects, making unit testing smoother.</li>
            </ul>

            <p>
                In class components, testing often required mocking internal methods or states, which was both tedious and error-prone.
            </p>

            <br />
            <p className="font-semibold text-lg">7. Alignment with Modern React and Future Updates</p>
            <p>
                React’s roadmap clearly shows that <strong>functional components are the future</strong>.
            </p>
            <br />
            <p>
                All new React features — like <strong>Concurrent Rendering, Server Components</strong>, and <strong>React Suspense</strong> — are primarily built around functional components and hooks.
            </p><br />
            <p>
                React’s documentation, examples, and even most third-party libraries now <strong>default to functional syntax</strong>.
            </p>
            <br />
            <p>
                This means learning and mastering functional components is not just an option — it’s essential for staying relevant in the React ecosystem.
            </p>

            <br />
            <p className="font-semibold text-lg">8. When Should You Still Use Class Components?</p>
            <p>
                While functional components dominate today, there are still a few legacy use cases where class components might appear:
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Working in <strong> older React codebases</strong>.</li>
                <li>Maintaining <strong> existing enterprise apps</strong> written before Hooks.</li>
                <li>Using <strong>libraries</strong> that still rely on class-based APIs (though this is rare now).</li>
            </ul>

            <p>
                However, for all ,<strong>new projects</strong>, React strongly recommends using <strong> functional components only</strong>.
            </p>

            <br />
            <p className="font-semibold text-lg">Conclusion</p>
            <p>
                The React ecosystem has evolved to make development more intuitive, modular, and efficient — and <strong> functional components are at the heart of that transformation</strong>.
            </p>
            <p>
                They provide:
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    Cleaner syntax.
                </li>
                <li>
                    Better performance.
                </li>
                <li>
                    Reusability via hooks.
                </li>
                <li>
                    Easier testing.
                </li>
                <li>
                    Long-term compatibility with React’s future.
                </li>
            </ul>
            <p>
                As a junior React developer, I’ve found that embracing functional components early helps me write modern, scalable, and maintainable applications. If you want to explore more about frontend development, stay tuned — there’s a lot more exciting stuff to learn!
            </p>
        </div >
    );
};

export default ThirtyThree;
