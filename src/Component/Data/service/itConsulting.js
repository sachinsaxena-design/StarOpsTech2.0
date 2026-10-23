import itconsult from '../../../assets/about-image/about-img-2.jpg'
import itstaff from '../../../assets/itstaff.jpg'
const heroImg = itconsult;
const introImg = itstaff;

const itConsulting = {
  hero: { title: "IT Consulting Services", image: heroImg },

  intro: {
    title: "Navigating IT Excellence",
    subtitle: "Practical technology guidance that connects your IT decisions to your business goals.",

    paragraphs: [
      "Technology choices can make or break a business. StarOps IT consulting helps you cut through the noise, understand where your systems stand today, and decide where to invest next.",
      "Our consultants work with your leadership and technical teams to review your infrastructure, software, and processes, and to build a clear, prioritized plan covering strategy, cloud, security, and digital transformation.",
      "We focus on advice you can act on: realistic timelines, measurable outcomes, and support through implementation when you need it.",
    ],
    image: introImg,
    imageAlt: "StarOps consultants meeting with a client",
  },

  solutions: {
    title: "Our IT Consulting Solutions",
    subtitle: "Strategic and hands-on services that help you modernize, secure, and get more from your technology.",
    items: [
      { title: "IT Strategy & Roadmap", text: "A clear technology strategy aligned with your business goals, with priorities, timelines, and budgets you can plan around." },
      { title: "Digital Transformation", text: "Modernize processes and systems to work faster, reduce manual effort, and deliver better customer experiences." },
      { title: "Cloud Consulting", text: "Choose the right cloud approach, plan migrations, and optimize costs and performance once you are there." },
      { title: "Technology Audit & Assessment", text: "An independent review of your infrastructure, applications, and processes that highlights risks and quick wins." },
      { title: "Cybersecurity Advisory", text: "Assess vulnerabilities, strengthen defenses, and build policies that protect your data and your customers." },
      { title: "Vendor & Tool Selection", text: "Unbiased guidance on choosing the platforms, tools, and partners that truly fit your needs." },
    ],
  },

  caseStudies: {
    title: "IT Consulting in Practice",
    subtitle: "Examples of the outcomes we help organizations reach through clear, practical IT guidance.",
    items: [
      { title: "A Technology Roadmap for a Growing Company", text: "Mapping current systems and future needs into a phased plan that leadership could approve with confidence." },
      { title: "Reducing IT Costs Through Consolidation", text: "Identifying overlapping tools and unused licenses to lower spending without affecting the team." },
      { title: "Planning a Smooth Cloud Move", text: "Assessing workloads and risks to create a migration plan that kept critical services running." },
      { title: "Closing Security Gaps", text: "A security review that uncovered weak points and delivered a prioritized plan to fix them." },
      { title: "Automating Manual Business Processes", text: "Replacing spreadsheets and repetitive tasks with connected systems, saving the team hours every week." },
      { title: "Choosing the Right Platform", text: "Comparing options against real requirements so a business selected software it would not outgrow." },
    ],
  },

  faq: {
    title: "Frequently Asked Question",
    subtitle: "Straight answers about how our IT consulting works.",
    items: [
      {
        question: "What services does StarOps offer in IT consultancy?",
        answer: "StarOps provides strategic IT consulting, IT infrastructure management, cybersecurity solutions, customized IT solutions, IT project management, and IT training and skill development."
      },
      {
        question: "How does StarOps manage IT infrastructure for businesses?",
        answer: "StarOps specializes in managing IT infrastructure, ensuring stability, scalability, and security. Our team employs best practices for infrastructure design, implementation, and maintenance, allowing businesses to focus on core operations with confidence."
      },
      {
        question: "Is cybersecurity a priority for StarOps in IT consultancy?",
        answer: "Yes, security is a paramount focus at StarOps. We provide robust cybersecurity solutions, including risk assessments, threat detection, and implementation of security protocols to safeguard data and IT assets."
      },
      {
        question: "Can StarOps tailor IT solutions to address specific business needs?",
        answer: "Absolutely, StarOps is dedicated to tailoring IT solutions that address the unique needs of your business. Whether it's optimizing workflows, implementing new technologies, or overcoming IT challenges, we deliver customized solutions for optimal performance."
      },
      {
        question: "What is the approach to IT project management at StarOps?",
        answer: "StarOps offers expert IT project management services, ensuring the successful planning, execution, and completion of IT projects. Our team oversees project timelines, resources, and quality assurance for seamless implementation."
      },
      {
        question: "Does StarOps provide IT training and skill development programs?",
        answer: "Yes, StarOps offers training and skill development programs to empower IT teams. We provide tailored training sessions designed to enhance the expertise of your staff and keep them up-to-date with the latest technologies and industry best practices."
      },
      {
        question: "How can I get started with IT consultancy services at StarOps?",
        answer: "To begin your IT consultancy journey with StarOps, reach out to our team through our website or contact us directly. We'll schedule a consultation to discuss your IT requirements and provide a tailored solution."
      },
      {
        question: "What industries has StarOps previously worked with in IT consultancy?",
        answer: "StarOps has experience working across various industries, delivering strategic IT consultancy services. Our adaptability allows us to tailor our expertise to suit the unique needs of different sectors."
      },
      {
        question: "What are the pricing models for IT consultancy services at StarOps?",
        answer: "StarOps offers flexible pricing models to accommodate different project needs. We can discuss options such as fixed pricing, time and materials, or a dedicated team model based on the specifics of your IT consultancy requirements."
      }
    ],
  },
};

export default itConsulting;
