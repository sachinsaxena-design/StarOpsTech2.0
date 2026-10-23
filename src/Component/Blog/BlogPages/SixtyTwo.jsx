import React from "react";
import { Code } from "../../../utils/Helpers";

function SixtyTwo() {
    return (
        <>
            <img
                className="max-h-[700px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/MongoDB_skip_VS_Cursor/MongoDB_Limit_Cursor.png"
                alt="Pagination in MongoDB: Skip/Limit vs Cursor-Based Pagination"
            />

            <p className="font-semibold text-2xl mt-4">
                Introduction
            </p>

            <p>
                Whenever I build an application that displays a list of data whether it's users, products, blog posts, or orders pagination is one of the first things I think about. It might seem like a small feature, but it plays a huge role in how fast and responsive an application feels.
            </p>

            <p className="mt-2">
                Imagine opening an e-commerce website that tries to load every product at once, or an admin dashboard that fetches thousands of users in a
                single request. Apart from slowing down the application, it also puts unnecessary load on the database and the server.
            </p>

            <p className="mt-2">That's why we use pagination.</p>

            <p className="mt-2">
                At first, I always used MongoDB's <strong>skip()</strong> and{" "} <strong>limit()</strong> methods because they were simple and worked perfectly for small projects. But as I started working with larger datasets, I realised that what works for a few thousand documents doesn't always work well for a few million.
            </p>

            <p className="mt-2">
                That's when I started exploring cursor-based pagination.
            </p>

            <p className="mt-2">
                Both approaches solve the same problem, but they do it in very different ways. In this blog, I'll explain how each method works, where each one fits best, and why choosing the right pagination strategy can make a noticeable difference as your application grows.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Why Do We Need Pagination?
            </p>

            <p className="mt-2">
                Before comparing different pagination techniques, it's worth understanding why pagination is so important in the first place.
            </p>

            <p className="mt-2">
                Let's say your <strong>users</strong> collection contains 50,000 documents.
            </p>

            <p className="mt-2">
                If your API returns all 50,000 users every time someone opens the page, a few things are going to happen:
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>The API response becomes much larger.</li>
                <li>The browser takes longer to render the data.</li>
                <li>More memory is consumed on both the server and client.</li>
                <li>The overall user experience becomes slower.</li>
            </ul>

            <p className="mt-3">
                Instead, we can divide the data into smaller chunks.
            </p>

            <p className="mt-2 font-semibold">For example:</p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Page 1 → Users 1–10</li>
                <li>Page 2 → Users 11–20</li>
                <li>Page 3 → Users 21–30</li>
            </ul>

            <p className="mt-3">
                Now, instead of transferring thousands of records, the API only sends the data that the user actually needs.
            </p>

            <p className="mt-2">
                This keeps the application responsive and reduces the workload on the database.
            </p>

            <p className="mt-2">
                Whether you're building a simple admin dashboard or a large-scale application, pagination is one of those features that significantly improves performance.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                The Simplest Approach: Skip and Limit
            </p>

            <p className="mt-2">
                If you've worked with MongoDB before, chances are you've already used{" "} <strong>skip()</strong> and <strong>limit()</strong>.
            </p>

            <p className="mt-2">
                Honestly, this is where most developers start and for good reason. The syntax is straightforward, it's easy to understand, and it gets the job done.
            </p>

            <p className="mt-2">
                Suppose you have a collection of users and you want to display only ten records per page.
            </p>

            <p className="mt-2">
                Your query might look like this:
            </p>

            <Code
                language="javascript"
                code={`db.users
  .find()
  .skip(20)
  .limit(10);`}
            />

            <p >Here:</p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>
                    <strong>skip(20)</strong> tells MongoDB to ignore the first 20
                    documents.
                </li>
                <li>
                    <strong>limit(10)</strong> tells MongoDB to return the next 10
                    documents.
                </li>
            </ul>

            <p className="mt-3">
                If the user opens <strong>Page 3</strong> and each page displays 10
                records, the calculation is simple.
            </p>

            <Code
                language="javascript"
                code={`
const page = 3;
const limit = 10;

const skip = (page - 1) * limit;`}
            />

            <p >Which becomes:</p>

            <Code
                language="javascript"
                code={`
db.users
  .find()
  .skip(skip)
  .limit(limit);`}
            />

            <p >
                It's clean, readable, and incredibly easy to implement.
            </p>

            <p className="mt-2">
                That's one of the reasons why you'll find this approach in many
                tutorials and beginner projects.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Why Skip/Limit Feels Perfect at First
            </p>

            <p className="mt-2">
                When I first started building CRUD applications with MongoDB, I never
                questioned this approach.
            </p>

            <p className="mt-2">
                For example, if my database had only a few thousand users, pagination
                felt instant.
            </p>

            <p className="mt-2">
                Whether I opened Page 1 or Page 50, everything loaded quickly enough
                that performance wasn't even something I thought about.
            </p>

            <p className="mt-2">
                That's because the dataset was still relatively small.
            </p>

            <p className="mt-2">
                For internal dashboards, admin panels, or personal projects,
                Skip/Limit works perfectly fine.
            </p>

            <p className="mt-2">
                In fact, I still use it for projects where I know the amount of data
                isn't going to grow dramatically.
            </p>

            <p className="mt-2">
                The problem starts when the collection becomes much larger.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                What Actually Happens Behind the Scenes?
            </p>

            <p className="mt-2">
                This is the part that many developers don't realise when they first
                learn MongoDB.
            </p>

            <p className="mt-2">
                At first glance, it feels like MongoDB should simply "jump" to the
                requested page.
            </p>

            <p className="mt-2">
                Unfortunately, that's not how <strong>skip()</strong> works.
            </p>

            <p className="mt-2">
                Let's imagine your collection contains <strong>one million
                    documents.</strong>
            </p>

            <p className="mt-2">
                Now suppose someone requests:
            </p>

            <p className="font-semibold mt-2">Page 5000</p>

            <p className="mt-2">Your query becomes:</p>

            <Code
                language="javascript"
                code={`db.users
  .find()
  .skip(49990)
  .limit(10);`}
            />

            <p className="mt-3">
                It looks harmless.
            </p>

            <p className="mt-2">
                But internally, MongoDB still has to move past those{" "}
                <strong>49,990 documents</strong> before it can return the next ten.
            </p>

            <p className="mt-2">
                You can think of it like reading a book.
            </p>

            <p className="mt-2">
                If someone asks you to read page 300, you can't magically appear there
                you still have to flip through the previous pages to reach it.
            </p>

            <p className="mt-2">
                <strong>skip()</strong> behaves in a similar way.
            </p>

            <p className="mt-2">
                The larger the skip value becomes, the more work MongoDB has to do
                before returning the requested documents.
            </p>
            <br />

            <p className="font-semibold text-2xl">
                Why This Becomes a Problem
            </p>

            <p className="mt-2">
                When your collection contains only a few thousand records, this extra
                work is barely noticeable.
            </p>

            <p className="mt-2">
                But imagine your application continues to grow.
            </p>

            <p className="mt-2 font-semibold">Today you have:</p>

            <p>10,000 users</p>

            <p className="mt-2 font-semibold">A few months later:</p>

            <p>500,000 users</p>

            <p className="mt-2 font-semibold">After a couple of years:</p>

            <p>5 million users</p>

            <p className="mt-2">
                Now users are requesting pages much further into the dataset.
            </p>

            <p className="mt-2">
                Each request forces MongoDB to process a large number of documents
                before it can return the actual results.
            </p>

            <p className="mt-2">That means:</p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>Queries become slower.</li>
                <li>CPU usage increases.</li>
                <li>More data is scanned.</li>
                <li>Response times gradually increase.</li>
            </ul>

            <p className="mt-3">
                The application still works but it isn't as efficient as it could be.
            </p>

            <p className="mt-2">
                This is one of those performance issues that often goes unnoticed during
                development because everything seems fast while working with small
                datasets.
            </p>

            <p className="mt-2">
                It's only when the application starts growing that the limitations of
                <strong> skip()</strong> become obvious.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Is Skip/Limit a Bad Choice?
            </p>

            <p className="mt-2">Not at all.</p>

            <p className="mt-2">
                I think this is where many articles create confusion.
            </p>

            <p className="mt-2">
                Some blogs make it sound like you should never use{" "}
                <strong>skip()</strong>.
            </p>

            <p className="mt-2">I don't agree with that.</p>

            <p className="mt-2">If you're building:</p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>An admin dashboard</li>
                <li>A reporting system</li>
                <li>A small business application</li>
                <li>An internal company tool</li>
            </ul>

            <p className="mt-3">
                Skip/Limit is often the simplest and most practical solution.
            </p>

            <p className="mt-2">
                The key is understanding its limitations.
            </p>

            <p className="mt-2">
                If your application is expected to handle hundreds of thousands or even
                millions of records, it's worth considering a different approach before
                performance becomes a problem.
            </p>

            <p className="mt-2">
                That's exactly where cursor-based pagination comes into the picture.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Cursor-Based Pagination: A Better Alternative?
            </p>

            <p className="mt-2">
                By this point, we know where <strong>skip()</strong> starts to struggle.
                The obvious question is: if Skip/Limit becomes slower as the data grows,
                what's the alternative?
            </p>

            <p className="mt-2">
                This is where <strong>Cursor-Based Pagination</strong> comes in.
            </p>

            <p className="mt-2">
                The first time I heard about cursor pagination, I assumed it was a complicated technique used only by large companies. But once I understood the idea behind it, I realised it's actually quite simple.
            </p>

            <p className="mt-2">
                Instead of asking MongoDB to skip thousands of documents before returning the next set of results, we simply tell it where we left off.
            </p>

            <p className="mt-2">
                That's the biggest difference.
            </p>

            <p className="mt-2">
                Rather than saying:
            </p>
            <p className="ml-4">Skip the first 50,000 documents.</p>

            <p className="mt-2">We say:</p>
            <p className="ml-4">Start after this document.</p>

            <p className="mt-2">
                That small change makes a huge difference in performance.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                How Cursor-Based Pagination Works
            </p>

            <p className="mt-2">
                Let's take a simple example.
            </p>

            <p className="mt-2">
                Suppose your collection contains blog posts sorted by their{" "}
                <strong>_id</strong>.
            </p>

            <p className="mt-2">
                For the first request, we fetch the first ten documents.
            </p>

            <Code
                language="javascript"
                code={`db.posts
  .find()
  .sort({ _id: 1 })
  .limit(10);`}
            />

            <p className="mt-3">
                Imagine the last document returned has this <strong>_id</strong>: <strong>6873ad2b4d9e8c71d4...</strong>
            </p>

            <p className="mt-2">
                Now, instead of calculating a page number and skipping records, we use
                that ID in our next query.
            </p>

            <Code
                language="javascript"
                code={`
db.posts.find({
  _id: {
    $gt: ObjectId("6873ad2b4d9e8c71d4...")
  }
})
.sort({ _id: 1 })
.limit(10);`}
            />

            <p >
                MongoDB doesn't need to skip thousands of documents anymore.
            </p>

            <p className="mt-2">
                It simply starts returning documents after the given{" "}
                <strong>_id</strong>.
            </p>

            <p className="mt-2">
                That's why this approach remains fast, even when your collection grows
                into the millions.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Why Is It Faster?
            </p>

            <p className="mt-2">
                The answer lies in <strong>indexes</strong>.
            </p>

            <p className="mt-2">
                Every MongoDB collection has an index on the <strong>_id</strong> field
                by default.
            </p>

            <p className="mt-2">
                Indexes work a bit like the index page in a book.
            </p>

            <p className="mt-2">
                If you're looking for Chapter 15, you don't flip through every page one
                by one—you check the index and jump directly to the page you need.
            </p>

            <p className="mt-2">
                MongoDB does something very similar.
            </p>

            <p className="mt-2">
                When you search using an indexed field like <strong>_id</strong>,
                MongoDB can quickly locate the matching document and continue reading
                from there.
            </p>

            <p className="mt-2">
                That's much more efficient than counting and skipping thousands of
                documents before reaching the required position.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                A Real-World Example
            </p>

            <p className="mt-2">
                Let's imagine you're building an online shopping website.
            </p>

            <p className="mt-2">
                The platform has over <strong>5 million products</strong>, and customers
                are constantly scrolling through product listings.
            </p>

            <p className="mt-2">
                If you use Skip/Limit pagination, every time someone reaches a later
                page, MongoDB has to skip more and more documents before returning the
                next products.
            </p>

            <p className="mt-2">
                As traffic increases, those extra operations start adding up.
            </p>

            <p className="mt-2">
                Now imagine using cursor pagination.
            </p>

            <p className="mt-2">Instead of saying:</p>
            <p className="ml-4">Skip the first 120,000 products.</p>


            <p className="mt-2">The application simply remembers the ID of the last product shown and asks MongoDB for the next ten products after that ID.</p>

            <p className="mt-2">
                The amount of work remains almost the same whether you're viewing the
                first page or the thousandth page.
            </p>

            <p className="mt-2">
                That's one of the main reasons why many large-scale applications use
                cursor-based pagination.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Are There Any Downsides?
            </p>

            <p className="mt-2">
                Cursor-based pagination isn't perfect either.
            </p>

            <p className="mt-2">
                One limitation is that it doesn't naturally support jumping to a
                specific page.
            </p>

            <p className="mt-2">
                With Skip/Limit, a user can easily visit Page 25 because the application
                knows exactly how many documents to skip.
            </p>

            <p className="mt-2">
                With cursor pagination, you move forward (or backward) based on the last
                cursor you received.
            </p>

            <p className="mt-2">
                For most modern applications, this isn't a problem.
            </p>

            <p className="mt-2">
                Think about platforms like Instagram, X (formerly Twitter), Facebook,
                LinkedIn, or YouTube.
            </p>

            <p className="mt-2">
                You don't usually click on <strong>"Page 47."</strong>
            </p>

            <p className="mt-2">
                You simply keep scrolling.
            </p>

            <p className="mt-2">
                Cursor pagination fits that experience perfectly.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Skip/Limit vs Cursor-Based Pagination
            </p>

            <p className="font-semibold mt-2">
                Side-by-Side Comparison
            </p>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border p-2">Feature</th>
                            <th className="border p-2">Skip/Limit</th>
                            <th className="border p-2">Cursor-Based</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="border p-2 font-semibold">
                                Easy to implement
                            </td>
                            <td className="border p-2">Yes</td>
                            <td className="border p-2">Slightly more work</td>
                        </tr>

                        <tr>
                            <td className="border p-2 font-semibold">
                                Supports page numbers
                            </td>
                            <td className="border p-2">Yes</td>
                            <td className="border p-2">No</td>
                        </tr>

                        <tr>
                            <td className="border p-2 font-semibold">
                                Good for small datasets
                            </td>
                            <td className="border p-2">Yes</td>
                            <td className="border p-2">Yes</td>
                        </tr>

                        <tr>
                            <td className="border p-2 font-semibold">
                                Handles millions of records efficiently
                            </td>
                            <td className="border p-2">Not ideal</td>
                            <td className="border p-2">Yes</td>
                        </tr>

                        <tr>
                            <td className="border p-2 font-semibold">
                                Great for infinite scrolling
                            </td>
                            <td className="border p-2">No</td>
                            <td className="border p-2">Yes</td>
                        </tr>

                        <tr>
                            <td className="border p-2 font-semibold">
                                Performance stays consistent
                            </td>
                            <td className="border p-2">No</td>
                            <td className="border p-2">Yes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />

            <p className="font-semibold text-2xl">
                Which One Should You Choose?
            </p>

            <p className="mt-2">
                After using both approaches in different projects, this is how I usually
                think about them.
            </p>

            <p className="mt-3">If I'm building:</p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>An admin dashboard</li>
                <li>An internal management system</li>
                <li>A reporting application</li>
            </ul>

            <p className="mt-3">
                I'll usually stick with <strong>Skip/Limit</strong>.
            </p>

            <p className="mt-2">
                It's simple, readable, and perfectly adequate for those use cases.
            </p>

            <p className="mt-3">But if I'm building something like:</p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>A social media feed</li>
                <li>An e-commerce catalogue</li>
                <li>A chat application</li>
                <li>Any public API expected to grow</li>
            </ul>

            <p className="mt-3">
                I'll almost always choose{" "}
                <strong>cursor-based pagination</strong>.
            </p>

            <p className="mt-2">
                The initial implementation takes a little more thought, but it pays off
                as the application scales.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                A Few Best Practices
            </p>

            <p className="mt-2">
                Over time, I've found a few practices that help keep pagination
                efficient.
            </p>

            <p className="mt-4 font-semibold text-lg">
                1. Always Sort Your Data Before Paginating
            </p>

            <p className="mt-2">
                Without a consistent sort order, users may see duplicate or missing
                records between requests.
            </p>

            <Code
                language="javascript"
                code={`db.posts
  .find()
  .sort({ _id: 1 })
  .limit(10);`}
            />

            <br />

            <p className="font-semibold text-lg">
                2. Use Indexed Fields for Cursors
            </p>

            <p className="mt-2">
                The <strong>_id</strong> field works well because MongoDB indexes it
                automatically.
            </p>

            <p className="mt-2">
                If you're sorting by another field, such as{" "}
                <strong>createdAt</strong>, make sure it's indexed too.
            </p>

            <br />

            <p className="font-semibold text-lg">
                3. Avoid Very Large Skip Values
            </p>

            <p className="mt-2">
                Skip/Limit isn't a problem for smaller datasets, but using huge skip
                values in production can slow down your queries.
            </p>

            <br />

            <p className="font-semibold text-lg">
                4. Return the Next Cursor in Your API Response
            </p>

            <p className="mt-2">
                Instead of returning only the data, return the cursor as well.
            </p>

            <p className="mt-2">For example:</p>

            <Code
                language="json"
                code={`{
  "data": [
    ...
  ],
  "nextCursor": "6873ad2b4d9e8c71d4..."
}`}
            />

            <p className="mt-3">
                The frontend simply sends this value back when requesting the next set
                of results.
            </p>

            <p className="mt-2">
                This keeps the API clean and easy to work with.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Final Thoughts
            </p>

            <p className="mt-2">
                Pagination is one of those features that's easy to overlook during
                development.
            </p>

            <p className="mt-2">
                When your database contains only a few thousand documents, almost every
                pagination method feels fast enough. That's probably why many developers
                start with <strong>skip()</strong> and <strong>limit()</strong>—I
                certainly did.
            </p>

            <p className="mt-2">
                The real difference becomes visible as the application grows.
            </p>

            <p className="mt-2">
                <strong>Skip/Limit</strong> is simple, easy to implement, and still a
                perfectly valid choice for dashboards, internal tools, and applications
                with smaller datasets.
            </p>

            <p className="mt-2">
                <strong>Cursor-based pagination</strong>, on the other hand, is designed
                with scalability in mind. By taking advantage of MongoDB's indexes, it
                avoids unnecessary work and delivers consistent performance even when
                the collection contains millions of documents.
            </p>

            <p className="mt-2">
                At the end of the day, there isn't a universal "best" solution.
            </p>

            <p className="mt-2">
                The right choice depends on your application's requirements.
            </p>

            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li>
                    If users need direct page navigation, <strong>Skip/Limit</strong>
                    &nbsp;might be exactly what you need.
                </li>
                <li>
                    If your application relies on infinite scrolling or is expected to
                    handle a large amount of data,{" "}
                    <strong>cursor-based pagination</strong> will usually be the better
                    long-term investment.
                </li>
            </ul>

            <p className="mt-3">
                As developers, our goal isn't just to make things work—it's to make
                them work efficiently. Understanding the strengths and limitations of
                both pagination techniques will help you build applications that
                continue to perform well as your data grows.
            </p>
        </>
    );
}

export default SixtyTwo;