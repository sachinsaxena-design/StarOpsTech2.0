import React from 'react';
import { Code } from '../../../utils/Helpers';

function SixtySix() {
    return (
        <div>
             <img
                className="max-h-[600px] w-full mx-auto rounded-lg"
                src="https://cdn.staropstech.com/starops/Blogs/Git_to_Apache_Deployment/G_to_A deployment.jpg"
                alt="Nginx vs Apache Complete Guide"
            />
            <p className='font-semibold text-2xl'>1.Introduction</p>
            <p className="mt-4">
                Deploying a website manually feels simple — pull the latest code, copy it to the web root, done. And for a while, that works. Then one day you rename a folder, delete a page, or restructure your project, and the old files just... stay there. Apache keeps serving projects.html or cookies.html long after they've been deleted from your Git repository, because nothing ever told the server to remove them.
            </p>
            <p>This is the quiet failure mode of manual deployment: it's really good at adding and updating files, and completely silent about removing them.</p>
            <p className="mt-2">
                The usual first instinct is:
            </p>
            <Code language='bash' code={`
cp -r source/* destination/
`} />
            <p className="mt-2">
                It looks like it should work — and it does, right up until something gets deleted or renamed upstream.
                <strong> cp -r</strong> has no concept of "this file no longer belongs here." It only knows how to copy
                forward, never how to reconcile.
            </p>

            <p className="mt-2">
                This post walks through a deployment workflow for pushing a GitHub-hosted site to Apache on Ubuntu that actually handles deletions safely — using <strong> git pull, rsync --delete </strong>, dry runs, backups, and a verification step — based on a real deployment where this exact problem showed up.
            </p>
            <br />
            <p className="font-semibold text-2xl">2.Server Setup</p>

            <p className="mt-2">
                Before any deployment workflow matters, the basics need to be in place:
            </p>

            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li><strong>Ubuntu server</strong> — a standard LTS release kept patched via apt.</li>
                <li><strong>Apache2</strong> — installed and running <strong>(sudo apt install apache2)</strong></li>
                <li>
                    <strong>DocumentRoot configuration</strong> — a dedicated virtual host pointing to the site's web root,
                    such as <strong>/var/www/html/mysite-website/</strong>, configured in <strong> /etc/apache2/sites-available/.</strong>
                </li>
                <li>
                    <strong>SSL/HTTPS</strong> — a valid certificate (Let's Encrypt via Certbot is the common choice) so the site is served over https:// rather than plain HTTP.
                </li>
            </ul>

            <p className="mt-2">
                The one architectural decision that matters most here: <strong>keep the Git checkout separate from Apache's web root</strong>. More on why in the best practices section, but the short version is that you never want git pull operations happening inside the directory Apache is actively serving from.
            </p>
            <br />
            <p className="font-semibold text-2xl">3.Pulling the Latest Code</p>

            <p className="mt-2">
                On the server, inside the dedicated deployment checkout (not the web root):
            </p>
            <Code language='bash' code={`
git pull origin main
            `} />

            <p className="mt-2">
                This updates the local clone to match the latest commit on main. It's fast, it's atomic from Git's perspective, and it gives you a clean, versioned snapshot of exactly what should be live.
            </p>

            <p className="mt-2">
                But git pull only updates the checkout. It does nothing to Apache's actual web root. That's a separate step — and it's where things get interesting.
            </p>
            <br />
            <p className="font-semibold text-2xl ">4.Creating a Deployment Backup</p>

            <p className="mt-2">
                Before touching production, back up the current deployment directory:
            </p>
            <Code language='bash' code={`
sudo cp -r mysite-website mysite-website_backup_20260824
`} />
            <p>The timestamp suffix (_110826, for example) makes it easy to identify when the backup was taken and to keep multiple rollback points around without overwriting the previous one. This single command is what turns a risky deployment into a reversible one — if anything goes wrong downstream, there's an exact copy of the last known-good state sitting right next to it.
            </p>
            <br />
            <p className="font-semibold text-2xl">5. Why cp -r source/* destination/ Can Be Dangerous</p>

            <p className="mt-2">
                Here's the core issue this whole workflow exists to solve. Running something like:
            </p>
            <Code language='bash' code={`
sudo cp -r source/* destination/
`} />


            <p className="mt-2"> will</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>Copy new files from <strong>source</strong> into <strong>destination</strong></li>
                <li>Overwrite existing files that changed</li>
                <li>Never remove files from destination that no longer exist in source</li>
            </ul>
            <p className="mt-2">
                In practice, that means if a file was deleted or renamed in Git — say projects.html got restructured into old-code/projects.html, or cookies.html was removed entirely — the old copy keeps sitting in the production web root indefinitely. It's still reachable by URL, still indexed by search engines, and still silently out of sync with what your repository says the site actually looks like.
            </p>

            <p className="mt-2">
                This is exactly what happened during a real deployment of this workflow: Git reported files being moved into an old-code/ directory, but the production directory still contained the original copies sitting where they used to be. cp -r would never have caught that. It doesn't diff — it only adds.
            </p>
            <br />

            <p className="font-semibold text-2xl ">6.Using Rsync for Deployment</p>

            <p className="mt-2">
                rsync solves this because it can synchronize two directories, not just copy one onto another. The --delete flag tells it to remove anything in the destination that isn't present in the source:
            </p>
            <Code language='bash' code={`
sudo rsync -av --delete \\
 --exclude='.git' \\
 /home/ubuntu/mysite-website/ \\
 /var/www/html/mysite-website/
`} />

            <p className="mt-2">
                Breaking down the flags:
            </p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>
                    <strong>-a</strong> (archive mode) — preserves permissions, timestamps, symlinks, and recurses through directories
                </li>
                <li>
                    <strong>-v</strong> (verbose) — prints exactly what's being copied and deleted

                </li>
                <li>
                    <strong>--delete</strong> — removes files from the destination that no longer exist in the source
                </li>
                <li>
                    <strong>--exclude='.git'</strong> — keeps the .git metadata directory out of the web root entirely
                </li>
            </ul>

            <p className="mt-2">
                This single command replaces cp -r as the deployment mechanism and closes the exact gap that caused the stale-file problem in the first place
            </p>
            <br />
            <p className="font-semibold text-2xl">7.Using a Dry Run Before Deployment</p>

            <p className="mt-2">
                --delete is powerful, which means it's also the flag most worth double-checking before it actually runs. Adding -n (or --dry-run) shows exactly what rsync would do, without touching anything:
            </p>

            <Code language='bash' code={`
sudo rsync -avhn --delete \\
 --exclude='.git' \\
 /home/ubuntu/mysite-website/ \\
 /var/www/html/mysite-website/
`} />

            <p className="mt-2">
                The <strong>-n</strong> flag is the safety net for the whole workflow. It prints the full list of files that would be copied, updated, and — critically — deleted, so you can visually confirm nothing important is about to disappear before committing to the real run. The -h flag just makes file sizes human-readable in the output.
            </p>

            <p className="mt-2">
                In the real deployment that prompted this workflow, the dry run is exactly what surfaced the problem described earlier: it listed the old projects.html and cookies.html as files that would be deleted, confirming that they were indeed stale leftovers from before the old-code/ restructuring — not files that were still needed. Seeing that before deletion, rather than discovering it after, is the entire point of this step.
            </p>
            <br />
            <p className="font-semibold text-2xl">8.Verifying the Deployment</p>

            <p className="mt-2">
                After running the real rsync (without -n), it's worth confirming that the web root now matches the Git checkout exactly:
            </p>

            <Code language='bash' code={`
diff -qr --exclude='.git' \\
/home/ubuntu/mysite-website \\
/var/www/html/mysite-website
`} />

            <p className="mt-2">
                diff -qr recursively compares both directories and reports only which files differ (-q keeps it to filenames, not full contents). No output means no differences — the web root is now a byte-for-byte match of the Git checkout, minus the excluded .git folder. That's the confirmation that the sync fully succeeded.
            </p>
            <br />
            <p className="font-semibold text-2xl">9.Checking Apache</p>

            <p className="mt-2">
                Before reloading the web server, validate its configuration
            </p>
            <Code language='bash' code={`
sudo apache2ctl configtest
`} />
            <p className="mt-2">This checks the Apache config syntax without restarting anything. If it returns Syntax OK, it's safe to reload:</p>
            <Code language='bash' code={`
sudo systemctl reload apache2
`} />


            <p className="mt-2">
                reload is preferable to restart here — it re-reads the configuration and picks up new files without dropping active connections, which matters on a live production site.
            </p>
            <br />
            <p className="font-semibold text-2xl">10.Testing the Live Website</p>

            <p className="mt-2">
                Finally, confirm the site is actually serving correctly over HTTPS:
            </p>

            <Code language='bash' code={`
curl -I https://www.example.com
`} />
            <p className="mt-2">
                The -I flag fetches only the HTTP headers, not the full page body — enough to confirm the server responded correctly. A healthy response looks like:
            </p>

            <Code language='bash' code={`
HTTP/1.1 200 OK
`} />

            <p className="mt-2">
                That status line is the deployment's final checkpoint. It confirms three things at once: Apache is running, the SSL certificate is valid and being served correctly, and the requested page exists at the expected path in the newly synced web root. If this comes back clean, the deployment is complete and verified end-to-end — not just "the files were copied," but "the live site is actually serving them correctly."
            </p>
            <br />
            <p className="font-semibold text-2xl">11.Rollback Strategy</p>

            <p className="mt-2">
                This is why step 4 mattered. If anything looks wrong after deployment — a broken page, a missing asset, an Apache error — the backup taken before the sync is the fastest way back to a known-good state:
            </p>

            <Code language='bash' code={`
sudo rm -rf /var/www/html/mysite-website
sudo cp -r /home/ubuntu/mysite-website_backup_20260824 /var/www/html/mysite-website
sudo systemctl reload apache2
`} />
            <p className="mt-2">
                Because the backup was taken before <strong>rsync --delete</strong> ran, it's a complete, untouched snapshot of the last working deployment — not a partial or already-modified copy. That's the whole reason the backup step exists: --delete is irreversible once it runs, so the only real rollback path is having a full copy made beforehand.
            </p>
            <br />
            <p className="font-semibold text-2xl">12.Best Practices</p>

            <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>
                    <strong>Keep the Git checkout separate from Apache's web root.</strong> Never run git pull directly inside the directory Apache serves from — sync into it deliberately, on your terms, using rsync.
                </li>
                <li>
                    <strong>Use rsync --delete carefully.</strong>It's the fix for the cp -r problem, but it's also the step with the most potential to remove something you didn't intend to.
                </li>
                <li>
                    <strong>Always perform a dry run first.</strong> <strong>-n</strong> -n costs nothing and catches exactly the kind of stale-file surprises that are easy to miss otherwise.
                </li>
                <li>
                    <strong>Keep a backup before every production deployment.</strong> A timestamped cp -r before syncing is cheap insurance against a bad deploy.
                </li>
                <li>
                    <strong>Validate Apache before and after deployment.</strong> Running <strong>apache2ctl configtest</strong>
                    apache2ctl configtest before reloading, and a live curl -I check after, closes the loop.
                </li>
                <li>
                    <strong>Test the actual HTTPS endpoint.</strong>A successful file sync doesn't guarantee a working website — only a real request to the live URL does.
                </li>
            </ul>
            <br />
            <p className="font-semibold text-2xl">Conclusion</p>

            <p className="mt-2">
                The lesson here isn't really about rsync syntax — it's that deployment is a synchronization problem, not a copying problem. cp -r only knows how to add and overwrite; it was never going to notice that projects.html and cookies.html had been moved into old-code/ upstream. rsync --delete, paired with a dry run to preview the damage before it happens and a backup to undo it if needed, turns deployment from "hope nothing was missed" into something you can actually verify — file by file, with a clean diff and a 200 OK to prove it.
            </p>
        </div>
    );
}

export default SixtySix;