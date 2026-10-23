import React from 'react'
import { Code } from '../../../utils/Helpers'

function FiftySix() {
    return (
        <>
            <img
                className="max-h-[600px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/Browser_Storage_Guide/LocalStorage_VS_SessionStorage.jpg"
                alt="Homelab Push Notifications Using Uptime Kuma and Pushover"
            />
            <br />
            <p>
                While building web applications, I often come across situations where I need to store some data in the user's browser. It could be something as simple as remembering the selected theme, keeping items in a shopping cart, or preserving form data when the page refreshes.
            </p>
            <p>
                Earlier, cookies were the primary way to store data on the client side. However, they come with limitations like smaller storage capacity and the fact that they are sent with every HTTP request. To solve these problems, HTML5 introduced Web Storage APIs, which include LocalStorage and SessionStorage.
            </p>
            <p>
                In this blog, I'll explain what browser storage is, the difference between LocalStorage and SessionStorage, when to use each one, and some best practices I've learned while working with them.
            </p>
            <p className="font-semibold text-2xl mt-6">
                What is Browser Storage?
            </p>
            <p>Browser Storage allows us to save data directly in the user's browser. Instead of depending on the server every time we need certain information, we can store and retrieve it locally.</p>
            <p className="mt-2">
                The two types of browser storage provided by the Web Storage API are:
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    LocalStorage
                </li>
                <li>
                    SessionStorage
                </li>
            </ul>
            <p className="mt-2">
                Both work using key-value pairs and are very easy to use with JavaScript.
            </p>
            <p className="font-semibold text-2xl mt-6">
                Why Do We Need Browser Storage?
            </p>
            <p className="mt-2">
                Imagine you're building an e-commerce application. A user adds products to their cart and accidentally refreshes the page.
            </p>
            <p className="mt-2">Without browser storage:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    The cart data might disappear.
                </li>
                <li>
                    The application would need frequent API calls.
                </li>
                <li>
                    The user experience wouldn't be smooth.
                </li>
            </ul>
            <p className="mt-2">With browser storage:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    Data can be accessed instantly.
                </li>
                <li>
                    Important information survives page refreshes.
                </li>
                <li>
                    The application feels faster and more responsive.
                </li>
            </ul>
            <p className="mt-2">Some common use cases include:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    Saving theme preferences
                </li>
                <li>
                    Maintaining shopping cart items
                </li>
                <li>
                    Auto-saving forms
                </li>
                <li>
                    Storing temporary session data
                </li>
                <li>
                    Remembering user settings
                </li>
                <li>
                    Showing recently viewed products
                </li>
            </ul>

            <p className="font-semibold text-2xl mt-6">
                LocalStorage
            </p>
            <p className="font-semibold text-2xl mt-4">
                What is LocalStorage?
            </p>
            <p className="mt-2">
                LocalStorage is used to store data permanently in the browser.
            </p>
            <p className="mt-2">The data remains available even if:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    The page is refreshed
                </li>
                <li>
                    The browser is closed and reopened
                </li>
                <li>
                    The system is restarted
                </li>
            </ul>
            <p className="mt-2">The stored data only gets removed if:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    The user clears browser storage, or
                </li>
                <li>
                    We remove it programmatically.
                </li>
            </ul>
            <p>Most browsers provide around 5MB to 10MB of storage per domain.</p>

            <p className="font-semibold text-2xl mt-6">Common LocalStorage Methods</p>
            <p className="font-semibold text-xl mt-4">Saving Data</p>
            <Code language="javascript"
                code={`
localStorage.setItem("role", "Frontend Developer");
            `}
            />
            <p className="font-semibold text-xl mt-4">Retrieving Data</p>
            <Code language="javascript"
                code={`
const role_name = localStorage.getItem("role"); 
console.log(role_name);
            `}
            />
            <p className="font-semibold text-xl mt-4">Output:</p>
            <Code language="javascript"
                code={`
Frontend Developer
            `}
            />
            <p className="font-semibold text-xl mt-4">Removing a Specific Item:</p>
            <Code language="javascript"
                code={`
localStorage.removeItem("role");
            `}
            />
            <p className="font-semibold text-xl mt-4">Clearing Everything:</p>
            <Code language="javascript"
                code={`
localStorage.clear();
            `}
            />
            <p className="font-semibold text-xl mt-4">Accessing a Key by Index</p>
            <Code language="javascript"
                code={`
localStorage.key(0);
            `}
            />
            <p className="font-semibold text-2xl mt-4">Example: Remembering Theme Preference</p>
            <p>One of the most practical examples I've used is saving the user's preferred theme.</p>
            <Code language="javascript"
                code={`
function saveTheme(theme) { 
    localStorage.setItem("theme", theme); 
} 
function loadTheme() { 
    const theme = localStorage.getItem("theme"); 
    if (theme) { 
        document.body.className = theme;
    } 
}            
`}
            />
            <p>When the user selects Dark Mode, the preference gets stored. Even after reopening the browser, the same theme is automatically applied.</p>
            <p className="font-semibold text-2xl mt-6">Storing Objects in LocalStorage</p>
            <p>LocalStorage only stores strings. So whenever I need to save objects or arrays, I convert them into JSON</p>
            <p className="font-semibold text-xl mt-4">Saving an Object</p>
            <Code language="javascript"
                code={`
const user = { 
    name: "Example User", 
    role: "Frontend Developer" 
}; 
localStorage.setItem("user", JSON.stringify(user));         
`}
            />
            <p className="font-semibold text-xl mt-4">Retrieving the Object</p>
            <Code language="javascript"
                code={`
const storedUser = JSON.parse(
  localStorage.getItem("user")
);

console.log(storedUser);  
`}
            />
            <p className="font-semibold text-xl mt-4">Output:</p>
            <Code language="javascript"
                code={`
{ 
    name: "Example User", 
    role: "Frontend Developer" 
}  
`}
            />
            <p className="font-semibold text-2xl mt-6">
                SessionStorage
            </p>

            <p className="font-semibold text-2xl mt-4">
                What is SessionStorage?
            </p>

            <p className="mt-2">
                SessionStorage works almost the same way as LocalStorage, but the major difference is its lifetime.
            </p>

            <p className="mt-2">
                The data remains available only for the current browser tab session.
            </p>

            <p className="mt-2">
                Once the tab or browser window is closed, the data is automatically removed.
            </p>

            <p className="font-semibold text-2xl mt-6">
                SessionStorage Methods
            </p>

            <p className="mt-2">
                The methods are identical to LocalStorage.
            </p>

            <p className="font-semibold text-xl mt-4">
                Save Data
            </p>

            <Code
                language="javascript"
                code={`
sessionStorage.setItem("token", "12345");
`}
            />

            <p className="font-semibold text-xl mt-4">
                Retrieve Data
            </p>

            <Code
                language="javascript"
                code={`
const token = sessionStorage.getItem("token");

console.log(token);
`}
            />

            <p className="font-semibold text-xl mt-4">
                Remove Data
            </p>

            <Code
                language="javascript"
                code={`
sessionStorage.removeItem("token");
`}
            />

            <p className="font-semibold text-xl mt-4">
                Clear All Data
            </p>

            <Code
                language="javascript"
                code={`
sessionStorage.clear();
`}
            />

            <p className="font-semibold text-2xl mt-6">
                Example: Multi-Step Forms
            </p>

            <p className="mt-2">
                I usually prefer SessionStorage for multi-step forms.
            </p>

            <p className="mt-2">
                For example:
            </p>

            <p className="font-semibold text-xl mt-4">
                Step 1
            </p>

            <Code
                language="javascript"
                code={`
sessionStorage.setItem("name", "user123");
`}
            />

            <p className="font-semibold text-xl mt-4">
                Step 2
            </p>

            <Code
                language="javascript"
                code={`
sessionStorage.setItem(
  "email",
  "user123@example.com"
);
`}
            />

            <p className="font-semibold text-xl mt-4">
                Final Step
            </p>

            <Code
                language="javascript"
                code={`
const userData = {
  name: sessionStorage.getItem("name"),
  email: sessionStorage.getItem("email"),
};

console.log(userData);
`}
            />

            <p className="mt-2">
                If the user closes the tab before completing the process, the temporary data is automatically cleared.
            </p>

            <p className="font-semibold text-2xl mt-6">
                LocalStorage vs SessionStorage
            </p>

            <div className="overflow-x-auto mt-4">
                <table className="w-full border border-gray-300 text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="border p-3">Feature</th>
                            <th className="border p-3">LocalStorage</th>
                            <th className="border p-3">SessionStorage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-3">Data Lifetime</td>
                            <td className="border p-3">Until manually removed</td>
                            <td className="border p-3">Until the tab closes</td>
                        </tr>
                        <tr>
                            <td className="border p-3">Shared Across Tabs</td>
                            <td className="border p-3">Yes</td>
                            <td className="border p-3">No</td>
                        </tr>
                        <tr>
                            <td className="border p-3">Browser Restart</td>
                            <td className="border p-3">Data remains</td>
                            <td className="border p-3">Data is removed</td>
                        </tr>
                        <tr>
                            <td className="border p-3">Storage Capacity</td>
                            <td className="border p-3">5–10 MB</td>
                            <td className="border p-3">5–10 MB</td>
                        </tr>
                        <tr>
                            <td className="border p-3">Accessibility</td>
                            <td className="border p-3">Same-origin tabs</td>
                            <td className="border p-3">Current tab only</td>
                        </tr>
                        <tr>
                            <td className="border p-3">Best For</td>
                            <td className="border p-3">Persistent data</td>
                            <td className="border p-3">Temporary data</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="font-semibold text-2xl mt-6">
                When Should You Use LocalStorage?
            </p>

            <p className="mt-2">
                I generally use LocalStorage when the data should stay available for future visits.
            </p>

            <p className="mt-2">
                Some examples are:
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Theme preferences</li>
                <li>Language settings</li>
                <li>Shopping cart information</li>
                <li>Recently viewed products</li>
                <li>Dashboard configurations</li>
                <li>Sidebar state</li>
            </ul>

            <p className="font-semibold text-2xl mt-6">
                When Should You Use SessionStorage?
            </p>

            <p className="mt-2">
                SessionStorage is useful when the data is needed only for the current session.
            </p>

            <p className="mt-2">
                Examples include:
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Multi-step registration forms</li>
                <li>Checkout workflows</li>
                <li>OTP verification flows</li>
                <li>Password reset processes</li>
                <li>Temporary filters</li>
                <li>Draft data that shouldn't persist forever</li>
            </ul>

            <p className="font-semibold text-2xl mt-6">
                Security Considerations
            </p>

            <p className="mt-2">
                One mistake many developers make is storing sensitive information in browser storage.
            </p>

            <p className="mt-2">
                I avoid storing:
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Passwords</li>
                <li>Credit card details</li>
                <li>Secret API keys</li>
                <li>Sensitive personal information</li>
            </ul>

            <p className="mt-2">
                The reason is simple: browser storage is accessible through JavaScript. If the application becomes vulnerable to XSS attacks, attackers may gain access to the stored data.
            </p>

            <p className="mt-2">
                For example:
            </p>

            <Code
                language="javascript"
                code={`
localStorage.getItem("token");
`}
            />

            <p className="mt-2">
                If malicious scripts run in the application, they can potentially read these values.
            </p>

            <p className="font-semibold text-2xl mt-6">
                Common Mistakes to Avoid
            </p>

            <p className="font-semibold text-xl mt-4">
                1. Storing Huge Amounts of Data
            </p>

            <p className="mt-2">
                Avoid doing this:
            </p>

            <Code
                language="javascript"
                code={`
localStorage.setItem(
  "allProducts",
  hugeProductList
);
`}
            />

            <p className="mt-2">
                Storage capacity is limited.
            </p>

            <p className="font-semibold text-xl mt-4">
                2. Forgetting JSON Conversion
            </p>

            <p className="mt-2">
                Incorrect:
            </p>

            <Code
                language="javascript"
                code={`
localStorage.setItem(
  "user",
  userObject
);
`}
            />

            <p className="font-semibold text-xl mt-4">
                Result:
            </p>

            <Code
                language="javascript"
                code={`
[object Object]
`}
            />

            <p className="mt-2">
                Correct approach:
            </p>

            <Code
                language="javascript"
                code={`
localStorage.setItem(
  "user",
  JSON.stringify(userObject)
);
`}
            />

            <p className="font-semibold text-xl mt-4">
                3. Not Handling Missing Values
            </p>

            <p className="mt-2">
                Instead of:
            </p>

            <Code
                language="javascript"
                code={`
const user = JSON.parse(
  localStorage.getItem("user")
);
`}
            />

            <p className="mt-2">
                I prefer:
            </p>

            <Code
                language="javascript"
                code={`
const user =
  JSON.parse(localStorage.getItem("user")) || {};
`}
            />

            <p className="mt-2">
                This prevents unexpected errors.
            </p>

            <p className="font-semibold text-2xl mt-6">
                Using Browser Storage in React
            </p>

            <p className="font-semibold text-xl mt-4">
                Saving Data
            </p>

            <Code
                language="javascript"
                code={`
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  const saveName = () => {
    localStorage.setItem("name", name);
  };

  return (
    <>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={saveName}>
        Save
      </button>
    </>
  );
}
`}
            />

            <p className="font-semibold text-xl mt-4">
                Loading Data
            </p>

            <Code
                language="javascript"
                code={`
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    const savedName =
      localStorage.getItem("name");

    if (savedName) {
      setName(savedName);
    }
  }, []);

  return <h1>{name}</h1>;
}
`}
            />

            <p className="font-semibold text-2xl mt-6">
                Advantages of Browser Storage
            </p>

            <p className="mt-2">
                Some benefits I've noticed while using browser storage are:
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Faster access to frequently used data</li>
                <li>Reduced API calls</li>
                <li>Better user experience</li>
                <li>Simple implementation</li>
                <li>Larger storage capacity compared to cookies</li>
            </ul>

            <p className="font-semibold text-2xl mt-6">
                Limitations
            </p>

            <p className="mt-2">
                Browser storage isn't perfect. It has a few limitations:
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>It stores only strings.</li>
                <li>Storage capacity is limited.</li>
                <li>It isn't suitable for sensitive data.</li>
                <li>Users can clear the stored data whenever they want.</li>
            </ul>

            <p className="font-semibold text-2xl mt-6">
                Best Practices
            </p>

            <p className="mt-2">
                Based on my experience, these are some practices worth following:
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Use LocalStorage for long-term data.</li>
                <li>Use SessionStorage for temporary session-related information.</li>
                <li>Store only what is necessary.</li>
                <li>Convert objects using <strong>JSON.stringify()</strong> and <strong>JSON.parse()</strong>.</li>
                <li>Handle null values properly.</li>
                <li>Never store highly sensitive information.</li>
                <li>Remove outdated data regularly.</li>
                <li>Validate stored values before using them.</li>
            </ul>

            <p className="font-semibold text-2xl mt-6">
                Conclusion
            </p>

            <p className="mt-2">
                Browser storage is one of those features that every frontend developer ends up using sooner or later. Understanding the difference between LocalStorage and SessionStorage helps in choosing the right solution for the right problem.
            </p>

            <p className="mt-2">
                I usually think of it this way: if the data should still be there when the user comes back tomorrow, I use LocalStorage. If the data is only relevant for the current tab session, SessionStorage is the better choice.
            </p>

            <p className="mt-2">
                Used properly, these storage APIs can improve performance, reduce unnecessary server requests, and provide a smoother experience for users.
            </p>
        </>
    )
}

export default FiftySix