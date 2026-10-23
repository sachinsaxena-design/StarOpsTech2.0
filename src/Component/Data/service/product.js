import productimg from '../../../assets/product-img.jpg'
import productimgs from '../../../assets/product-imgs.jpg'
const heroImg = productimg;
const introImg = productimgs;

const product = {
  hero: { title: "Product Engineering Services", image: heroImg },

  intro: {
    title: "Crafting Innovation Through Product Engineering",
    subtitle: "Dedicated engineering teams that own your roadmap from architecture to long-term maintenance.",
   
    paragraphs: [
      "StarOps partners with you to design, build, and evolve digital products. We combine product thinking with strong engineering so that what we build solves real problems and is ready to grow.",
      "We work as an extension of your team, covering discovery, architecture, development, testing, and release. Whether you are validating a new idea or modernizing an existing platform, we shape a clear plan and deliver it in focused iterations.",
      "Quality is part of every sprint, with automated testing and continuous delivery keeping your product stable as new features ship.",
    ],
    image: introImg,
    imageAlt: "StarOps product team planning a roadmap",
  },

  solutions: {
    title: "Our Product Engineering Solutions",
    subtitle: "End-to-end services that take a product from first idea to a stable, scalable platform.",
    items: [
      { title: "Discovery & Roadmapping", text: "Workshops and research to define the problem, prioritize features, and turn your vision into a practical roadmap." },
      { title: "MVP Development", text: "A focused first version built quickly so you can test with real users and learn before investing further." },
      { title: "Architecture & Scalability", text: "Clean, modular architecture designed to handle growth in users, data, and features without costly rewrites." },
      { title: "Legacy Modernization", text: "Gradually upgrade aging applications to modern stacks while keeping your business running." },
      { title: "QA & Test Automation", text: "Automated and manual testing that protects quality and lets your team release with confidence." },
      { title: "Continuous Delivery & Support", text: "Regular releases, monitoring, and long-term maintenance so your product keeps improving after launch." },
    ],
  },

  caseStudies: {
    title: "Products Built to Last",
    subtitle: "The kinds of product challenges we help teams solve, from first idea to scale.",
    items: [
      { title: "Turning an Idea into a Market-Ready MVP", text: "Taking a startup concept from workshops to a working product in a matter of weeks, ready for its first users." },
      { title: "Modernizing a Legacy Platform", text: "Replacing an outdated system piece by piece, improving performance and developer speed without disrupting customers." },
      { title: "Scaling for Rapid User Growth", text: "Reworking architecture and infrastructure so a growing product stayed fast under much heavier load." },
      { title: "Building a Dedicated Product Team", text: "Embedding engineers who own the roadmap, giving a company the capacity to ship without a long hiring cycle." },
      { title: "Raising Quality with Test Automation", text: "Introducing automated testing that reduced bugs in production and shortened each release cycle." },
      { title: "Redesigning a Product Experience", text: "Using user research and iteration to simplify a complex product and improve satisfaction and retention." },
    ],
  },

  faq: {
    title: "Frequently Asked Question",
    subtitle: "Common questions about working with StarOps on your product.",
    items: [
      {
        question: "What innovative features does StarOps offer in its product solutions?",
        answer: "StarOps specializes in delivering innovative product solutions with cutting-edge features designed to meet the evolving needs of your target market. Our offerings focus on providing a competitive edge through creativity and advanced technology."
      },
      {
        question: "How does StarOps ensure the security of products during development?",
        answer: "Security is a top priority at StarOps. We adhere to industry standards for secure coding, data protection, and compliance measures, ensuring the safety and integrity of your product and user data throughout the development process."
      },
      {
        question: "Can StarOps customize product solutions to align with specific business objectives?",
        answer: "Yes, StarOps is committed to tailoring product solutions that align with your business objectives. Whether it's introducing new features, improving user experience, or ensuring scalability, we deliver customized solutions for optimal results."
      },
      {
        question: "What strategies does StarOps employ to enhance user engagement in product solutions?",
        answer: "StarOps focuses on user engagement through strategies such as intuitive designs, personalized interactions, and continuous improvement. Our goal is to create a positive and memorable user experience, fostering satisfaction and loyalty."
      },
      {
        question: "How does StarOps provide continuous improvement and updates to products?",
        answer: "We emphasize continuous improvement by providing regular updates and enhancements to your product. StarOps ensures that your product stays competitive and aligned with the latest industry trends and technologies."
      },
      {
        question: "What is the process for getting started with product solutions at StarOps?",
        answer: "To begin your journey with StarOps's product solutions, reach out to our team through our website or contact us directly. We'll schedule a consultation to discuss your product requirements and provide a tailored solution."
      },
      {
        question: "In which industries has StarOps previously delivered successful product solutions?",
        answer: "StarOps has experience working across various industries, delivering innovative and high-quality product solutions. Our versatility allows us to adapt our expertise to suit the unique needs of different sectors."
      },
      {
        question: "What are the pricing models for product solutions at StarOps?",
        answer: "StarOps offers flexible pricing models to accommodate different project needs. We can discuss options such as fixed pricing, time and materials, or a dedicated team model based on the specifics of your product development requirements."
      }
    ],
  },
};

export default product;
