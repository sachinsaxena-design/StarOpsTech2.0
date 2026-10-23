import React from "react";
import { Code } from "../../../utils/Helpers";

function Forty() {
    return (
        <div>
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/ESLINT_CLONE_CEAN/Block_Blog Banner.png"
                alt="ESLint Clean Code Journey"
            />
            <br />
            <p>
                It started like most development tasks do
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    A repository.
                </li>
                <li>
                    A terminal.
                </li>
                <li>
                    And the quiet confidence that this should just work.
                </li>
            </ul>
            <p>
                What followed was a simple but meaningful journey — taking a codebase from
                <strong> unchecked to clean, visible, and reportable</strong> using ESLint.
            </p>

            <br />

            <p className="font-semibold text-lg">The Beginning: Getting the Code</p>
            <p>The first step was obvious. I cloned the repository and stepped inside it.</p>

            <Code
                language="bash"
                code={`
 git clone https://github.com/your-org/your-repo.git
 cd your-repo
        `}
            />

            <p>I checked where I was:</p>

            <Code language="bash" code={`
 pwd
`} />

            <p>
                This directory — my <strong>present working directory (PWD)</strong> — would soon hold
                everything: installs, logs, and reports.
            </p>

            <br />

            <p className="font-semibold text-lg">
                Installing What the Project Needs
            </p>
            <p>
                Before linting anything, the project itself needed to exist locally.
            </p>

            <Code language="bash" code={`
 npm install
`} />
            <img
                className="max-h-[800px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/ESLINT_CLONE_CEAN/1.png"
                alt="ESLint Clean Code Journey"
            />
            <p>
                Dependencies filled the <strong>node_modules</strong> directory, and the project finally
                had what it needed to run.
            </p>

            <br />

            <p className="font-semibold text-lg">Bringing ESLint into the Picture</p>
            <p>With the project ready, it was time to introduce ESLint.</p>

            <Code
                language="bash"
                code={`
 npm install --save-dev eslint
`}
            />
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/ESLINT_CLONE_CEAN/2.png"
                alt="ESLint Clean Code Journey"
            />
            <p>
                I intentionally installed it <strong>locally</strong>, keeping the version tied to the project — not the machine.
            </p>

            <br />

            <p className="font-semibold text-lg">
                Pausing to Check the ESLint Version
            </p>
            <p>Before going any further, I wanted certainty.</p>
            <p>
                Tooling issues often come from <strong>version mismatches</strong>, so I checked what was
                actually installed:
            </p>

            <Code language="bash" code={`
 npx eslint -v
`} />
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/ESLINT_CLONE_CEAN/4.png"
                alt="ESLint Clean Code Journey"
            />
            <p>The terminal responded with a version number.</p>
            <p>That one line confirmed:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>ESLint was installed correctly</li>
                <li>The version being used was the <strong>project’s version</strong></li>
                <li>Not some global or cached binary</li>
            </ul>

            <p>It was a small step, but it removed a lot of ambiguity.</p>

            <br />

            <p className="font-semibold text-lg">
                Teaching ESLint About the Codebase
            </p>
            <p>
                Now that I knew ESLint was present and accounted for, I let it learn about the project.
            </p>

            <Code language="bash" code={`
 npx eslint --init
`} />
            <img
                className="max-h-[800px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/ESLINT_CLONE_CEAN/3.png"
                alt="ESLint Clean Code Journey"
            />
            <p>
                A short interactive conversation followed — language, framework, modules, rules.
                At the end, ESLint wrote down its expectations in a configuration file.
            </p>

            <p>From this point on, “good code” had a definition.</p>


            <br />

            <p className="font-semibold text-lg">The First Lint Run</p>
            <p>Then came the moment of truth.</p>

            <Code language="bash" code={`
 npx eslint .
`} />
            <img
                className="max-h-[800px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/ESLINT_CLONE_CEAN/6.png"
                alt="ESLint Clean Code Journey"
            />
            <ul className="list-disc ml-6 space-y-1">
                <li>Files were scanned.</li>
                <li>Warnings surfaced.</li>
                <li>Errors revealed themselves.</li>
                <li>The codebase was no longer silent — it was speaking.</li>
            </ul>
            

            <br />

            <p className="font-semibold text-lg">
                Capturing the Truth (Raw Output)
            </p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Sometimes you don’t want formatting or filters</li>
                <li>You want <strong>exactly what the terminal showed</strong> .</li>
            </ul>
            <p>So I captured it</p>
            <Code
                language="bash"
                code={`
 npx eslint . 2>&1 | tee eslint-output.txt
`}
            />
            <p>Now I had</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Live output on screen</li>
                <li>A raw, untouched log saved in the project directory</li>
            </ul>
            <p>Perfect for debugging and traceability</p>

            <br />

            <p className="font-semibold text-lg">
                Turning Results into a Shareable HTML Report
            </p>
            <p>
                Raw logs are honest — but not always friendly.
            </p>
            <p>
                To make results easier to review, I generated an HTML report.
            </p>

            <Code
                language="bash"
                code={`
 npx eslint . -f html -o eslint-report.html
`}
            />

            <p>Opening it felt different:</p>

            <Code language="bash" code={`
 open eslint-report.html
`} />
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/ESLINT_CLONE_CEAN/7.png"
                alt="ESLint Clean Code Journey"
            />
            <p>
                This wasn’t just console output anymore — it was a structured view of the
                codebase’s health.
            </p>

            <br />

            <p className="font-semibold text-lg">Fixing What Could Be Fixed</p>
            <p>
                Some issues didn’t need debate.
            </p>

            <Code language="bash" code={`
 npx eslint . --fix
`} />

            <p>
                Safe fixes were applied, formatting tightened up, and the code felt cleaner without manual effort.
            </p>

            <br />

            <p className="font-semibold text-lg">The Workflow That Emerged</p>
            <p>By the end, the process had settled into a clear rhythm:</p>
            <Code
                language="bash"
                code={`
 git clone <repo>
 cd repo
 npm install
 npm install --save-dev eslint
 npx eslint -v
 npx eslint --init
 npx eslint . 2>&1 | tee eslint-output.txt
 npx eslint . -f html -o eslint-report.html
        `}
            />

            <p>Two files remained as evidence of the work:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>
                    <strong>eslint-output.txt</strong> — the raw truth
                </li>
                <li>
                    <strong>eslint-report.html</strong> — the readable story
                </li>
            </ul>
        </div>
    );
}

export default Forty;
