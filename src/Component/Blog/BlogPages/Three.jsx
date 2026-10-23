import React from "react";

const Three = () => {
  return (
    <>
      <img
        className="max-h-[500px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Decoding Binary Files/binaryfiles.png"
        alt="Linux Hierarchy Standards"
      />
      <br />
      <p>
        Have you ever wondered what happens behind the scenes when you execute a
        command on your computer? You may have heard of the term "binary files"
        or seen directories like "/bin" or "/sbin" on your system, but what do
        they actually contain?
      </p>
      <br />
      <p>Let's take a closer look at the binary directory and its contents.</p>
      <br />
      <p className="text-xl font-bold">What are Binary Files?</p>
      <br />
      <p>
        Binary files, also known as executable files, contain compiled source
        code or machine code. They are called "binary" because they are in a
        format that computers can understand and execute directly. Unlike text
        files, you can't open binary files to read the code inside them.
        Instead, they are meant to be run by the computer's operating system.
      </p>
      <br />
      <p className="text-xl font-bold">Exploring the Binary Directory</p>
      <p>
        The binary directory on your system typically consists of four main
        subdirectories:
      </p>
      <br />
      <ol>
        <li>
          <strong>1. /bin (Binaries):</strong> This directory contains essential
          commands that are used throughout the operating system. These commands
          are in binary format and include basic functionalities like listing
          directory contents (<code>ls</code>), viewing manual pages (
          <code>man</code>), and transferring data (<code>curl</code>). Both
          system administrators and regular users can access these commands.
        </li>
        <br />
        <li>
          <strong>2. /sbin (System Binaries):</strong> Similar to /bin, /sbin
          contains essential system binaries. However, the commands in this
          directory are reserved for use by the superuser or root user. They are
          primarily used for system maintenance and administration tasks, such
          as changing user permissions (<code>su</code>), rebooting the system (
          <code>reboot</code>), and managing disk partitions.
        </li>
        <br />

        <li>
          <strong>3. /lib (Libraries / System Libraries):</strong> This
          directory houses shared libraries and kernel modules that are used by
          the binaries in /bin and /sbin. These libraries provide functions and
          resources that applications rely on to perform various tasks. While
          users may not interact directly with /lib, it plays a crucial role in
          the functioning of the operating system.
        </li>
        <br />

        <li>
          <strong>4. /opt (Optional):</strong> The /opt directory contains
          optional or add-on software that is not essential for the system's
          core functionality. This directory is often used for installing
          third-party applications or software packages that are not included in
          the default installation. Examples of software that may be found in
          /opt include web browsers like Chrome, databases like Oracle, and
          specialized tools like Matlab.
        </li>
      </ol>
      <br />
      <p className="text-xl font-bold">Conclusion:</p>

      <p>
        The binary directory and its subdirectories are integral parts of the
        operating system, housing essential commands, libraries, and optional
        software. Understanding their role can help users navigate their systems
        more effectively and appreciate the complexity of modern computing
        environments. Next time you run a command on your computer, remember
        that it's just one small piece of the intricate puzzle that is the
        binary directory.
      </p>
    </>
  );
};

export default Three;
