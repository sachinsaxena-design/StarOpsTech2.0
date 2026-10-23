import devopsimg from '../../../assets/devops.jpg'
import devopsicon from '../../../assets/devopsicon.jpg'
const heroImg = devopsimg;
const introImg = devopsicon;

const devopsExpertise = {
  hero: { title: "DevOps Engineering Services", image: heroImg },

  intro: {
    title: "Hands-On DevOps Engineering",
    subtitle: "Engineers who build and run your pipelines, clusters, and cloud infrastructure with the tools that matter.",
    cta: { label: "Get it for FREE", href: "/contact" },
    paragraphs: [
      "Beyond advice, StarOps provides hands-on DevOps engineers who set up and operate the tooling behind fast, reliable software delivery. We work with the stack you have, or help you choose one.",
      "Our expertise spans Docker and Kubernetes, Terraform, Jenkins, GitHub Actions, and the major cloud platforms, along with monitoring and security tooling.",
      "We document what we build and share knowledge with your team, so your delivery process becomes an asset you fully own.",
    ],
    image: introImg,
    imageAlt: "StarOps DevOps engineers monitoring infrastructure",
  },

  solutions: {
    title: "Our DevOps Engineering Expertise",
    subtitle: "The tools and practices our engineers use every day.",
    items: [
      { title: "CI/CD with Jenkins & GitHub Actions", text: "Automated build, test, and release pipelines tailored to your repositories and workflows." },
      { title: "Docker & Kubernetes", text: "Containerized applications and managed clusters that scale smoothly and recover on their own." },
      { title: "Terraform & Infrastructure as Code", text: "Version-controlled infrastructure that is easy to review, repeat, and roll back." },
      { title: "AWS Cloud Engineering", text: "Well-architected cloud environments with sensible cost, security, and reliability practices." },
      { title: "Monitoring & Alerting", text: "Metrics, logs, and alerts with tools like Prometheus and Grafana so issues are caught early." },
      { title: "DevSecOps", text: "Automated security scanning, secrets management, and policy checks built into every pipeline." },
    ],
  },

  caseStudies: {
    title: "DevOps Engineering in Practice",
    subtitle: "Examples of the platforms and pipelines our engineers deliver.",
    items: [
      { title: "A Pipeline That Ships on Every Merge", text: "Setting up CI/CD so approved changes reach production automatically and safely." },
      { title: "Moving Services to Kubernetes", text: "Containerizing applications and running them on a cluster with automatic scaling." },
      { title: "Rebuilding Infrastructure with Terraform", text: "Turning hand-built servers into reproducible code that can be recreated in minutes." },
      { title: "Cutting Cloud Costs", text: "Right-sizing resources and scheduling workloads to lower the monthly bill." },
      { title: "Dashboards That Catch Problems Early", text: "Adding monitoring and alerts that surfaced incidents before customers noticed." },
      { title: "Scanning for Vulnerabilities Automatically", text: "Embedding security checks in the pipeline so risky code never reaches production." },
    ],
  },

  faq: {
    title: "Frequently Asked Question",
    subtitle: "Common questions about our DevOps engineering team.",
    items: [
      {
        question: "How does StarOps prioritize security in DevOps practices?",
        answer: "Security is a paramount concern at StarOps. We implement rigorous security measures, including continuous integration of security practices, vulnerability assessments, and robust access controls, ensuring the utmost security in DevOps processes."
      },
      {
        question: "What advantages does DevOps bring to businesses?",
        answer: "DevOps offers advantages such as faster development cycles, improved collaboration between teams, and automated processes. StarOps leverages these benefits to deliver streamlined and efficient DevOps solutions for your business."
      },
      {
        question: "Can StarOps implement custom DevOps solutions tailored to specific business needs?",
        answer: "Certainly! StarOps specializes in crafting custom DevOps solutions tailored to your unique business requirements, ensuring seamless integration and optimal performance."
      },
      {
        question: "How does StarOps approach the implementation of DevOps in large-scale projects?",
        answer: "For large-scale projects, StarOps adopts a scalable DevOps architecture, emphasizing automation, continuous integration, and deployment to ensure efficient and reliable project delivery."
      },
      {
        question: "What sets StarOps apart in DevOps development?",
        answer: "StarOps stands out with its commitment to continuous improvement, automation, transparent communication, and a client-centric approach in DevOps development."
      },
      {
        question: "Can StarOps assist in transitioning traditional development to a DevOps model?",
        answer: "Certainly! StarOps provides expertise in transitioning traditional development to a DevOps model, ensuring improved collaboration, faster delivery, and enhanced software quality."
      },
      {
        question: "What is the typical timeline for a DevOps project at StarOps?",
        answer: "The timeline varies based on project complexity. StarOps follows an agile methodology, delivering efficient and quality DevOps solutions within a timeframe aligned with project requirements."
      },
      {
        question: "Can StarOps provide ongoing support and maintenance for DevOps implementations?",
        answer: "Yes, StarOps offers comprehensive support and maintenance services post-DevOps implementation, ensuring continuous improvement, monitoring, and optimization of your DevOps practices."
      },
      {
        question: "What industries benefit from StarOps DevOps solutions?",
        answer: "StarOps caters to various industries, tailoring DevOps solutions for sectors such as technology, finance, healthcare, e-commerce, and more."
      },
      {
        question: "What are the pricing models for DevOps development services at StarOps?",
        answer: "StarOps provides flexible pricing models, including options like fixed pricing, time and materials, or a dedicated team, tailored to meet the specific requirements of your DevOps project."
      }
    ],
  },
};

export default devopsExpertise;
