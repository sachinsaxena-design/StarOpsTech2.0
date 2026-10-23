import React from 'react'
import { Code } from '../../../utils/Helpers'

function SeventyFour() {
    return (
        <>
            <img
                className="max-h-[700px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/Implementing_Role-Based/Access_Control_In_Node.jpg"
                alt="Implementing Role-Based Access Control in Node.js"
            />
            <p className='mt-2'>
                When I work on a backend application, I often need to manage different types of users. For example, an admin should be able to manage users, while a regular user should only be able to access their own account and the features available to them.
            </p>
            <p className='mt-2'>
                This is where <strong>Role-Based Access Control (RBAC)</strong> becomes useful.
            </p>
            <p className='mt-2'>
                In my previous blog, I explained the difference between authentication and authorization. Authentication tells us who the user is, while authorization decides what that user is allowed to do.
            </p>
            <p className='mt-2'>
                In this blog, I'll take that concept a step further and explain how I can implement role-based access control in a Node.js and Express application.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>What Is Role-Based Access Control?</h1>
            <p className='mt-2'>
                Role-Based Access Control, or RBAC, is a way of managing permissions by assigning roles to users.
            </p>
            <p className='mt-2'>
                Instead of writing separate permission checks for every user, I can assign a role and define what that role is allowed to access.
            </p>
            <p className='mt-2'>
                For example, in an admin dashboard, I might have these roles:
            </p>
            <ul className='ml-6 list-disc space-y-1'>
                <li><strong>Admin:</strong> Can manage users, view records, and access administrative features.</li>
                <li><strong>Editor:</strong> Can create and update content but cannot manage users.</li>
                <li><strong>User:</strong> Can view their own information and use regular application features.</li>
            </ul>
            <p className='mt-2'>
                The exact permissions depend on the application. The important point is that each role has a defined set of responsibilities.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Why Do I Need RBAC?</h1>
            <p className='mt-2'>
                Imagine I'm building an application with a user management dashboard.
            </p>
            <p className='mt-2'>
                If every logged-in user can access the same APIs, a regular user might be able to perform actions that should only be available to an admin.
            </p>
            <p className='mt-2'>For example:</p>
            <Code language='text' code={`GET    /api/users
POST   /api/users
DELETE /api/users/:id`} />
            <p className='mt-2'>
                These endpoints might expose sensitive information or allow users to delete other accounts if proper authorization checks are missing.
            </p>
            <p className='mt-2'>
                I don't want to rely on hiding buttons in the frontend to prevent this. Even if a button isn't visible, someone could still send a request directly to the API.
            </p>
            <p className='mt-2'>
                That's why I implement permission checks on the backend. Every protected request should be checked before the application performs the requested action.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>How RBAC Works</h1>
            <p className='mt-2'>The basic flow is straightforward:</p>
            <Code language='text' code={`User Logs In
     ↓
Authentication
     ↓
Identify User and Role
     ↓
User Sends API Request
     ↓
Check Permissions
     ↓
Allow or Deny Request`} />
            <p className='mt-2'>
                For example, when an admin requests the user list, the backend checks whether the authenticated user has the required role.
            </p>
            <p className='mt-2'>
                If the user is an admin, the request can continue. If the user is a regular user, the backend returns a <code className='bg-gray-100 px-1 rounded'>403 Forbidden</code> response.
            </p>
            <p className='mt-2'>
                This check happens on the server, regardless of what the frontend displays.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Setting Up the Project</h1>
            <p className='mt-2'>
                For this example, I'll use Node.js and Express to create a small API.
            </p>
            <p className='mt-2'>
                First, I create a project and install Express:
            </p>
            <Code language='bash' code={`mkdir rbac-api
cd rbac-api
npm init -y
npm install express`} />
            <p className='mt-2'>
                I'll keep the example focused on authorization so it's easier to understand. In a real application, I would connect this middleware to an existing authentication system that verifies the user's session or token.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Assigning Roles to Users</h1>
            <p className='mt-2'>A user record might contain a role like this:</p>
            <Code language='js' code={`const user = {
    id: 1,
    name: "John",
    email: "john@example.com",
    role: "admin"
};`} />
            <p className='mt-2'>Another user might have:</p>
            <Code language='js' code={`const user = {
    id: 2,
    name: "Sarah",
    email: "sarah@example.com",
    role: "user"
};`} />
            <p className='mt-2'>
                When the user signs in, the authentication process establishes their identity. The backend can then use the verified user's role when deciding which actions are allowed.
            </p>
            <p className='mt-2'>
                In a real project, these details would come from a trusted source, such as a database or a securely verified token. I wouldn't trust a role sent directly in the request body because a user could change it.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Creating Role-Based Middleware</h1>
            <p className='mt-2'>
                One reason I like using Express middleware is that I can keep common authorization logic separate from the route handlers.
            </p>
            <p className='mt-2'>
                Express middleware runs during the request-response cycle and can either reject a request or pass control to the next function.
            </p>
            <p className='mt-2'>
                I'll create a simple middleware function that checks the user's role.
            </p>
            <Code language='js' code={`function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to access this resource"
            });
        }

        next();
    };
}

module.exports = authorizeRoles;`} />
            <p className='mt-2'>Here's what happens in this function:</p>
            <ul className='ml-6 list-disc space-y-1'>
                <li><code className='bg-gray-100 px-1 rounded'>allowedRoles</code> contains the roles permitted to access a route.</li>
                <li><code className='bg-gray-100 px-1 rounded'>req.user</code> represents the authenticated user added by authentication middleware.</li>
                <li>If the user isn't authenticated, the API returns <code className='bg-gray-100 px-1 rounded'>401 Unauthorized</code>.</li>
                <li>If the user's role isn't allowed, the API returns <code className='bg-gray-100 px-1 rounded'>403 Forbidden</code>.</li>
                <li>If the role is allowed, <code className='bg-gray-100 px-1 rounded'>next()</code> passes control to the next middleware or route handler.</li>
            </ul>
            <p className='mt-2'>
                One important detail: this middleware assumes authentication has already happened. It does not verify a JWT or log anyone in by itself.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Protecting an Admin Route</h1>
            <p className='mt-2'>
                Now I can use the middleware to protect an API endpoint.
            </p>
            <Code language='js' code={`const express = require("express");
const authorizeRoles = require("./middleware/authorizeRoles");

const app = express();

app.get(
    "/api/admin/dashboard",
    authenticateUser,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome to the admin dashboard"
        });
    }
);`} />
            <p className='mt-2'>
                Here, <code className='bg-gray-100 px-1 rounded'>authenticateUser</code> represents the authentication middleware from my application. It must verify the user's credentials or token and populate <code className='bg-gray-100 px-1 rounded'>req.user</code> with trusted user information.
            </p>
            <p className='mt-2'>The route uses two checks:</p>
            <ol className='ml-6 list-decimal space-y-1'>
                <li><code className='bg-gray-100 px-1 rounded'>authenticateUser</code> verifies who is making the request.</li>
                <li><code className='bg-gray-100 px-1 rounded'>authorizeRoles("admin")</code> checks whether that user has permission to access the dashboard.</li>
            </ol>
            <p className='mt-2'>
                Only after both checks pass does the route handler run.
            </p>
            <p className='mt-2'>
                For a regular user, the API returns a <code className='bg-gray-100 px-1 rounded'>403 Forbidden</code> response instead of the dashboard data.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Allowing Multiple Roles</h1>
            <p className='mt-2'>
                Sometimes, I need to allow more than one role to access an endpoint.
            </p>
            <p className='mt-2'>
                For example, both admins and editors might be allowed to manage content.
            </p>
            <p className='mt-2'>
                With the middleware I created earlier, I can do this:
            </p>
            <Code language='js' code={`app.post(
    "/api/content",
    authenticateUser,
    authorizeRoles("admin", "editor"),
    (req, res) => {
        res.status(201).json({
            success: true,
            message: "Content created successfully"
        });
    }
);`} />
            <p className='mt-2'>
                Now both <code className='bg-gray-100 px-1 rounded'>admin</code> and <code className='bg-gray-100 px-1 rounded'>editor</code> users can access this endpoint, while regular users cannot.
            </p>
            <p className='mt-2'>
                This is more manageable than repeating the same role-checking logic in every route.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Organizing Permissions for Different Routes</h1>
            <p className='mt-2'>
                As the application grows, I might have several endpoints with different access requirements.
            </p>
            <p className='mt-2'>For example:</p>
            <Code language='js' code={`// Only admins can manage users
app.delete(
    "/api/users/:id",
    authenticateUser,
    authorizeRoles("admin"),
    deleteUser
);

// Admins and editors can manage content
app.post(
    "/api/content",
    authenticateUser,
    authorizeRoles("admin", "editor"),
    createContent
);

// Any authenticated user can view their profile
app.get(
    "/api/profile",
    authenticateUser,
    getProfile
);`} />
            <p className='mt-2'>
                This approach makes the access rules visible directly in the route definitions.
            </p>
            <p className='mt-2'>
                It also makes it easier to review which endpoints need administrative access and which are available to regular users.
            </p>
            <p className='mt-2'>
                The handler functions shown here are examples of application logic; they would need to be defined in the project.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>RBAC With MongoDB and Mongoose</h1>
            <p className='mt-2'>
                In an application that uses MongoDB, I can store the user's role as part of their user document.
            </p>
            <p className='mt-2'>
                For example, a Mongoose schema could look like this:
            </p>
            <Code language='js' code={`const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "editor", "user"],
        default: "user"
    }
});

module.exports = mongoose.model("User", userSchema);`} />
            <p className='mt-2'>
                The <code className='bg-gray-100 px-1 rounded'>enum</code> restricts the role field to the listed values when Mongoose validates the document.
            </p>
            <p className='mt-2'>
                I would also hash passwords before storing them, and role changes would be handled through protected backend operations rather than accepting arbitrary role values from public signup requests.
            </p>
            <p className='mt-2'>
                When a user logs in, the authentication process verifies their credentials. Subsequent requests can use the verified identity and role to decide whether an endpoint is accessible.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>What About Accessing Another User's Data?</h1>
            <p className='mt-2'>
                There is another important detail I keep in mind: checking a user's role doesn't automatically mean they should be able to access every record.
            </p>
            <p className='mt-2'>
                For example, a regular user might be allowed to view their own profile, but they shouldn't be able to view another user's private information just by changing the ID in the URL.
            </p>
            <p className='mt-2'>Consider this endpoint:</p>
            <Code language='text' code={`GET /api/users/:id`} />
            <p className='mt-2'>
                Even if the user is authenticated, the backend still needs to check whether they're allowed to access the requested user's record.
            </p>
            <p className='mt-2'>
                For a regular user, that might mean allowing access only when the requested ID matches their own user ID. An admin might have broader access, depending on the application's rules.
            </p>
            <p className='mt-2'>
                This is why I treat role checks and resource-level permission checks as separate parts of authorization.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Common Mistakes I Avoid</h1>
            <p className='mt-2'>
                When implementing RBAC, there are a few things I pay attention to.
            </p>
            <p className='mt-2'>
                <strong>Relying only on the frontend:</strong> Hiding admin buttons doesn't secure the API. The backend must enforce the same permissions.
            </p>
            <p className='mt-2'>
                <strong>Trusting a role sent by the client:</strong> A user shouldn't be able to become an admin by changing a value in the request body or a custom header.
            </p>
            <p className='mt-2'>
                <strong>Forgetting authentication:</strong> Role-based middleware should run after the backend has established the user's identity.
            </p>
            <p className='mt-2'>
                <strong>Missing checks on individual routes:</strong> Every protected endpoint needs the appropriate authorization rules. Leaving even one sensitive endpoint unprotected can create a security issue.
            </p>
            <p className='mt-2'>
                <strong>Giving everyone too much access:</strong> I prefer granting only the permissions users need. New routes should be denied by default until their access requirements are defined.
            </p>
            <p className='mt-2'>
                <strong>Ignoring ownership checks:</strong> A role alone may not be enough when a request accesses a particular user's record, project, or other private resource.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Final Thoughts</h1>
            <p className='mt-2'>
                Role-Based Access Control is an important part of building secure backend applications. It helps me manage permissions in a structured way instead of scattering role checks throughout the application.
            </p>
            <p className='mt-2'>
                With Node.js and Express, I can use middleware to separate authentication from authorization and protect routes based on the user's role. When combined with MongoDB, I can store user roles alongside other account information and use them in my backend access rules.
            </p>
            <p className='mt-2'>
                For me, the main takeaway is that <strong>being logged in doesn't automatically mean a user should have access to everything</strong>. Every protected action needs an appropriate permission check, and access to individual records may require additional validation.
            </p>
            <p className='mt-2'>
                As an application grows, having clear roles and well-defined permissions makes the backend easier to maintain and safer to work with.
            </p>
            <p className='mt-2'>
                In a future blog, I'll explore another practical backend topic: <strong>Error Handling and Input Validation in Express.js</strong>, including how to handle invalid requests and return consistent API responses.
            </p>
        </>
    )
}

export default SeventyFour