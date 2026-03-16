import ExperienceCard from "@/components/experience-card"
import experienceData from "@/content/data/experience.json"

export default function ExperienceSection() {
  const { experiences, organizations, awards } = experienceData

  return (
    <section id="experience" className="py-28 px-4 md:px-6 relative">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-3xl" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="flex items-center gap-4 mb-14">
          <span className="section-number">05</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Experience & Organizations
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent ml-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-mono mb-6 text-cyan-400 uppercase tracking-wider">Professional Experience</h3>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <ExperienceCard key={index} {...exp} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono mb-6 text-cyan-400 uppercase tracking-wider mt-8 lg:mt-0">Organizations</h3>
            <div className="space-y-4">
              {organizations.map((org, index) => (
                <ExperienceCard key={index} {...org} />
              ))}
            </div>

            <h3 className="text-xs font-mono mb-4 text-cyan-400 uppercase tracking-wider mt-8">Awards</h3>
            <div className="space-y-3">
              {awards.map((award, index) => (
                <div key={index} className="glass-card-hover p-5 gradient-border">
                  <h4 className="text-base font-medium mb-1 text-foreground">{award.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">
                    {award.company} &middot; {award.period}
                  </p>
                  <p className="text-sm text-muted-foreground">{award.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
