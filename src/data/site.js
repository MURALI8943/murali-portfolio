/**
 * Portfolio content for Murali.
 * Email, WhatsApp, phone, location, GitHub, and LinkedIn are the configured contact details.
 * Arogya Adarsh, DottFit, and Ananthsai Caterers are live websites.
 */

export const site = {
  name: "Murali",
  role: "Full Stack Developer",
  email: "muralik8943@gmail.com",
  whatsappNumber: "+916281738943",
  phone: "6281738943",
  phoneHref: "tel:+916281738943",
  location: "KPHB, Hyderabad",
  locationHref: "https://www.google.com/maps/search/?api=1&query=KPHB%2C%20Hyderabad",
  whatsappMessage:
    "Hello Murali, I would like to talk about a website project.",
  social: [
    { label: "GitHub", href: "https://github.com/MURALI8943" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/murali-kalakala-86020a26a/",
    },
  ],
};

export const contactNeedsSetup =
  site.email.endsWith("@example.com") || site.whatsappNumber.includes("5550100");

export function emailHref(body = "Hello Murali,\n\nI would like to talk about a website.\n") {
  const subject = encodeURIComponent("Website project");
  return `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
}

export function whatsappHref(message = site.whatsappMessage) {
  const digits = site.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { href: "#top", id: "top", label: "Home" },
  { href: "#about", id: "about", label: "About" },
  { href: "#education", id: "education", label: "Education" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#services", id: "services", label: "Services" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export const sectionIds = nav.map((item) => item.id);

export const heroStack = ["React.js", "Node.js", "Express.js", "PostgreSQL"];

export const highlights = [
  {
    title: "Responsive Web Design",
    text: "Layouts that stay clear on a phone, tablet, and desktop.",
  },
  {
    title: "Frontend & Backend Development",
    text: "React interfaces with Node.js and Express when a site needs a server.",
  },
  {
    title: "Database Integration",
    text: "PostgreSQL when the project needs stored content or enquiries.",
  },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Andhra Loyola College",
    score: "CGPA 8.2",
    years: "2023 – 2025",
  },
  {
    degree: "Bachelor of Science – Computer Science",
    school: "Sir C R Reddy College",
    score: "CGPA 8.17",
    years: "2020 – 2023",
  },
];

export const resume = {
  href: "/resume/murali-resume.pdf",
  label: "Murali resume",
};

export const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "Python", "Django"],
  },
  {
    title: "Database",
    items: ["PostgreSQL", "MySQL"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Cursor"],
  },
];

export const services = [
  {
    title: "Website Development",
    text: "Modern responsive business websites.",
    icon: "layout",
  },
  {
    title: "Landing Page Development",
    text: "Clean pages designed for conversions.",
    icon: "mouse",
  },
  {
    title: "Frontend Development",
    text: "Interactive React.js interfaces.",
    icon: "code",
  },
  {
    title: "Full Stack Development",
    text: "Complete web applications with backend and database integration.",
    icon: "layers",
  },
];

export const projects = [
  {
    id: "arogya-adarsh",
    name: "Arogya Adarsh",
    category: "E-commerce Website",
    summary:
      "An organic products e-commerce website that helps customers explore products and shop online.",
    cover: "/images/projects/arogya-adarsh-homepage.jpg",
    imageWidth: 1024,
    imageHeight: 475,
    imageFit: "contain",
    liveUrl: "https://arogyaadarshorganic.com/home",
    overview:
      "An organic products e-commerce website that helps customers explore products and shop online.",
    purpose: "A storefront where customers can explore the products and shop online.",
    role:
      "Full Stack Development. I built the React.js storefront and the Node.js, Express.js, and PostgreSQL server for this website.",
    features: [],
    technologies: ["React.js", "Node.js", "Express.js", "PostgreSQL"],
  },
  {
    id: "dottfit",
    name: "DottFit",
    category: "Fitness Website",
    summary:
      "A fitness website for online training programs, pricing, and a fit-score check.",
    cover: "/images/projects/dottfit-homepage.jpg",
    imageWidth: 1024,
    imageHeight: 473,
    imageFit: "contain",
    liveUrl: "https://dottfit.co.in/",
    overview:
      "A fitness website where people can look at training programs, pricing, and check a fit score.",
    purpose: "A public site for DottFit's online training programs.",
    role: "I built this React.js website.",
    features: ["Training programs", "Pricing", "Fit score", "Contact"],
    technologies: ["React.js"],
  },
  {
    id: "ananthsai-caterers",
    name: "Ananthsai Caterers",
    category: "Catering Website",
    summary:
      "A catering website for weddings, corporate events, birthdays, and family functions, with a menu and an enquiry.",
    cover: "/images/projects/ananthsai-caterers-homepage.jpg",
    imageWidth: 1024,
    imageHeight: 478,
    imageFit: "contain",
    liveUrl: "https://ananthsai-caterers.aibzr.com/",
    overview:
      "A catering website where hosts can look at services, the menu, and a food gallery, then send an enquiry.",
    purpose:
      "Give Ananthsai Caterers a page for the gatherings they cook for, and a way to start an enquiry.",
    role:
      "I built this React.js website. The enquiry opens in WhatsApp and is not stored on the page.",
    features: [
      "Catering services",
      "Vegetarian and non-vegetarian menu",
      "Food gallery",
      "WhatsApp enquiry",
    ],
    technologies: ["React.js"],
  },
];

export const steps = [
  { title: "Discuss", text: "We agree on the pages and what is out of scope." },
  { title: "Design", text: "I map the layout and the path to an enquiry." },
  { title: "Develop", text: "I build the interface, then the server or database if needed." },
  { title: "Deploy", text: "I help publish the site and hand over the repository." },
];
