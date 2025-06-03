import Link from "next/link"
import { getAllSocialLinks } from "@/lib/data/social-links"

export default function HeroSection() {
  const allSocials = getAllSocialLinks()

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl text-gray-700 mb-8">I'm a passionate developer and designer.</p>
        <Link href="/projects" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View My Projects
        </Link>

        <div className="flex justify-center gap-6 pt-8">
          {allSocials.map((social) => {
            const IconComponent = social.icon
            return (
              <Link
                key={social.id}
                href={social.url}
                className={`${social.color} ${social.hoverColor} transition-all duration-300 transform hover:scale-110`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <IconComponent className="h-6 w-6" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
