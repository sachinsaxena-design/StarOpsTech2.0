import React from "react";
import { Para } from "../../../utils/Helpers";

const Eleven = () => {
  return (
    <>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Non-Standard Directories/cover.png"
        alt="unix linux"
      />
      <br />
      <p>
        <b>Non-Standard Directories</b>
      </p>
      <Para>
        Directories which do not come under the standard FHS are called
        non-standard directories. Non-standard directories are as follows:
        <br />{" "}
        <img
          className="max-h-[500px] w-full  mx-auto rounded-lg"
          src="https://cdn.staropstech.com/starops/Blogs/Non-Standard Directories/root.png"
          alt="unix linux"
        />
        <ul className="list-disc list-inside">
          <li>
            <b>/cdrom </b>
          </li>
          <li>
            <b>/run</b>
          </li>
          <li>
            <b>/lost + found</b>
          </li>
          <li>
            <b>/recovery</b>
          </li>
          <li>
            <b>/snap</b>
          </li>
        </ul>
      </Para>
      <p>
        <b>/cdrom </b>
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Non-Standard Directories/cdrom.png"
        alt="unix linux"
      />
      <Para>
        This is a legacy directory to mount CD Rome. However, today CD ROMs or
        automatically mounted on media directory. However, the more standard
        location is now in the /media directory. It is where you would find
        files on a CD inserted into your computer. The /CDROM directory isn't
        part of the FHS standard, but you will still find it on the Ubuntu and
        other operating systems.
      </Para>
      <p>
        <b>/run </b>
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Non-Standard Directories/run.png"
        alt="unix linux"
      />
      <Para>
        Recently Modern Linux Distributions introduced this folder as a
        temporary file system (tmpfs) which stores RAM runtime data this also
        means that everything in it is gone when the system is rebooted or
        shutdown.Everything in it will be gone if you reboot or shut down your
        system.
        <br />
        It is used early, in system boot to store temporary files before the
        other temporary folders become available.
        <br />
        It stores the runtime information of the application or program, state
        files for various system's component that they use to function. You can
        find information about the daemons that are running, logged-in users and
        more. The data stored in the /run directory can give you an idea of
        processes or how the system resources are being utilised since start-up.
      </Para>
      <p>
        <b>/lost + found </b>
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Non-Standard Directories/lostandfound.png"
        alt="unix linux"
      />
      <Para>
        Recovery folder used by EXT4 system. Most of the distros use EXT4, so
        most likely you have this folder. It is a file system specific folder
        that is used for recovery in case of file corruption. This folder is
        produced on every partition, so if your /home folder is on separate
        partition, you should have this /lost+found in your home directory too
        unless something bad, t s, has happened. This folder. Should be your
        empty on your system.
        <br />
        So in simple word, it is used to store any files that are found to be
        corrupted after a system crash and provide a way to try recover data
        from them. After a crash, at the next boot, a lengthy file system check
        is done. "fsck" (file system consistency check) will go through the file
        system and try to recover any corrupt file that finds. The result of
        this recovery operation will be placed in the /lost+found
      </Para>
      <p>
        <b>/recovery </b>
      </p>
      <Para>
        The "/recovery" directory is utilized by the snap package management
        system. It contains a complete copy of the Pop!_OS installation USB
        flash drive. This enables users to utilize it as a live USB, allowing
        them to boot into Pop!_OS and utilize it as a live operating system when
        necessary. Additionally, in the event of system recovery being required,
        various mechanisms are available, making this feature specific to
        Pop!_OS.
        <br />
        In simple words, /recovery could be used for a broader range of data
        recovery purposes, potentially involving third-party software or custom
        recovery procedures.
      </Para>
      <p>
        <b>/snap </b>
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Non-Standard Directories/snap.png"
        alt="unix linux"
      />
      <Para>
        The /snap directory serves as the storage location for Snap packages,
        which are primarily managed by the Snap package manager and are mainly
        used by Ubuntu. These packages are self-contained applications that
        operate differently from traditional Linux packages and applications.
        Unlike regular packages, Snap packages don't rely on external packages,
        dependencies or libraries from the system.
        <br />
        Basically, snap packages are managed by Canonical's Snap package
        manager, which allows users to install a wide range of applications,
        including proprietary or non-open source software. This differs from
        package managers used in other distributions like Fedora, where there
        may be a stronger emphasis on free and open-source software.
      </Para>
      <p>
        <strong>CONCLUSION</strong>
      </p>
      <Para>
        In conclusion, non-standard directories on Linux systems offer specific
        functionalities beyond the traditional Filesystem Hierarchy Standard
        (FHS).
        <li>
          <b>/cdrom:</b> Originally intended for mounting CD-ROMs, its usage has
          diminished with modern systems automatically mounting media in the
          /media directory.
        </li>
        <li>
          <b>/run :</b> A temporary filesystem storing runtime data, crucial for
          system boot and functioning. It provides insights into system
          processes and resource utilization since startup.
        </li>
        <li>
          <b>/lost+found:</b> Reserved for filesystem recovery, particularly by
          the EXT4 filesystem, storing files recovered after a crash or system
          check. It's an integral part of filesystem maintenance.
        </li>
        <li>
          <b>/recovery:</b> Specific to Pop!_OS and utilized by the Snap package
          management system, housing a complete copy of the installation USB
          flash drive. It facilitates live booting for system recovery purposes,
          unique to Pop!_OS.
        </li>
        <li>
          <b>/snap:</b> Dedicated to Snap packages managed by Canonical's Snap
          package manager, offering self-contained applications with no external
          dependencies. Widely used in Ubuntu and providing access to a diverse
          range of applications, including proprietary software.
        </li>
        <li>
          Each of these directories serves a distinct purpose, contributing to
          system functionality, recovery, and package management, reflecting the
          evolving landscape of Linux distributions and their requirements.
        </li>
      </Para>
    </>
  );
};

export default Eleven;
