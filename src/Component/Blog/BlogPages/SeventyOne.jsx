import React from 'react'
import { Code } from '../../../utils/Helpers'

function SeventyOne() {
    return (
        <>
            <img
                className="max-h-[700px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/building_rest_apis_with_mongodb/RestAPI_Node_Express_Mongo.png"
                alt="AWS IAM Policies Explained: AWS Managed vs Customer Managed vs Inline Policies"
            />
            <p className='mt-2'>
                When we build a web application, we generally divide it into two main parts: the <strong>frontend</strong> and the <strong>backend</strong>.
            </p>
            <p className="mt-2">
                The frontend is the part that users see and interact with. For example, when I build a React application, I might create different pages for login, dashboards, products, users, or orders.
            </p>
            <p className="mt-2">
                But then the question is — <strong>where does all this data actually come from?</strong>
            </p>
            <p className="mt-2">
                This is where the backend and APIs come into the picture. The frontend sends requests to the backend through APIs, and the backend handles those requests, works with the database, and sends the required data back to the frontend.
            </p>
            <p className="mt-2">
                In this blog, I’ll explain how I can build a <strong>REST API</strong> using <strong>Node.js, Express.js, and MongoDB</strong>. Along with building the API, I’ll also explain how these three technologies work together and how they are used in a real-world web application.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>What is a REST API?</h1>
            <p className='mt-2'>
                Before we start building anything, let's understand what a REST API actually means.
            </p>
            <p className='mt-2'>
                REST stands for <strong>Representational State Transfer</strong>.
            </p>
            <p className='mt-2'>
                In simple terms, a REST API is a way for the frontend and backend to communicate with each other using HTTP requests.
            </p>
            <p className='mt-2'>
                For example, imagine we are building a task management application.
            </p>
            <p className='mt-2'>
                The user wants to see all their tasks. The frontend sends a request to the backend:
            </p>
            <Code language='text' code={`
GET /api/tasks
`} />
            <p className='mt-2'>
                The backend receives this request, gets the data from MongoDB, and sends the tasks back to the frontend.
            </p>
            <p className='mt-2'>
                The communication looks something like this:
            </p>
            <Code language='text' code={`Frontend
   ↓
HTTP Request
   ↓
Express / Node.js
   ↓
MongoDB
   ↓
Response
   ↓
Frontend`} />
            <p className='mt-2'>
                So, the frontend doesn't normally communicate directly with MongoDB.
            </p>
            <p className='mt-2'>
                Instead, the API acts as a middle layer between the frontend and the database.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Why do we use Node.js, Express, and MongoDB?</h1>
            <p className='mt-2'>Now let's understand the role of each technology.</p>
            <br />

            <p className='text-xl font-semibold'>Node.js</p>
            <p className='mt-2'>
                Node.js allows us to run JavaScript on the server.
            </p>
            <p className="mt-2">
                If you are already working with JavaScript on the frontend, using Node.js on the backend means you can use JavaScript throughout the application.
            </p>
            <p className="mt-2">For example, we can create a simple server using Node.js.</p>
            <Code language='js' code={`const message = "Hello from Node.js";

console.log(message);`} />
            <p className='mt-2'>Of course, a real application needs more than this, and that's where Express comes in.</p>
            <br />

            <p className='text-xl font-semibold'>What is Express.js?</p>
            <p className='mt-2'>
                Express.js is a lightweight web framework built on top of Node.js.
            </p>
            <p className='mt-2'>
                It makes it much easier to create APIs, handle routes, work with requests and responses, and use middleware.
            </p>
            <p className='mt-2'>For example:</p>
            <Code language='js' code={`app.get("/api/tasks", (req, res) => {
  res.json({
    message: "Tasks fetched successfully"
  });
});`} />
            <p className='mt-2'>
                Here, whenever someone sends a <strong>GET</strong> request to <strong>/api/tasks</strong>, Express handles that request and sends a JSON response.
            </p>
            <p className='mt-2'>
                This makes creating APIs much simpler.
            </p>
            <br />

            <p className='text-xl font-semibold'>What is MongoDB?</p>
            <p className='mt-2'>
                Since I’ve already explained MongoDB and its basic concepts in my previous blog, I won’t go into too much detail here.
            </p>
            <p className='mt-2'>
                MongoDB is the database I’ll use to store the data for this REST API. It is a <strong>NoSQL document database</strong>, which means that instead of storing data in traditional rows and columns like MySQL, MongoDB stores data as documents.
            </p>
            <p className='mt-2'>For example, a task document can look like this:</p>
            <Code language='json' code={`{
  "title": "Learn REST APIs",
  "completed": false
}`} />
            <p className='mt-2'>
                This document-based structure works naturally with JavaScript because MongoDB documents are represented in a JSON-like format, which makes it convenient to work with Node.js and Express.js.
            </p>
            <p className='mt-2'>
                If you’re new to MongoDB or want to understand how MongoDB works in more detail, you can first check out my previous blog, <a href="https://staropstech.com/blog/mongodb-explained-a-beginners-guide-to-nosql-databases" target="_blank" className='text-green-500 font-semibold'>MongoDB Explained: A Beginner’s Guide to NoSQL Databases</a>, where I’ve covered the basics of MongoDB, documents, collections, CRUD operations, and other important concepts.
            </p>
            <p className='mt-2'>
                For this blog, I’ll focus more on how MongoDB connects with Node.js and Express.js to build a REST API.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Setting Up Our Project</h1>
            <p className='mt-2'>
                Now that we understand the three technologies, let's create a small REST API.
            </p>
            <p className='mt-2'>
                I'm going to use a simple <strong>Task Management API</strong> as an example.
            </p>
            <p className='mt-2'>First, let's create our project:</p>
            <Code language='bash' code={`
mkdir task-api
cd task-api
npm init -y
`} />
            <p className='mt-2'>Now we need to install the packages we'll use:</p>
            <Code language='bash' code={`
npm install express mongoose dotenv
`} />
            <p className='mt-2'>Here is what each package is doing:</p>
            <ul className='ml-6 list-disc space-y-1'>
                <li><strong>Express</strong> – helps us create the API and handle HTTP requests.</li>
                <li><strong>Mongoose</strong> – helps us work with MongoDB from Node.js.</li>
                <li><strong>dotenv</strong> – allows us to store configuration values such as our database URL in environment variables.</li>
            </ul>
            <p className='mt-2'>For development, we can also install Nodemon:</p>
            <Code language='bash' code={`
npm install --save-dev nodemon
`} />
            <p className='mt-2'>Nodemon automatically restarts our server whenever we make changes to our code.</p>
            <br />

            <h1 className='text-2xl font-semibold'>Creating Our Server</h1>
            <p className='mt-2'>Let's create a file called:</p>
            <Code language='text' code={`
server.js
`} />
            <p className='mt-2'>Inside this file, we'll create our Express server.</p>
            <Code language='js' code={`
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`} />
            <p className='mt-2'>There are a few important things happening here.</p>
            <p className='mt-2'>First, we're importing Express:</p>
            <Code language='js' code={`
const express = require("express");
`} />
            <p className='mt-2'>Then we create our Express application:</p>
            <Code language='js' code={`
const app = express();
`} />
            <p className='mt-2'>We also use:</p>
            <Code language='js' code={`
app.use(express.json());
`} />
            <p className='mt-2'>This allows our API to understand JSON data sent in the request body.</p>
            <p className='mt-2'>Finally, we start the server:</p>
            <Code language='js' code={`
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`} />
            <p className='mt-2'>If everything is working correctly, our server will run on:</p>
            <Code language='text' code={`
http://localhost:5000
`} />
            <br />

            <h1 className='text-2xl font-semibold'>Connecting MongoDB</h1>
            <p className='mt-2'>Now our server is running, but we haven't connected it to a database yet.</p>
            <p className='mt-2'>Let's add our MongoDB connection.</p>
            <p className='mt-2'>First, create a <code className='bg-gray-100 px-1 rounded'>.env</code> file:</p>
            <Code language='bash' code={`
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskdb
`} />
            <p className='mt-2'>If you're using MongoDB Atlas, you can put your Atlas connection string here instead.</p>
            <p className='mt-2'>Now we can connect MongoDB using Mongoose:</p>
            <Code language='js' code={`
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });`} />
            <p className='mt-2'>Now our application has two important connections:</p>
            <Code language='text' code={`
Client
  ↓
Express / Node.js
  ↓
MongoDB
`} />
            <p className='mt-2'>The Express server handles the API requests, while MongoDB stores our data.</p>
            <br />

            <h1 className='text-2xl font-semibold'>Creating a Model</h1>
            <p className='mt-2'>Now let's define what our task data should look like.</p>
            <p className='mt-2'>We'll create:</p>
            <Code language='text' code={`
models/Task.js
`} />
            <p className='mt-2'>Inside this file:</p>
            <Code language='js' code={`
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Task", taskSchema);`} />
            <p className='mt-2'>Here we're creating a schema for our tasks.</p>
            <p className='mt-2'>Each task will have:</p>
            <ul className='ml-6 list-disc space-y-1 font-semibold'>
                <li>title</li>
                <li>description</li>
                <li>completed</li>
                <li>createdAt</li>
                <li>updatedAt</li>
            </ul>
            <p className='mt-2'>For example:</p>
            <Code language='json' code={`{
  "title": "Learn Node.js",
  "description": "Build a REST API",
  "completed": false
}`} />
            <p className='mt-2'>The <code className='font-semibold px-1 rounded'>timestamps: true</code> option automatically adds <code className='font-semibold px-1 rounded'>createdAt</code> and <code className='font-semibold px-1 rounded'>updatedAt</code>.</p>
            <br />

            <h1 className='text-2xl font-semibold'>Creating Our API Routes</h1>
            <p className='mt-2'>Now we need to tell our application which URLs should perform which actions.</p>
            <p className='mt-2'>We'll create:</p>
            <Code language='text' code={`
routes/taskRoutes.js
`} />
            <p className='mt-2'>Let's start with getting all tasks.</p>
            <Code language='js' code={`
const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks"
    });
  }
});

module.exports = router;`} />
            <p className='mt-2'>Then we connect these routes to our main server:</p>
            <Code language='js' code={`
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);
`} />
            <p className='mt-2'>Now when we call:</p>
            <Code language='text' code={`
GET /api/tasks
    `} />
            <p className='mt-2'>our application will fetch the tasks from MongoDB and return them.</p>
            <p className='mt-2'>If there are no tasks yet, we'll get:</p>
            <Code language='json' code={`
[]
`} />
            <br />

            <p className='text-xl font-semibold'>Creating a Task</p>
            <p className='mt-2'>Getting data is useful, but we also need to create new data.</p>
            <p className='mt-2'>For that, we'll use the <code className='bg-gray-100 px-1 rounded'>POST</code> HTTP method.</p>
            <Code language='js' code={`
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task"
    });
  }
});`} />
            <p className='mt-2'>Now the frontend can send a request like:</p>
            <Code language='text' code={`
POST /api/tasks
`} />
            <p className='mt-2'>with this data:</p>
            <Code language='json' code={`{
  "title": "Learn Express",
  "description": "Create my first REST API"
}`} />
            <p className='mt-2'>The backend receives the data, creates a MongoDB document, and sends the newly created task back to the frontend.</p>
            <br />

            <p className='text-xl font-semibold'>Getting a Single Task</p>
            <p className='mt-2'>What if we don't want all the tasks?</p>
            <p className='mt-2'>Suppose we want to get only one particular task.</p>
            <p className='mt-2'>We can use the task's MongoDB ID.</p>
            <Code language='js' code={`
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch task"
    });
  }
});`} />
            <p className='mt-2'>Now we can call:</p>
            <Code language='text' code={`
GET /api/tasks/66f123...
`} />
            <p className='mt-2'>The <code className='px-1 rounded'>:id</code> is a route parameter.</p>
            <p className='mt-2'>We can access it using:</p>
            <Code language='js' code={`
req.params.id
`} />
            <p className='mt-2'>This ID is then used to find the corresponding document in MongoDB.</p>
            <br />

            <p className='text-xl font-semibold'>Updating a Task</p>
            <p className='mt-2'>Next, let's say the user completes a task.</p>
            <p className='mt-2'>We need to update the existing document.</p>
            <p className='mt-2'>For that, we can use <code className='bg-gray-100 px-1 rounded'>PUT</code>.</p>
            <Code language='js' code={`
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task"
    });
  }
});`} />
            <p className='mt-2'>For example, the frontend can send:</p>
            <Code language='text' code={`
PUT /api/tasks/66f123...
`} />
            <p className='mt-2'>with:</p>
            <Code language='json' code={`{
  "completed": true
}`} />
            <p className='mt-2'>MongoDB will update the task and return the updated document.</p>
            <br />

            <p className='text-xl font-semibold'>Deleting a Task</p>
            <p className='mt-2'>Finally, we need to be able to delete a task.</p>
            <p className='mt-2'>For this, we'll use the <code className='bg-gray-100 px-1 rounded'>DELETE</code> method.</p>
            <Code language='js' code={`
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task"
    });
  }
});`} />
            <p className='mt-2'>Now we have completed the basic CRUD operations.</p>
            <br />

            <h1 className='text-2xl font-semibold'>Understanding CRUD</h1>
            <p className='mt-2'>
                CRUD is something you'll see in almost every backend application.
            </p>
            <p className='mt-2'>It stands for:</p>
            <ul className='ml-6 list-disc space-y-1'>
                <li><strong>Create</strong></li>
                <li><strong>Read</strong></li>
                <li><strong>Update</strong></li>
                <li><strong>Delete</strong></li>
            </ul>
            <p className='mt-2'>In our task application, the API looks like this:</p>
            <table className="table-auto w-full border border-gray-300 mt-2">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Operation</th>
                        <th className="border p-2 text-left">Method</th>
                        <th className="border p-2 text-left">Endpoint</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border p-2 font-semibold">Create task</td>
                        <td className="border p-2">POST</td>
                        <td className="border p-2">/api/tasks</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-semibold">Get all tasks</td>
                        <td className="border p-2">GET</td>
                        <td className="border p-2">/api/tasks</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-semibold">Get one task</td>
                        <td className="border p-2">GET</td>
                        <td className="border p-2">/api/tasks/:id</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-semibold">Update task</td>
                        <td className="border p-2">PUT</td>
                        <td className="border p-2">/api/tasks/:id</td>
                    </tr>
                    <tr>
                        <td className="border p-2 font-semibold">Delete task</td>
                        <td className="border p-2">DELETE</td>
                        <td className="border p-2">/api/tasks/:id</td>
                    </tr>
                </tbody>
            </table>
            <p className='mt-2'>
                Once you understand CRUD, you'll start recognizing the same pattern in applications such as e-commerce systems, admin dashboards, booking applications, social media platforms, and many other products.
            </p>
            <br />

            <h1 className='text-2xl font-semibold'>Where Does Middleware Come In?</h1>
            <p className='mt-2'>Middleware is another important concept in Express.</p>
            <p className='mt-2'>You can think of middleware as a function that runs while a request is moving through the backend.</p>
            <p className='mt-2'>For example:</p>
            <Code language='js' code={`app.use(express.json());`} />
            <p className='mt-2'>is middleware that allows us to process JSON request bodies.</p>
            <p className='mt-2'>We can also create our own middleware.</p>
            <p className='mt-2'>For example, a simple logger:</p>
            <Code language='js' code={`const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
};

app.use(logger);`} />
            <p className='mt-2'>Now whenever someone sends a request, we can see information about that request in the server console.</p>
            <p className='mt-2'>In real applications, middleware can also be used for:</p>
            <ul className='ml-6 list-disc space-y-1'>
                <li>Authentication</li>
                <li>Authorization</li>
                <li>Validation</li>
                <li>Logging</li>
                <li>Error handling</li>
                <li>Rate limiting</li>
            </ul>
            <br />

            <h1 className='text-2xl font-semibold'>Testing the API</h1>
            <p className='mt-2'>
                Before connecting our API to React or another frontend, it's a good idea to test the API separately.
            </p>
            <p className='mt-2'>Tools such as Postman make this very easy.</p>
            <p className='mt-2'>For example, we can test:</p>
            <Code language='text' code={`GET http://localhost:5000/api/tasks`} />
            <p className='mt-2'>or create a task using:</p>
            <Code language='text' code={`POST http://localhost:5000/api/tasks`} />
            <p className='mt-2'>with:</p>
            <Code language='json' code={`{
  "title": "Learn MongoDB",
  "description": "Understand MongoDB CRUD operations"
}`} />
            <p className='mt-2'>Testing the API separately helps us identify backend problems before we connect it to the frontend.</p>
            <br />

            <h1 className='text-2xl font-semibold'>Connecting the REST API with React</h1>
            <p className='mt-2'>Once our API is working, our React application can consume it.</p>
            <p className='mt-2'>For example:</p>
            <Code language='js' code={`const response = await fetch(
  "http://localhost:5000/api/tasks"
);

const tasks = await response.json();

console.log(tasks);`} />
            <p className='mt-2'>
                The important thing to understand here is that React doesn't need to know how MongoDB works.
            </p>
            <p className='mt-2'>React simply says:</p>
            <p className='mt-2 ml-4 italic'>"Give me the tasks."</p>
            <p className='mt-2'>The API handles the rest:</p>
            <Code language='text' code={`React
  ↓
GET /api/tasks
  ↓
Express
  ↓
Mongoose
  ↓
MongoDB
  ↓
Tasks
  ↓
Express
  ↓
React`} />
            <p className='mt-2'>This separation between frontend, backend, and database is one of the important concepts behind modern web applications.</p>
            <br />

            <h1 className='text-2xl font-semibold'>A Few Things to Keep in Mind</h1>
            <p className='mt-2'>Building a basic REST API is relatively simple, but production applications require more attention.</p>
            <p className='mt-2'>For example, we should:</p>
            <ul className='ml-6 list-disc space-y-3'>
                <li>
                    <strong>Validate user input</strong>
                    <br />
                    Don't assume that everything coming from the frontend is correct.
                </li>
                <li>
                    <strong>Protect sensitive information</strong>
                    <br />
                    Database URLs, API keys, and secrets should be stored in environment variables rather than directly inside the source code.
                </li>
                <li>
                    <strong>Handle errors properly</strong>
                    <br />
                    The API should return useful messages and appropriate HTTP status codes.
                    <p className='mt-2'>For example:</p>
                    <Code language='text' code={`200 → Successful request
201 → Resource created
400 → Bad request
401 → Unauthorized
403 → Forbidden
404 → Resource not found
500 → Server error`} />
                </li>
                <li>
                    <strong>Keep the project organized</strong>
                    <br />
                    As the application grows, separating routes, controllers, models, middleware, and other responsibilities makes the code easier to understand and maintain.
                </li>
            </ul>
            <br />

            <h1 className='text-2xl font-semibold'>Final Thoughts</h1>
            <p className='mt-2'>
                Building a REST API with <strong>Node.js, Express, and MongoDB</strong> is one of the best ways to understand how the backend of a web application works.
            </p>
            <p className='mt-2'>At first, the flow might look complicated:</p>
            <Code language='text' code={`Frontend
    ↓
API Request
    ↓
Express
    ↓
Controller
    ↓
Mongoose
    ↓
MongoDB`} />
            <p className='mt-2'>But once you understand what each layer is responsible for, the whole process becomes much easier to follow.</p>
            <ul className='ml-6 list-disc space-y-1'>
                <li><strong>Node.js</strong> gives us the JavaScript runtime.</li>
                <li><strong>Express.js</strong> helps us build and manage our API.</li>
                <li><strong>MongoDB</strong> stores our application data.</li>
                <li>And <strong>Mongoose</strong> helps our Node.js application communicate with MongoDB in a structured way.</li>
            </ul>
            <p className='mt-2'>
                From here, we can take the same basic REST API and add authentication with JWT, user management, validation, pagination, file uploads, search, filtering, and many other features required in real-world applications.
            </p>
            <p className='mt-2'>
                The important part is to first understand the basic request-and-response flow. Once that becomes clear, building more complex backend applications becomes much easier.
            </p>
        </>
    )
}

export default SeventyOne