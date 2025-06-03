import { Card, CardContent } from "@/components/ui/card"
import EducationCard from "@/components/education-card"

export default function EducationSection() {
  const education = [
    {
      degree: "Bachelor of Technology in Applied Electronics and Instrumentation Engineering",
      institution: "Rajagiri School of Engineering & Technology",
      period: "2023 - 2027",
      location: "Kakkanad, India",
      description: "Currently in 4th Semester",
    },
    {
      degree: "Higher Secondary Education",
      institution: "Model Technical Higher Secondary School, (IHRD)",
      period: "2021 - 2023",
      location: "Kaloor, India",
      description: "Specialization in Electronics, C, C++, and Python",
    },
    {
      degree: "High School Education",
      institution: "Model Technical Higher Secondary School, (IHRD)",
      period: "2018 - 2021",
      location: "Kaloor, India",
    },
  ]

  const certifications = [
    {
      title: "Introduction to Prompt Engineering",
      issuer: "Simplilearn",
      date: "2024",
    },
    {
      title: "Prompt Engineering for Everyone",
      issuer: "Cognitive Class",
      date: "2024",
    },
    {
      title: "Robotics Intermediate Certification",
      issuer: "Shrishti Robotics",
      date: "05/2019",
      description: "Best performer, excelling in robotics design, programming, and implementation.",
    },
    {
      title: "K.I.T.E. Technical Training",
      issuer: "Model Technical Higher Secondary School",
      date: "02/2021",
      description: "Top performer in technical training and educational initiatives.",
    },
  ]

  return (
    <section id="education" className="py-20 px-4 md:px-6 bg-gray-900/50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          Education & Certifications
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Academic Background</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <EducationCard key={index} {...edu} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400 mt-8 lg:mt-0">Certifications & Courses</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="pt-6">
                    <h4 className="text-lg font-medium mb-2">{cert.title}</h4>
                    <p className="text-sm text-gray-400">
                      {cert.issuer}, {cert.date}
                    </p>
                    {cert.description && <p className="text-gray-300 mt-2">{cert.description}</p>}
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
