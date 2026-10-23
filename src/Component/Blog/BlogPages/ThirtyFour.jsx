import { Code } from "../../../utils/Helpers";

const ThirtyFour = () => {
    return (
        <div>
            <img
                className="max-h-[500px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/MacOs_with_pylint/Pylint.png "
                alt="Ensuring Python Code Quality on macOS with Pylint"
            />
            <p className="font-semibold text-lg mt-4">Introduction</p>
            <p>
                Every engineering team, no matter how advanced their CI/CD pipeline,
                eventually faces the same question:
                <br />
                <strong>
                    “How do we measure and enforce code quality before the code even
                    reaches automation?”
                </strong>
            </p>

            <p>
                At StarOps, we build dozens of Python-based microservices — from
                licensing systems to AI flow migration tools. As our services scaled, we
                noticed that inconsistent code style and missing import validations were
                sneaking through pull requests.
            </p>

            <p>
                We weren’t looking to automate deployments here — our goal was simpler
                but crucial: <strong>Check the code quality efficiently, reproducibly, and globally on macOS developer machines.
                </strong></p>

            <br />
            <p className="font-semibold text-lg">Goal</p>
            <p>To create a lightweight, consistent setup on macOS where every developer can:</p>

            <ul className="list-disc ml-6 space-y-1">
                <li>Run <strong>Pylint</strong> globally without virtual-environment friction.</li>
                <li>Generate standardized text or HTML reports.</li>
                <li>Quickly detect import errors, style issues, and complexity violations.</li>
                <li>Maintain a unified <strong>quality baseline </strong>before any CI automation kicks in.</li>
            </ul>

            <p>
                This wasn’t about enforcing rules via CI/CD yet — it was about giving
                engineers immediate visibility into quality issues right from their
                terminal.
            </p>

            <br />
            <p className="font-semibold text-lg">Prerequisites</p>
            <p>Before starting, ensure you have:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>macOS (Apple Silicon or Intel)</li>
                <li><a href="https://staropstech.com/blog/a-journey-with-homebrew" target="_blank" rel="noreferrer" className="text-blue-500 underline"> Homebrew</a> installed for package management</li>
                <li>A Python project structure (e.g.,<span className="text-green-500"> controllers/, domains/, utils/, </span>etc.)</li>
                <li>Internet access to fetch Homebrew packages and PyPI dependencies</li>
            </ul>
            <p className="mt-3">Optional (but helpful) :</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>A <span className="text-green-500">requirements.txt</span> file to sync dependencies</li>
                <li>Basic shell familiarity (<span className="text-green-500">zsh</span> or <span className="text-green-500">bash</span>)</li>
            </ul>

            <br />
            <p className="font-semibold text-lg">The Problem We Faced</p>
            <p>
                Our local Python environments were inconsistent. Some engineers used system Python,
                others used venvs, and import paths often broke Pylint scans.
            </p>

            <p>
                Running:
            </p>
            <Code
                language="bash"
                code=
                {`
pylint **/*.py
              `}
            />
            <p>
                resulted in a storm of red — most errors weren’t real logic issues but
                <strong>import path mismatches</strong>(<span className="text-green-500">E0401</span>), inconsistent naming, and missing docstrings.
            </p>

            <p>
                The challenge?
            </p>
            <p>
                We needed a <strong> global</strong>, reproducible setup that didn’t depend on
                individual venvs, but still respected project structure and Python paths.
            </p>

            <br />
            <p className="font-semibold text-lg">Step 1 – Installing Pylint Globally with Homebrew</p>
            <p>
                We chose <strong>Homebrew</strong> because it aligns with DevOps principles — consistent,
                versioned, and easily automated later if needed.
            </p>
            <Code language='bash' code={`
brew install pylint            
            `} />
            <p>
                Every developer, regardless of Python setup, could now invoke <span className="text-green-500">pylint</span> globally — same
                version, same behavior.
            </p>

            <br />
            <p className="font-semibold text-lg">Step 2 – Checking Code Quality Across the Service</p>
            <p>
                Once the installation was complete, we navigated to the directory of the microservice
                whose code quality we wanted to check:
            </p>
            <p>
                Then ran:
            </p>
            <Code language='bash' code={`
pylint **/*.py &gt; "$(basename "$PWD")_report.txt"
            `} />
            <img src="https://cdn.staropstech.com/starops/Blogs/MacOs_with_pylint/pylintp1.png" alt="pylint" />
            <p>This simple command:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li>Scans all <span className="text-green-500">.py</span> files recursively.</li>
                <li>Generates a report file named after the project (<span className="text-green-500">directory_name_report.txt</span>).</li>
                <li>
                    Provides a full breakdown — missing docstrings, unused imports, overly long lines,
                    undefined variables, etc.
                </li>
            </ul>
            <p>
                The result?
            </p>
            <p>
                A crystal-clear snapshot of the project’s current health — no IDE plugins,
                no CI triggers, just raw insight.
            </p>

            <br />
            <p className="font-semibold text-lg">Step 3 – Fixing Import Errors Gracefully</p>
            <p>
                We realized many <span className="text-green-500">E0401: Unable to import ...</span> errors were due to <strong> relative imports</strong>.
                To make Pylint aware of <strong> our internal structure</strong>, we adjusted the Python path dynamically:
            </p>
            <Code language='bash' code={`
PYTHONPATH=. pylint **/*.py &gt; "$(basename "$PWD")_report.txt"
            `} />
            <p>
                By setting <span className="text-green-500">PYTHONPATH</span> to the current directory, Pylint correctly recognized our internal
                modules like <span className="text-green-500">controllers</span>, <span className="text-green-500">domains</span>, and <span className="text-green-500">utils</span>.
            </p>

            <p>
                This instantly reduced false positives and gave meaningful lint scores.
            </p>
            <br />
            <img src="https://cdn.staropstech.com/starops/Blogs/MacOs_with_pylint/pythonpylintp2.png" alt="pylint" />
            <br />
            <p>Comparison of <span className="text-green-500">pylint</span>  output before and after setting <span className="text-green-500">PYTHONPATH</span> </p>
            <br />
            <p className="font-semibold text-lg">Outcome</p>
            <p>By the end of this exercise, we achieved:</p>
            <ul className="list-disc ml-6 space-y-1">
                <li><strong>Standardized code-quality checks</strong> across all macOS developer machines</li>
                <li><strong>Consistent linting scores</strong> regardless of local environment</li>
                <li><strong>Readable quality reports</strong> for tech leads and QA</li>
                <li><strong>Early detection of import &amp; syntax issues</strong> before CI or production deployment</li>
            </ul>

            <p>
                More importantly, developers began treating lint reports as feedback rather than
                friction — a cultural win that elevated quality awareness.
            </p>
        </div>
    );
};

export default ThirtyFour;
