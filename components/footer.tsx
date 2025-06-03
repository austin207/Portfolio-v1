import Link from "next/link"
import { getPrimarySocialLinks } from "@/lib/data/social-links"

export default function Footer() {
  const primarySocials = getPrimarySocialLinks()

  return (
    <footer className="py-8 px-4 md:px-6 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Antony Austin. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          {primarySocials.map((social) => {
            const IconComponent = social.icon
            return (
              <Link
                key={social.id}
                href={social.url}
                className={`${social.color} ${social.hoverColor} transition-colors`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <IconComponent className="h-5 w-5" />
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
