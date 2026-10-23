import flutterimg from '../../../assets/flutte-img.jpg'
import fluttericon from '../../../assets/flutter-icon-1.png'
const heroImg = flutterimg;
const introImg = fluttericon;

const flutter = {
  hero: { title: "Flutter App Development Services", image: heroImg },

  intro: {
    title: "Beautiful Cross-Platform Apps with Flutter",
    subtitle: "One codebase for iOS and Android, built for smooth performance and a polished look.",
    cta: { label: "Get it for FREE", href: "/contact" },
    paragraphs: [
      "StarOps excels in Flutter app development for businesses that want to reach iOS and Android users quickly without maintaining two separate apps.",
      "Flutter lets us deliver expressive, custom interfaces with fluid animations and near-native performance, all from a single codebase that is faster to build and cheaper to maintain.",
      "From concept and design through store release and support, our team makes sure your app looks great, runs smoothly, and is ready to grow.",
    ],
    image: introImg,
    imageAlt: "StarOps team testing a Flutter app on phones",
  },

  solutions: {
    title: "Our Flutter Solutions",
    subtitle: "What we deliver with Flutter, from first prototype to store release.",
    items: [
      { title: "Cross-Platform Mobile Apps", text: "One Flutter codebase that delivers a consistent, high-quality experience on both iOS and Android." },
      { title: "Custom UI & Animations", text: "Distinctive interfaces and smooth motion that make your brand feel premium." },
      { title: "Flutter for Web & Desktop", text: "Extend your app to the browser and desktop while reusing most of your existing code." },
      { title: "Firebase & Backend Integration", text: "Authentication, databases, push notifications, and APIs connected securely behind your app." },
      { title: "Architecture & State Management", text: "Clean, testable structure that keeps larger Flutter apps organized and easy to extend." },
      { title: "Publishing & Maintenance", text: "App Store and Google Play release support, followed by updates and ongoing improvements." },
    ],
  },

  caseStudies: {
    title: "Flutter Apps in Practice",
    subtitle: "Examples of the apps we help businesses launch with Flutter.",
    items: [
      { title: "Launching on Both Stores at Once", text: "Shipping an iOS and Android app together from one codebase, cutting time to market." },
      { title: "A Branded Customer Experience", text: "Creating a custom interface with smooth animation that stood out from competitors." },
      { title: "An Offline-Capable Field App", text: "Letting teams keep working without a connection and syncing data later." },
      { title: "From Web to Mobile", text: "Extending an existing service into an app while sharing logic with the web version." },
      { title: "Real-Time Chat and Notifications", text: "Adding live messaging and push alerts to keep users engaged." },
      { title: "Moving to Flutter from Two Native Apps", text: "Consolidating separate apps into one codebase to simplify updates and reduce costs." },
    ],
  },

  faq: {
    title: "Frequently Asked Question",
    subtitle: "Common questions about Flutter development with StarOps.",
    items: [
      {
        question: "How does our team ensure security in Flutter development?",
        answer: "Security is a top priority. We implement industry best practices for secure coding, data encryption, and robust authentication methods to safeguard user data and ensure the overall security of Flutter applications."
      },
      {
        question: "What advantages does Flutter bring to mobile app development?",
        answer: "Flutter offers benefits like cross-platform development, a single codebase, and a rich set of pre-designed widgets. We leverage these advantages to deliver powerful and flexible Flutter applications for your business needs."
      },
      {
        question: "Can our team create custom Flutter applications tailored to specific business requirements?",
        answer: "Absolutely! We specialize in creating custom Flutter applications tailored to your specific business requirements, ensuring optimal functionality and alignment with your goals."
      },
      {
        question: "How does our team approach the development of cross-platform Flutter applications?",
        answer: "For cross-platform Flutter applications, we implement a unified codebase, ensuring consistent experiences across different platforms and devices."
      },
      {
        question: "What sets our team apart in Flutter development?",
        answer: "We distinguish ourselves with a commitment to quality, innovative solutions, transparent communication, and a client-centric approach in Flutter development."
      },
      {
        question: "Can our team assist in migrating existing mobile apps to Flutter?",
        answer: "Certainly! We provide expertise in migrating existing mobile applications to Flutter, ensuring a smooth transition and enhanced functionalities."
      },
      {
        question: "What is the typical timeline for a Flutter project with our team?",
        answer: "The timeline varies based on project complexity. We follow an agile methodology, delivering efficient and quality Flutter solutions."
      },
      {
        question: "Can our team provide ongoing support and maintenance for Flutter applications?",
        answer: "Yes, we offer comprehensive support and maintenance services post-deployment, ensuring your Flutter applications remain secure, up-to-date, and optimized for peak performance."
      },
      {
        question: "What industries benefit from our Flutter solutions?",
        answer: "We serve diverse industries, tailoring Flutter solutions for healthcare, finance, e-commerce, entertainment, and more."
      },
      {
        question: "What are the pricing models for Flutter development services with our team?",
        answer: "We offer flexible pricing models, including fixed pricing, time and materials, or a dedicated team, based on Flutter project requirements."
      }
    ],
  },
};

export default flutter;
