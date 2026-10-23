import React from "react";

const Six = () => {
  return (
    <>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Memory directory/memorycover.gif"
        alt="Memory directory linux"
      />
      <br />
      <p>
        <strong>Memory Directory </strong>
      </p>
      <p>
        Memory directory contains files of the whole system. All the device
        information, process running indata or system related information are
        stored in this directory.
      </p>
      <br />
      <p>Memory directory contains the following directories:</p>
      <ul className="list-disc list-inside">
        <li>
          <strong>/dev</strong>
        </li>
        <li>
          <strong>/proc</strong>
        </li>
        <li>
          <strong>/sys</strong>
        </li>
      </ul>
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Memory directory/a8.png"
        alt="Memory directory linux"
      />
      <br />
      <p>
        <strong>/dev (device files)</strong>
      </p>
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Memory directory/a81.png"
        alt="dev directory linux"
      />
      <br />
      <p>
        Linux treat, everything as a file, and hardware is not an exception to
        this rule. It acts as an interface between hardware and software, as if
        they were regular files. So, it is an access point to devices on your
        system. This is typically, an area that applications and drivers will
        access, so you will rarely play with this area. Many of these are
        generated at boot time or even on the fly. In brief words, it contains
        virtual device files of hardware info like speaker, keyboards, CPU etc
        or in easy words this is also know as "This PC or My Computer" of Linux.
      </p>
      <br />
      <p>
        It has access to every hardware devices your Linux is able to recognise
        which are attached to the system. We can create disk partition here on
        interface of your system. You may recall that when you mount a hard
        drive, you use a name such as <b>"/dev/sda1"</b>. The sda1 is the name
        of the first hard drive recognised by your Linux kernel and is located
        in the <b>/dev </b>folder.
      </p>
      <br />
      <p>
        There are also some 'pseudo-devices' that don't correspond to hardware.
        These special files can either be character or block files.
      </p>
      <br />
      <p>
        Keep in mind that these are not device drivers, rather they are file
        that represent each device on the computer and facilitate access to
        those device. These includes terminal devices, USB or any device
        attached to the system.
      </p>
      <br />
      <p>
        <strong>/proc (process)</strong>
      </p>
      <br />{" "}
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Memory directory/a28.png"
        alt="proc directory linux"
      />
      <br />
      <p>
        It is an illusionary or virtual file system maintained by Linux Kernel
        that doesn't actually exist on the disk, but it is created in memory on
        the go by Linux Kernel to keep track of running process with a
        particular PID in a special type of file and a lot of system utilities .
        In brief, it is a pseudo file system that contains information about
        running system processes and kernel as files that the user can access.
        For example: /proc/&#123;PID&#125; directory contains information about
        the process with the particular PID. example: /proc/uptime
      </p>
      <br />
      <p>
        The most distinctive thing about files in this directory is the fact
        that all of them have a file size of zero (0 bytes) yet they contain a
        lot of data. Most of the files are readable only, some require root
        privileges and some are writable. It is populated with data during boot
        and is cleaned when you shut down your Linux machine. The /proc
        directory is also home to system information such as memory usage,
        processor info, and so on. In Linux, it corresponds to a <b>`procfs`</b>{" "}
        mount, typically generated and populated automatically by the system as
        needed.
      </p>
      <br />
      <p>
        It is needed only for the Kernel to run different processes, not touched
        by user. Kernel parameter also found here. Linux Kernel can send and
        receive information from here to the terminal , including CPU and memory
        details.
      </p>
      <br />
      <p>
        In the /proc filesystem in Linux, the b and c entries represent device
        files.
      </p>
      <ul className="list-inside list-disc">
        <li>
          <b>* b: </b>Block device files represent devices that allow
          input/output operations in fixed-size blocks. Examples include hard
          disk partitions and storage devices like USB drives.
        </li>
        <li>
          <b>* c:</b> Character device files represent devices that allow
          input/output operations in streams of characters or bytes. Examples
          include terminals, printers, and serial ports.
        </li>
      </ul>
      <p>
        So, in /proc, a b entry would typically represent a block device, while
        a c entry would represent a character device. These entries provide
        information about various devices and their configurations within the
        Linux system.
      </p>
      <p>
        <strong>/sys (system)</strong>
      </p>
      <br />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Memory directory/a38.png"
        alt="sys directory linux"
      />
      <br />
      <p>
        The <b>`/sys`</b> directory provides a means to interact (interface)
        with the kernel primarily focusing on hardware-related low-level
        operations similar to the /proc directory. It serves as an interface for
        system administrators and processes to gather data interchangeably. It
        isn't physically stored on disk; instead, it's created dynamically
        during system boot and serves as a standard location for storing
        transient files, such as sockets and process IDs. User-provided input
        reflects the hardware output in the <b>`/sys`</b>
        directory. It isn't intended for storage or installation purposes.
        <b>`/sys`</b> contains system and kernel-related hardware features, such
        as Bluetooth, Intel, and driver information. Basically it contains
        kernel information about hardware. It was created for Linux 2.6 kernel.
        Additionally, it contains information about system status, including
        power management settings and system clock configurations, in addition
        to /proc. In simple words, it is a kind of '/proc' and is used for plug
        and play configuration.
      </p>
      <br />
      <p>
        The kernel also exports information to another virtual file system
        called sysfs. The sysfs file system is used by programs to access device
        and device driver information. Mounted on /sys, it provides an interface
        to the kernel, offering a file system-like view of information and
        configuration settings, allowing structured access to system and
        component details.
      </p>
      <br />{" "}
      <p>
        <strong> CONCLUSION:</strong>
      </p>
      <p>
        In conclusion, the memory directory in Linux serves as a crucial aspect
        of the operating system, providing access to essential system
        information and facilitating communication between hardware and
        software. The /dev directory acts as an interface to hardware devices,
        presenting them as files for easy access by applications and drivers.
        Meanwhile, the /proc directory offers a virtual file system maintained
        by the Linux kernel, containing real-time information about running
        processes and system parameters.
      </p>
      <br />
      <p>
        Similarly, the /sys directory serves as an interface for low-level
        hardware operations, providing a standardized location for accessing
        hardware-related data and configurations. While /proc focuses on process
        and kernel-related information, /sys delves deeper into hardware
        specifics, including device drivers and system status.
      </p>
      <br />
      <p>
        Overall, these directories collectively form the backbone of system
        management and interaction in Linux, offering a structured approach to
        accessing and configuring both hardware and software components.
        Understanding their roles and functionalities is essential for system
        administrators and developers alike in optimizing system performance and
        troubleshooting issues effectively.
      </p>
    </>
  );
};

export default Six;
