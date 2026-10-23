import React from "react";
import { Code } from "../../../utils/Helpers";

function SixtyThree() {
    return (
        <div>
            <img
                className="max-h-[700px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/Git_isnt_the_Only_VCS/git.jpeg"
                alt="One Question Made Me Realize Git Isn't the Only Version Control System"
            />
            <p className='mt-2'>
                For as long as I've been writing code, Git has just been... there.
            </p>
            <p className='mt-2'>
                Whether it was a college project, an internship assignment, or a personal experiment, every repository started the same way. <span className='text-green-600 '>git clone, git checkout, git commit, git push</span> . After repeating the same workflow hundreds of times, Git stopped feeling like a tool and became part of the background.
            </p>

            <p className='mt-2'>
                I never really questioned it.
            </p>
            <p className='mt-2'>
                To me, version control simply meant Git.
            </p>

            <p className='mt-2'>
                That changed during a seminar.
            </p>

            <p className='mt-2'>
                One of the seniors was interacting with everyone in the room, asking questions related to software engineering. Most of them were fairly straightforward, until he asked one that completely caught us off guard.
            </p>

            <p className=" font-semibold italic mt-2">
                "Can anyone name an alternative to Git?"
            </p>

            <p className='mt-2'>
                The room went silent.
            </p>
            <p className='mt-2'>
                People looked around, hoping someone else would answer. A few whispered "GitHub?" before realizing GitHub wasn't a version control system at all—it was a platform built around Git.
            </p>
            <p className='mt-2'>
                Nobody had an answer.
            </p>

            <p>
                I didn't either.
            </p>

            <p className='mt-2'>
                The funny thing was, I wasn't embarrassed because I didn't know the answer. I was surprised because I had never even asked myself the question.
            </p>

            <p className='mt-2'>
                If every developer uses Git, why would anyone build something else?
            </p>

            <p className='mt-2'>
                That question stayed with me long after the seminar ended.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Is Git Really the Only Choice?
            </p>

            <p className="mt-2">
                Git has been around since 2005 and, over the last two decades, has become the standard version control system for software development.
            </p>
            <p className="mt-2">It powers millions of repositories, integrates with nearly every development tool, and has become so common that learning Git is now part of many university software engineering courses.
            </p>
            <p className="mt-2">
                For most developers, Git isn't something they consciously choose anymore.
            </p>
            <p className="mt-2">
                It's simply the default.
            </p>

            <p className="mt-2">
                So naturally, I assumed there wasn't much room for innovation.
            </p>
            <p className="mt-2">But once I started exploring, I discovered that many engineers are actively trying to rethink version control—not because Git is bad, but because it was designed for a very different world.</p>
            <br />
            <p className="font-semibold text-2xl">
                Git Is Great... Until It Isn't
            </p>

            <p className="mt-2">When you're new to Git, the biggest challenge is usually understanding it.</p>
            <p className="mt-2">Commands like <span className='text-green-600'>reset, rebase, reflog,</span> or <span className='text-green-600'>cherry-pick</span> often feel mysterious. Most developers learn just enough to get by, and when something unexpected happens, they search Stack Overflow or start over</p>

            <p className="mt-2">
                Fortunately, Git has become much easier to learn over the years. There are excellent tutorials, graphical clients, and IDE integrations that hide much of its complexity
            </p>
            <p className="mt-2">
                So usability isn't the biggest criticism anymore.
            </p>
            <p className="mt-2">
                The more interesting problems appear once projects become massive.
            </p>
            <p className="mt-2">
                Think repositories containing millions of files, years of history, or enormous binary assets such as game textures, CAD models, videos, or firmware images.
            </p>
            <p className="mt-2">
                Git is a distributed version control system, meaning every clone contains the entire repository history.
            </p>
            <p className="mt-2">
                That's one of Git's greatest strengths—but it can also become one of its biggest limitations.
            </p>
            <p className="mt-2">
                Over the years, features like Git LFS, partial clones, sparse checkouts, and fsmonitor have improved the situation considerably.
            </p>
            <p className="mt-2">
                Still, there are workloads where Git starts showing its age.
            </p>
            <p className="mt-2">
                There are also a few things Git simply wasn't designed for.
            </p>


            <p className="mt-2">
                For example:
            </p>

            <ul className="list-disc ml-6 space-y-2">
                <li>Fine-grained permissions on different parts of a repository.</li>
                <li>Efficient diffing and merging of binary files.</li>
                <li>Massive monorepositories containing terabytes of assets.</li>
            </ul>
            <p className="mt-2">
                That's where alternative version control systems begin to make sense.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                Exploring the Alternatives
            </p>
            <p className="mt-2">
                Once I started digging, I expected to find a handful of abandoned
                projects.
            </p>
            <p className="mt-2">
                Instead, I found an entire ecosystem.
            </p>

            <br />

            <a href="https://www.mercurial-scm.org" target="_blank"  rel="noreferrer" className="font-semibold text-lg">Mercurial</a>
            <p className="mt-2">
                One of the oldest competitors, Mercurial was created around the same time as Git during the famous BitKeeper licensing controversy in 2005.
            </p>
            <p className="mt-2">
                Its philosophy emphasizes simplicity, and while exploring it, I came across interesting ideas like <strong className='text-green-600'>absorb</strong> , which automatically incorporates small changes into earlier commits, and workflows based around <strong>stacked diffs</strong> .
            </p>
            <p className="mt-2">
                Even if you never switch, Mercurial introduces ways of thinking about version control that Git users rarely encounter
            </p>

            <br />

            <a href="https://fossil-scm.org/home/doc/trunk/www/index.wiki" target="_blank" rel="noreferrer" className="font-semibold text-lg">Fossil </a>
            <p className="mt-2">
                Fossil surprised me the most.
            </p>
            <p className="mt-2">

                Instead of being just another version control system, it combines source control, bug tracking, wiki pages, forums, chat, and email notifications into a single application.
            </p>
            <p className="mt-2">
                It's almost like having Git and GitHub bundled together.
                For self-hosted projects or smaller teams, that's a compelling idea.
            </p>


            <br />

            <a href="https://sapling-scm.com" target="_blank" rel="noreferrer" className="font-semibold text-lg">Sapling</a>
            <p className="mt-2">
                Developed by Meta, Sapling focuses on scalability.
            </p>
            <p className="mt-2">
                It is designed for enormous repositories while remaining compatible with Git workflows.
            </p>
            <p className="mt-2">
                Behind the scenes, Meta is also building Mononoke, a server designed to support repositories at an incredible scale.
            </p>
            <p className="mt-2">
                It's still evolving, but it's exciting to watch.
            </p>

            <br />
            <a href="https://docs.jj-vcs.dev/latest" target="_blank" rel="noreferrer" className="font-semibold text-lg">Jujutsu (jj)</a>
            <p className="mt-2">
                This was probably my favorite discovery.
            </p>
            <p className="mt-2">
                Instead of treating your working directory as something separate from commits, Jujutsu considers your working copy to be a commit that is continuously updated.
            </p>
            <p className="mt-2">
                That sounds like a small change, but it fundamentally changes how you think about version history.
            </p>
            <p className="mt-2">
                Even more interesting, it allows developers to commit unresolved merge conflicts and collaborate on resolving them later.
            </p>
            <p className="mt-2">
                It's one of those ideas that makes you wonder why version control wasn't designed this way from the beginning.
            </p>
            <br />

            <p className="font-semibold text-2xl">
                What About Commercial Tools?
            </p>

            <p className="mt-2">
                Open source isn't the whole story.
            </p>
            <p className="mt-2">Large companies, especially in game development and hardware engineering, often have very different requirements.</p>
            <a href="https://www.perforce.com/products/helix-core" target="_blank" rel="noreferrer" className="mt-2 text-lg font-semibold">Perforce Helix Core</a>
            
            <p className="mt-2">
                Perforce is famous for handling enormous repositories and binary assets efficiently.
            </p>
            <p className="mt-2">
                Instead of Git branches, it revolves around changelists and supports features like exclusive file locking, which is particularly useful when editing binary files that can't be merged.
            </p>
            <a href="https://www.plasticscm.com" target="_blank" rel="noreferrer" className="mt-2 text-lg font-semibold">Plastic SCM</a>
            <p className="mt-2">Popular in the game development industry, Plastic SCM integrates closely with Unity and comfortably handles repositories measured in tens of terabytes</p>
            <a href="https://www.diversion.dev" target="_blank" rel="noreferrer" className="mt-2 text-lg font-semibold">Diversion </a>
            <p className="mt-2">A newer entrant focused on asset-heavy workflows, particularly for creative teams managing large binary files.</p>
            <a href="https://learn.allspice.io/docs" target="_blank" rel="noreferrer" className="mt-2 text-lg font-semibold">All Spice </a>
            <p className="mt-2">This one isn't actually a Git replacement.</p>
            <p className="mt-2">
                Instead, it extends Git with first-class support for hardware engineering, enabling meaningful diffs for electronic schematics and PCB designs.
            </p>
            <p className="mt-2">
                It reminded me that software developers aren't the only people who need version control.
            </p>
            <br />

            <p className="font-semibold text-2xl">
                Smaller Projects Worth Exploring
            </p>

            <p className="mt-2">
                My rabbit hole didn't stop there.
            </p>
            <p className="mt-2">I also came across projects like:</p>
            <ul className="list-disc ml-6 space-y-2 mt-2">
                <li> <strong>Pijul</strong>, which rethinks version control using patch theory and models merge conflicts explicitly.</li>
                <li><strong>Darcs</strong> , known for its elegant patch-based approach.</li>
                <li><strong>Breezy</strong>, a continuation of GNU Bazaar.</li>
                <li><strong>Grace</strong>, an experimental system written in F#</li>
            </ul>

            <p className="mt-2">
                None of these are likely to replace Git tomorrow
            </p>
            <p className="mt-2">But they show that people are still experimenting with ideas Git never explored.
            </p>

            <br />

            <p className="font-semibold text-2xl">
                What Would My Ideal Version Control System Look Like?
            </p>

            <p className="mt-2">
                After reading about all these systems, I stopped asking,
            </p>

            <p className="italic font-semibold ">
                "Which one is better than Git?"
            </p>

            <p className="mt-2">
                Instead, I started asking:
            </p>

            <p className="italic font-semibold ">
                "If we were designing version control today, what would it look
                like?"
            </p>

            <p className='mt-2'>I'd want something that:</p>

            <ul className="list-disc mt-2 ml-6 space-y-2">
                <li>Handles repositories of virtually any size.</li>
                <li>Treats binary assets as first-class citizens.</li>
                <li>Supports granular permissions.</li>
                <li>Works offline.</li>
                <li>
                    Supports both Git-style pull requests and Perforce-style
                    changelists.
                </li>
            </ul>

            <p className="mt-2">
                But I'd go one step further.
            </p>
            <p className="mt-2"> I think the future lies in combining version control with the build system.</p>
            <Code language="bash"
                code={`
gtb build <branch> //app/frontend
gtb test <commit> //services/payment
`}
            />
            <p className="mt-2">
                Instead of downloading an entire repository, the system would fetch only the files needed to build that target—or even execute the build remotely.
            </p>

            <p className="mt-2">
                It could understand not only source files, but also the dependency graph that connects them.
            </p>
            <p className="mt-2">
                That means developers could instantly see how a change propagates across backend services, frontend applications, mobile apps, firmware, or infrastructure.
            </p>
            <p className="mt-2">
                Even build artifacts could become first-class citizens.
            </p>
            <p className="mt-2">
                Today, compiled binaries, firmware images, generated documentation, notebooks, and machine learning outputs often live outside version control or require entirely separate artifact management systems.
            </p>
            <p className="mt-2">
                Imagine if a single platform tracked both the inputs and outputs of every build, making software completely reproducible from any point in history.
            </p>
            <p className="mt-2">
                Maybe that's too ambitious.
            </p>
            <p className="mt-2">
                Maybe it's unnecessary.
            </p>
            <p className="mt-2">
                Or maybe that's exactly the kind of question that leads to the next generation of version control.
            </p>


            <br />

            <p className="font-semibold text-2xl">
                Final Thoughts
            </p>
            <p className="mt-2">
                When that senior asked us to name an alternative to Git, nobody
                answered.
            </p>
            <p className="mt-2">
                Looking back, I think we were answering a different question.
            </p>

            <p className="mt-2">
                We weren't saying Git has no alternatives.
            </p>

            <p className="mt-2">
                We were saying we had never thought to look for them.
            </p>

            <p className="mt-2">
                I still use Git every day.
            </p>
            <p className="mt-2">
                I'm not planning to replace it anytime soon.
            </p>
            <p className="mt-2">
                But that one question reminded me of something I never want to forget
                as an engineer:
            </p>

            <p className="mt-2">
                Just because a tool has become the standard doesn't mean innovation
                has stopped.
            </p>
            <p className="mt-2">
                Sometimes, all it takes is one unanswered question to send you down an
                entirely new rabbit hole.
            </p>
        </div>
    );
}

export default SixtyThree;