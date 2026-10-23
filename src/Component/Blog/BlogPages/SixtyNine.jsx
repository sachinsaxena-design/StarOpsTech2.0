import React from 'react'
import { Code } from '../../../utils/Helpers'

function SixtyNine() {
  return (
    <>
      <img
        className="max-h-[700px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/MySQL_Explained_For_Beginner /MySql_DB.jpg"
        alt="MySQL Explained: A Beginner's Guide to Relational Databases"
      />
      <p className='mt-2'>
        If you've worked with MongoDB, you may already be familiar with the basics of storing, retrieving, and managing data in a database. MongoDB follows a document-based approach, where data is stored in flexible, JSON-like documents.
      </p>
      <p className='mt-2'>
        If you haven't read my previous article, <a href="https://staropstech.com/blog/mongodb-explained-a-beginners-guide-to-nosql-databases" className="text-blue-500 hover:underline">MongoDB Explained: A Beginner's Guide to NoSQL Databases</a> , I recommend checking it out first to understand how NoSQL databases work and how MongoDB handles data differently.
      </p>

      <p className='mt-2'>
        But what happens when your application deals with highly structured data, relationships between entities, and a strong need for data consistency and integrity?
      </p>  
      <p className='mt-2'>
        This is where MySQL comes in.
      </p>

      <p className='mt-2'>
        MySQL is one of the most widely used relational database management systems (RDBMS) for storing and managing structured data. Unlike MongoDB, which stores data in documents, MySQL organizes data into tables consisting of rows and columns. This structure makes it especially useful for applications where relationships between different types of data are important.
      </p>

      <p className='mt-2'>
        MySQL is widely used in web applications, enterprise software, e-commerce platforms, banking systems, content management systems, and many other real-world applications.
      </p>

      <p className='mt-2'>
        In this blog, we'll explore MySQL from the ground up. We'll understand databases, tables, rows, columns, SQL queries, primary and foreign keys, relationships, joins, and commonly used MySQL commands.
      </p>

      <p className='mt-2'>
        By the end of this guide, you'll have a clear understanding of how MySQL works and how it differs from a NoSQL database like MongoDB.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>What is MySQL?</h1>
      <p className='mt-2'>
        <strong>MySQL is an open-source relational database management system that uses SQL (Structured Query Language) to store, organize, and retrieve data.</strong>
      </p>
      <p className='mt-2'>
        Unlike MongoDB, which stores data as documents, MySQL stores data in <strong>tables</strong>.
      </p>
      <p className='mt-2'>
        For example, imagine we are building a simple user management system.
      </p>
      <p className='mt-2'>
        In MySQL, we could have a <strong>users</strong> table:
      </p>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">id</th>
            <th className="border p-2 text-left">name</th>
            <th className="border p-2 text-left">email</th>
            <th className="border p-2 text-left">age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">1</td>
            <td className="border p-2">Sachin</td>
            <td className="border p-2">sachin@example.com</td>
            <td className="border p-2">25</td>
          </tr>
          <tr>
            <td className="border p-2">2</td>
            <td className="border p-2">Rahul</td>
            <td className="border p-2">rahul@example.com</td>
            <td className="border p-2">27</td>
          </tr>
          <tr>
            <td className="border p-2">3</td>
            <td className="border p-2">Priya</td>
            <td className="border p-2">priya@example.com</td>
            <td className="border p-2">24</td>
          </tr>
        </tbody>
      </table>
      <p className='mt-2'>Here:</p>
      <ul className='ml-6 list-disc space-y-1'>
        <li><strong>users</strong> is the table.</li>
        <li><strong>id</strong>, <strong>name</strong>, <strong>email</strong>, and <strong>age</strong> are columns.</li>
        <li>Each individual user represents a row.</li>
        <li>Each value stored inside a row represents data for that user.</li>
      </ul>
      <p className='mt-2'>
        This structured approach makes MySQL particularly useful when your application works with well-defined relationships between different types of data.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>MySQL vs MongoDB</h1>
      <p className='mt-2'>
        Since MongoDB and MySQL are both widely used databases, it's useful to understand their basic difference.
      </p>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">MySQL</th>
            <th className="border p-2 text-left">MongoDB</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Relational database</td>
            <td className="border p-2">NoSQL database</td>
          </tr>
          <tr>
            <td className="border p-2">Data is stored in tables</td>
            <td className="border p-2">Data is stored in documents</td>
          </tr>
          <tr>
            <td className="border p-2">Uses rows and columns</td>
            <td className="border p-2">Uses documents and collections</td>
          </tr>
          <tr>
            <td className="border p-2">Uses SQL</td>
            <td className="border p-2">Uses MongoDB query syntax</td>
          </tr>
          <tr>
            <td className="border p-2">Schema is generally structured</td>
            <td className="border p-2">Schema is flexible</td>
          </tr>
          <tr>
            <td className="border p-2">Supports relationships using keys</td>
            <td className="border p-2">Relationships can be represented using embedded documents or references</td>
          </tr>
          <tr>
            <td className="border p-2">Strongly focused on relational data</td>
            <td className="border p-2">Well suited for flexible document-based data</td>
          </tr>
        </tbody>
      </table>
      <p className='mt-2'>For example, MongoDB might store a user as:</p>
      <Code language='javascript' code={`
{
  name: "Sachin",
  email: "sachin@example.com",
  age: 25
}`} />
      <p className='mt-2'>
        The same information in MySQL would typically be represented as a row inside a table.
      </p>
      <p className='mt-2'>
        Neither database is universally better. The right choice depends on your application's requirements.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>What is a Relational Database?</h1>
      <p className='mt-2'>
        Before understanding MySQL deeply, we need to understand the term <strong>relational database</strong>.
      </p>
      <p className='mt-2'>
        A relational database stores data in tables and allows those tables to be connected through relationships.
      </p>
      <p className='mt-2'>
        For example, an e-commerce application might have:
      </p>
      <Code language='bash' code={`
users
products
orders
order_items`} />
      <p className='mt-2'>
        A user can place multiple orders, and an order can contain multiple products.
      </p>
      <p className='mt-2'>
        Instead of putting everything into one large table, we can separate the data into logical tables and connect them using keys.
      </p>
      <p className='mt-2'>This provides:</p>
      <ul className='ml-6 list-disc space-y-1'>
        <li>Better organization</li>
        <li>Reduced data duplication</li>
        <li>Data consistency</li>
        <li>Easier querying</li>
        <li>Strong relationships between data</li>
      </ul>
      <br />

      <h1 className='text-2xl font-semibold'>What is SQL?</h1>
      <p className='mt-2'><strong>SQL stands for Structured Query Language.</strong></p>
      <p className='mt-2'>
        SQL is the language we use to communicate with relational databases such as MySQL.
      </p>
      <p className='mt-2'>With SQL, we can:</p>
      <ul className='ml-6 list-disc space-y-1'>
        <li>Create databases</li>
        <li>Create tables</li>
        <li>Insert data</li>
        <li>Read data</li>
        <li>Update data</li>
        <li>Delete data</li>
        <li>Filter records</li>
        <li>Sort records</li>
        <li>Join multiple tables</li>
        <li>Group data</li>
        <li>Manage database structures</li>
      </ul>
      <p className='mt-2'>For example:</p>
      <Code language='sql' code={`SELECT * FROM users;`} />
      <p className='mt-2'>
        This query asks MySQL to return all records from the <strong>users</strong> table.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Creating a Database</h1>
      <p className='mt-2'>Before creating tables, we generally create a database.</p>
      <Code language='sql' code={`CREATE DATABASE my_app;`} />
      <p className='mt-2'>To use the database:</p>
      <Code language='sql' code={`USE my_app;`} />
      <p className='mt-2'>Now any tables we create will belong to the <strong>my_app</strong> database.</p>
      <p className='mt-2'>To see available databases:</p>
      <Code language='sql' code={`SHOW DATABASES;`} />
      <br />

      <h1 className='text-2xl font-semibold'>Creating a Table</h1>
      <p className='mt-2'>Let's create a simple <strong>users</strong> table.</p>
      <Code language='sql' code={`
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(150),
    age INT
);`} />
      <p className='mt-2'>Let's understand what each part means.</p>
      <p className='text-lg font-semibold mt-2'>id INT</p>
      <p className='mt-2'>The <strong>id</strong> column stores integer values.</p>
      <p className='text-lg font-semibold mt-2'>PRIMARY KEY</p>
      <p className='mt-2'>The primary key uniquely identifies each record.</p>
      <p className='text-lg font-semibold mt-2'>AUTO_INCREMENT</p>
      <p className='mt-2'>MySQL automatically generates the next ID when a new record is inserted.</p>
      <p className='text-lg font-semibold mt-2'>VARCHAR(100)</p>
      <p className='mt-2'><strong>VARCHAR</strong> is used to store variable-length text.</p>
      <p className='text-lg font-semibold mt-2'>age INT</p>
      <p className='mt-2'>The <strong>age</strong> column stores integer values.</p>
      <p className='mt-2'>Our table structure now looks like:</p>
      <Code language='bash' code={`
users
│
├── id
├── name
├── email
└── age`} />
      <br />

      <h1 className='text-2xl font-semibold'>Understanding Data Types</h1>
      <p className='mt-2'>
        MySQL provides different data types depending on the kind of information you want to store.
      </p>
      <p className='mt-2'>Some commonly used types are:</p>
      <p className='text-lg font-semibold mt-2'>Numeric Types</p>
      <Code language='sql' code={`
INT
BIGINT
DECIMAL
FLOAT`} />
      <p className='mt-2'>For example:</p>
      <Code language='sql' code={`age INT`} />
      <p className='text-lg font-semibold mt-2'>String Types</p>
      <Code language='sql' code={`
VARCHAR
CHAR
TEXT`} />
      <p className='mt-2'>For example:</p>
      <Code language='sql' code={`name VARCHAR(100)`} />
      <p className='text-lg font-semibold mt-2'>Date and Time Types</p>
      <Code language='sql' code={`
DATE
DATETIME
TIMESTAMP
TIME`} />
      <p className='mt-2'>For example:</p>
      <Code language='sql' code={`created_at TIMESTAMP`} />
      <p className='mt-2'>
        Choosing an appropriate data type helps keep your database efficient and predictable.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Inserting Data</h1>
      <p className='mt-2'>Once our table is created, we can insert records.</p>
      <Code language='sql' code={`
INSERT INTO users (name, email, age)
VALUES ('Sachin', 'sachin@example.com', 25);`} />
      <p className='mt-2'>We can insert multiple records as well:</p>
      <Code language='sql' code={`
INSERT INTO users (name, email, age)
VALUES
('Rahul', 'rahul@example.com', 27),
('Priya', 'priya@example.com', 24);`} />
      <p className='mt-2'>Now our table contains multiple users.</p>
      <br />

      <h1 className='text-2xl font-semibold'>Reading Data with SELECT</h1>
      <p className='mt-2'>
        The <strong>SELECT</strong> statement is one of the most commonly used SQL commands.
      </p>
      <p className='mt-2'>To retrieve all users:</p>
      <Code language='sql' code={`SELECT * FROM users;`} />
      <p className='mt-2'>To retrieve specific columns:</p>
      <Code language='sql' code={`SELECT name, email FROM users;`} />
      <p className='mt-2'>
        Instead of retrieving everything, we can select only the information our application needs.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Filtering Data with WHERE</h1>
      <p className='mt-2'>Suppose we want to find users who are older than 25.</p>
      <Code language='sql' code={`
SELECT * 
FROM users
WHERE age > 25;`} />
      <p className='mt-2'>We can also search for a specific email:</p>
      <Code language='sql' code={`
SELECT *
FROM users
WHERE email = 'sachin@example.com';`} />
      <p className='mt-2'>
        The <strong>WHERE</strong> clause allows us to filter records based on conditions.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Using AND and OR</h1>
      <p className='mt-2'>Multiple conditions can be combined using <strong>AND</strong> and <strong>OR</strong>.</p>
      <p className='mt-2'>For example:</p>
      <Code language='sql' code={`
SELECT *
FROM users
WHERE age > 25 AND name = 'Rahul';`} />
      <p className='mt-2'>Using <strong>OR</strong>:</p>
      <Code language='sql' code={`
SELECT *
FROM users
WHERE age > 25 OR name = 'Sachin';`} />
      <p className='mt-2'>
        This becomes very useful when building real-world filtering systems.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Updating Data</h1>
      <p className='mt-2'>Suppose Sachin's age needs to be changed.</p>
      <p className='mt-2'>We can use <strong>UPDATE</strong>:</p>
      <Code language='sql' code={`
UPDATE users
SET age = 26
WHERE id = 1;`} />
      <p className='mt-2'>The <strong>WHERE</strong> condition is extremely important.</p>
      <p className='mt-2'>Without it:</p>
      <Code language='sql' code={`
UPDATE users
SET age = 26;`} />
      <p className='mt-2'>every user's age could be changed.</p>
      <p className='mt-2'>
        So, always be careful when using <strong>UPDATE</strong> and <strong>DELETE</strong>.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Deleting Data</h1>
      <p className='mt-2'>To delete a particular user:</p>
      <Code language='sql' code={`
DELETE FROM users
WHERE id = 2;`} />
      <p className='mt-2'>Again, the <strong>WHERE</strong> condition determines which record will be deleted.</p>
      <p className='mt-2'>Without a condition:</p>
      <Code language='sql' code={`DELETE FROM users;`} />
      <p className='mt-2'>all records from the table may be deleted.</p>
      <br />

      <h1 className='text-2xl font-semibold'>Primary Key</h1>
      <p className='mt-2'>A <strong>primary key</strong> uniquely identifies every record in a table.</p>
      <p className='mt-2'>For example:</p>
      <Code language='sql' code={`id INT PRIMARY KEY AUTO_INCREMENT`} />
      <p className='mt-2'>Our users might look like:</p>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">id</th>
            <th className="border p-2 text-left">name</th>
            <th className="border p-2 text-left">email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">1</td>
            <td className="border p-2">Sachin</td>
            <td className="border p-2">sachin@example.com</td>
          </tr>
          <tr>
            <td className="border p-2">2</td>
            <td className="border p-2">Rahul</td>
            <td className="border p-2">rahul@example.com</td>
          </tr>
          <tr>
            <td className="border p-2">3</td>
            <td className="border p-2">Priya</td>
            <td className="border p-2">priya@example.com</td>
          </tr>
        </tbody>
      </table>
      <p className='mt-2'>The <strong>id</strong> is unique for every user.</p>
      <p className='mt-2'>
        A table can have only one primary key, although that key can consist of multiple columns in a composite-key design.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Foreign Key</h1>
      <p className='mt-2'>A <strong>foreign key</strong> creates a relationship between tables.</p>
      <p className='mt-2'>Suppose we have two tables:</p>
      <Code language='bash' code={`
users
orders`} />
      <p className='mt-2'>
        The <strong>orders</strong> table can contain the ID of the user who placed the order.
      </p>
      <Code language='sql' code={`
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_name VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);`} />
      <p className='mt-2'>Here:</p>
      <Code language='bash' code={`
users.id
    ↓
orders.user_id`} />
      <p className='mt-2'>The <strong>user_id</strong> column connects an order to a user.</p>
      <p className='mt-2'>
        This is one of the fundamental concepts that makes relational databases powerful.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Understanding Relationships</h1>
      <p className='mt-2'>Relational databases commonly use three types of relationships.</p>
      <p className='text-lg font-semibold mt-2'>1. One-to-One</p>
      <p className='mt-2'>One record in Table A is associated with one record in Table B.</p>
      <p className='mt-2'>Example:</p>
      <Code language='bash' code={`User → Profile`} />
      <p className='mt-2'>One user may have one profile.</p>
      <p className='text-lg font-semibold mt-2'>2. One-to-Many</p>
      <p className='mt-2'>One record is associated with multiple records.</p>
      <p className='mt-2'>Example:</p>
      <Code language='bash' code={`User → Orders`} />
      <p className='mt-2'>One user can place many orders.</p>
      <Code language='bash' code={`
User 1
 ├── Order 101
 ├── Order 102
 └── Order 103`} />
      <p className='mt-2'>This is one of the most common relationships in applications.</p>
      <p className='text-lg font-semibold mt-2'>3. Many-to-Many</p>
      <p className='mt-2'>Multiple records in one table can be associated with multiple records in another.</p>
      <p className='mt-2'>For example:</p>
      <Code language='bash' code={`Students ↔ Courses`} />
      <p className='mt-2'>
        One student can enroll in multiple courses, and one course can have multiple students.
      </p>
      <p className='mt-2'>Usually, a third table called a <strong>junction table</strong> is used.</p>
      <Code language='bash' code={`
students
courses
student_courses`} />
      <br />

      <h1 className='text-2xl font-semibold'>What are SQL Joins?</h1>
      <p className='mt-2'>Joins allow us to retrieve related data from multiple tables.</p>
      <p className='mt-2'>Suppose we have:</p>
      <p className='text-lg font-semibold mt-2'>users</p>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">id</th>
            <th className="border p-2 text-left">name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">1</td>
            <td className="border p-2">Sachin</td>
          </tr>
          <tr>
            <td className="border p-2">2</td>
            <td className="border p-2">Rahul</td>
          </tr>
        </tbody>
      </table>
      <p className='text-lg font-semibold mt-2'>orders</p>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">id</th>
            <th className="border p-2 text-left">user_id</th>
            <th className="border p-2 text-left">product</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">101</td>
            <td className="border p-2">1</td>
            <td className="border p-2">Laptop</td>
          </tr>
          <tr>
            <td className="border p-2">102</td>
            <td className="border p-2">2</td>
            <td className="border p-2">Keyboard</td>
          </tr>
        </tbody>
      </table>
      <p className='mt-2'>We can use an <strong>INNER JOIN</strong>:</p>
      <Code language='sql' code={`
SELECT users.name, orders.product
FROM users
INNER JOIN orders
ON users.id = orders.user_id;`} />
      <p className='mt-2'>Result:</p>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">name</th>
            <th className="border p-2 text-left">product</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Sachin</td>
            <td className="border p-2">Laptop</td>
          </tr>
          <tr>
            <td className="border p-2">Rahul</td>
            <td className="border p-2">Keyboard</td>
          </tr>
        </tbody>
      </table>
      <p className='mt-2'>The join combines related information from both tables.</p>
      <br />

      <h1 className='text-2xl font-semibold'>Common Types of JOINs</h1>
      <p className='mt-2'>The most common SQL joins are:</p>
      <p className='text-lg font-semibold mt-2'>INNER JOIN</p>
      <p className='mt-2'>Returns matching records from both tables.</p>
      <Code language='sql' code={`
SELECT *
FROM users
INNER JOIN orders
ON users.id = orders.user_id;`} />
      <p className='text-lg font-semibold mt-2'>LEFT JOIN</p>
      <p className='mt-2'>Returns all records from the left table and matching records from the right table.</p>
      <Code language='sql' code={`
SELECT *
FROM users
LEFT JOIN orders
ON users.id = orders.user_id;`} />
      <p className='text-lg font-semibold mt-2'>RIGHT JOIN</p>
      <p className='mt-2'>Returns all records from the right table and matching records from the left table.</p>
      <Code language='sql' code={`
SELECT *
FROM users
RIGHT JOIN orders
ON users.id = orders.user_id;`} />
      <p className='mt-2'>
        Understanding joins is especially important for developers working with relational databases.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Constraints in MySQL</h1>
      <p className='mt-2'>Constraints help maintain data integrity.</p>
      <p className='mt-2'>Some commonly used constraints include:</p>
      <Code language='bash' code={`
PRIMARY KEY
FOREIGN KEY
NOT NULL
UNIQUE
DEFAULT
CHECK`} />
      <p className='mt-2'>For example:</p>
      <Code language='sql' code={`
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    age INT,
    status VARCHAR(20) DEFAULT 'active'
);`} />
      <p className='mt-2'>Here:</p>
      <ul className='ml-6 list-disc space-y-1'>
        <li><strong>NOT NULL</strong> means the value is required.</li>
        <li><strong>UNIQUE</strong> prevents duplicate values.</li>
        <li><strong>DEFAULT</strong> provides a value when one isn't supplied.</li>
        <li><strong>PRIMARY KEY</strong> uniquely identifies a record.</li>
      </ul>
      <br />

      <h1 className='text-2xl font-semibold'>ALTER TABLE</h1>
      <p className='mt-2'>What if our table already exists and we want to modify it?</p>
      <p className='mt-2'>This is where <strong>ALTER TABLE</strong> is useful.</p>
      <p className='mt-2'>For example, adding a new column:</p>
      <Code language='sql' code={`
ALTER TABLE users
ADD COLUMN phone VARCHAR(15);`} />
      <p className='mt-2'>Renaming a column:</p>
      <Code language='sql' code={`
ALTER TABLE users
RENAME COLUMN phone TO mobile;`} />
      <p className='mt-2'>Changing a column's data type:</p>
      <Code language='sql' code={`
ALTER TABLE users
MODIFY COLUMN mobile VARCHAR(20);`} />
      <p className='mt-2'>Dropping a column:</p>
      <Code language='sql' code={`
ALTER TABLE users
DROP COLUMN mobile;`} />
      <p className='mt-2'>
        <strong>ALTER TABLE</strong> is commonly used when database requirements change as an application evolves.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Sorting Data with ORDER BY</h1>
      <p className='mt-2'>Suppose we want to display users from youngest to oldest.</p>
      <Code language='sql' code={`
SELECT *
FROM users
ORDER BY age ASC;`} />
      <p className='mt-2'>For oldest to youngest:</p>
      <Code language='sql' code={`
SELECT *
FROM users
ORDER BY age DESC;`} />
      <p className='mt-2'><strong>ASC</strong> means ascending, while <strong>DESC</strong> means descending.</p>
      <br />

      <h1 className='text-2xl font-semibold'>Limiting Results</h1>
      <p className='mt-2'>Sometimes we don't want every record.</p>
      <p className='mt-2'>For example:</p>
      <Code language='sql' code={`
SELECT *
FROM users
LIMIT 10;`} />
      <p className='mt-2'>This returns only 10 records.</p>
      <p className='mt-2'>
        <strong>LIMIT</strong> is particularly useful when implementing pagination or displaying a limited number of results.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Aggregate Functions</h1>
      <p className='mt-2'>SQL also provides functions for calculations.</p>
      <p className='mt-2'>Common aggregate functions include:</p>
      <Code language='bash' code={`
COUNT()
SUM()
AVG()
MIN()
MAX()`} />
      <p className='mt-2'>For example, to count users:</p>
      <Code language='sql' code={`
SELECT COUNT(*) AS total_users
FROM users;`} />
      <p className='mt-2'>To calculate the average age:</p>
      <Code language='sql' code={`
SELECT AVG(age) AS average_age
FROM users;`} />
      <p className='mt-2'>
        These functions become useful when building dashboards, reports, and analytics features.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>GROUP BY</h1>
      <p className='mt-2'><strong>GROUP BY</strong> is used to group records based on a column.</p>
      <p className='mt-2'>For example, suppose we have an <strong>orders</strong> table containing a <strong>status</strong> column.</p>
      <p className='mt-2'>We can count orders by status:</p>
      <Code language='sql' code={`
SELECT status, COUNT(*) AS total
FROM orders
GROUP BY status;`} />
      <p className='mt-2'>The result might look like:</p>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">status</th>
            <th className="border p-2 text-left">total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">pending</td>
            <td className="border p-2">5</td>
          </tr>
          <tr>
            <td className="border p-2">shipped</td>
            <td className="border p-2">12</td>
          </tr>
          <tr>
            <td className="border p-2">delivered</td>
            <td className="border p-2">20</td>
          </tr>
        </tbody>
      </table>
      <p className='mt-2'>This is extremely useful for analytics and reporting.</p>
      <br />

      <h1 className='text-2xl font-semibold'>What is Normalization?</h1>
      <p className='mt-2'>
        As applications become larger, databases can contain a lot of duplicated information.
      </p>
      <p className='mt-2'>
        <strong>Database normalization</strong> is a process of organizing data to reduce unnecessary duplication and improve data consistency.
      </p>
      <p className='mt-2'>For example, instead of storing the customer's complete information inside every order:</p>
      <Code language='bash' code={`
Order
 ├── customer_name
 ├── customer_email
 ├── customer_phone
 └── product`} />
      <p className='mt-2'>we can separate users and orders:</p>
      <Code language='bash' code={`
users
 ├── id
 ├── name
 ├── email
 └── phone

orders
 ├── id
 ├── user_id
 └── product`} />
      <p className='mt-2'>Now the order references the user using <strong>user_id</strong>.</p>
      <p className='mt-2'>This avoids repeatedly storing the same user information.</p>
      <br />

      <h1 className='text-2xl font-semibold'>Transactions in MySQL</h1>
      <p className='mt-2'>
        One of the powerful features of relational databases is <strong>transactions</strong>.
      </p>
      <p className='mt-2'>
        A transaction allows multiple database operations to be treated as one logical unit.
      </p>
      <p className='mt-2'>For example, when transferring money:</p>
      <Code language='bash' code={`Account A → Account B`} />
      <p className='mt-2'>We need to:</p>
      <ul className='ml-6 list-disc space-y-1'>
        <li>Deduct money from Account A.</li>
        <li>Add money to Account B.</li>
      </ul>
      <p className='mt-2'>Both operations should succeed together.</p>
      <p className='mt-2'>A simplified transaction looks like:</p>
      <Code language='sql' code={`
START TRANSACTION;

UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

COMMIT;`} />
      <p className='mt-2'>If something goes wrong, we can roll back the transaction:</p>
      <Code language='sql' code={`ROLLBACK;`} />
      <p className='mt-2'>
        Transactions are particularly important in systems where data consistency is critical.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Connecting MySQL with Node.js</h1>
      <p className='mt-2'>
        As a JavaScript or MERN/Full Stack developer, you may eventually need to connect MySQL with a backend application.
      </p>
      <p className='mt-2'>
        A Node.js application can communicate with MySQL using packages such as <strong>mysql2</strong>.
      </p>
      <p className='mt-2'>A simplified example looks like:</p>
      <Code language='javascript' code={`
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "my_app"
});

connection.connect((error) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log("Connected to MySQL");
});`} />
      <p className='mt-2'>
        Once the connection is established, your backend can execute SQL queries and send the results to the frontend.
      </p>
      <p className='mt-2'>A typical architecture could look like:</p>
      <Code language='bash' code={`
React / Next.js
       ↓
Node.js / Express.js
       ↓
      MySQL`} />
      <p className='mt-2'>
        The frontend doesn't usually communicate directly with the database. Instead, the backend handles authentication, business logic, validation, and database operations.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>MySQL in a Real Application</h1>
      <p className='mt-2'>Let's imagine we're building an e-commerce application.</p>
      <p className='mt-2'>We could design our database like this:</p>
      <Code language='bash' code={`
users
│
├── id
├── name
├── email
└── password

products
│
├── id
├── name
├── price
└── stock

orders
│
├── id
├── user_id
├── total_amount
└── status

order_items
│
├── id
├── order_id
├── product_id
└── quantity`} />
      <p className='mt-2'>The relationships could look like:</p>
      <Code language='bash' code={`
User
 │
 └── Orders
       │
       └── Order Items
              │
              └── Products`} />
      <p className='mt-2'>
        This is where relational databases really shine: different entities can be separated into logical tables while still being connected through relationships.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>Common MySQL Commands Cheat Sheet</h1>
      <p className='mt-2'>Here are some commands worth remembering:</p>
      <Code language='sql' code={`
-- Create database
CREATE DATABASE my_app;

-- Select database
USE my_app;

-- Show databases
SHOW DATABASES;

-- Create table
CREATE TABLE users (...);

-- Show tables
SHOW TABLES;

-- Insert data
INSERT INTO users (...) VALUES (...);

-- Read data
SELECT * FROM users;

-- Update data
UPDATE users SET name = 'Sachin' WHERE id = 1;

-- Delete data
DELETE FROM users WHERE id = 1;

-- Modify table
ALTER TABLE users ADD COLUMN phone VARCHAR(15);

-- Delete table
DROP TABLE users;`} />
      <br />

      <h1 className='text-2xl font-semibold'>MySQL and Backend Development</h1>
      <p className='mt-2'>
        For a frontend or full-stack developer, understanding MySQL is more than just knowing SQL syntax.
      </p>
      <p className='mt-2'>You should also understand how the database fits into the complete application.</p>
      <p className='mt-2'>A common flow is:</p>
      <Code language='bash' code={`
User
 ↓
React / Next.js
 ↓
API Request
 ↓
Node.js / Express
 ↓
Validation & Business Logic
 ↓
MySQL Query
 ↓
Database
 ↓
API Response
 ↓
React UI`} />
      <p className='mt-2'>For example, when a user logs into an application:</p>
      <Code language='bash' code={`
Login Form
    ↓
POST /api/login
    ↓
Express Server
    ↓
Find user in MySQL
    ↓
Validate password
    ↓
Generate authentication token
    ↓
Return response`} />
      <p className='mt-2'>
        Understanding this flow helps frontend developers become stronger full-stack developers.
      </p>
      <br />

      <h1 className='text-2xl font-semibold'>When Should You Use MySQL?</h1>
      <p className='mt-2'>MySQL is a great choice when your application has:</p>
      <ul className='ml-6 list-disc space-y-1'>
        <li>Structured and predictable data</li>
        <li>Strong relationships between entities</li>
        <li>Complex queries</li>
        <li>Transactions</li>
        <li>Financial or business data</li>
        <li>Reporting requirements</li>
        <li>Strong data consistency requirements</li>
      </ul>
      <p className='mt-2'>Examples include:</p>
      <ul className='ml-6 list-disc space-y-1'>
        <li>Banking applications</li>
        <li>E-commerce platforms</li>
        <li>ERP systems</li>
        <li>CRM applications</li>
        <li>Inventory management systems</li>
        <li>Employee management systems</li>
        <li>Booking systems</li>
      </ul>
      <br />

      <h1 className='text-2xl font-semibold'>Final Thoughts</h1>
      <p className='mt-2'>
        MySQL is much more than a database where you simply store rows and columns.
      </p>
      <p className='mt-2'>
        Its real strength comes from <strong>relationships, structured data, SQL queries, constraints, transactions, and data consistency</strong>.
      </p>
      <p className='mt-2'>
        If you've already learned MongoDB, learning MySQL gives you a different perspective on database design.
      </p>
      <p className='mt-2'>
        MongoDB teaches you to think in terms of <strong>documents and collections</strong>, while MySQL teaches you to think in terms of <strong>tables, relationships, keys, and structured data</strong>.
      </p>
      <p className='mt-2'>
        As a developer, knowing both approaches can help you choose the right database based on the requirements of your application.
      </p>
      <p className='mt-2'>
        The most important thing is not to memorize every SQL command. Start by understanding the fundamentals:
      </p>
      <Code language='bash' code={`
Database
   ↓
Tables
   ↓
Rows & Columns
   ↓
Keys
   ↓
Relationships
   ↓
SQL Queries
   ↓
Joins
   ↓
Transactions`} />
      <p className='mt-2'>
        Once these concepts are clear, working with MySQL in real-world applications becomes much easier.
      </p>
      <p className='mt-2'>
        <strong>Keep learning, keep building, and keep experimenting with real projects.</strong>
      </p>
    </>
  )
}

export default SixtyNine