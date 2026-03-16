import { Mail, MapPin, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import ContactForm from "@/components/contact-form"
import { personalInfo } from "@/lib/data/sections"

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: MapPin,
      title: "Location",
      content: "19/2235, Thotekat House, Kochi, India",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      content: "LinkedIn Profile",
      href: personalInfo.linkedin,
    },
    {
      icon: Github,
      title: "GitHub",
      content: "GitHub Profile",
      href: personalInfo.github,
    },
  ]

  return (
    <section id="contact" className="py-28 px-4 md:px-6 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-3xl" />
      <div className="container mx-auto max-w-6xl relative">
        <div className="flex items-center gap-4 mb-14">
          <span className="section-number">07</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Get In Touch
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent ml-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-mono mb-8 text-cyan-400 uppercase tracking-wider">Contact Information</h3>

            <div className="space-y-5">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center shrink-0 group-hover:border-cyan-500/20 transition-all duration-300">
                      <IconComponent className="h-4 w-4 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{info.title}</h4>
                      {info.href ? (
                        <Link href={info.href} className="text-muted-foreground hover:text-cyan-400 transition-colors text-sm">
                          {info.content}
                        </Link>
                      ) : (
                        <p className="text-muted-foreground text-sm">{info.content}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono mb-8 text-cyan-400 uppercase tracking-wider mt-8 lg:mt-0">Send Me a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
