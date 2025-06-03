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
    <section id="contact" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Contact Information</h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-gray-800 p-3 rounded-full">
                      <IconComponent className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">{info.title}</h4>
                      {info.href ? (
                        <Link href={info.href} className="text-gray-300 hover:text-cyan-400 transition-colors">
                          {info.content}
                        </Link>
                      ) : (
                        <p className="text-gray-300">{info.content}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400 mt-8 lg:mt-0">Send Me a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
