import React from 'react'
import { Code } from '../../../utils/Helpers'

function Sixty() {
  return (
    <>
      <img
        className="max-h-[700px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/MongoDB_NOSQL/MongoDB_Beginner_Guide.png"
        alt="Homelab Push Notifications Using Uptime Kuma and Pushover"
      />
      <h1 className='text-2xl font-semibold mt-2'>
        Introduction
      </h1>
      <p>
        Every application needs a place to store its data, whether it's an e-commerce website, a social media platform, or a simple task manager. That's where databases play an important role.
      </p>
      <p className='mt-2'>

        For a long time, relational databases like MySQL and PostgreSQL have been the standard choice. They store data in tables with a fixed structure, which works well for applications with predictable data.
      </p>
      <p className='mt-2'>
        But modern applications are different. Data changes frequently, new features are added often, and applications need to handle a growing number of users. In many cases, a fixed schema can make development less flexible.
      </p>
      <p className='mt-2' >

        That's why MongoDB has become so popular. As a NoSQL database, it stores data in flexible, document-based formats, making it easier to build applications that can grow and evolve over time.
      </p>
      <p className='mt-2'>In this guide, I'll walk you through the basics of MongoDB: </p>
      <ul className='ml-6 list-disc space-y-1'>
        <li>
          what MongoDB is ?
        </li>
        <li>
          why NoSQL databases exist ?
        </li>
        <li>
          How MongoDB stores data, its core building blocks ?
        </li>
        <li>
          How it compares with traditional SQL databases.
        </li>
      </ul>
      <br />

      <p className='text-2xl font-semibold'>Why Do We Need NoSQL Databases? </p>
      <p className='mt-2'>
        Let's take a simple example of an e-commerce application.
      </p>
      <p className='mt-2'>
        Different products have different information. A laptop needs details like the processor, RAM, and storage, while a smartphone needs a camera, battery, and display size. A book, on the other hand, only needs details like the author, ISBN, and publisher.
      </p>
      <p className='mt-2'>
        If you store all of these in a single SQL table, you'll end up with a lot of empty columns because every product doesn't share the same attributes.
      </p>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Product</th>
            <th className="border p-2 text-left">Brand</th>
            <th className="border p-2 text-left">Processor</th>
            <th className="border p-2 text-left">RAM</th>
            <th className="border p-2 text-left">SSD</th>
            <th className="border p-2 text-left">Camera</th>
            <th className="border p-2 text-left">Battery</th>
            <th className="border p-2 text-left">Author</th>
            <th className="border p-2 text-left">ISBN</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border p-2">Laptop</td>
            <td className="border p-2">Dell</td>
            <td className="border p-2">i7</td>
            <td className="border p-2">16GB</td>
            <td className="border p-2">512GB</td>
            <td className="border p-2">—</td>
            <td className="border p-2">—</td>
            <td className="border p-2">—</td>
            <td className="border p-2">—</td>
          </tr>

          <tr>
            <td className="border p-2">Phone</td>
            <td className="border p-2">Apple</td>
            <td className="border p-2">—</td>
            <td className="border p-2">—</td>
            <td className="border p-2">—</td>
            <td className="border p-2">48MP</td>
            <td className="border p-2">4500mAh</td>
            <td className="border p-2">—</td>
            <td className="border p-2">—</td>
          </tr>

          <tr>
            <td className="border p-2">Book</td>
            <td className="border p-2">—</td>
            <td className="border p-2">—</td>
            <td className="border p-2">—</td>
            <td className="border p-2">—</td>
            <td className="border p-2">—</td>
            <td className="border p-2">—</td>
            <td className="border p-2">Robert Martin</td>
            <td className="border p-2">978....</td>
          </tr>
        </tbody>
      </table>

      <p className='mt-2'>
        As your application grows, adding new product attributes often means changing the database schema, which can become time-consuming and harder to maintain.
      </p>
      <p className='mt-2'>
        MongoDB solves this problem by allowing each record to store only the fields it actually needs. This flexibility makes it a great choice for applications where data structures can change over time.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>What Is MongoDB?</h1>
      <p className='mt-2'>
        MongoDB is an open-source, document-oriented NoSQL database that stores data as documents instead of traditional rows and columns.
      </p>
      <p className='mt-2'>
        One of its biggest advantages is its flexible schema. Unlike relational databases, every document doesn't have to follow the same structure.
      </p>
      <p className='mt-2'>
        For example, one document can look like this:
      </p>
      <Code language='SQL' code=
        {`{
  "name": "Alice",
  "age": 25
}`} />
      <p>While another document in the same collection can include extra information:</p>
      <Code language='SQL' code=
        {`{
  "name": "Bob",
  "age": 28,
  "skills": ["React", "Node.js", "MongoDB"]
}`} />

      <p>
        Both documents can exist in the same collection without any issues. This flexibility makes it easy to add new fields as your application evolves without changing the entire database structure.
      </p>
      <p className='mt-2'>
        Behind the scenes, MongoDB stores documents in <strong>BSON (Binary JSON)</strong>, a binary format that extends JSON by supporting additional data types like dates, ObjectId, and binary data, making storage and querying more efficient.
      </p>
      <br />
      <h1 className='font-semibold text-2xl'>Understanding MongoDB's Core Concepts</h1>
      <p className='mt-2'>
        Before you start working with MongoDB, it's helpful to understand its four core building blocks: Database, Collection, Document, and Field.
      </p>

      <p className='text-lg font-semibold mt-2'>
        1. Database
      </p>
      <p className='mt-2'>
        A database is the top-level container that stores related collections.
      </p>
      <p className='mt-2'>
        For example:
      </p>
      <Code language='bash' code={`
Company Database
│
├── Employees
├── Products
├── Orders
└── Customers`} />

      <p>
        A single MongoDB server can host multiple databases, each used for a different application or project.
      </p>
      <p className='text-lg mt-2 font-semibold'>
        2. Collection
      </p>
      <p className='mt-2'>
        A collection is similar to a table in a relational database, but it's much more flexible.
      </p>
      <p className='mt-2'>
        Unlike SQL tables, documents in a collection don't need to have the same fields.
      </p>
      <p className='mt-2'>
        For example:
      </p>
      <Code language='SQL' code={`
{
  "name": "John",
  "department": "Engineering"
}

{
  "name": "Sarah",
  "department": "HR",
  "experience": 5
}
        `} />

      <p>
        Even though the documents have different structures, both can be stored in the same collection.
      </p>
      <p className='text-lg mt-2 font-semibold'>
        3. Document
      </p>
      <p className='mt-2'>
        A document is the basic unit of data in MongoDB. It's simply a JSON-like object that stores related information.
      </p>
      <p className='mt-2'>
        Example:
      </p>
      <Code language="SQL" code={`
{
  "_id": "6870fcb1d9...",
  "name": "John",
  "email": "john@example.com",
  "skills": [
    "React",
    "Next.js",
    "MongoDB"
  ],
  "experience": 2
}
        `} />

      <p>
        A document can store different types of data, including strings, numbers, arrays, objects, dates, booleans, and even nested documents. Since it closely resembles JavaScript objects, it feels natural for modern web developers.
      </p>
      <p className='text-lg font-semibold mt-2'>
        4. Field
      </p>
      <p>
        A field is a single piece of information inside a document.
      </p>
      <Code language='SQL' code={`
{
  "name": "Alice",
  "city": "Delhi",
  "age": 25
}
        `} />
      <p>
        In this example, name, city, and age are fields. Each field can store a different type of data, giving MongoDB the flexibility to handle a wide variety of use cases.
      </p>
      <br />
      <p className='mt-2 text-2xl font-semibold'>SQL vs MongoDB
      </p>
      <p className='mt-2'>
        One of the best ways to understand MongoDB is by comparing it with a traditional SQL database.
      </p>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">SQL</th>
            <th className="border p-2 text-left">MongoDB</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border p-2">Database</td>
            <td className="border p-2">Database</td>
          </tr>

          <tr>
            <td className="border p-2">Table</td>
            <td className="border p-2">Collection</td>
          </tr>
          <tr>
            <td className="border p-2">Row</td>
            <td className="border p-2">Document</td>
          </tr>
          <tr>
            <td className="border p-2">Column</td>
            <td className="border p-2">Field</td>
          </tr>
          <tr>
            <td className="border p-2">Fixed Schema</td>
            <td className="border p-2">Flexible Schema</td>
          </tr>
          <tr>
            <td className="border p-2">SQL Queries</td>
            <td className="border p-2">JSON-like Queries</td>
          </tr>
          <tr>
            <td className="border p-2">
              Joins
            </td>
            <td className="border p-2">
              Embedded Documents & References
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              Vertical Scaling
            </td>
            <td className="border p-2">
              Horizontal Scaling
            </td>
          </tr>
        </tbody>
      </table >
      <p className='text-lg mt-2 font-semibold'>Example: Storing User Data</p>
      <p className='mt-2'>
        In a SQL database, user information is typically stored as a row in a table.
      </p>
      <p className='mt-2 font-semibold'>
        SQL
      </p>
      <Code language='bash' code={`
Users Table

ID | Name  | Email
----------------------------
1  | Alice | alice@example.com
        `} />

      <p>
        In MongoDB, the same data is stored as a document.
      </p>
      <p className='mt-2 font-semibold'>
        MongoDB
      </p>
      <Code language="SQL" code={`
{
  "_id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
`} />

      <p>
        Now imagine you want to add the user's social profiles.
      </p>
      <p className='mt-2'>
        In SQL, you'd usually create a separate table and link it using relationships or joins.
      </p>
      <p className='mt-2'>
        With MongoDB, you can simply add the new data to the existing document:
      </p>
      <Code language='SQL' code={`
{
  "_id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "social": {
      "github": "alice-dev",
      "linkedin": "alice-tech"
  }
}
        `} />
      <p>
        By keeping related information in a single document, MongoDB often reduces the need for complex joins and makes working with related data much simpler.
      </p>
      <br />
      <p className='text-2xl font-semibold'>Why Developers Choose MongoDB</p>
      <p className='mt-2'>MongoDB has become a popular choice for both startups and large enterprises because it offers the flexibility and scalability needed for modern applications.
      </p>
      <p className='mt-2'>
        Some of its key advantages are:
      </p>
      <ul className='list-disc ml-6 space-y-1'>
        <li><strong>Flexible Schema:</strong> Add or modify fields without changing the entire database structure.</li>
        <li><strong>Developer-Friendly:</strong>Uses a JSON-like document format that's easy to work with, especially for JavaScript developers. </li>
        <li><strong>High Performance:</strong>Designed for fast read and write operations. </li>
        <li><strong>Scalable:</strong> Supports horizontal scaling through sharding, making it suitable for growing applications.</li>
        <li><strong>Highly Available:</strong>Replica sets help keep your application running even if a server goes down.</li>
        <li><strong>Powerful Queries:</strong> Supports filtering, sorting, indexing, and aggregation for efficient data retrieval.</li>
      </ul>
      <p className='mt-2'>Whether you're building a personal project or a large production application, MongoDB makes it easier to handle changing requirements and scale as your application grows.</p>
      <br />
      <p className='font-semibold text-2xl'>Performing CRUD Operations in MongoDB</p>
      <p className='mt-2'>CRUD stands for <strong>Create, Read, Update, and Delete</strong> the four basic operations you'll use when working with MongoDB.</p>
      <p className='mt-2'>Let's use a simple <strong>users</strong> collection as an example.</p>
      <p className='mt-2 text-lg font-semibold'>1. Create (Insert Data)</p>
      <p className='mt-2'>To add a new document to the collection:</p>
      <Code language='SQL' code={`
db.users.insertOne({
  name: "Sachin",
  email: "sachin@example.com",
  role: "Frontend Developer",
  experience: 2
});`} />

      <p className='mt-2'>
        This inserts a new document into the <strong>users</strong> collection. If the collection doesn't already exist, MongoDB creates it automatically.
      </p>

      <p className='font-semibold text-lg mt-2'>2. Read (Retrieve Data)</p>
      <p className='mt-2'>To retrieve all documents:</p>
      <Code language='SQL' code={`
db.users.find();
`} />
      <p>
        To find users with a specific role:
      </p>
      <Code language='SQL' code={`
db.users.find({
  role: "Frontend Developer"
});
        `} />
      <p>
        You can also filter data, sort the results, or limit the number of documents returned.
      </p>
      <p className='font-semibold text-lg mt-2'>3. Update (Modify Data)</p>
      <p className='mt-2'>To update a user's experience:</p>
      <Code language="SQL" code={`
db.users.updateOne(
  {name: "Sachin" },
  {
    $set: {
    experience: 3
    }
  }
);
`} />

      <p>
        The <strong>$set</strong> operator updates only the specified field, while the rest of the document remains unchanged.
      </p>
      <p className='text-lg font-semibold mt-2'>4. Delete (Remove Data)</p>
      <p className='mt-2'>To delete a single document:</p>
      <Code language='SQL' code={`
db.users.deleteOne({
  name: "Sachin"
});
`} />
      <p>
        If you need to remove multiple documents at once, you can use <strong>deleteMany()</strong>
      </p>
      <br />

      <p className='text-2xl font-semibold'>A Real-World Example</p>

      <p className='mt-2'>
        Let's say you're building a simple blog application. Instead of storing blog
        posts and comments in separate tables, MongoDB allows you to keep related
        data together in a single document.
      </p>

      <Code
        language='SQL'
        code={`
{
  "title": "Getting Started with MongoDB",
  "author": "Leon",
  "tags": [
    "MongoDB",
    "NoSQL",
    "Database"
  ],
  "published": true,
  "comments": [
    {
      "user": "John",
      "message": "Great article!"
    },
    {
      "user": "Alice",
      "message": "Very helpful."
    }
  ]
}
`}
      />

      <p className='mt-2'>
        Here, the comments are stored directly inside the blog document. In a
        traditional SQL database, you'd typically create a separate comments table
        and use joins to fetch the data. With MongoDB, keeping related information
        together often makes data retrieval simpler and more efficient.
      </p>

      <br />

      <p className='text-2xl font-semibold'>Common Use Cases of MongoDB</p>

      <p className='mt-2'>
        MongoDB is a great fit for applications where the data structure isn't
        always the same.
      </p>

      <p className='text-lg font-semibold mt-4'>E-commerce</p>

      <p className='mt-2'>
        Different products have different attributes.
      </p>

      <ul className='list-disc ml-6 space-y-1 mt-2'>
        <li><strong>Laptop</strong>: RAM, Processor, Storage</li>
        <li><strong>Phone</strong>: Camera, Battery</li>
        <li><strong>Shoes</strong>: Size, Material, Color</li>
      </ul>

      <p className='mt-2'>
        MongoDB lets each product store only the fields it needs, without forcing
        every product into the same structure.
      </p>

      <p className='text-lg font-semibold mt-4'>
        Content Management Systems (CMS)
      </p>

      <p className='mt-2'>
        Blogs, documentation sites, and news portals often have different content
        layouts and metadata. MongoDB makes it easy to handle these variations.
      </p>

      <p className='text-lg font-semibold mt-4'>
        Social Media Applications
      </p>

      <p className='mt-2'>
        Every user profile is different. Some users may have social links,
        portfolios, work history, and skills, while others only provide basic
        information. MongoDB handles these differences without requiring schema
        changes.
      </p>

      <p className='text-lg font-semibold mt-4'>
        Real-Time Applications
      </p>

      <p className='mt-2'>
        Applications like chat systems, live dashboards, notification services,
        and IoT platforms benefit from MongoDB's fast read and write performance.
      </p>

      <br />

      <p className='text-2xl font-semibold'>Advantages of MongoDB</p>

      <p className='mt-2'>
        MongoDB has become popular because it simplifies many challenges of modern
        application development.
      </p>

      <ul className='list-disc ml-6 space-y-2 mt-3'>
        <li>
          <strong>Flexible Schema:</strong> Add new fields as your application
          evolves without redesigning the database.
        </li>
        <li>
          <strong>Easy to Scale:</strong> Supports horizontal scaling using
          sharding.
        </li>
        <li>
          <strong>High Performance:</strong> Delivers fast read and write
          operations, especially when indexes are used effectively.
        </li>
        <li>
          <strong>Developer Friendly:</strong> Documents closely resemble
          JavaScript objects, making MongoDB a natural choice for developers
          using Node.js, React, or Next.js.
        </li>
        <li>
          <strong>Powerful Queries:</strong> Supports filtering, sorting,
          pagination, aggregation, text search, and geospatial queries.
        </li>
      </ul>

      <br />

      <p className='text-2xl font-semibold'>Limitations of MongoDB</p>

      <p className='mt-2'>
        Like any database, MongoDB has its trade-offs.
      </p>

      <ul className='list-disc ml-6 space-y-2 mt-3'>
        <li>
          <strong>Complex Transactions:</strong> Applications with heavy
          transactional requirements, such as banking systems, are often better
          suited to relational databases.
        </li>
        <li>
          <strong>Data Duplication:</strong> Embedding related data can sometimes
          result in duplicated information if the schema isn't designed
          carefully.
        </li>
        <li>
          <strong>Learning Curve:</strong> Developers coming from SQL may need
          some time to get comfortable with document-based modeling and
          MongoDB's query syntax.
        </li>
      </ul>

      <br />

      <p className='text-2xl font-semibold'>Best Practices for Beginners</p>

      <p className='mt-2'>
        If you're new to MongoDB, these practices will help you build better
        applications:
      </p>

      <ul className='list-disc ml-6 space-y-2 mt-3'>
        <li>Design your documents based on how your application accesses data.</li>
        <li>Create indexes for fields you search frequently.</li>
        <li>Avoid unnecessary duplicate data.</li>
        <li>Validate your data before storing it.</li>
        <li>Keep documents reasonably sized.</li>
        <li>Back up your production database regularly.</li>
        <li>Monitor query performance as your application grows.</li>
      </ul>

      <p className='mt-2'>
        A well-designed schema from the beginning can save you a lot of time as
        your project scales.
      </p>

      <br />

      <p className='text-2xl font-semibold'>
        When Should You Choose MongoDB?
      </p>

      <p className='mt-2'>
        MongoDB is a good choice when:
      </p>

      <ul className='list-disc ml-6 space-y-2 mt-3'>
        <li>Your application's data structure changes frequently.</li>
        <li>You need to scale across multiple servers.</li>
        <li>You're building APIs with Node.js or Express.</li>
        <li>Your application works primarily with JSON-like data.</li>
        <li>You want to develop quickly without frequent database migrations.</li>
      </ul>

      <p className='mt-2'>
        If your application depends heavily on complex joins, strict consistency,
        or advanced transactional workflows, a relational database like MySQL or
        PostgreSQL may be a better fit.
      </p>

      <br />

      <p className='text-2xl font-semibold'>Conclusion</p>

      <p className='mt-2'>
        MongoDB has become one of the most popular NoSQL databases because it
        offers the flexibility modern applications need. Its document-based
        approach makes it easier to work with changing data, build features
        faster, and scale as your application grows.
      </p>

      <p className='mt-2'>
        Whether you're creating a personal project, a startup MVP, or an
        enterprise application, MongoDB is a powerful option worth considering.
        The most important thing is choosing the database that best matches your
        application's requirements.
      </p>

    </>
  )
}

export default Sixty