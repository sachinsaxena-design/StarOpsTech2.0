import { Code } from "../../../utils/Helpers";

const TwentySeven = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Vim_Basics/buffer_vim.png"
        alt="Vim"
      />
      <br />
      <p className="text-xl font-bold mb-4">
        Understanding Vim Buffers: A Practical Guide for Developers
      </p>
      <p>
        Vim's buffer system is one of its most powerful yet misunderstood
        features. Unlike modern editors that rely on tabs or project trees, Vim
        treats open files as buffers—temporary workspaces in memory.
      </p>

      <br />
      <p className="font-semibold">What Are Vim Buffers?</p>
      <p>
        Imagine you have a stack of playing cards—each card is a file. The top
        card is the currently visible file. When you switch files, you bring a
        new card to the top. Others remain in the stack. That’s how Vim buffers
        work.
      </p>
      <ul className="list-disc ml-6 space-y-1 mt-2">
        <li>A buffer is a file loaded in Vim’s memory.</li>
        <li>You can switch between buffers without closing files.</li>
        <li>Only one buffer is visible at a time.</li>
      </ul>

      <br />
      <p className="font-semibold">Working with Buffers</p>
      <p>
        To switch buffers without saving every time, add this to your
        <code> .vimrc</code>:
      </p>
      <Code language="vim" code="set hidden" />

      <p>
        This allows you to switch between files without saving them immediately.
        However, Vim will still warn you before quitting if you have unsaved
        changes.
      </p>

      <br />
      <p className="font-semibold">Basic Buffer Commands</p>

      <p>Open file in a new buffer:</p>
      <Code language="vim" code=":e file.txt" />

      <p>Open file explorer:</p>
      <Code language="vim" code=":e ." />

      <p>Add file to buffer list without switching:</p>
      <Code language="vim" code=":badd file.txt" />

      <br />
      <p className="font-semibold">Listing Buffers</p>
      <Code language="vim" code=":ls" />
      <Code language="vim" code=":buffers" />
      <Code language="vim" code=":ls!" />
      <p className="mt-2">Buffer symbols:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          <code>%</code> – Current buffer
        </li>
        <li>
          <code>#</code> – Last edited buffer
        </li>
        <li>
          <code>a</code> – Active (loaded)
        </li>
        <li>
          <code>h</code> – Hidden
        </li>
        <li>
          <code>+</code> – Modified
        </li>
      </ul>

      <br />
      <p className="font-semibold">Navigating Between Buffers</p>
      <Code language="vim" code=":b 2" />
      <Code language="vim" code=":b file.txt" />
      <Code language="vim" code=":b#" />

      <p className="mt-2">Cycle through buffers:</p>
      <Code language="vim" code=":bn" />
      <Code language="vim" code=":bp" />
      <Code language="vim" code=":bf" />
      <Code language="vim" code=":bl" />

      <br />
      <p className="font-semibold">Splitting Windows</p>
      <Code language="vim" code=":sp file.txt" />
      <Code language="vim" code=":vs file.txt" />
      <p>
        Move between splits: <code>Ctrl + w w</code>
      </p>

      <br />
      <p className="font-semibold">Open Multiple Files in Splits</p>
      <p>Vertical Splits:</p>
      <Code language="bash" code="vim -O file1.txt file2.txt" />

      <p>Horizontal Splits:</p>
      <Code language="bash" code="vim -o file1.txt file2.txt" />

      <br />
      <p className="font-semibold">Advanced Buffer Tips</p>

      <p>Run a command across all buffers:</p>
      <Code language="vim" code=":bufdo %s/\\<tiwari\\>/shukla/g | update" />

      <p>Close current buffer:</p>
      <Code language="vim" code=":bd" />

      <br />
      <p className="font-semibold">Arglist Management</p>
      <p>Add file to arglist:</p>
      <Code language="vim" code=":arga file4.txt" />

      <p>Remove file from arglist:</p>
      <Code language="vim" code=":argd file4.txt" />

      <p>Arglist vs Buffers:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Buffers let you switch easily using <code>:b</code> commands
        </li>
        <li>Arglist is for batch operations but has limited navigation</li>
      </ul>

      <br />
      <p className="font-semibold">Tabs for Organization</p>
      <Code language="vim" code=":tabnew" />

      <br />
      <p className="font-semibold">Deleting Buffers</p>
      <Code language="vim" code=":bdelete gfgdemo.txt" />

      <br />
      <p className="font-semibold">Close All Buffers</p>
      <Code language="vim" code=":qall" />

      <br />
      <p className="font-semibold">Conclusion</p>
      <p>
        Vim’s buffer system makes multi-file editing fast and smooth. Instead of
        constantly opening and closing files, you can switch between them
        instantly and perform bulk actions with powerful commands.
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-1">
        <li>Jump quickly between files</li>
        <li>Edit many files at once</li>
        <li>Replace text across all buffers</li>
        <li>Organize work with splits and tabs</li>
      </ul>
    </div>
  );
};

export default TwentySeven;
