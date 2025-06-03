import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface SocialLink {
  id: string
  name: string
  url: string
  icon: LucideIcon
  color: string
  hoverColor: string
  username?: string
  description?: string
  primary?: boolean
}

// Medium icon component (since it's not in Lucide)
export const MediumIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
)

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/austin207",
    icon: Github,
    color: "text-gray-400",
    hoverColor: "hover:text-white",
    username: "@austin207",
    description: "Open source projects and code repositories",
    primary: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "linkedin.com/in/antony-austin-b7287226a",
    icon: Linkedin,
    color: "text-blue-400",
    hoverColor: "hover:text-blue-300",
    username: "antony-austin",
    description: "Professional network and career updates",
    primary: true,
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:austinantony06@gmail.com",
    icon: Mail,
    color: "text-cyan-400",
    hoverColor: "hover:text-cyan-300",
    username: "austinantony06@gmail.com",
    description: "Direct contact for collaborations",
    primary: true,
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    url: "https://x.com/AntonyAustin19",
    icon: Twitter,
    color: "text-gray-400",
    hoverColor: "hover:text-white",
    username: "@antony_austin06",
    description: "Tech thoughts and quick updates",
    primary: false,
  },
  {
    id: "medium",
    name: "Medium",
    url: "https://medium.com/@austinantony06",
    icon: MediumIcon as LucideIcon,
    color: "text-green-400",
    hoverColor: "hover:text-green-300",
    username: "@antonyaustin",
    description: "Technical articles and tutorials",
    primary: false,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/antonyavstin?igsh=Z3NpM3NuNjl4dmU0&utm_source=qr",
    icon: Instagram,
    color: "text-pink-400",
    hoverColor: "hover:text-pink-300",
    username: "@antony.austin06",
    description: "Behind the scenes and project updates",
    primary: false,
  },
]

export const getPrimarySocialLinks = () => {
  return socialLinks.filter((link) => link.primary)
}

export const getAllSocialLinks = () => {
  return socialLinks
}

export const getSocialLinkById = (id: string) => {
  return socialLinks.find((link) => link.id === id)
}

export const getSocialLinkByPlatform = (platform: string) => {
  return socialLinks.find((link) => link.name.toLowerCase().includes(platform.toLowerCase()))
}
