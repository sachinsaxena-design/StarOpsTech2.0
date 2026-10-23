import React from "react";
import { Code } from "../../../utils/Helpers";

const Twenty = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/sonarqube-installation/Sonarqube-installation.webp"
        alt="linux"
      />
      <br />
      <p>
        <b>Prerequisites</b>
      </p>
      <p>Before you begin, ensure that you have the following:</p>
      <ul className="list-disc list-inside">
        <li>A server with minimum 2 core 4 GB ram of linux or windows</li>
        <li>Java 1.8.0</li>
      </ul>
      <br />
      <p>
        <b>STEPS:</b>
      </p>
      <br />
      <p>
        <b>Step 1: Switch to the Root User</b>
      </p>
      <p>
        Switches to the root user, providing administrative privileges for
        subsequent commands. Once you are the root user, you no longer need to
        prefix commands with sudo.
      </p>
      <Code
        language={"bash"}
        code={`
sudo su`}
      />
      <p>
        <b>Step 2: Navigate to the /opt Directory</b>
      </p>
      <p>
        Changes the current directory to /opt, where software packages are
        typically installed on a Linux system.
      </p>
      <Code
        language={"bash"}
        code={`
cd /opt`}
      />
      <p>
        <p>
          <b>Step 3: Update Package Lists</b>
        </p>
      </p>
      <p>
        Updates the list of available packages and their versions from the
        configured repositories.
      </p>
      <Code
        language={"bash"}
        code={`
apt update`}
      />
      <p>
        <b>Step 4: Install Java (OpenJDK 8)</b>
      </p>
      <p>
        Installs the OpenJDK 8 package, which is necessary for running
        SonarQube. The -y option automatically confirms the installation without
        prompting.
      </p>
      <Code
        language={"bash"}
        code={`
apt install openjdk-8-jdk –y `}
      />
      <p>
        <b>Step 5: Verify Java Installation</b>
      </p>
      <p>
        Checks the installed Java version to confirm that Java 1.8.0 is
        correctly installed.
      </p>
      <Code
        language={"bash"}
        code={`
java –version`}
      />
      <p>
        <b>Step 6: Install unzip Utility</b>
      </p>
      <Code
        language={"bash"}
        code={`
apt install unzip`}
      />
      <p>
        <b>Step 7: Download SonarQube Binaries</b>
      </p>
      <p>
        Download the SonarQube 7.8 zip file from the official SonarQube website
        or another source.
      </p>
      <Code
        language={"bash"}
        code={`
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-7.8.zip`}
      />
      <p>
        <b>Step 8: Unzip SonarQube Package</b>
      </p>
      <p>
        Extracts the contents of the sonarqube-7.8.zip file into the /opt
        directory.
      </p>
      <Code
        language={"bash"}
        code={`
unzip sonarqube-7.8.zip`}
      />
      <p>
        <b>Step 9: Create a New User for SonarQube</b>
      </p>
      <p>
        Creates a new system user named sonar, which will be used to run the
        SonarQube service.
      </p>
      <Code
        language={"bash"}
        code={`
useradd  sonar`}
      />
      <p>
        <b>Step 10: Edit Sudoers File</b>
      </p>
      <p>
        Modify the necessary lines in the sudoers file to grant appropriate
        permissions to the sonar user if needed.
      </p>
      <Code
        language={"bash"}
        code={`
visudo`}
      />
      <img
        className="max-h-[100px] w-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/sonarqube-installation/1_sonarqube.webp"
        alt="linux"
      />
      <br />
      <p>
        <b>Step 11: Change Ownership of SonarQube Directory </b>
      </p>
      <p>
        Changes the ownership of the SonarQube directory and its contents to the
        sonar user and group.
      </p>
      <Code
        language={"bash"}
        code={`
chown -R sonar: sonar /opt/sonarqube-7.8`}
      />
      <p>
        <b>Step 12: Set Permissions for SonarQube Directory </b>
      </p>
      <p>
        Sets the permissions for the SonarQube directory, allowing the sonar
        user to execute files within it.
      </p>
      <Code
        language={"bash"}
        code={`
chmod -R 755 /opt/sonarqube-7.8`}
      />
      <p>
        <b>Step 13: Create a Systemd Service File for SonarQube </b>
      </p>
      <p>
        Create a new service file, typically located at
        /etc/systemd/system/sonarqube.service. The service file should include
        the necessary configurations to manage the SonarQube process (e.g.,
        setting the user, specifying the startup script).
      </p>
      <Code
        language={"bash"}
        code={`
vim  /etc/systemd/system/sonarqube.service`}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/sonarqube-installation/2_code_quality.webp"
        alt="linux"
      />
      <br />
      <p>
        <b>Step 14: Start and Enable SonarQube Service </b>
      </p>
      <p>
        Starts the SonarQube service immediately and configures it to start
        automatically on system boot.
      </p>
      <Code
        language={"bash"}
        code={`
systemctl daemon-reload
systemctl enable sonarqube
systemctl start sonarqube
`}
      />
      <p>
        <b>Step 15: Verify SonarQube Service Status </b>
      </p>
      <p>
        Checks the status of the SonarQube service to ensure it is running
        correctly.
      </p>
      <Code
        language={"bash"}
        code={`
systemctl status sonarqube 
`}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/sonarqube-installation/3_installation.webp"
        alt="linux"
      />
      <br />
      <p>
        <b>Step 16: Access SonarQube UI </b>
      </p>
      <p>
        Verifies that the SonarQube UI is accessible by making an HTTP request
        to localhost on port 9000. You can also open a web browser and go to
        http://127.0.0.1:9000 to view the SonarQube dashboard.
      </p>
      <Code
        language={"bash"}
        code={`
curl http://127.0.0.1:9000
`}
      />
      <p>
        <b>Conclusion:</b>
      </p>
      <p>
        Installing SonarQube is a crucial step towards maintaining high
        standards of code quality and security in your projects. By following
        this guide, you've successfully set up a powerful tool that will help
        you identify code issues, improve maintainability, and ensure your
        codebase is always in top shape. As you integrate SonarQube into your
        CI/CD pipeline, you'll find it becomes an indispensable part of your
        development process, leading to cleaner, more reliable code. Continue
        exploring SonarQube's features to maximize its potential and keep your
        projects on the path to success.
      </p>
    </div>
  );
};

export default Twenty;
