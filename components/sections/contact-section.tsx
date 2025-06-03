import { getAllSocialLinks } from "@/lib/data/social-links"
import Link from "next/link"

const ContactSection = () => {
  const allSocials = getAllSocialLinks()

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Contact Me</h2>
        <p className="text-gray-400 mb-8">Feel free to reach out if you have any questions or opportunities.</p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">Connect With Me</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allSocials.map((social) => {
              const IconComponent = social.icon
              return (
                <Link
                  key={social.id}
                  href={social.url}
                  className={`flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700 ${social.hoverColor} hover:border-gray-600 transition-all duration-300 group`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconComponent className={`h-5 w-5 ${social.color} group-hover:scale-110 transition-transform`} />
                  <div>
                    <p className="font-medium text-gray-200">{social.name}</p>
                    {social.username && <p className="text-sm text-gray-400">{social.username}</p>}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
