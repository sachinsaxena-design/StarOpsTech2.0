import React from "react";
import { Para } from "../../../utils/Helpers";

const Twelve = () => {
  return (
    <>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/linux kernal or os/1.png"
        alt="linux"
      />
      <br />
      <p>
        <b>What is Linux (Lovable Intellect Not Using XP)</b>
      </p>
      <Para>
        The Linux Operating System is a type of operating system that is similar
        to Unix, that has become a cornerstone of the computing world, powering
        everything from personal computers to servers and mobile devices and it
        is built upon the Linux Kernel. So, Linux is an open-source, Unix-like
        operating system kernel that serves as the foundation for various Linux
        distributions (distros).
      </Para>
      <Para>
        Unlike other operating systems, Linux has a rather minimalist user
        interface without all the features of more user experience-focused
        systems, like MacOS. Instead, Linux is designed to be very functional
        and allow users a large degree of control over their system and
        hardware. One of the biggest advantages of Linux is its open-source
        coding, which allows significant customization and control, and the
        large community which maintains the operating system. While most
        operating systems have one main version, called a distribution, that
        acts as the user interface, Linux has numerous distributions. 
      </Para>
      <Para>
        To create a full and functional system, the Linux Kernel is combined
        with a collection of software packages and utilities, which are together
        called Linux distributions. These distributions make the Linux Operating
        System ready for users to run their applications and perform tasks on
        their computers securely and effectively. Linux distributions come in
        different flavors, each tailored to suit the specific needs and
        preferences of users. Unlike proprietary operating systems, Linux is
        developed collaboratively by a vast community of contributors. Its open
        nature allows developers to customise, modify, and distribute it freely,
        which has led to the creation of a multitude of Linux distros tailored
        for specific purposes.
      </Para>
      <Para>
        While most operating systems run in self-contained architecture, this
        openness encourages people from all over the world to work together and
        make Linux better and better. Since its beginning, Linux has grown into
        a stable and safe system used in many different things, like computers,
        smartphones, big supercomputers , servers, mainframes, and embedded
        devices. It is supported on almost every major computer platform,
        including x86, ARM and SPARC, making it one of the most widely supported
        operating systems. It’s known for being efficient, meaning it can do a
        lot of tasks quickly, and it’s also cost-effective, which means it
        doesn’t cost a lot to use. Lots of people love Linux, and they’re part
        of a big community where they share ideas and help each other out.
      </Para>
      <ul className="list-inside list-disc">
        <li>
          Originally, Linux was designed for personal computers that were Intel
          x86 architecture-based, but it has since been moved to more
          environments than other operating systems.
        </li>
        <li>
          Including Android, Linux has the biggest installed base of every
          general-purpose operating system because of the control of the
          Linux-based Android over smartphones as of May 2022.
        </li>
        <li>
          However, Linux is used by just around 2.6% of desktop computers as of
          November 2022.
        </li>
        <li>
          Also, Linux executes on many embedded systems, i.e., devices whose OS
          is typically designed into the firmware and is extremely customized to
          the system.
        </li>
        <li>
          It includes spacecraft (Perseverance rover, Dragon crew capsule, and
          Falcon 9 rocket), automobiles (Toyota, Hyundai, Mercedes-Benz, Audi,
          and Tesla), televisions (LG and Samsung Smart TVs), video game
          consoles, smart home devices, automation controls, and routers.
        </li>
        <li>
          Linux distributions have become famous in the netbook market, with
          several devices moving with installed customized Linux distributions
          and Google publishing their ChromeOS developed for netbooks.
        </li>
        <li>
          It is used to run huge global networks to control electronic projects
          like a Raspberry Pi.
        </li>
      </ul>
      <Para>
        Linux is one of the most outstanding examples of open-source and free
        software collaboration. The source code may be distributed, modified,
        and used non-commercially or commercially by everyone under the
        conditions of its respective licenses, like the GNU GPL (General Public
        License). For example, the Linux kernel is licensed upon the GPLv2.
        <br />
        Linux is a widely used open-source Unix-like operating system. This is
        what most of us know. However, Linux is not an operating system. At
        least not technically.
        <br />
        How? and why? let's break it down. But wait... before going any further,
        let's clear the idea of a kernel and an operating system!!!
        <br />
        So, in this blog, we will also discuss if we should call Linux a
        <b>KERNEL</b> or an <b>OPERATING SYSTEM</b>?
      </Para>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/linux kernal or os/4.png"
        alt="unix linux"
      />
      <br />
      <p>
        <b>Now a question arises in your mind that “What is kernel?” </b>
      </p>
      <br />
      <Para>
        For now, you should know that - It is a core component of an OS. It is
        the primary connection between the hardware and the software components
        of a computer. The kernel provides low-level services, such as memory
        management, process management, and device management, to other parts of
        the operating system
        <br />
        Most people refer to the entire operating system as "Linux" because to
        most users an OS includes a bundle of programs, tools, and services
        (like a desktop, clock, an application menu, and so on). Some people,
        particularly members of the Free Software Foundation, refer to this
        collection as GNU/Linux, because many vital tools included are GNU
        components. However, not all Linux installations use GNU components as a
        part of the operating system:
      </Para>
      <Para>
        <b>Let’s understand simply with an example:</b>
      </Para>
      <Para>
        Imagine you're building a house. You start with a solid foundation and
        framework - the equivalent of your computer's operating system. This
        foundation allows you to build up walls, add doors, and install windows
        - just like how the operating system enables you to run applications,
        interact with hardware, and manage files.
        <br />
        Now, let's say you're planning a big dinner party at your house. You've
        got everything set up - decorations, tables, chairs, and a delicious
        meal prepared. But when you go to turn on the lights, nothing happens.
        You check the wiring and realise that someone has stolen the electrical
        panel!
        <br />
        The electrical panel in this analogy is like the kernel of your
        operating system. It's the core component that manages crucial tasks
        like allocating memory, handling network connections, communicating with
        devices, managing files, and overseeing processes.
        <br />
        Just as a house needs its electrical panel to function properly, your
        operating system relies on its kernel to operate effectively. Without
        the kernel, your computer wouldn't be able to perform essential tasks
        and run applications smoothly.
        <br />
        Moreover, just like how different houses can use the same type of
        electrical panel but have entirely different layouts and designs,
        different operating systems can utilise the same kernel while offering
        unique features and functionalities. For instance, imagine two houses in
        the same neighbourhood using identical electrical panels but having
        distinct interior designs and amenities.
        <br />
        This concept is evident in various Linux-based operating systems, known
        as distributions or distros. Each distro may use the same Linux kernel
        but can vary significantly in terms of user interface, included
        software, and system configurations. Just like how two houses with the
        same electrical panel can have different styles and atmospheres, Linux
        distros like Fedora and Ubuntu offer diverse user experiences despite
        sharing a common kernel foundation.
      </Para>
      <p>
        We will know about details of KERNEL in “Architecture of Linux“ blog.
      </p>
      <br />
      <p>
        <b>Linux: Kernel or Operating System?</b>
      </p>
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/linux kernal or os/2.png"
        alt="linux"
      />
      <Para>
        Technically, Linux is a monolithic kernel, not an operating system. The
        correct term is- Linux distribution or Distro, such as – Ubuntu, Fedora
        Linux, Deepin, etc.
        <br />
        The inventor of Linux, Linus Torvalds began this project to create a
        free operating system kernel. He first published the Linux kernel under
        its own license, but it had limitations on commercial use.
        <br />
        As we discussed earlier, the kernel is just a part of the operating
        system. OS is a complete software package, that contains a kernel and
        other components such as system libraries, device drivers, and
        utilities. Every OS has a kernel (Even Windows, and MAC OS), without the
        kernel the OS cannot work. However, the kernel alone cannot function
        either. To make it a working system, we need other components as well.
        That is why in 1992 it was relicensed under the GNU GPL (General Public
        License ), which included a binary of GNU’s bash shell. Torvalds also
        mentioned this in the “Notes for linux release 0.01“.
        <br />
        These GUIs revolutionized computing during the OS wars in the late 1970s
        by humanizing software—making it more visual. More real. But at some
        point, you might need to ask the computer to do something outside the
        prepackaged bucket of actions a GUI can perform. At that point, you need
        to open up the command line—the strips of code you see tech-savvy
        geniuses in TV and movies feverishly typing away at. But that Hollywood
        treatment makes the command line (a staple of open source OSs) seem like
        something impossible to master.
        <br />
        The truth is, the command line is the most straightforward use of a
        computer. These tools give the user a way to manage the
        resources provided by the kernel, install additional software, configure
        performance and security settings, and more. All of these tools bundled
        together make up the functional operating system. Because Linux is an
        open source OS, combinations of software can vary between Linux
        distributions. Typically, Linux is packaged as the Linux distribution,
        which contains the supporting libraries and system software and kernel,
        several of which are offered by the GNU Project. Several Linux
        distributions use the term "Linux" in the title, but the Free Software
        Foundation uses the "GNU/Linux" title to focus on the necessity of GNU
        software, causing a few controversies.
        <br />
        Later on, more developers contributed to the Linux kernel, which helped
        the kernel to integrate with the the GNU environment. It opened a
        doorway to create a wide spectrum of application types for Linux, and
        different Linux distributions were created.
        <br />
        So, that’s why we need to know that purists will always stand by their
        claim that Linux is actually just a kernel. Although that was definitely
        true in the beginning, today the term Linux refers to much more than
        just a kernel. However, that’s what Linus Torvalds not only created but
        works on to this day — the Linux kernel.
      </Para>

      <p>
        <b>Conclusion:</b>
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/linux kernal or os/3.png"
        alt="linux is kernal"
      />
      <Para>
        Now you know what to answer when someone asks you if Linux is a kernel
        or an operating system. However, if someone says, “Linux is my favorite
        operating system.”, you don’t have to correct them by telling them this
        story. The GNU and Debian projects use the name “GNU/Linux”, but most
        people simply like to call it “Linux” to refer to the combination. So,
        there is nothing wrong with it, but if you want to be technically
        correct then use the term “Linux Distribution“.
        <br />
        So someone was to ask you hey what operating system are you running
        right now! It would be Kali Linux, Kali Linux using Linux Kernal.
        Actually, I want to point it out! The Kernal !!!!
      </Para>
    </>
  );
};

export default Twelve;
