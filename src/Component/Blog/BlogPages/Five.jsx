import React from "react";

const Five = () => {
  return (
    <>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Data directory/datadirectorylinux.png"
        alt="data directory linux"
      />
      <br />
      <p>
        Data directory is used to store data of the system. Data directory
        contains following directories:
      </p>
      <ul className="list-disc list-inside">
        <li>
          <strong>/home</strong>
        </li>
        <li>
          <strong>/root</strong>
        </li>
        <li>
          <strong>/srv</strong>
        </li>
        <li>
          <strong>/media</strong>
        </li>
        <li>
          <strong>/mnt</strong>
        </li>
        <li>
          <strong>/tmp</strong>
        </li>
      </ul>
      <br />
      <p>
        <strong>/home</strong>
      </p>
      <p>
        Linux supports multiple user system. For each user registered on the
        system, it contains the personal files, configuration and software for
        that user. You need to be logged in as that user or as a root user to
        modify it. When you open your file manager on your terminal by default,
        you are located in your user’s home folder. It is equivalent to Windows
        C:/Users directory. In simple words, it is a normal location as we start
        a terminal session. The Home directory contains Home folder for each
        regular user on your Linux system. Home folder of every user is named by
        its username like
        <b>“/home/alkesh”</b>. You can have as many folders as you want in your
        home directory. One user can’t access other user’s directory. It is the
        only directory in which you can write on without the privileged access
        of root user. Each user has its own folder. User stores private data
        such as document, videos, pictures, music, etc. You can land in a user's
        home directory by using the command <b>`cd ~`</b> or simply <b>`cd`</b>.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Data directory/d1.png"
        alt="data directory linux"
      />
      <br />
      <p>
        <strong>/root</strong>
      </p>
      <p>
        Root user’s home directory, the same as your user home directory, but it
        is for the root account. Do not mix with <b>“/“ </b>(root path). If you
        login as a root user, you will be located in this directory by default.
        This is a folder for private data and account specific setting of your
        root account. You need to be root user or need sudo privilege to access
        this directory.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Data directory/d2.png"
        alt="data directory linux"
      />
      <br />
      <p>
        <strong>/srv (service or service data)</strong>
      </p>
      <p>
        It contains configuration or server specific services related files
        hosted, connected or installed on your system or kernel. This allow for
        better security since it is at the root of the drive and it also allows
        you to easily mount this folder from another hard drive. It is an
        important part of the Linux filesystem hierarchy for users who want to
        host services on their system. It is also used to store data and scripts
        for web server, data offered by FTP servers, repositories and other
        services. It will be probably empty for you, but if you run a server,
        such as a web server or FTP server, you would store the files that will
        be accessed by external users here. Basically, The <b>'/srv'</b>{" "}
        directory contains server specific data for services provided by the
        system like www, cvs, rysync, ftp, tftp, etc.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Data directory/d3.png"
        alt="data directory linux"
      />
      <br />
      <p>
        <strong>/media</strong>
      </p>
      <p>
        This folder is used for automatic mounting of removable media like pen
        drive, CD ROM, floppy, USB devices, etc, if your system is configured
        for automatic mounting. When you insert a USB drive, it will be mounted
        to this folder. This is usually done automatically by the system as soon
        as you plug the device out or when you remove the device, the system
        delete the corresponding of directory. In simple word, it is a temporary
        mount directory for removable devices.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Data directory/d4.png"
        alt="data directory linux"
      />
      <br />
      <p>
        <strong>/mnt (mount)</strong>
      </p>
      <p>
        It is similar to the /media folder. It is also used to mount device, but
        usually it is used for manual mounting. The <b>/mnt</b> directory is
        usually empty but used to mount storage devices in the system
        temporarily where sysadmins can mount filesystem. However, some Linux
        distribution also use less amount as a permanent storage solution. To
        mount external mount system, external device is inserted and manually
        mounted here. It is usually a mount point for a file system that lives
        entirely in RAM. It needs sudo privilege, if you are not a root user.
        General purpose mounting point for file systems for Network shares or
        other storage devices. You of course can manually mount your devices to{" "}
        <b>/media</b> but to keep some order in your system. It is better to
        separate these two mounting points.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Data directory/d5.png"
        alt="data directory linux"
      />
      <br />
      <p>
        <strong>/tmp (temporary)</strong>
      </p>
      <p>
        On occasion, you might find some files on directory that remain and
        could be stuck there because the system can’t delete them. This normally
        isn’t a big deal unless there’s hundred of files or the files are taking
        a lot of disk space in which case you might want to login as the root
        user in single user mode navigate to this folder and manually delete
        them. Data stored in <b>'/tmp'</b> is temporary and may use either disk
        space or RAM. It is for temporary files that won’t be persisted between
        reboots in simple word. This is just a place where programs store
        temporary files on your system and may be severely size restricted. This
        directory is usually cleaned on reboot. The contents of this directory
        have a brief lifespan. So it is advisable that never use
        <b>'/tmp'</b> to store important data.
      </p>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/Data directory/d6.png"
        alt="data directory linux"
      />
      <br />
    </>
  );
};

export default Five;
