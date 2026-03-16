import EducationCard from "@/components/education-card"
import educationData from "@/content/data/education.json"

export default function EducationSection() {
  const { education, certifications } = educationData

  return (
    <section id="education" className="py-28 px-4 md:px-6 relative">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/[0.03] rounded-full blur-3xl" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="flex items-center gap-4 mb-14">
          <span className="section-number">06</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Education & Certifications
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent ml-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-mono mb-6 text-cyan-400 uppercase tracking-wider">Academic Background</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <EducationCard key={index} {...edu} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono mb-6 text-cyan-400 uppercase tracking-wider mt-8 lg:mt-0">Certifications & Courses</h3>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="glass-card-hover p-5 gradient-border">
                  <h4 className="text-base font-medium mb-1 text-foreground">{cert.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">
                    {cert.issuer} &middot; {cert.date}
                  </p>
                  {cert.description && <p className="text-sm text-muted-foreground">{cert.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
