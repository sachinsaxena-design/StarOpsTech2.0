import React from "react";
import { Code, Para } from "../../../utils/Helpers";

const Ten = () => {
  return (
    <>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/unixtolinux/cover.jpg"
        alt="unix linux"
      />
      <br />
      <Para>
        To understand how Linux came to be, we must look back to the early days
        in computing, when Ken Thompson and Dennis Ritchie of Bell Laboratories
        began working on UNIX, the first ever portable operating system. The
        year was 1969. UNIX could run on a range of devices and was widely used
        as proprietary software. Then, Richard Stallman started the GNU Project
        in 1983 with goals to create a free operating system. At the time, the
        free software movement was advocating for the freedom for users to
        modify and share copies of software. The project created the GNU General
        Public License (GPL), a widely used free software license, which set the
        background for the Linux operating system.
      </Para>
      <Para>
        Back in 1991, a young 21 year old Finnish computer science student named
        Linus Torvalds. Torvalds registered in a Unix course while visiting the
        University of Helsinki in the 1990's fall. The course used a MicroVAX
        minicomputer executing Ultrix, and one of the needed texts was Operating
        Systems: Design and Implementation by Andrews S. Tanenbaum. The textbook
        contained a copy of the MINIX operating system of Tanenbaum. It was
        together with this course that Torvalds initially became open to Unix.
        He became interested in operating systems in 1991. He purchased an
        IBM-compatible computer running the MS-DOS operating system. During his
        studies as a computer science student at the University of Helsinki,
        Linus wanted to migrate the PC from MS-DOS to the operating system he'd
        grown accustomed to — UNIX. Unfortunately, the cheapest UNIX (MINIX)
        license available at the time was approximately $5,000.00 USD, which was
        not an option. Frustrated by the MINIX licensing, which limited it to
        only educational use at the time, he started to work on his operating
        system kernel. So, there was not yet a free operating system. Driven by
        his need to work with a UNIX-like platform, Linus took matters in his
        own hands and set out to develop his own version of UNIX.
      </Para>
      <Para>
        The first step Linus took was to post to comp.os.minux. The content of
        that now-famous letter was short and to the point.
      </Para>
      <p className='font-semibold my-5 text-[#005FE3]'>
        Hello everybody out there using minix - I'm doing a (free) operating
        system (just a hobby, won't be big and professional like gnu) for
        386(486) AT clones. This has been brewing since April and is starting to
        get ready. I'd like any feedback on things people like/dislike in minix,
        as my OS resembles it somewhat (same physical layout of the file-system
        (due to practical reasons) among other things). I've currently ported
        bash(1.08) and gcc(1.40), and things seem to work. This implies that
        I'll get something practical within a few months, and I'd like to know
        what features most people would want. Any suggestions are welcome, but I
        won't promise I'll implement them :-) Linus (torv…@kruuna.helsinki.fi)
        PS. Yes — it's free of any minix code, and it has a multi-threaded fs.
        It is NOT portable (uses 386 task switching etc), and it probably never
        will support anything other than AT-harddisks, as that's all I have :-(.
        — Linus Torvalds
      </p>
      <p className="my-5">
        That original post would capture the attention of hundreds of developers
        and work immediately began.
      </p>
      <Para>
        {" "}
        He wrote this program specially for his own PC as he wanted to use Unix
        386 Intel computer but couldn't afford it. So Linus, started a project
        to create a free operating system kernel. Linux was inspired by Minix, a
        Unix-like system, and it sought to be a free and open alternative
        accessible to everyone, and software written for MINIX was used on Linux
        as well. He did it on MINIX using GNU C compiler. GNU C compiler is
        still the main choice to compile Linux code but other compilers are also
        used like Intel C compiler. He started it just for fun but ended up with
        such a large project. Firstly he wanted to name it as 'Freax' but later
        it became 'Linux' after a combination of Torvalds' first name and the
        word Unix, and the name stuck.
      </Para>
      <Para>
        Initially, Torvald's operating system was only intended for personal
        use, but he soon released it to the public as a free and open-source
        project. The first version, known as Linux 0.01, was released on 17
        September 1991. It wasn't until March 1994 that version 1.0 of the Linux
        kernel was released. At about the same time, American software developer
        Richard Stallman and the FSF made efforts to create an open-source
        UNIX-like operating system called GNU (Gnu's Not Unix). Torvalds,
        Stallman, and the FSF worked together to start creating utilities for
        the operating system first. These utilities were then added to the Linux
        kernel to create a complete system called GNU/Linux. Also, GNU
        applications replaced every MINIX component due to it was beneficial to
        use the free code through the GNU Project with the new OS; code licensed
        upon the GNU GPL can be re-applied in other computer functions as long
        as they are also published under a compatible or the same license. The
        release of Linux under the GNU General Public License (GPL) meant that
        anyone could use, modify, and distribute it, ensuring its development
        was a collaborative effort. As Linux evolved, it garnered support from
        developers worldwide. Torvalds started a switch from his actual license,
        which banned commercial distribution, to the GNU GPL. Today, Linux
        refers that anyone can create their own many versions of Linux operating
        systems or the creation of numerous distributions (distros) built on top
        of the base code that cater to different needs and preferences. Its
        growth was also fuelled by the rise of the internet, which facilitated
        collaboration and sharing of code among developers across the globe.{" "}
      </Para>
      <Para>
        In production environments, Linux adoption began to take off initially
        in the mid-1990s in the supercomputing community instead of being used
        by only hobbyists, where organizations like NASA began to increasingly
        replace their expensive machines with inexpensive commodity computer
        clusters running Linux. Commercial use started when IBM and Dell,
        pursued by Hewlett-Packard, began providing Linux support for escaping
        the monopoly of Microsoft in the desktop OS market.
      </Para>
      <Para>
        The lead maintainer of the Linux Kernel is Greg Kroah-Hartman who guides
        its development. The e executive director for the Free Software
        Foundation is William John Sullivan, which in turn supported the GNU
        components. Corporations and individuals finally develop non-GNU
        third-party components. The third-party components are composed of a
        wide body of work and may contain both user libraries and applications,
        and kernel modules. Linux community and vendors distribute and combine
        the kernel, non-GNU components, and GNU components with extra package
        management software in the fashion of Linux distributions.
      </Para>
      <Para>
        Since then, Linux has become one of the most powerful, flexible, and
        secure operating systems on the planet. Today, Linux stands as a
        testament to the power of open-source software, with its kernel at the
        heart of millions of systems, from tiny embedded devices to the majority
        of the world's supercomputers. Linux is the primary operating system for
        the cloud and is responsible for running things like smart devices (your
        thermostats, refrigerators, e-readers, cars, and just about any device
        that requires an embedded operating system). In fact, one of the most
        popular platforms on the planet, Android, is powered by the Linux
      </Para>
    </>
  );
};

export default Ten;
