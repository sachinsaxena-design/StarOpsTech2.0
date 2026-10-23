import { Code } from "../../../utils/Helpers";

const TwentyFour = () => {
  return (
    <div>
      <img
        className="max-h-[500px] w-full mx-auto rounded-lg"
        src="https://cdn.staropstech.com/starops/Blogs/certbotdns/dns.png"
        alt="Certbot DNS Challenge Blog"
      />
      <br />
      <p>
        <b>A Guide to Using Certbot with DNS Challenges</b>
      </p>
      <br />
      <p>
        In the bustling world of web development, where security is paramount,
        two brave commands stepped up to protect their domains. They were simple
        lines of code, but their mission was critical: to secure SSL/TLS
        certificates using Certbot’s DNS challenge method.
      </p>
      <br />
      <p>
        <b>The Setup</b>
      </p>
      <p>
        Imagine a scenario where a developer named Abhi was tasked with securing
        two domains: <i>dewang.com</i> and <i>sharma.com</i>. These were vital
        for his company’s internal operations, and ensuring their safety was
        non-negotiable.
      </p>
      <p>
        Abhi knew that the DNS challenge method was perfect for the job. It
        allowed him to validate domain ownership by adding a DNS TXT record,
        bypassing the need for direct server access. With his coffee mug in hand
        and determination in his eyes, he began his adventure.
      </p>
      <br />
      <p>
        <b>The First Command: A Direct Approach</b>
      </p>
      <p>
        Abhi’s first challenge was securing <i>dewang.com</i>. He opened his
        terminal and typed:
      </p>
      <Code
        language="bash"
        code={`sudo certbot -d dewang.com --manual --preferred-challenges dns certonly
            `}
      />
      <p>
        <b>The Journey</b>
      </p>
      <ol className="list-decimal ml-6 space-y-1">
        <li>
          Create a DNS TXT Record: Certbot provided a unique name and value that
          needed to be added to the DNS settings.
        </li>
        <li>Check DNS Propagation:</li>
        <Code
          language="bash"
          code={`dig TXT _acme-challenge.dewang.com
            `}
        />
        <li>Ensure the DNS changes had propagated successfully.</li>
        <li>
          Wait for Propagation: Abhi patiently waited for the changes to reflect
          across the DNS network.
        </li>
        <li>
          Validation and Success: Certbot validated the TXT record, and a new
          SSL/TLS certificate was issued.
        </li>
      </ol>
      <p>
        Abhi admired the clarity of this approach. The domain was the star of
        the show, leading the way in the command structure. It felt intuitive,
        like introducing the main character at the start of a story.
      </p>
      <br />
      <p>
        <b>The Second Command: An Option-First Strategy</b>
      </p>
      <p>
        Next, Abhi turned his attention to <i>sharma.com</i>. He decided to take
        a different route:
      </p>
      <Code
        language="bash"
        code={`sudo certbot certonly --manual --preferred-challenges dns -d sharma.com
            `}
      />
      <p>
        <b>The Journey</b>
      </p>
      <ol className="list-decimal ml-6 space-y-1">
        <li>Add a DNS TXT Record with the provided details.</li>
        <li>Check DNS Propagation:</li>
        <Code
          language="bash"
          code={`dig TXT _acme-challenge.sharma.com
            `}
        />
        <li>Confirm the TXT record was added correctly.</li>
        <li>Wait and Validate: Let the DNS changes take effect.</li>
        <li>
          Certificate Acquired: A second certificate was issued successfully.
        </li>
      </ol>
      <p>
        Abhi appreciated the flexibility of this method. It allowed him to
        structure the command with options first, catering to his preference for
        organized setups.
      </p>
      <br />
      <p>
        <b>Final Step: Restarting the Server</b>
      </p>
      <p>
        With both certificates ready, Abhi restarted the server to apply the
        changes. Depending on the web server, he used one of the following:
      </p>
      <ul className="list-disc  ml-6 space-y-1">
        <li>
          For Apache:
          <Code
            language="bash"
            code={`sudo systemctl restart apache2
            `}
          />
        </li>
        <li>
          For Nginx:
          <Code
            language="bash"
            code={`sudo systemctl restart nginx
            `}
          />
        </li>
      </ul>
      <br />
      <p>
        <b>Lessons Learned</b>
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          <b>Command 1:</b> Perfect for quick targeting when the domain is the
          main focus. Direct and intuitive.
        </li>
        <li>
          <b>Command 2:</b> Ideal for users who prefer setting options first.
          Good for handling multiple configurations.
        </li>
      </ul>
      <p>
        Both commands proved invaluable, offering flexibility to adapt to
        different scenarios.
      </p>
      <br />
      <p>
        <b>A Happy Ending</b>
      </p>
      <p>
        With his domains secured, Abhi felt a sense of accomplishment. He knew
        the importance of SSL/TLS encryption and was proud to have played a role
        in safeguarding his company’s digital presence. The two commands had
        served him well, each shining in its own way.
      </p>
      <p>
        And so, with his tasks complete, Abhi raised his coffee mug in triumph,
        ready to take on the next challenge in the ever-evolving world of web
        development.
      </p>
    </div>
  );
};

export default TwentyFour;
