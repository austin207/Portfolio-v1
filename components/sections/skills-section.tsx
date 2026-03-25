"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import skillCategories from "@/content/data/skills.json"
import { useReveal } from "@/hooks/use-reveal"

export default function SkillsSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="skills" className="py-24 px-6" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <div className={`divider mb-16 line-reveal ${visible ? "visible" : ""}`} />

        <h2 className={`text-sm font-mono text-muted-foreground uppercase tracking-widest mb-10 reveal ${visible ? "visible" : ""}`}>Technical Skills</h2>

        <div className={`reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
          <Tabs defaultValue="programming" className="w-full">
            <TabsList className="flex flex-wrap gap-0 bg-transparent border-0 mb-10 p-0 h-auto border-b border-border">
              {[
                { value: "programming", label: "Programming" },
                { value: "hardware", label: "Hardware" },
                { value: "robotics", label: "Robotics" },
                { value: "ai", label: "AI / ML" },
                { value: "web", label: "Web" },
                { value: "tools", label: "Tools" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-[13px] text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors bg-transparent"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(skillCategories).map(([category, skills]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {skills.map((skill, index) => {
                    const levelOpacity = skill.level === "Expert" ? "text-foreground" : skill.level === "Proficient" ? "text-foreground/70" : "text-foreground/50"
                    return (
                      <div key={index} className="p-4 flex items-center justify-between border border-border hover:bg-foreground/[0.03] transition-colors -mt-px -ml-px">
                        <span className={`text-sm ${levelOpacity}`}>{skill.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{skill.level}</span>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
