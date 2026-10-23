import pythonhero from '../../../assets/python-hero.jpg'
import pythonintro from '../../../assets/python-intro.jpg'
const heroImg = pythonhero;
const introImg = pythonintro  ;

const python = {
  hero: { title: "Python Development Services", image: heroImg },

  intro: {
    title: "Innovative Solutions with Python",
    subtitle: "Reliable back ends, automation, and data-driven features built on one of the world's most versatile languages.",
    paragraphs: [
      "StarOps uses Python to build back ends, APIs, automation tools, and data products that are clean, secure, and easy to extend. Its readability and rich ecosystem let us move quickly without cutting corners.",
      "Whether you need a new service, a data pipeline, or AI-powered features, our engineers design for performance and maintainability from the first line of code.",
      "We follow strong engineering practices including code review, automated testing, and continuous delivery, so your Python systems stay dependable as they grow.",
    ],
    image: introImg,
    imageAlt: "StarOps engineer writing Python code",
  },

  solutions: {
    title: "Our Python Solutions",
    subtitle: "Python services that power web platforms, automation, and intelligent features.",
    items: [
      { title: "Custom Backend Development", text: "Robust, scalable server-side applications built with Django, Flask, or FastAPI to match your requirements." },
      { title: "API Development", text: "Secure, well-documented REST and GraphQL APIs that web and mobile apps can rely on." },
      { title: "Data Processing & Automation", text: "Scripts and pipelines that replace repetitive manual work and turn raw data into usable information." },
      { title: "AI & Machine Learning Integration", text: "Add predictions, recommendations, and language features to your product using Python's AI ecosystem." },
      { title: "Third-Party Integrations", text: "Connect payment systems, CRMs, and other platforms so your tools work together." },
      { title: "Maintenance & Optimization", text: "Performance tuning, upgrades, and support to keep your Python systems fast and secure." },
    ],
  },

  caseStudies: {
    title: "Python Projects in Practice",
    subtitle: "Examples of the back-end and automation problems we solve with Python.",
    items: [
      { title: "Automating Manual Reporting", text: "Replacing hours of spreadsheet work with a scheduled pipeline that produces accurate reports on its own." },
      { title: "A High-Performance API Platform", text: "Building an API layer that serves many clients quickly and reliably." },
      { title: "Smarter Recommendations", text: "Adding machine learning to suggest relevant products and content to users." },
      { title: "Unifying Data from Many Sources", text: "Collecting and cleaning data from multiple systems into one trustworthy source." },
      { title: "Modernizing a Legacy Back End", text: "Rewriting an aging service in Python for better speed, security, and maintainability." },
      { title: "Integrating Payments and CRM", text: "Connecting key business tools so information flows automatically between teams." },
    ],
  },

  faq: {
    title: "Frequently Asked Question",
    subtitle: "Common questions about Python development with StarOps.",
    items: [
      {
        question: "How experienced is StarOps in Python development?",
        answer: "StarOps boasts a highly experienced Python development team with a proven track record, delivering successful projects across various industries."
      },
      {
        question: "What Python services does StarOps offer?",
        answer: "StarOps provides end-to-end Python development services, including consultation, design, coding, testing, and deployment. Customized solutions for diverse business needs."
      },
      {
        question: "How does StarOps handle data security in Python applications?",
        answer: "Security is a priority at StarOps. We implement industry best practices for secure coding, data encryption, and robust authentication methods in Python development."
      },
      {
        question: "Can StarOps assist in migrating projects to Python?",
        answer: "Yes, StarOps offers expertise in migrating projects to Python, ensuring a seamless transition and enhanced functionalities."
      },
      {
        question: "What industries benefit from StarOps Python solutions?",
        answer: "StarOps serves diverse industries, tailoring Python solutions for healthcare, finance, e-commerce, entertainment, and more."
      },
      {
        question: "How does StarOps ensure optimal performance in Python applications?",
        answer: "We implement performance optimization techniques in Python development, ensuring efficient code and a smooth user experience."
      },
      {
        question: "What is the typical timeline for a Python project at StarOps?",
        answer: "The timeline varies based on project complexity. StarOps follows an agile methodology, delivering efficient and quality Python solutions."
      },
      {
        question: "Can StarOps provide ongoing support and maintenance for Python applications?",
        answer: "Yes, StarOps offers comprehensive support and maintenance services post-deployment, ensuring your Python applications remain secure and up-to-date."
      },
      {
        question: "What sets StarOps Python development apart?",
        answer: "StarOps distinguishes itself with a commitment to quality, innovative solutions, transparent communication, and a client-centric approach in Python development."
      },
      {
        question: "What are the pricing models for Python development services at StarOps?",
        answer: "StarOps offers flexible pricing models, including fixed pricing, time and materials, or a dedicated team, based on Python project requirements."
      }
    ],
  },
};

export default python;
