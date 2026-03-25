import Link from "next/link"
import { personalInfo } from "@/lib/data/sections"
import { socialLinks } from "@/lib/data/social-links"

const footerLinks = [
  { label: "GitHub", href: socialLinks.github },
  { label: "LinkedIn", href: socialLinks.linkedin },
  { label: "X", href: socialLinks.twitter },
  { label: "Medium", href: socialLinks.medium },
  { label: "HuggingFace", href: socialLinks.huggingface },
  { label: "Fiverr", href: socialLinks.fiverr },
  { label: "VirtusCo", href: socialLinks.virtusco },
  { label: "Noviq", href: socialLinks.noviq },
  { label: "Email", href: `mailto:${socialLinks.email}` },
]

const siteLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Freelance", href: "/freelance" },
  { label: "Timeline", href: "/timeline" },
  { label: "Certificates", href: "/certificates" },
  { label: "Skills", href: "/skills-path" },
]

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-12">
          <div>
            <Link href="/" className="text-foreground font-medium hover:opacity-70 transition-opacity">
              {personalInfo.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
              Electronics engineer, robotics developer, and startup founder based in Kochi, India.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-4">Pages</p>
            <div className="space-y-2">
              {siteLinks.map((link, i) => (
                <Link key={i} href={link.href} className="block text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest mb-4">Connect</p>
            <div className="space-y-2">
              {footerLinks.map((link, i) => (
                <Link key={i} href={link.href} className="block text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex items-center justify-between">
          <p className="font-mono text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} {personalInfo.name}
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            Kochi, India
          </p>
        </div>
      </div>
    </footer>
  )
}
