import devimg from '../../../assets/about-image/about-img-7.jpg'
import cloudimg from '../../../assets/cloudimg.jpg'
const heroImg = devimg;
const introImg = cloudimg;

const devops = {
  hero: { title: "DevOps Consulting Services", image: heroImg },

  intro: {
    title: "Agile DevOps Excellence",
    subtitle: "Automate delivery, harden infrastructure, and ship with confidence.",
    paragraphs: [
      "StarOps helps teams release software faster and more reliably. We bring development and operations together with automation, clear processes, and the right tooling, so your releases stop being stressful events and become routine.",
      "From CI/CD pipelines and cloud migration to infrastructure as code and observability, we assess where you are today and build a practical roadmap to where you want to be, one improvement at a time.",
      "Security and compliance are part of every pipeline we build. The result is infrastructure that is repeatable, monitored, and ready to scale with demand.",
    ],
    image: introImg,
    imageAlt: "StarOps engineers reviewing a deployment pipeline",
  },

  solutions: {
    title: "Our DevOps Solutions",
    subtitle: "Proven cloud and automation practices that shorten release cycles and reduce operational risk.",
    items: [
      { title: "CI/CD Pipelines", text: "Automated build, test, and deployment pipelines that turn every commit into a safe, repeatable release." },
      { title: "Cloud Migration", text: "Plan and execute moves to AWS, Azure, or Google Cloud with minimal downtime and a clear cost strategy." },
      { title: "Infrastructure as Code", text: "Version-controlled infrastructure using tools like Terraform, so environments are consistent and easy to recreate." },
      { title: "Containers & Kubernetes", text: "Containerize your applications and run them on orchestrated clusters that scale automatically with traffic." },
      { title: "Monitoring & Observability", text: "Dashboards, logs, metrics, and alerts that show you what is happening and catch problems before users do." },
      { title: "Security & Compliance", text: "DevSecOps practices such as secrets management, vulnerability scanning, and audit-ready processes built into delivery." },
    ],
  },

  caseStudies: {
    title: "DevOps in Action",
    subtitle: "Examples of the improvements we help teams achieve through automation and better infrastructure.",
    items: [
      { title: "From Monthly Releases to Daily Deployments", text: "Introducing automated pipelines and testing so a team could ship small, safe changes every day instead of once a month." },
      { title: "Migrating to the Cloud with Zero Surprises", text: "A staged migration plan that moved critical workloads to the cloud while keeping the service available throughout." },
      { title: "Cutting Infrastructure Costs", text: "Right-sizing resources and automating shutdowns to reduce cloud spend without hurting performance." },
      { title: "Self-Healing Kubernetes Platform", text: "Building a cluster that scales and recovers on its own, reducing manual on-call work for the team." },
      { title: "Full-Stack Observability", text: "Unifying logs, metrics, and traces so engineers can find the root cause of an incident in minutes." },
      { title: "Security Built into the Pipeline", text: "Adding automated scanning and policy checks so vulnerabilities are caught before they reach production." },
    ],
  },

  faq: {
    title: "Frequently Asked Question",
    subtitle: "Answers to common questions about our DevOps consulting services.",
    items: [
      {
        question: "What services does StarOps offer for DevOps?",
        answer: "StarOps provides comprehensive DevOps solutions, including streamlined development pipelines, workflow optimization, automated deployment processes, security and confidentiality, efficient workflow management, collaboration enhancement, and continuous integration and delivery."
      },
      {
        question: "How experienced is the DevOps team at StarOps?",
        answer: "Our DevOps team at StarOps consists of highly experienced professionals with a proven track record in driving efficiency and collaboration. We have successfully delivered innovative and high-quality DevOps services for various industries."
      },
      {
        question: "Does StarOps prioritize security in DevOps processes?",
        answer: "Yes, security is a top priority at StarOps. We implement industry best practices for secure coding, data encryption, and robust authentication methods to ensure the overall security of DevOps processes."
      },
      {
        question: "How does StarOps enhance collaboration in DevOps?",
        answer: "StarOps focuses on improving collaboration between development and operations teams. Our DevOps practices ensure seamless communication and integration, leading to enhanced collaboration and overall project success."
      },
      {
        question: "What are the benefits of continuous integration and delivery in DevOps?",
        answer: "Continuous integration and delivery in DevOps result in a streamlined and automated process, allowing for faster and more reliable software releases. StarOps emphasizes these practices for efficient project delivery and success."
      },
      {
        question: "Can StarOps tailor DevOps solutions to specific business objectives?",
        answer: "Yes, our DevOps professionals are dedicated to tailoring solutions that align with your business objectives. Whether it's automating tasks, improving deployment processes, or enhancing collaboration, StarOps delivers efficient workflow management for optimal results."
      },
      {
        question: "How can I get started with DevOps services at StarOps?",
        answer: "To begin your DevOps journey with StarOps, reach out to our team through our website or contact us directly. We'll schedule a consultation to discuss your project requirements and provide a tailored solution."
      },
      {
        question: "What industries has StarOps previously worked with for DevOps?",
        answer: "StarOps has experience working across various industries, delivering innovative and high-quality DevOps services. Our versatility allows us to adapt our expertise to suit the unique needs of different sectors."
      },
      {
        question: "What are the pricing models for DevOps services at StarOps?",
        answer: "StarOps offers flexible pricing models to accommodate different project needs. We can discuss options such as fixed pricing, time and materials, or a dedicated team model based on the specifics of your DevOps requirements."
      }
    ],
  },
};

export default devops;
