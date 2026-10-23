import { Code } from "../../../utils/Helpers";

const TwentySix = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Vim_Basics/VimPoster.png"
        alt="Vim blog Poster"
      />
      <br />
      <p className="text-xl font-bold mb-2">
        Mastering the Basics of Vim Editor: A Beginner's Guide
      </p>

      <p>
        <b>Audience:</b> This blog is specially written for:
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Beginners – People starting with Linux or programming and confused by
          Vim
        </li>
        <li>Linux Users – Who need to edit config files or scripts</li>
        <li>Developers – Who want a faster editing workflow</li>
        <li>DevOps Engineers – Who often work with remote systems</li>
      </ul>

      <br />
      <p>
        <b>Purpose:</b> To help new users understand and get comfortable using
        Vim for daily editing tasks.
      </p>

      <br />
      <p>
        <b>Introduction:</b>
      </p>
      <p>
        Vim can be intimidating at first. If you've ever opened it accidentally
        and didn’t know how to exit—you're not alone. But with just a few
        commands, Vim becomes an efficient and powerful editor for terminal
        environments and remote servers.
      </p>

      <br />
      <p>
        <b>What is Vim?</b> Vim stands for "Vi Improved". It’s a fast,
        lightweight, and highly configurable text editor available on most Unix
        systems.
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>Write/edit code (e.g., Python, C, Java)</li>
        <li>Edit config files like .bashrc, .vimrc</li>
        <li>Write notes or documentation in terminal</li>
        <li>Manage files remotely using SSH</li>
      </ul>

      <br />
      <p>
        <b>Installing Vim on Linux:</b>
      </p>
      <Code language="bash" code={`sudo apt-get install vim`} />

      <br />
      <p>
        <b>Modes in Vim:</b>
      </p>

      <p>
        <b>1. Normal Mode</b>: Default mode on open. Used to navigate, delete,
        and copy.
      </p>
      <ul className="list-disc ml-6">
        <li>dd – delete line</li>
        <li>yy – copy line</li>
        <li>p – paste</li>
        <li>u – undo</li>
        <li>Ctrl + r – redo</li>
      </ul>

      <p>
        <b>2. Insert Mode</b>: Used for editing text.
      </p>
      <ul className="list-disc ml-6">
        <li>i, I – insert</li>
        <li>a, A – append</li>
        <li>o, O – open new lines</li>
        <li>Exit with Esc</li>
      </ul>

      <p>
        <b>3. Visual Mode</b>: Used for selecting text.
      </p>
      <ul className="list-disc ml-6">
        <li>v – character-wise</li>
        <li>V – line-wise</li>
        <li>Ctrl + v – block-wise</li>
      </ul>

      <p>
        <b>4. Command-Line Mode</b>: Used to execute commands.
      </p>
      <ul className="list-disc ml-6">
        <li>:w – save</li>
        <li>:q – quit</li>
        <li>:wq – save & quit</li>
        <li>:q! – force quit</li>
      </ul>

      <p>
        <b>5. Replace Mode</b>: Overwrites existing text. Enter with{" "}
        <code>R</code>, exit with <code>Esc</code>.
      </p>

      <br />
      <p>
        <b>Moving the Cursor:</b>
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>h – left</li>
        <li>l – right</li>
        <li>j – down</li>
        <li>k – up</li>
        <li>0 – Start of line</li>
        <li>$ – End of line</li>
        <li>w/e/b – word-level moves</li>
        <li>gg/G – top/bottom of file</li>
      </ul>

      <br />
      <p>
        <b>Editing Text:</b>
      </p>
      <ul className="list-disc ml-6">
        <li>i, I, a, A, o – for entering insert mode in different positions</li>
      </ul>

      <br />
      <p>
        <b>Deleting Text:</b>
      </p>
      <ul className="list-disc ml-6">
        <li>x – delete character</li>
        <li>dd – delete line</li>
        <li>dw – delete word</li>
        <li>d$ – delete to end of line</li>
      </ul>

      <br />
      <p>
        <b>Undo and Redo:</b>
      </p>
      <ul className="list-disc ml-6">
        <li>u – Undo</li>
        <li>Ctrl + r – Redo</li>
      </ul>

      <br />
      <p>
        <b>Copy and Paste:</b>
      </p>
      <ul className="list-disc ml-6">
        <li>yy – copy line</li>
        <li>y – copy selected text</li>
        <li>p – paste after</li>
        <li>P – paste before</li>
      </ul>

      <br />
      <p>
        <b>Show Line Numbers:</b>
      </p>
      <Code language="vim" code=":set number" />
      <Code language="vim" code=":set nonumber" />

      <br />
      <p>
        <b>Search for Word:</b>
      </p>
      <Code language="vim" code={`/word`} />
      <p>Navigate using n (next), N (previous)</p>

      <br />
      <p>
        <b>Replace Text:</b>
      </p>
      <Code language="vim" code=":%s/old/new/g" />
      <Code language="vim" code=":%s/old/new/gc" />

      <br />
      <p>
        <b>Open Multiple Files:</b>
      </p>
      <Code language="bash" code={`vim file1.txt file2.txt`} />
      <Code language="bash" code={`:n  :N  :first  :last`} />

      <br />
      <p>
        <b>Splitting Windows:</b>
      </p>
      <Code language="bash" code={`vim -o file1 file2`} />
      <Code language="bash" code={`vim -O file1 file2`} />
      <p>Move between splits: Ctrl + w then h/j/k/l</p>

      <br />
      <p>
        <b>Conclusion:</b>
      </p>
      <p>
        Vim may feel strange at first, but with practice, it becomes a highly
        efficient tool for any developer or DevOps professional. Practice a few
        commands daily and you’ll soon be editing like a pro right inside your
        terminal.
      </p>
    </div>
  );
};

export default TwentySix;
