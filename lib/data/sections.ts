export interface Section {
  id: string
  title: string
  component: string
  enabled: boolean
  order: number
}

export interface TestimonialData {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  featured: boolean
}

export interface PersonalInfo {
  name: string
  title: string
  description: string
  email: string
  location: string
  github: string
  linkedin: string
  medium: string
  instagram: string
  twitter: string
  avatar: string
  birthDate: string
}

export const personalInfo: PersonalInfo = {
  name: "Antony Austin",
  title: "Electronics Engineer & Tech Innovator",
  description:
    "Applied Electronics & Instrumentation Engineering undergraduate with expertise in hardware design, embedded systems, AI/ML, and robotics. Founder of VirtusCo.",
  email: "austinantony06@gmail.com",
  location: "Kochi, India",
  github: "https://github.com/austin207",
  linkedin: "https://www.linkedin.com/in/antony-austin-b7287226a/",
  medium: "https://medium.com/@austinantony06",
  instagram: "https://www.instagram.com/antonyavstin?igsh=Z3NpM3NuNjl4dmU0&utm_source=qr",
  twitter: "https://x.com/AntonyAustin19",
  avatar: "/Profile.png",
  birthDate: "March 16, 2005",
}

export const testimonials: TestimonialData[] = [
  {
    id: "1",
    name: "Alwin George Thomas",
    role: "CFO",
    company: "VirtusCo",
    content:
      "Austin is a highly skilled and reliable individual who delivers with quality and precision. His strong communication, problem-solving ability, and work ethic makes him a \"must need\" to any team.",
    rating: 5,
    avatar: "/Testimonials/Alwin.jpg",
    featured: true,
  },
  {
    id: "2",
    name: "Xavier Alex",
    role: "Private Banker",
    company: "ICICI Bank",
    content:
      "Antony created a phenomenal personal assistant for me using AI automation. It's transformed the way I manage tasks, projects, and information efficient, reliable, and surprisingly intuitive. His ability to blend cutting-edge AI with practical workflows is truly impressive.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
    featured: true,
  },
  {
    id: "3",
    name: "A. Azeem Kouther",
    role: "CMO",
    company: "VirtusCo",
    content:
      "Antony's AI/ML projects demonstrate deep understanding of modern technologies. His transformer implementation is particularly impressive.",
    rating: 5,
    avatar: "/Testimonials/Azeem.jpg",
    featured: true,
  },
]

export const sections: Section[] = [
  { id: "hero", title: "Hero", component: "HeroSection", enabled: true, order: 1 },
  { id: "about", title: "About", component: "AboutSection", enabled: true, order: 2 },
  { id: "skills", title: "Skills", component: "SkillsSection", enabled: true, order: 3 },
  { id: "projects", title: "Projects", component: "ProjectsSection", enabled: true, order: 4 },
  { id: "testimonials", title: "Testimonials", component: "TestimonialsSection", enabled: true, order: 5 },
  { id: "experience", title: "Experience", component: "ExperienceSection", enabled: true, order: 6 },
  { id: "education", title: "Education", component: "EducationSection", enabled: true, order: 7 },
  { id: "contact", title: "Contact", component: "ContactSection", enabled: true, order: 8 },
]

export const getEnabledSections = () => {
  return sections.filter((section) => section.enabled).sort((a, b) => a.order - b.order)
}
