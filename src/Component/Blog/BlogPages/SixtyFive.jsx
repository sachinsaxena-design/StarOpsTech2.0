import React from 'react'
import { Code } from '../../../utils/Helpers';

function SixtyFive() {
    return (
        <>
            <img
                className="max-h-[700px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/API_optimization_React/react_api-optimization.jpg"
                alt="One Question Made Me Realize Git Isn't the Only Version Control System"
            />
            <p>
                While working on React projects, one thing I have noticed is that an
                application can feel slow even when the React code itself looks
                perfectly fine.
            </p>

            <p>
                In many cases, the problem is not the UI. It is the way API calls are
                being handled.
            </p>

            <p>At the beginning, it is easy to write something like this:</p>

            <Code
                language="javascript"
                code={`
useEffect(() => {
  fetchUsers();
}, []);
`}
            />

            <p>
                It works, the data loads, and everything looks fine.
            </p>

            <p>
                But as the application grows, we start adding search, filters,
                pagination, sorting, dashboards, forms, and multiple components that
                depend on APIs. That's when unnecessary API calls start becoming a
                problem.
            </p>

            <p>
                I have faced situations where the same API was being called multiple
                times, search was triggering a request on every keystroke, or a large
                amount of data was being loaded even though the page only needed a
                small portion of it.
            </p>

            <p>
                In this article, I want to share some of the techniques I use in React
                projects to keep API calls under control and make the application more
                efficient.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                1. First, I Check When the API Is Being Called
            </p>

            <p>
                Whenever I notice that an API is being called more than expected, the
                first place I usually check is <strong>useEffect</strong>.
            </p>

            <Code
                language="javascript"
                code={`
useEffect(() => {
  fetchUsers();
}, [search, page, sort]);
`}
            />

            <p>
                Here, the API will run whenever <strong>search</strong>,
                <strong> page</strong>, or <strong>sort</strong> changes.
            </p>

            <p>
                That's fine if all three values are actually supposed to fetch new
                data.
            </p>

            <p>But sometimes an unnecessary dependency gets added.</p>

            <Code
                language="javascript"
                code={`
useEffect(() => {
  fetchUsers();
}, [search, users]);
`}
            />

            <p>
                If <strong>fetchUsers()</strong> updates the <strong>users</strong>{" "}
                state, changing <strong>users</strong> will trigger the effect again.
            </p>

            <p>The flow can become:</p>

            <Code
                language="text"
                code={`
API Call
   ↓
setUsers()
   ↓
users changes
   ↓
useEffect runs again
   ↓
API Call
`}
            />

            <p>
                This is something I always check when debugging repeated API calls.
            </p>

            <p>
                Before adding a dependency to <strong>useEffect</strong>, I ask myself:
            </p>

            <p>
                <strong>
                    Does changing this value actually require a new API request?
                </strong>
            </p>

            <p>
                If not, I don't make it a dependency just for the sake of it.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                2. I Don't Fetch Everything Just Because the API Provides It
            </p>

            <p>
                Another thing I have learned while working with APIs is that{" "}
                <strong>more data doesn't always mean better data</strong>.
            </p>

            <p>
                For example, suppose I'm building a users table where I only need:
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Name</li>
                <li>Email</li>
                <li>Role</li>
                <li>Status</li>
            </ul>

            <p>But the API returns the complete user object:</p>

            <Code
                language="json"
                code={`
{
  "id": 101,
  "name": "John",
  "email": "john@example.com",
  "role": "Admin",
  "status": "Active",
  "address": "...",
  "permissions": [],
  "loginHistory": [],
  "notifications": [],
  "activity": []
}
`}
            />

            <p>
                If my current page doesn't use most of those fields, I'm transferring
                data that isn't actually needed.
            </p>

            <p>
                Whenever possible, I prefer requesting or designing an API response
                around what the screen actually needs.
            </p>

            <Code
                language="json"
                code={`
{
  "id": 101,
  "name": "John",
  "email": "john@example.com",
  "role": "Admin",
  "status": "Active"
}
`}
            />

            <p>
                This becomes especially important when working with large lists.
            </p>

            <p>
                It reduces the amount of data transferred and also means React has less
                data to process and render.
            </p>

            <p>
                Of course, this isn't something the frontend can always control.
                Sometimes the backend API is already defined.
            </p>

            <p>
                But even then, I try to understand{" "}
                <strong>what data the UI actually needs</strong> before adding more API
                calls or processing extra response data.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                3. I Use Pagination Instead of Loading Everything
            </p>

            <p>
                This is something I regularly use when working with tables and admin
                screens.
            </p>

            <p>
                Imagine an API has 50,000 users.
            </p>

            <p>
                It wouldn't make sense to load all 50,000 records when the user opens
                the page.
            </p>

            <p>Instead, I request a limited number:</p>

            <Code
                language="http"
                code={`
GET /api/users?page=1&limit=20
`}
            />

            <p>The response could look something like:</p>

            <Code
                language="json"
                code={`
{
  "data": [
    {
      "id": 1,
      "name": "John"
    },
    {
      "id": 2,
      "name": "Sarah"
    }
  ],
  "page": 1,
  "limit": 20,
  "total": 50000
}
`}
            />

            <p>
                Now the frontend only has to work with 20 records.
            </p>

            <p>This helps with:</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>API response size</li>
                <li>Network usage</li>
                <li>Rendering performance</li>
                <li>Browser memory</li>
                <li>Backend processing</li>
            </ul>

            <p>
                I've found pagination particularly useful for{" "}
                <strong>
                    admin panels, user lists, project files, transactions, and other
                    large tables
                </strong>
                .
            </p>

            <p>
                Another advantage is that it gives the user a better experience. They
                don't have to wait for thousands of records before they can start using
                the page.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                4. I Use Debouncing for Search APIs
            </p>

            <p>
                Search is one of the easiest places to accidentally create too many API
                calls.
            </p>

            <p>Suppose I have a search input and the user types:</p>

            <Code
                language="text"
                code={`
M
Mo
Mon
Mong
Mongo
MongoD
MongoDB
`}
            />

            <p>
                If I directly connect the input value to an API call:
            </p>

            <Code
                language="javascript"
                code={`
useEffect(() => {
  fetch(\`/api/search?q=\${search}\`);
}, [search]);
`}
            />

            <p>
                I'm potentially sending seven requests for one search.
            </p>

            <p>
                I've used this type of approach before, and it can become inefficient
                very quickly.
            </p>

            <p>Instead, I use <strong>debouncing</strong>.</p>

            <p>
                The idea is simple: wait for the user to stop typing before making the
                request.
            </p>

            <Code
                language="javascript"
                code={`
useEffect(() => {
  const timer = setTimeout(() => {
    if (search.trim()) {
      fetch(\`/api/search?q=\${search}\`);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [search]);
`}
            />

            <p>
                Now if the user types <strong>MongoDB</strong> quickly, the API doesn't
                get called for every character.
            </p>

            <p>Instead, it waits for the user to stop typing.</p>

            <p>The difference is basically:</p>

            <p className="font-semibold mt-2">Without debounce:</p>

            <Code
                language="text"
                code={`
M       → API
Mo      → API
Mon     → API
Mong    → API
Mongo   → API
MongoDB → API
`}
            />

            <p className="font-semibold mt-2">With debounce:</p>

            <Code
                language="text"
                code={`
MongoDB → API
`}
            />

            <p>
                This is a small change, but in applications with frequently used search
                fields, it can make a noticeable difference.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                5. I Cancel Previous Requests When They Are No Longer Needed
            </p>

            <p>
                Debouncing reduces the number of requests, but sometimes an older
                request is already running.
            </p>

            <p>
                For example, imagine a user searches:
            </p>

            <Code
                language="text"
                code={`
React
`}
            />

            <p>The request starts.</p>

            <p>
                Before it finishes, they change the search to:
            </p>

            <Code
                language="text"
                code={`
Next.js
`}
            />

            <p>Now another request starts.</p>

            <p>
                If the first request is still running, I don't really need its result
                anymore.
            </p>

            <p>For these cases, I use `AbortController`.</p>

            <Code
                language="javascript"
                code={`
useEffect(() => {
  const controller = new AbortController();

  fetch(\`/api/search?q=\${search}\`, {
    signal: controller.signal
  })
    .then((res) => res.json())
    .then((data) => {
      setResults(data);
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });

  return () => {
    controller.abort();
  };
}, [search]);
`}
            />

            <p>
                When the effect runs again, the previous request is cancelled.
            </p>

            <p>This is particularly useful for things like:</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Search</li>
                <li>Autocomplete</li>
                <li>Filters</li>
                <li>Frequently changing API requests</li>
            </ul>

            <p>
                It also helps prevent an older response from unnecessarily affecting
                the current UI state.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                6. I Avoid Calling the Same API From Multiple Components
            </p>

            <p>
                Another situation I've come across is multiple components requesting
                the same data.
            </p>

            <p>For example, imagine a dashboard like this:</p>

            <Code
                language="text"
                code={`
Dashboard
│
├── UserStats
├── RecentUsers
└── UserActivity
`}
            />

            <p>
                If each component independently requests the same user information, I
                could end up with:
            </p>

            <Code
                language="text"
                code={`
UserStats       → /api/users
RecentUsers     → /api/users
UserActivity    → /api/users
`}
            />

            <p>
                The application is now making multiple requests for data that may
                already be available.
            </p>

            <p>
                For simple applications, this can sometimes be handled by moving the
                API call to a common parent component and passing the data down.
            </p>

            <p>
                But as the project becomes larger, I prefer using a proper solution for{" "}
                <strong>server state management</strong>.
            </p>

            <p>
                Libraries such as <strong>TanStack Query</strong> can help with:
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Caching API responses</li>
                <li>Avoiding duplicate requests</li>
                <li>Refetching data</li>
                <li>Managing loading states</li>
                <li>Managing errors</li>
                <li>Background updates</li>
            </ul>

            <p>
                This saves me from manually handling all of these situations with
                multiple <strong>useState</strong> and <strong>useEffect</strong>{" "}
                combinations.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                What I Have Learned From This
            </p>

            <p>
                One thing I've realized while working with React APIs is that
                optimizing API calls doesn't always mean writing complicated code.
            </p>

            <p>Most of the improvements come from asking simple questions:</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Do I really need to make this request?</li>
                <li>Am I making the same request multiple times?</li>
                <li>Am I fetching more data than the UI needs?</li>
                <li>Should this list be paginated?</li>
                <li>Should this search request be debounced?</li>
                <li>
                    Is an old request still running even though I don't need it anymore?
                </li>
                <li>
                    Can this response be reused instead of fetched again?
                </li>
            </ul>

            <p>
                These questions have helped me identify API-related performance issues
                much faster.
            </p>
            <p className="font-semibold text-2xl"> 7. I Cache Data That Doesn't Need to Be Fetched Again </p>
            <p> Not every API response changes frequently. </p>
            <p> For example, in one project I might need data such as: </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Countries</li>
                <li>States</li>
                <li>Roles</li>
                <li>Permissions</li>
                <li>Categories</li>
                <li>Integration types</li>
            </ul>
            <p> If I fetch this data every time a component renders or every time the user visits a page, I'm making requests that aren't really necessary. </p>
            <p>For example:</p>
            <Code language="text" code={` 
Page 1 
  ↓ 
GET /api/roles 
  ↓ 
User navigates to another page 
  ↓ 
User comes back 
  ↓ 
GET /api/roles again 
`} />
            <p> If the roles haven't changed, there's no real benefit in making the same request again. </p>
            <p>That's where caching becomes useful.</p>
            <p>The idea is simple:</p>
            <Code language="text" code={` 
First request 
  ↓ 
Fetch data 
  ↓ 
Store response 
  ↓ 
Use cached data 
`} />
            <p> Then, when the same data is needed again, I can reuse the cached response instead of immediately making another network request. </p>
            <p>I don't cache everything, though.</p>
            <p> For data that changes frequently, such as notifications or live dashboard information, I may want fresh data instead. </p>
            <p>So before caching something, I usually consider:</p>
            <p> <strong>How often does this data actually change?</strong> </p>
            <br />
            <p className="font-semibold text-2xl"> 8. For Larger Projects, I Use TanStack Query </p>
            <p> When I'm working with only a few APIs, managing requests with{" "} <strong>useEffect</strong> and <strong>useState</strong> is usually enough. </p>
            <p>For example:</p>
            <Code language="javascript" code={` 
const [users, setUsers] = useState([]); 
const [loading, setLoading] = useState(false); 
const [error, setError] = useState(null); 
`} />
            <p>Then:</p>
            <Code language="javascript" code={`
 useEffect(() => { 
    setLoading(true); 
    
    fetch("/api/users") 
    .then((res) => res.json()) 
    .then((data) => { setUsers(data); }) 
    .catch((error) => { setError(error); }) 
    .finally(() => { setLoading(false); }); }, []); 
    `} />
            <p>This works.</p>
            <p> But when a project starts having many API integrations, I find myself repeating the same logic again and again. </p>
            <p>That's when I prefer using TanStack Query.</p> <p>For example:</p>
            <Code language="javascript" code={` 
const { data, isLoading, isError } = useQuery({ 
    queryKey: ["users"], 
    queryFn: fetchUsers 
    }); 
        `} />
            <p> Now I don't have to manually build everything around the request. </p>
            <p>TanStack Query can handle things such as:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Caching</li>
                <li>Request deduplication</li>
                <li>Refetching</li>
                <li>Loading states</li>
                <li>Error states</li>
                <li>Background updates</li>
                <li>Query invalidation</li>
            </ul>
            <p> This becomes especially useful when the same API data is required by multiple components. </p>
            <p> Instead of every component managing its own copy of the request, the server state can be managed in one place. </p>
            <br />
            <p className="font-semibold text-2xl"> 9. I Always Handle Loading, Empty, and Error States </p>
            <p> One thing I try not to do is treat an API request as only two states: </p>
            <Code language="text" code={` 
Data No Data 
`} />
            <p>In an actual application, there are usually several states:</p>
            <Code language="text" code={` 
Loading 
  ↓ 
Success 
  ↓ 
Empty 
  ↓ 
Error 
`} />
            <p> For example, when I'm displaying a users table, I don't want the screen to simply remain blank while the API is running. </p>
            <p>I usually show a loading state:</p>
            <Code language="javascript" code={` 
if (isLoading) { 
    return <UsersTableSkeleton />; 
    } 
`} />
            <p>If the API fails:</p>
            <Code language="javascript" code={` 
if (isError) { 
    return <p>Unable to load users.</p>; 
    } 
`} />
            <p> And if the API succeeds but there are no records: </p>
            <Code language="javascript" code={` if (!users.length) { return <p>No users found.</p>; } `} />
            <p> This might look like a small UI detail, but it makes a big difference in how the application feels. </p>
            <p>The user should know whether:</p>
            <ul className="list-disc ml-6 space-y-1"> <li>The data is still loading</li> <li>No data exists</li> <li>Something went wrong</li> </ul> <br />
            <p className="font-semibold text-2xl"> 10. I Don't Retry Every Failed Request </p>
            <p>Another thing I pay attention to is API retries.</p>
            <p>Retries can be useful when the problem is temporary.</p>
            <p>For example:</p>
            <Code language="text" code={` 
Request 
  ↓ 
Network failure 
  ↓
Retry 
  ↓ 
Success 
`} />
            <p>But retrying every failed request isn't a good idea.</p>
            <p>For example, if the server returns:</p>
            <Code language="bash" code={` 
400 Bad Request 
`} />
            <p> retrying the exact same request probably won't fix anything. </p>
            <p> Similarly, if the user isn't authenticated and the API returns: </p>
            <Code language="text" code={` 
401 Unauthorized 
`} />
            <p> I need to handle authentication rather than repeatedly sending the same request. </p>
            <p> So when implementing retry logic, I consider what caused the request to fail. </p>
            <p> For temporary network problems, a retry can be useful. </p>
            <p> For validation or authentication errors, I normally handle the actual problem instead. </p>
            <br />
            <p className="font-semibold text-2xl"> 11. I Keep Common API Logic in One Place </p>
            <p> As the number of APIs increases, putting <strong>fetch()</strong>{" "} directly inside every component can make the code difficult to maintain. </p>
            <p> For example, I don't want every component to repeat things like: </p>
            <Code language="javascript" code={` 
fetch("/api/users", { 
    headers: { 
        "Content-Type": "application/json", 
        Authorization: \`Bearer \${token}\` 
    } 
}); 
`} />
            <p>Instead, I usually create a common API utility.</p>
            <p>For example:</p>
            <Code language="javascript" code={` 
async function apiFetch(url, options = {}) { 
    const response = await fetch(url, 
        { ...options, 
         headers: { 
            "Content-Type": "application/json", 
            ...options.headers 
            }
        }); 
        if (!response.ok) { 
            throw new Error(\`Request failed: \${response.status}\`); 
        } 
        return response.json(); 
} 
`} />
            <p>Then the component can simply do:</p>
            <Code language="javascript" code={` 
const users = await apiFetch("/api/users"); 
`} />
            <p> This approach gives me one place to handle common API behavior. </p>
            <p>Depending on the project, I can also use this layer for:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Base API URLs</li>
                <li>Authorization headers</li>
                <li>Common error handling</li>
                <li>Token handling</li>
                <li>Request configuration</li>
                <li>Logging</li>
            </ul>
            <p> It keeps my components focused on the UI instead of API configuration. </p>
            <br />

            <p className="font-semibold text-2xl">
                12. I Prefer Server-Side Filtering for Large Data
            </p>

            <p>
                For a small list, filtering on the frontend is completely fine.
            </p>

            <p>For example:</p>

            <Code
                language="javascript"
                code={`
const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
);
`}
            />

            <p>
                If I'm working with 20 or 30 records, there isn't much to worry
                about.
            </p>

            <p>
                But imagine the API has 100,000 users.
            </p>

            <p>
                I don't want to download all 100,000 users just to find the ones
                matching a search term.
            </p>

            <p>
                Instead, I send the filter to the backend:
            </p>

            <Code
                language="http"
                code={`
GET /api/users?search=sachin
`}
            />

            <p>
                The backend can query the database and return only the relevant
                records.
            </p>

            <p>I use the same approach for things like:</p>

            <Code
                language="http"
                code={`
/api/users?role=admin
/api/users?status=active
/api/users?search=sachin
/api/users?sort=name
`}
            />

            <p>
                This keeps the frontend lighter and avoids transferring data that
                isn't required.
            </p>

            <p>For large datasets, I generally prefer:</p>

            <Code
                language="text"
                code={`
Frontend
   ↓
Search / Filter / Sort
   ↓
API
   ↓
Database
   ↓
Only required data
   ↓
Frontend
`}
            />

            <p>
                instead of downloading everything and doing all the work in the
                browser.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                13. I Fetch Data Only When I Actually Need It
            </p>

            <p>
                Sometimes an application has multiple sections or tabs.
            </p>

            <p>For example:</p>

            <Code
                language="text"
                code={`
Users
Teams
Integrations
Billing
`}
            />

            <p>
                One approach is to load everything as soon as the page opens:
            </p>

            <Code
                language="text"
                code={`
Page Load
   ↓
Users API
Teams API
Integrations API
Billing API
`}
            />

            <p>
                But if the user only opens the <strong>Users</strong> section,
                the other three requests weren't necessary.
            </p>

            <p>
                In situations like this, I prefer loading data when the user
                actually needs it.
            </p>

            <p>For example:</p>

            <Code
                language="text"
                code={`
Page loads
   ↓
Users API
   ↓
User clicks Integrations
   ↓
Integrations API
`}
            />

            <p>
                This can reduce the initial number of requests and make the first
                page load lighter.
            </p>

            <p>
                I don't apply this blindly, though.
            </p>

            <p>
                If I know that users will almost always open another section
                immediately, prefetching might actually provide a better
                experience.
            </p>

            <p>
                So I usually consider the expected user flow before deciding
                when to fetch the data.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                How I Put These Techniques Together
            </p>

            <p>
                In a real project, I normally don't use just one optimization.
            </p>

            <p>
                For example, if I'm building an admin users page, my API flow
                might look something like this:
            </p>

            <Code
                language="text"
                code={`
               Users Page
                   │
          ┌────────┴────────┐
          │                 │
       Search             Filters
          │                 │
          └────────┬────────┘
                   ↓
                Debounce
                   ↓
           Cancel old request
                   ↓
          Send search + filters
                   ↓
              Pagination
                   ↓
               Backend API
                   ↓
                Database
                   ↓
            Required records
                   ↓
                 Cache
                   ↓
               Render UI
`}
            />

            <p>Each technique solves a different problem.</p>

            <p>
                <strong>Debouncing</strong> reduces unnecessary search requests.
            </p>

            <p>
                <strong>Request cancellation</strong> prevents outdated requests
                from continuing.
            </p>

            <p>
                <strong>Pagination</strong> prevents loading thousands of
                records.
            </p>

            <p>
                <strong>Server-side filtering</strong> keeps large datasets out
                of the browser.
            </p>

            <p>
                <strong>Caching</strong> avoids fetching the same data repeatedly.
            </p>

            <p>
                <strong>Loading and error states</strong> make the UI easier to
                use.
            </p>

            <p>
                I find that combining these small improvements usually works
                better than trying to optimize everything with one big solution.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                My API Optimization Checklist
            </p>

            <p>
                When I'm adding a new API to a React project, these are some of
                the things I usually check:
            </p>

            <p className="font-semibold mt-4">
                Before making the request
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Do I actually need this API?</li>
                <li>When should it run?</li>
                <li>What should trigger it?</li>
                <li>Can the request be delayed or avoided?</li>
            </ul>

            <p className="font-semibold mt-4">
                While making the request
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Do I need debouncing?</li>
                <li>Could another request make this one outdated?</li>
                <li>Should the previous request be cancelled?</li>
                <li>Do I need pagination?</li>
            </ul>

            <p className="font-semibold mt-4">
                After receiving the response
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Can this data be cached?</li>
                <li>Does the UI need the entire response?</li>
                <li>Are loading and error states handled?</li>
                <li>Is empty data handled properly?</li>
            </ul>

            <p className="font-semibold mt-4">
                As the application grows
            </p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Are multiple components requesting the same data?</li>
                <li>Should I use TanStack Query?</li>
                <li>Should filtering and sorting happen on the backend?</li>
                <li>Is my API logic separated from the UI?</li>
            </ul>

            <p>
                These checks help me catch many API-related performance issues
                before they become bigger problems.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Final Thoughts
            </p>

            <p>
                When I first started working with APIs in React, I mostly focused
                on getting the request to work.
            </p>

            <p>
                Over time, I realized that <strong>making an API call is only
                    one part of the problem</strong>.
            </p>

            <p>
                I also need to think about when the request runs, how often it
                runs, what data I'm requesting, what happens if it fails, and
                whether I really need to make the same request again.
            </p>

            <p>
                In the projects I work on, techniques like pagination,
                debouncing, request cancellation, caching, server-side
                filtering, and centralized API handling have helped me keep
                API-heavy screens much more manageable.
            </p>

            <p>
                I don't try to apply every optimization to every API.
            </p>

            <p>
                Instead, I look at the actual requirement and choose the
                technique that solves the problem.
            </p>

            <p>
                For me, the main idea is:
            </p>

            <p className="font-semibold mt-4">
                Don't optimize API calls just to reduce the number of requests.
                Optimize them so the application gets the right data at the
                right time, without doing unnecessary work.
            </p>

            <p>
                That small change in mindset can make a noticeable difference as
                a React application grows.
            </p>
        </>
    );
}

export default SixtyFive