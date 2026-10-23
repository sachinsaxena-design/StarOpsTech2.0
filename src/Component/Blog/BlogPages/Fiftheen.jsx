import React from "react";
import { Code, Para } from "../../../utils/Helpers";

const Fiftheen = () => {
  return (
    <>
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/cover.png"
        alt="mysql incremental backup"
      />
      <br />
      <Para>
        In the bustling office of StarOps TechElite, Dewang was like a young
        wizard at Hogwarts, entrusted with the important task of protecting the
        company’s precious data. One day, his mentor gave him the job of setting
        up a reliable backup system for their MySQL databases. Performing full
        backups daily was as tedious as Professor Snape’s Potions class, so
        Dewang needed a more efficient method—incremental backups.
      </Para>
      <p>
        <b>Step 1: Enabling Binary Logging - Casting the Spell ✨</b>
      </p>

      <p>
        Dewang’s first step was to enable binary logging, which was like casting
        a powerful protection spell over the data. This logging would record
        every change made to the database.
        <br />
        One evening, under the glow of his computer screen, Dewang opened the
        MySQL configuration file, much like Hermione studying her textbooks:
      </p>
      <Code
        code={`
  sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf`}
        language={"shell"}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/1_binary_logging.webp"
        alt="binary logging"
      />

      <p>
        He found the `log_bin` line, uncommented it, and set the path for the
        binary log:
      </p>
      <Code
        code={`
  log_bin = /var/log/mysql/mysql-bin.log`}
        language={"shell"}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/2_log_bin.webp"
        alt="Incremental backup "
      />
      <p>
        After saving and closing the file, Dewang restarted the MySQL service to
        activate the changes:
      </p>
      <Code
        code={`
  sudo systemctl restart mysql`}
        language={"shell"}
      />
      <p>
        To ensure the spell had taken effect, he checked the binary log
        directory:
      </p>
      <Code
        code={`
  ls -l /var/log/mysql/`}
        language={"shell"}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/3_restart_mysql.webp"
        alt="restart MySQL"
      />
      <p>
        Seeing the binary log files appear was like seeing sparks from a wand,
        indicating the magic was working. ✨
      </p>
      <br />
      <p>
        <b>Step 2: Checking the Database - The Mirror of Erised 🪞</b>
      </p>

      <Para>
        Before proceeding, Dewang decided to gaze into the "Mirror of Erised" to
        check the state of the database. He logged into MySQL and inspected the
        `mydatabase` database, which contained a table named `people` with five
        familiar names: Anupam, Abhishek, Ajay, Pradhuman, and Onkar. You can
        check your required one.
      </Para>
      <Code
        code={`
  sudo mysql`}
        language={"shell"}
      />
      <p>Inside the MySQL shell, he ran the following commands:</p>
      <Code
        code={`
  SHOW DATABASES;
  USE mydatabase;
  SHOW TABLES;
  SELECT * FROM people;
  exit`}
        language={"sql"}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/4_checkup_database.webp"
        alt="Incremental Backup SQL"
      />
      <p>
        Seeing the names in the table reassured him that everything was in
        order. 😊
      </p>
      <br />
      <p>
        <b>Step 3: Taking a Full MySQL Backup - The Pensieve 🔮</b>
      </p>
      <p>
        It was time to take a full backup, the Pensieve of his database,
        capturing every detail. Dewang used the <strong>`mysqldump`</strong>{" "}
        command to create this full backup:
      </p>
      <Code
        code={`
  sudo mysqldump -uroot -p --all-databases --single-transaction --flush-logs --master-data=2 > full_backup.sql`}
        language={"shell"}
      />
      <br />
      <p>Here's what each option means:</p>

      <ul className="list-inside list-disc">
        <li>
          <strong>mysqldump:</strong> This is the MySQL utility for creating
          backups of databases.
        </li>
        <li>
          <strong>-uroot:</strong> This specifies the MySQL username to connect
          with, which in this case is root.
        </li>
        <li>
          <strong>-p:</strong> This prompts for the MySQL user's password. You
          will be prompted to enter the password after you run the command.
        </li>
        <li>
          <strong>--all-databases:</strong> This option tells mysqldump to back
          up all databases in the MySQL server.
        </li>
        <li>
          <strong>--single-transaction:</strong> This option ensures the dump is
          consistent by using a single transaction. It is particularly useful
          for InnoDB tables, as it ensures that the backup is taken at a single
          point in time without locking the tables.
        </li>
        <li>
          <strong>--flush-logs:</strong> This option tells the server to flush
          (close and reopen) the binary logs before the dump. This can be useful
          for point-in-time recovery.
        </li>
        <li>
          <strong>--master-data=2:</strong> This option writes the binary log
          position and filename to the output, which is essential for
          replication setups. The 2 means that the CHANGE MASTER command will be
          commented out in the dump file. This information is crucial for
          setting up a replication slave.
        </li>
        <li>
          <strong>&gt; full_backup.sql:</strong> This redirects the output of
          the mysqldump command to a file named full_backup.sql.
        </li>
      </ul>
      <br />
      <p>
        This command created a file named <strong>`full_backup.sql`</strong>,
        much like a memory stored in Dumbledore's Pensieve. Dewang checked the
        file to ensure it was created successfully:
      </p>
      <Code
        code={`
  ls -l full_backup.sql`}
        language={"shell"}
      />
      <p>He also verified the creation of a new binary log file:</p>
      <Code
        code={`
  ls -l /var/log/mysql/`}
        language={"shell"}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/5_full_backup.webp"
        alt="Backup SQL"
      />
      <br />
      <p>
        <b>
          <h1>
            Step 4: Inserting More Rows - Adding Ingredients to a Potion 🧪
          </h1>
        </b>
      </p>
      <p>
        To demonstrate incremental backups, Dewang needed to add more
        "ingredients" to his database potion. He logged back into MySQL and
        added three new names: Nilabh, Pankaj, and Joginder.
      </p>
      <Code
        code={`
  sudo mysql`}
        language={"shell"}
      />
      <p>Inside the MySQL shell, he executed:</p>
      <Code
        code={`
  USE mydatabase;
  INSERT INTO people (name) VALUES ('Nilabh'), ('Pankaj'), ('Joginder');
  SELECT * FROM people;
  exit`}
        language={"sql"}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/6_insert_newdata.webp"
        alt="Insert data SQL"
      />
      <p>
        Seeing the new names in the table was like watching a potion brew
        perfectly. 🧪
      </p>
      <br />
      <p>
        <b>
          Step 5: Taking an Incremental MySQL Backup - Collecting Memories 📜
        </b>
      </p>
      <p>
        Next, Dewang needed to perform an incremental backup by saving the
        binary logs created since the last full backup. He flushed the binary
        log to create a new one, akin to capturing fresh memories:
      </p>
      <Code
        code={`
  sudo mysqladmin -u root -p flush-logs`}
        language={"shell"}
      />
      <p>
        He confirmed the creation of a new binary log file by listing the
        directory contents:
      </p>
      <Code
        code={`
  ls -l /var/log/mysql/`}
        language={"shell"}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/7_incremental_backup.webp"
        alt="incremental backup"
      />
      <br />
      <p>
        <b>
          Step 6: Restoring from Full and Incremental Backups - The Resurrection
          Stone 💎
        </b>
      </p>
      <p>
        To ensure his backup strategy was effective, Dewang decided to test
        restoring the database, much like using the Resurrection Stone to bring
        back lost data. He started by dropping and recreating the `mydatabase`
        database:
      </p>
      <Code
        code={`
  sudo mysql`}
        language={"shell"}
      />
      <Code
        code={`
  DROP DATABASE mydatabase;
  CREATE DATABASE mydatabase;
  exit`}
        language={"sql"}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/8_delete_database.webp"
        alt="Delete Database"
      />
      <p>He then restored the full backup:</p>
      <Code
        code={`
  sudo mysql -u root -p mydatabase < full_backup.sql`}
        language={"shell"}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/9_database_restoration.webp"
        alt="restore database"
      />
      <p>
        Logging back into MySQL, he checked the table and saw only the initial
        five names:
      </p>
      <Code
        code={`
  sudo mysql`}
        language={"shell"}
      />
      <Code
        code={`
  USE mydatabase;
  SELECT * FROM people;
  exit`}
        language={"sql"}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/10_mysql_database.webp"
        alt="MySQL Database"
      />
      <p>
        To complete the restoration, Dewang used the binary log to restore the
        incremental changes:
      </p>
      <Code
        code={`
  sudo mysqlbinlog /var/log/mysql/mysql-bin.000002 | mysql -uroot -p mydatabase`}
        language={"shell"}
      />
      <p>
        Finally, he logged into MySQL one last time to verify that all rows,
        including the newly added names, were restored:
      </p>
      <Code
        code={`
  sudo mysql`}
        language={"shell"}
      />
      <Code
        code={`
  USE mydatabase;
  SELECT * FROM people;
  exit`}
        language={"sql"}
      />
      <img
        className="max-h-[500px] w-full  mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/mysql incremental backup/11_backup_done.webp"
        alt="Incremental bacup in mysql"
      />
      <p>
        Seeing all the names—Anupam, Abhishek, Ajay, Pradhuman, Onkar, Nilabh,
        Pankaj, and Joginder—Dewang felt the triumph of Harry when he defeated
        Voldemort. He knew his incremental backup strategy was a success,
        safeguarding the realm's data just like Hogwarts was protected by its
        enchanted walls. 🏰
        <br />
        By following these steps, Dewang had implemented a reliable and
        efficient incremental backup system for his MySQL databases, ensuring
        that StarOps TechElite's data was safe and could be quickly restored in
        case of any data loss. Like a true wizard, he used his knowledge and
        skills to protect what mattered most. 🧙‍♂️
      </p>
      <br />
      <p>
        <b>Conclusion 🎉</b>
      </p>

      <Para>
        Dewang's journey to mastering incremental backups in MySQL was like a
        wizard learning powerful spells. By enabling binary logging, taking full
        backups, and performing incremental backups, he ensured StarOps
        TechElite's data was secure and easily restorable. This efficient method
        saves time and resources while maintaining data integrity. Just as Harry
        Potter protected his world with his skills, Dewang safeguarded valuable
        data with his expertise. Follow these steps to master incremental
        backups and keep your data safe. Happy backing up! 🧙‍♂️✨
      </Para>
    </>
  );
};

export default Fiftheen;
