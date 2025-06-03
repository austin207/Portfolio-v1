import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Briefcase, GraduationCap, Rocket } from "lucide-react"

const timelineEvents = [
  {
    year: "2025",
    title: "VirtusCo Founder & CTO",
    type: "organization",
    description:
      "Founded VirtusCo, a robotics-focused tech startup. Successfully shortlisted for startup incubation under IEDC.",
    icon: Rocket,
    color: "text-purple-400",
    bgColor: "bg-purple-950/30",
    borderColor: "border-purple-800",
  },
  {
    year: "2025",
    title: "Product Delivery Award",
    type: "award",
    description:
      "Contributed to the development of a Robo-Based Mobile Sensing System for Indoor Air Delivery Measurement at Rajagiri School of Engineering & Technology.",
    icon: Award,
    color: "text-emerald-400",
    bgColor: "bg-emerald-950/30",
    borderColor: "border-emerald-800",
  },
  {
    year: "2025",
    title: "AI/ML Language Model Project",
    type: "project",
    description:
      "Started building transformer models from scratch, including RNN-based text generators and MiniGPT implementations.",
    icon: Briefcase,
    color: "text-cyan-400",
    bgColor: "bg-cyan-950/30",
    borderColor: "border-cyan-800",
  },
  {
    year: "2025",
    title: "Engineer Intern",
    type: "experience",
    description:
      "Gained industrial experience in premium horn manufacturing, facility design, and electrical horn manufacturing at Roots Group of Companies.",
    icon: Briefcase,
    color: "text-amber-400",
    bgColor: "bg-amber-950/30",
    borderColor: "border-amber-800",
  },
  {
    year: "2024",
    title: "Electric ATV Competition",
    type: "award",
    description:
      "Achieved podium finish in RC electric ATV competition at Saintgits College, competing against 12 colleges.",
    icon: Award,
    color: "text-emerald-400",
    bgColor: "bg-emerald-950/30",
    borderColor: "border-emerald-800",
  },
  {
    year: "2024",
    title: "Industrial Internship",
    type: "experience",
    description:
      "Gained experience in power transformer construction and testing at Kerala Electrical and Allied Engineering Company.",
    icon: Briefcase,
    color: "text-amber-400",
    bgColor: "bg-amber-950/30",
    borderColor: "border-amber-800",
  },
  {
    year: "2023",
    title: "Started B.Tech",
    type: "education",
    description:
      "Began Bachelor of Technology in Applied Electronics and Instrumentation Engineering at Rajagiri School of Engineering & Technology.",
    icon: GraduationCap,
    color: "text-blue-400",
    bgColor: "bg-blue-950/30",
    borderColor: "border-blue-800",
  },
  {
    year: "2023",
    title: "Freelance Web Developer",
    type: "experience",
    description:
      "Started developing responsive websites using Next.js for clients including VirtusCo and Yehi (Australia).",
    icon: Briefcase,
    color: "text-amber-400",
    bgColor: "bg-amber-950/30",
    borderColor: "border-amber-800",
  },
  {
    year: "2023",
    title: "Higher Secondary Completion",
    type: "education",
    description:
      "Completed Higher Secondary Education with specialization in Electronics, C, C++, and Python at Model Technical Higher Secondary School.",
    icon: GraduationCap,
    color: "text-blue-400",
    bgColor: "bg-blue-950/30",
    borderColor: "border-blue-800",
  },
  {
    year: "2019-2023",
    title: "Head of Electronics Club",
    type: "organization",
    description:
      "Led and mentored three batches of 15 students, organized workshops and tech fests at Model Technical Higher Secondary School.",
    icon: Rocket,
    color: "text-purple-400",
    bgColor: "bg-purple-950/30",
    borderColor: "border-purple-800",
  },
  {
    year: "2021",
    title: "K.I.T.E. Technical Training",
    type: "award",
    description:
      "Top performer in technical training and educational initiatives by Kerala Infrastructure and Technology for Education.",
    icon: Award,
    color: "text-emerald-400",
    bgColor: "bg-emerald-950/30",
    borderColor: "border-emerald-800",
  },
  {
    year: "2019",
    title: "Robotics Certification",
    type: "award",
    description:
      "Best performer in Robotics Intermediate Certification at Shrishti Robotics, excelling in robotics design and programming.",
    icon: Award,
    color: "text-emerald-400",
    bgColor: "bg-emerald-950/30",
    borderColor: "border-emerald-800",
  },
]

export default function Timeline() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-emerald-500"></div>

      <div className="space-y-8">
        {timelineEvents.map((event, index) => {
          const IconComponent = event.icon
          return (
            <div key={index} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div
                className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 ${event.bgColor} ${event.borderColor}`}
              >
                <IconComponent className={`h-8 w-8 ${event.color}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className={`${event.bgColor} ${event.color} ${event.borderColor}`}>
                        {event.year}
                      </Badge>
                      <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600 capitalize">
                        {event.type}
                      </Badge>
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${event.color}`}>{event.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
