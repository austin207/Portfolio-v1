import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SkillBadge from "@/components/skill-badge"

export default function SkillsSection() {
  const skillCategories = {
    programming: [
      { name: "Embedded C", level: "Expert" as const },
      { name: "C", level: "Expert" as const },
      { name: "C++", level: "Proficient" as const },
      { name: "Python", level: "Expert" as const },
      { name: "VHDL/Verilog", level: "Competent" as const },
    ],
    hardware: [
      { name: "PCB Design", level: "Expert" as const },
      { name: "Circuit Analysis", level: "Expert" as const },
      { name: "Microcontrollers", level: "Expert" as const },
      { name: "RTOS", level: "Proficient" as const },
      { name: "System Architecture", level: "Proficient" as const },
      { name: "I2C", level: "Expert" as const },
      { name: "SPI", level: "Expert" as const },
      { name: "UART", level: "Expert" as const },
      { name: "CAN", level: "Competent" as const },
      { name: "Ethernet", level: "Competent" as const },
    ],
    web: [
      { name: "HTML", level: "Competent" as const },
      { name: "CSS", level: "Competent" as const },
      { name: "JavaScript", level: "Competent" as const },
      { name: "Next.js", level: "Competent" as const },
      { name: "React.js", level: "Competent" as const },
      { name: "Express.js", level: "Competent" as const },
      { name: "Flutter", level: "Competent" as const },
      { name: "MIT App Inventor", level: "Proficient" as const },
    ],
    ai: [
      { name: "PyTorch", level: "Competent" as const },
      { name: "TensorFlow-Lite", level: "Competent" as const },
      { name: "OpenCV", level: "Proficient" as const },
      { name: "Computer Vision", level: "Proficient" as const },
      { name: "MATLAB", level: "Competent" as const },
      { name: "Hugging Face", level: "Competent" as const },
      { name: "Ollama", level: "Competent" as const },
      { name: "Prompt Engineering", level: "Proficient" as const },
    ],
    tools: [
      { name: "Altium Designer", level: "Expert" as const },
      { name: "Eagle", level: "Proficient" as const },
      { name: "KiCad", level: "Proficient" as const },
      { name: "Git/GitHub", level: "Proficient" as const },
      { name: "AutoCAD", level: "Competent" as const },
      { name: "Fusion360", level: "Competent" as const },
      { name: "Oscilloscopes", level: "Expert" as const },
      { name: "Logic Analyzers", level: "Proficient" as const },
      { name: "JTAG", level: "Competent" as const },
      { name: "Linux/CLI", level: "Proficient" as const },
      { name: "Raspberry Pi", level: "Expert" as const },
    ],
  }

  return (
    <section id="skills" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          Technical Skills
        </h2>

        <Tabs defaultValue="programming" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-gray-800/50 mb-8">
            <TabsTrigger value="programming">Programming</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="web">Web & App</TabsTrigger>
            <TabsTrigger value="ai">AI & ML</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          {Object.entries(skillCategories).map(([category, skills]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <SkillBadge key={index} name={skill.name} level={skill.level} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
