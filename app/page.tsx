import { getEnabledSections } from "@/lib/data/sections"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ProjectsSection from "@/components/sections/projects-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import ExperienceSection from "@/components/sections/experience-section"
import EducationSection from "@/components/sections/education-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/footer"

const sectionComponents = {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  TestimonialsSection,
  ExperienceSection,
  EducationSection,
  ContactSection,
}

export default function Home() {
  const enabledSections = getEnabledSections()

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {enabledSections.map((section) => {
        const SectionComponent = sectionComponents[section.component as keyof typeof sectionComponents]
        return SectionComponent ? <SectionComponent key={section.id} /> : null
      })}
      <Footer />
    </main>
  )
}
