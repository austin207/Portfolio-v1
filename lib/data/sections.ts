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
  linkedin: "https://linkedin.com/in/antony-austin",
  medium: "https://medium.com/@antonyaustin",
  instagram: "https://instagram.com/antony.austin",
  twitter: "https://twitter.com/antonyaustin",
  avatar: "/Profile.png",
  birthDate: "March 16, 2005",
}

export const testimonials: TestimonialData[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    role: "Professor",
    company: "Electronics Engineering",
    content:
      "Antony's expertise in embedded systems and IoT is exceptional. His ambulance traffic management system could revolutionize emergency response in urban areas.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
    featured: true,
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "Yehi Australia",
    content:
      "Working with Antony on our website was a fantastic experience. His technical skills and attention to detail are outstanding.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
    featured: true,
  },
  {
    id: "3",
    name: "Arjun Krishna",
    role: "ML Engineer",
    company: "Tech Startup",
    content:
      "Antony's AI/ML projects demonstrate deep understanding of modern technologies. His transformer implementation is particularly impressive.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
    featured: true,
  },
  {
    id: "4",
    name: "Prof. Meera Nair",
    role: "Head of Department",
    company: "Rajagiri School of Engineering",
    content:
      "Antony consistently delivers exceptional work. His leadership in the robotics project was instrumental to our success.",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
    featured: false,
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
