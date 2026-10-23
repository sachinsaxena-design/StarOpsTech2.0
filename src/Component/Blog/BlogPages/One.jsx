import React from "react";

const One = () => {
  return (
    <>
      <img
        className="max-h-[500px] w-full   mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/A Journey with Homebrew/1.png"
        alt="Homebrew Blog StarOps "
      />
      <br />
      <p>
        Congratulations on your new Mac! 🎉 If you're reading this blog, chances
        are you've recently acquired a shiny new Mac and are ready to embark on
        an exciting journey as a developer. Or perhaps, you're here because
        you're curious about my very first blog post. Either way, I'm thrilled
        to have you here!
      </p>
      <br />
      <p>So, what's next? It's time to start your journey.</p>
      <br />
      <p>
        In a world filled with magical macOS computers ✨🖥️, there lived a young
        wizard named Harry MacPotter 🧙&zwj;♂️. He wanted to make his computer
        even more powerful and versatile 🚀💪. So, he set out on a quest to
        discover a special potion called <strong>"Homebrew"</strong> 🧪🔮, which
        could grant him the ability to perform amazing tricks with just a few
        simple words 🪄📝.
      </p>
      <br />
      <p>
        First, Harry opened the
        <strong>"Spotlight"</strong> by pressing the
        <strong>"Command + Space"</strong> keys ⌨️, and he found the{" "}
        <strong>"Terminal"</strong> ⚡🔍, a magical place where powerful
        commands could be spoken.
      </p>
      <br />
      <img
        className="max-h-[500px] w-full   mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/A Journey with Homebrew/2.png"
        alt="Terminal"
      />
      <br />
      <p>
        Then, he used his browser to visit the
        <a
          className="text-logo"
          target="_blank"
          rel="noreferrer"
          href="https://brew.sh"
        >
          <span> </span>Homebrew <span> </span>
        </a>
        website 🌐🔗, where he found a special command that he copied and pasted
        into the Terminal.
      </p>
      <br />
      <img
        src="https://cdn.staropstech.com/starops/Blogs/A Journey with Homebrew/3.png"
        className="max-h-[500px] w-full   mx-auto rounded-lg"
        alt="Homebrew installation guide by Starops"
      />
      <br />
      <pre className="bg-black p-2 text-white rounded-lg w-full overflow-scroll">
        <code>
          /bin/bash -c "$(curl -fsSL
          https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        </code>
      </pre>
      <br />
      <p>
        When Harry pressed "Enter," the magic began! Homebrew started working
        its wonders 🌟🔥, installing powerful tools and spells to enhance his
        computer. The Terminal asked for his password, just to ensure everything
        was safe and secure 🔐🛡️.
      </p>
      <br />
      <img
        src="https://cdn.staropstech.com/starops/Blogs/A Journey with Homebrew/4.png"
        className="max-h-[500px] w-full   mx-auto rounded-lg"
        alt="Homebrew installation guide by Starops"
      />
      <br />
      <p>
        To make Homebrew even more accessible, Harry added a special path to his
        computer's settings 🛤️🔧 which is shown when Homebrew is installed. For
        example,
      </p>
      <br />
      <pre className="bg-black p-2 text-white rounded-lg w-full overflow-scroll ">
        <code className="text-wrap">
          echo 'eval "$(/opt/homebrew/bin/brew shellenv)" &gt;&gt;
          /Users/dewang/.zprofile eval "S(/opt /homebrew/bin/brew shellenv)"
        </code>
      </pre>
      <br />
      <p>
        <strong>
          <mark>NOTE:</mark>
        </strong>
        <mark>
          Copy the commands from your terminal to add Homebrew as a path
          variable to use it as an executable file.
        </mark>
      </p>
      <br />
      <p>
        Now, he could summon Homebrew with just a few words, like a true wizard
        🗣️🪄.
      </p>
      <br />
      <p>
        Curious to know what version of Homebrew he had summoned, Harry asked
        the Terminal, and it happily revealed the answer 🤔🎩.
      </p>
      <br />
      <pre className="bg-black p-2 text-white rounded-lg">
        <code>brew --version</code>
      </pre>
      <br />
      <img
        src="https://cdn.staropstech.com/starops/Blogs/A Journey with Homebrew/5.png"
        className="max-h-[500px] w-full   mx-auto rounded-lg"
        alt="Homebrew installation guide by Starops"
      />
      <br />
      <p>
        Eager to explore more magical spells, Harry used Homebrew to install a
        special spell called "Tree" 🌳🌟.
      </p>
      <br />
      <pre className="bg-black p-2 text-white rounded-lg w-full overflow-scroll">
        <code>brew install tree</code>
      </pre>
      <br />
      <img
        src="https://cdn.staropstech.com/starops/Blogs/A Journey with Homebrew/6.png"
        className="max-h-[500px] w-full   mx-auto rounded-lg"
        alt="Homebrew installation guide by Starops"
      />
      <br />
      <p>
        This spell allowed him to see the structure of his computer's files and
        folders in a neat and organized way 📂🔍. With a wave of his wand, or
        rather, a few words in the Terminal, Harry could now see a magical
        tree-like structure of his computer's files 🌳💼.
      </p>
      <br />
      <img
        src="https://cdn.staropstech.com/starops/Blogs/A Journey with Homebrew/7.png"
        className="max-h-[500px] w-full   mx-auto rounded-lg"
        alt="Homebrew installation guide by Starops"
      />
      <br />
      <p>
        But that wasn't all! He could also see a list of all the magical spells,
        or "packages," he had installed using Homebrew 📦🔮. It was like having
        a treasure chest of powerful tools at his fingertips! 💼🔑
      </p>
      <br />
      <pre className="bg-black p-2 text-white rounded-lg w-full overflow-scroll">
        <code>brew list</code>
      </pre>
      <br />
      <img
        src="https://cdn.staropstech.com/starops/Blogs/A Journey with Homebrew/8.png"
        className="max-h-[500px] w-full   mx-auto rounded-lg"
        alt="Homebrew installation guide by Starops"
      />
      <br />
      <p>
        Harry MacPotter had become a skilled sorcerer of Homebrew magic, using
        simple words and commands to unlock incredible powers on his macOS
        computer 🎩✨. With Homebrew as his ally, he knew that his adventures in
        the world of computers would be even more exciting and enchanting!
        🌌🔮🪄
      </p>
    </>
  );
};

export default One;
