import djangoimg from '../../../assets/djangoimg.jpg'
import djangoicon from '../../../assets/django-img.jpg'
const heroImg = djangoimg;
const introImg = djangoicon;

const django = {
  hero: { title: "Django Development Services", image: heroImg },

  intro: {
    title: "Secure, Scalable Products with Django",
    subtitle: "Product engineering on the batteries-included Python framework, built for security and speed of delivery.",
    cta: { label: "Get it for FREE", href: "/contact" },
    paragraphs: [
      "StarOps builds robust web platforms with Django, a framework known for its security, clean structure, and rapid development. It is a strong choice when you need to move fast without sacrificing quality.",
      "We use Django for content platforms, marketplaces, internal tools, and API back ends, designing data models and permissions that fit your business and grow with it.",
      "Built-in protections, thorough testing, and well-structured code mean your product stays secure, maintainable, and ready for the next feature.",
    ],
    image: introImg,
    imageAlt: "StarOps developers working on a Django project",
  },

  solutions: {
    title: "Our Django Solutions",
    subtitle: "What we build with Django to help products launch quickly and scale safely.",
    items: [
      { title: "Custom Web Applications", text: "Tailored platforms built around your business logic, from customer portals to internal systems." },
      { title: "Admin Panels & CMS", text: "Powerful admin interfaces and content management tools that let your team manage data without developer help." },
      { title: "REST APIs with DRF", text: "Secure, well-structured APIs using Django REST Framework for web and mobile clients." },
      { title: "E-commerce & Marketplaces", text: "Feature-rich shops and multi-vendor marketplaces with payments, orders, and inventory." },
      { title: "Database Design & Optimization", text: "Clean data models and tuned queries that keep large applications fast." },
      { title: "Maintenance & Upgrades", text: "Version upgrades, security patches, and performance improvements to keep your platform current." },
    ],
  },

  caseStudies: {
    title: "Django Projects in Practice",
    subtitle: "Examples of the platforms and back ends we build with Django.",
    items: [
      { title: "A Multi-Vendor Marketplace", text: "Building a marketplace with seller accounts, listings, and payments on a secure foundation." },
      { title: "An Internal Operations Portal", text: "Replacing scattered spreadsheets with a single system for tracking work and approvals." },
      { title: "A Content Platform for Editors", text: "Giving a publishing team an easy admin to manage articles, media, and schedules." },
      { title: "An API for a Mobile App", text: "Delivering a fast, secure back end that powers an iOS and Android app." },
      { title: "Speeding Up a Slow Database", text: "Restructuring queries and indexes so pages loaded in a fraction of the time." },
      { title: "Upgrading an Old Django Site", text: "Moving an outdated installation to a supported version without service interruption." },
    ],
  },

  faq: {
    title: "Frequently Asked Question",
    subtitle: "Common questions about Django development with StarOps.",
    items: [
      {
        question: "What Django services are available at StarOps?",
        answer: "StarOps excels in Django development, delivering comprehensive solutions encompassing consultation, design, coding, testing, and deployment. Customized solutions for diverse business needs."
      },
      {
        question: "How experienced is StarOps in Django development?",
        answer: "StarOps boasts a highly experienced Django development team with a proven track record, delivering successful projects across various industries."
      },
      {
        question: "Can StarOps create scalable and robust web applications with Django?",
        answer: "Absolutely! StarOps specializes in creating scalable and robust web applications using Django, ensuring optimal performance and reliability."
      },
      {
        question: "What sets StarOps Django development apart?",
        answer: "StarOps distinguishes itself with innovative solutions, transparent communication, and a commitment to exceeding expectations in every Django project."
      },
      {
        question: "How does StarOps ensure security in Django applications?",
        answer: "Security is a top priority at StarOps. We implement industry best practices for secure coding, data encryption, and robust authentication methods in Django development."
      },
      {
        question: "Can StarOps assist in migrating existing projects to Django?",
        answer: "Certainly! StarOps provides expertise in migrating projects to Django, ensuring a smooth transition and enhanced functionalities."
      },
      {
        question: "What is the typical timeline for a Django project at StarOps?",
        answer: "The timeline varies based on project complexity. StarOps follows an agile methodology, delivering efficient and quality Django solutions."
      },
      {
        question: "Can StarOps provide ongoing support and maintenance for Django applications?",
        answer: "Yes, StarOps offers comprehensive support and maintenance services post-deployment, ensuring your Django applications remain secure and up-to-date."
      },
      {
        question: "What industries benefit from StarOps Django solutions?",
        answer: "StarOps serves diverse industries, tailoring Django solutions for healthcare, finance, e-commerce, entertainment, and more."
      },
      {
        question: "What are the pricing models for Django development services at StarOps?",
        answer: "StarOps offers flexible pricing models, including fixed pricing, time and materials, or a dedicated team, based on Django project requirements."
      }
    ],
  },
};

export default django;
