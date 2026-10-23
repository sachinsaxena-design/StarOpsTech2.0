import React from "react";

const Eight = () => {
  return (
    <>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/usr/usrdirectory.png"
        alt="user directory linux"
      />
      <br />
      <p>
        <strong>
          /usr (user binaries/ universal system resource/ UNIX system resource/
          user applications/ user system resources)
        </strong>
      </p>
      <br />

      <p>
        In UNIX, this directory is also known as Universal Shared Resource. This
        is the largest folder after your Home folder or /home directory. It
        contains all program used by a regular user, and use to save memory in
        Unix.{" "}
      </p>
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/usr/usrlinux.png"
        alt="user directory linux"
      />
      <br />
      <p>
        The <b>/usr</b> directory serves as a secondary hierarchy for read-only
        user data, primarily consists of multi-user utilities and installed
        applications utilised by the user and applications should not write
        anything into it. It serves as the repository for the majority of user's
        system utilities, files, binary, libraries, documentation, applications,
        and source code for second-level programs. Any application installed
        here are considered non essential for basic system operation itself and
        intended for the end user.
      </p>
      <br />
      <p>
        The <b>/bin</b> folder is symbolically linked to <b>"/usr/bin"</b>. The
        same goes for the <b>/sbin</b> and <b>/lib</b> directories. It is the
        directory with its own "bin" & "sbin" where installed application will
        reside in one of several places here such as <b>"/usr/bin"</b>,{" "}
        <b>"/usr/sbin"</b>,<b>"/usr/local/bin"</b> or <b>"/usr/local/sbin"</b>{" "}
        with their required libraries program that are installed from source
        code will end up in the
        <b>"/usr/local"</b> or <b>"/usr/local/lib"</b> folders.{" "}
      </p>
      <br />
      <p>
        Many larger program will install themselves into the "/usr/share". Any
        installed source code such as the Kernel source and the header files,
        will go into the "/usr/src" directory.{" "}
      </p>
      <br />
      <p>
        This directory seems like a confusing mess at first. However, the
        directory structure and the allocation of different components are
        clearly outlined in the Filesystem Hierarchy Standard (FHS).{" "}
      </p>
      <br />
      <p>
        At times, we may still need to explore other locations to locate certain
        items, as certain applications might not strictly adhere to the `/usr`
        directory standard and could opt for alternative approaches. Moreover,
        various Linux distributions might handle the `/usr` directory
        differently.
      </p>
      <br />
      <p>
        <strong>Conclusion:</strong>
      </p>

      <p>
        In summary, the /usr directory in UNIX serves as a vital repository for
        user-centric system utilities, applications, binaries, libraries, and
        documentation, distinct from essential system operations. While its
        structure and purpose are defined by the Filesystem Hierarchy Standard
        (FHS), deviations exist among distributions and applications,
        necessitating occasional exploration beyond /usr for specific items.
      </p>
    </>
  );
};

export default Eight;
