import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SkillBadge from "@/components/skill-badge"
import skillCategories from "@/content/data/skills.json"

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28 px-4 md:px-6 relative">
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-violet-500/[0.03] rounded-full blur-3xl -translate-y-1/2" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="flex items-center gap-4 mb-14">
          <span className="section-number">02</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Technical Skills
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent ml-4" />
        </div>

        <Tabs defaultValue="programming" className="w-full">
          <TabsList className="flex flex-wrap gap-1 bg-transparent border-0 mb-10 p-0 h-auto">
            {[
              { value: "programming", label: "Programming" },
              { value: "hardware", label: "Hardware" },
              { value: "robotics", label: "Robotics" },
              { value: "ai", label: "AI & ML" },
              { value: "web", label: "Web & App" },
              { value: "tools", label: "Tools" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-full px-5 py-2 text-sm text-muted-foreground data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/20 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(skillCategories).map(([category, skills]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {skills.map((skill, index) => (
                  <SkillBadge key={index} name={skill.name} level={skill.level as any} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
