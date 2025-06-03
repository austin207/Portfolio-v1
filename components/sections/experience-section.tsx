import { Card, CardContent } from "@/components/ui/card"
import ExperienceCard from "@/components/experience-card"

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Freelance Web Developer",
      company: "Remote",
      period: "2023 - present",
      location: "Kochi, India",
      description: [
        "Developing responsive websites for Yehi (Australia) and VirtusCo (India) using Next.js to enhance online presence and user experience.",
        "Created and deployed VirtusCo's coming-soon website with Next.js, React.js, and responsive design.",
        "Implementing SEO best practices and performance optimizations for improved visibility and efficiency.",
      ],
    },
    {
      title: "Engineer Intern",
      company: "Roots Group of Companies",
      period: "05/2025 - 06/2025",
      location: "Coimbatore, India",
      description: [
        "Gained industrial experience in premium horn manufacturing, facility design, and electrical horn manufacturing.",
        "Worked with advanced manufacturing processes and quality control systems.",
        "Developed understanding of industrial automation and production optimization.",
      ],
    },
    {
      title: "Intern",
      company: "Kerala Electrical and Allied Engineering Company",
      period: "12/2024 - 12/2024",
      location: "Kochi, India",
      description: [
        "Gained industrial experience in constructing, testing, and dispatching power transformers.",
        "Developed expertise in transformer assembly, core winding, insulation, and mineral oil cooling.",
        "Broadened understanding of power transmission systems and electrical distribution networks.",
      ],
    },
  ]

  const organizations = [
    {
      title: "Founder/CTO",
      company: "VirtusCo",
      period: "2025 - present",
      location: "Kochi, India",
      description: [
        "Founded VirtusCo with a team to bridge resource gaps and nurture robotics talent.",
        "Successfully shortlisted for startup incubation under IEDC.",
        "Leading technical development and research to drive innovative robotic solutions.",
      ],
    },
    {
      title: "Head of Electronics Club",
      company: "Model Technical Higher Secondary School",
      period: "2019 - 2023",
      location: "Kochi, India",
      description: [
        "Led and mentored three batches of 15 students in the Electronics Department, fostering collaboration and technical growth.",
        "Organized workshops, tech fests, and project-based learning to enhance interest in electronics.",
        "Showcased leadership and organizational skills in managing club activities and technical projects.",
      ],
    },
  ]

  const awards = [
    {
      title: "Product Delivery | (for KULIRMA Fans)",
      company: "Rajagiri School of Engineering & Technology",
      period: "03/2025",
      description:
        "Contributed to the development of a Robo-Based Mobile Sensing System for Indoor Air Delivery Measurement.",
    },
    {
      title: "Electric ATV Competition",
      company: "Saintgits College, Kottayam",
      period: "12/2024",
      description: "Achieved a podium finish in the RC electric ATV competition, competing against 12 colleges.",
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          Experience & Organizations
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Professional Experience</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <ExperienceCard key={index} {...exp} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400 mt-8 lg:mt-0">Organizations</h3>
            <div className="space-y-6">
              {organizations.map((org, index) => (
                <ExperienceCard key={index} {...org} />
              ))}
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-cyan-400 mt-8">Awards</h3>
            <div className="space-y-4">
              {awards.map((award, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="pt-6">
                    <h4 className="text-lg font-medium mb-2">{award.title}</h4>
                    <p className="text-sm text-gray-400">
                      {award.company}, {award.period}
                    </p>
                    <p className="text-gray-300 mt-2">{award.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
